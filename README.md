# Cátedra Caminos de Resistencia

> Plataforma de Memoria y Solidaridad Académica · UNAL + Embajada del Estado de Palestina
>
> **Sitio web:** https://catedrapalestinacaminosderesistencia.com
>
> **Licencia:** CC-BY-NC-4.0

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Bundler | **Vite** 8 |
| UI | **React 18** con componentes funcionales + hooks |
| Lenguaje | **TypeScript** 6 (estricto) |
| Estilos | **Tailwind CSS** 3 + CSS vanilla en `src/styles/global.css` |
| Animación | **Framer Motion** 12 |
| Iconos | **lucide-react** + SVG propios en `src/lib/icons.tsx` |
| Base de datos | **Supabase PostgreSQL** (tabla `projects`) |
| Autenticación | **Supabase Auth** (email + password) |
| Imágenes | **Cloudinary** (CDN con transformaciones) |
| API Admin | **Vercel Functions** (3 endpoints serverless) |
| Routing | **React Router DOM** 6 |
| SEO | **react-helmet-async** + Prerender + JSON-LD |

---

## Getting Started

### Prerrequisitos

- Node.js 20+
- npm
- Cuenta gratuita en [Supabase](https://supabase.com)
- Cuenta gratuita en [Cloudinary](https://cloudinary.com)
- Cuenta gratuita en [Vercel](https://vercel.com) (para deploy)

### Instalación local

```bash
git clone <repo>
cd Palestina-frontend
npm install
```

### Variables de entorno

Copiar `.env.example` → `.env` y llenar:

| Variable | Dónde obtenerla | Exposición |
|----------|----------------|------------|
| `VITE_SUPABASE_URL` | Supabase → Project Settings → API → Project URL | Pública (frontend) |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → anon public | Pública (frontend) |
| `SUPABASE_SERVICE_KEY` | Supabase → Project Settings → API → service_role secret | Solo Vercel Functions |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary → Dashboard → Account Details | Solo Vercel Functions |
| `CLOUDINARY_API_KEY` | Cloudinary → Dashboard → Account Details | Solo Vercel Functions |
| `CLOUDINARY_API_SECRET` | Cloudinary → Dashboard → Account Details | Solo Vercel Functions |

Las variables con prefijo `VITE_` se exponen al frontend (seguras para uso público).
Las variables sin prefijo solo están disponibles en las Vercel Functions (server-side).

### Inicializar base de datos

Ejecutar el siguiente SQL en el SQL Editor de Supabase:

```sql
-- ============================================================
-- Schema completo — Cátedra Caminos de Resistencia
-- ============================================================

-- 1. ENUM para tipos de proyecto
CREATE TYPE project_kind AS ENUM (
  'ensayo', 'cartografia', 'video', 'podcast',
  'fanzine', 'mural', 'collage', 'grabado'
);

-- 2. Tabla principal
CREATE TABLE projects (
  id           SERIAL PRIMARY KEY,
  kind         project_kind NOT NULL,
  title        TEXT NOT NULL,
  author       VARCHAR(255) NOT NULL DEFAULT '',
  year         VARCHAR(50) NOT NULL,
  n            VARCHAR(10) NOT NULL,
  tags         TEXT[] DEFAULT '{}',
  description  TEXT,
  url          TEXT,
  url_alt      TEXT,
  links        JSONB DEFAULT '[]',
  link_label   VARCHAR(255),
  thumbnail    TEXT,
  ai_thumbnail BOOLEAN DEFAULT FALSE,
  members      TEXT[] DEFAULT '{}',
  group_name   VARCHAR(255),
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Índices
CREATE INDEX idx_projects_kind ON projects(kind);
CREATE INDEX idx_projects_year ON projects(year);
CREATE INDEX idx_projects_tags ON projects USING GIN(tags);

-- 4. Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- 5. Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Inserción solo autenticados"
  ON projects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Actualización solo autenticados"
  ON projects FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Eliminación solo autenticados"
  ON projects FOR DELETE
  USING (auth.role() = 'authenticated');
```

### Crear usuario admin

1. Ir a Supabase Dashboard → **Authentication** → **Users** → **Add User**
2. Email: `ctpalestina_bog@unal.edu.co` (institucional verificable)
3. Password: elegir una segura

### Desarrollo local

```bash
npm run dev
# Abre http://localhost:5173
# Admin: http://localhost:5173/admin/login
```

---

## Arquitectura

### Flujo de datos: Archivo público

```
Supabase (tabla projects)
    ↓ SELECT (anon key, RLS pública)
useProjects() hook
    ↓ mapeo snake_case → camelCase
    ↓ caché en localStorage
Archive.tsx (grid / list / modal)
```

### Flujo de datos: Admin

```
AdminProjectForm
    ↓ Auth: JWT de Supabase Auth
    ↓ POST /api/admin/projects
Vercel Function (api/admin/projects.ts)
    ↓ Verifica JWT, valida datos
    ↓ INSERT con service_role key
Supabase
```

### Flujo de datos: Imágenes

```
AdminProjectForm → file input
    ↓ POST /api/upload (con JWT)
Vercel Function (api/upload.ts)
    ↓ Genera firma HMAC-SHA256 con API Secret
    ↓ Devuelve { signature, timestamp, cloudName, apiKey, uploadPreset }
AdminProjectForm
    ↓ POST https://api.cloudinary.com/v1_1/{cloud}/auto/upload
    ↓ Con { file, signature, timestamp, upload_preset }
Cloudinary
    ↓ Devuelve secure_url
    ↓ Se asigna al campo thumbnail del proyecto
```

### Autenticación

```
Supabase Auth (email + password)
    ↓ JWT
AuthProvider (src/lib/auth.tsx)
    ↓ useAuth() → { user, session, signIn, signOut }
ProtectedRoute → redirige a /admin/login si no hay sesión
```

---

## Estructura del proyecto

```
Palestina-frontend/
├── api/
│   ├── upload.ts                     # POST: firma Cloudinary signed upload
│   └── admin/
│       ├── projects.ts               # POST: crear proyecto
│       └── [id].ts                   # PUT/DELETE: editar/eliminar proyecto
├── scripts/
│   ├── seed-projects.mjs             # Seed de 26 proyectos en Supabase + Cloudinary
│   ├── upload-thumbnails.mjs         # Subir thumbnails locales a Cloudinary
│   ├── fix-descriptions.mjs          # Restaurar descripciones originales
│   ├── prerender.mjs                 # Generar HTML estático para SEO
│   ├── generate-sitemap.mjs          # Generar sitemap.xml
│   ├── generate-favicons.mjs         # Generar favicons desde PNG
│   └── convert-images.mjs            # Convertir imágenes a WebP
├── src/
│   ├── main.tsx                      # Entry point
│   ├── App.tsx                       # Router + AuthProvider + Theme
│   ├── vite-env.d.ts                 # Tipos para import.meta.env
│   ├── styles/
│   │   └── global.css                # Único archivo CSS (Tailwind + componentes)
│   ├── lib/
│   │   ├── config.ts                 # Constantes de configuración (semestre, stats)
│   │   ├── types.ts                  # Interfaces de dominio (Project, Book, etc.)
│   │   ├── supabase.ts               # Cliente Supabase tipado
│   │   ├── auth.tsx                  # AuthProvider + useAuth + ProtectedRoute
│   │   ├── useProjects.ts            # Hook para consultar proyectos desde Supabase
│   │   ├── mapper.ts                 # Mapeo snake_case DB → camelCase frontend
│   │   ├── icons.tsx                 # 18 SVG propios (Icon.Sun, Icon.Moon, etc.)
│   │   ├── hooks.ts                  # useLockBodyScroll, useScrollY
│   │   ├── seo.ts                    # SITE_URL, OG_IMAGE
│   │   └── seo-schema.ts             # Generadores JSON-LD
│   ├── types/
│   │   └── database.ts               # Database + ProjectRow (tipos Supabase)
│   ├── data/
│   │   ├── archive.ts                # BIBLIOGRAPHY, KIND_GLYPH, buildKindFilters()
│   │   ├── history.ts                # TIMELINE (13 eventos), GLOSSARY
│   │   ├── ongs.ts                   # ONG_CARDS, ONG_PARTNERS
│   │   ├── projects-2025-1.ts        # Datos de referencia para seed
│   │   ├── myths.ts                  # Mitos vs. realidad
│   │   ├── playlist.ts               # Playlist de poesía
│   │   ├── timeline-g3.ts            # Línea de tiempo Grupo 3
│   │   ├── fanzine-g12.ts            # Fanzine Grupo 12
│   │   └── organizations.json        # ONGs externas
│   ├── components/
│   │   ├── Nav.tsx                   # Barra de navegación
│   │   ├── Footer.tsx                # Footer
│   │   ├── ImageSlot.tsx             # Placeholder de imagen
│   │   ├── Reveal.tsx                # Wrapper Framer Motion (entrada en viewport)
│   │   ├── MythCards.tsx             # Tarjetas mito/realidad (3D flip)
│   │   ├── ImageGallery.tsx          # Galería de imágenes
│   │   ├── ImageBook.tsx             # Visor de libro/álbum
│   │   └── ExternalOrgs.tsx          # Lista de organizaciones externas
│   └── pages/
│       ├── Home.tsx                  # Landing page
│       ├── History.tsx               # /historia
│       ├── ONGs.tsx                  # /ongs
│       ├── Genero.tsx                # /genero
│       ├── Voces.tsx                 # /voces
│       ├── Archive.tsx               # /archivo
│       ├── NotFound.tsx              # 404
│       └── admin/
│           ├── Login.tsx             # Inicio de sesión
│           ├── Dashboard.tsx         # Lista de proyectos
│           └── ProjectForm.tsx       # Crear/editar proyecto
├── public/
│   ├── images/
│   │   └── archive/2025-I/
│   │       ├── thumbs/               # 26 miniaturas .webp
│   │       └── ...                   # Imágenes complementarias
│   ├── favicon.svg, favicon.ico, ...
│   ├── og-image.png
│   ├── manifest.json
│   ├── robots.txt
│   └── sitemap.xml
├── vercel.json                       # SPA rewrites para Vercel
├── .env.example                      # Template de variables de entorno
├── .gitignore
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Rutas

| Ruta | Componente | Descripción | Protegida |
|------|-----------|-------------|-----------|
| `/` | Home | Landing page | No |
| `/historia` | History | Línea de tiempo + glosario | No |
| `/ongs` | ONGs | Organizaciones aliadas | No |
| `/genero` | Genero | Enfoque de género | No |
| `/voces` | Voces | Cultura y medios | No |
| `/archivo` | Archive | Archivo de proyectos + bibliografía | No |
| `/admin/login` | AdminLogin | Inicio de sesión | No |
| `/admin` | AdminDashboard | Lista de proyectos | Sí |
| `/admin/projects/new` | AdminProjectForm | Crear proyecto | Sí |
| `/admin/projects/:id/edit` | AdminProjectForm | Editar proyecto | Sí |
| `*` | NotFound | 404 | No |

---

## API (Vercel Functions)

### `POST /api/admin/projects`
Crear un proyecto. Requiere JWT en `Authorization: Bearer <token>`.

**Body:**
```json
{
  "kind": "video",
  "title": "Título del proyecto",
  "author": "Grupo 1",
  "year": "2025-I",
  "n": "01",
  "tags": ["video", "memoria"],
  "description": "...",
  "url": "https://...",
  "thumbnail": "https://res.cloudinary.com/...",
  "aiThumbnail": false,
  "members": ["Nombre Apellido"],
  "groupName": "Grupo 1",
  "links": [{"label": "Ep. 1", "url": "https://..."}],
  "linkLabel": "Episodios"
}
```

**Validación:** `title`, `kind` (en lista válida), `year`, `n` son obligatorios.

### `PUT /api/admin/[id]`
Actualizar proyecto. Mismos campos que create, todos opcionales.

### `DELETE /api/admin/[id]`
Eliminar proyecto por ID.

### `POST /api/upload`
Obtener firma para Cloudinary signed upload. Requiere JWT.

**Respuesta:**
```json
{
  "signature": "abc123...",
  "timestamp": 1712345678,
  "cloudName": "tu-cloud",
  "apiKey": "123456789",
  "uploadPreset": "catedra_palestina"
}
```

---

## Admin Panel

El panel de administración permite gestionar proyectos sin usar código ni SQL.

### Acceso

1. Ir a `/admin/login`
2. Iniciar sesión con el usuario creado en Supabase Auth
3. Se redirige a `/admin` (dashboard)

### Funcionalidades

- **Listar proyectos**: tabla con N°, título, grupo, tipo, período. Botones editar/eliminar.
- **Crear proyecto**: formulario completo con todos los campos del proyecto.
- **Editar proyecto**: mismo formulario, precargado con datos existentes.
- **Subir miniatura**: selector de archivo que sube directamente a Cloudinary (firma signed) y auto-completa la URL.
- **Enlaces múltiples**: editor dinámico para agregar/eliminar pares label + URL (útil para series de podcast con múltiples episodios).
- **Validación**: las URLs deben comenzar con `http://` o `https://`.

### Seguridad

- Sesión JWT manejada por Supabase Auth
- Si la sesión expira, el formulario guarda los datos en `sessionStorage` y redirige al login
- `ProtectedRoute` redirige automáticamente si no hay sesión activa
- Las Vercel Functions verifican el JWT en cada request

---

## Cloudinary

### Estructura de carpetas

```
projects/
└── {semestre}/
    └── {n}-{tipo}-{slug}
```

Ejemplo: `projects/2025-I/01-video-cementerio-de-memorias-stencil-y-minidocu`

### Upload preset

- **Nombre:** `catedra_palestina`
- **Modo:** Signed
- Crear en: Cloudinary Dashboard → Settings → Upload → Upload presets → Add preset

---

## Mantenimiento

### Actualizar semestre

Editar `src/lib/config.ts`:

```ts
export const CONFIG = {
  DESPOJO_ANOS: 78,    // 1948 + este valor = año actual
  EDICION: 'IV',       // Incrementar cada semestre
  SEMESTRE: '2025-I',  // Cambiar a '2025-II', '2026-I', etc.
  COSECHA: '2025-I',   // Mismo valor
} as const;
```

### Agregar proyectos (vía admin)

1. Ir a `/admin/login`
2. Click **Nuevo proyecto**
3. Llenar formulario
4. Opcional: subir miniatura con el selector de archivo
5. Guardar

### Agregar proyectos (vía seed script)

Para migración masiva desde archivos locales:

```bash
# 1. Colocar thumbnails en public/images/archive/{semestre}/thumbs/
# 2. Editar scripts/seed-projects.mjs con los datos de los proyectos
# 3. Ejecutar:
node scripts/seed-projects.mjs

# 4. El script sube imágenes a Cloudinary e inserta en Supabase
# 5. Es idempotente: no duplica si ya existe un proyecto con el mismo n + year
```

### Subir thumbnails existentes a Cloudinary

Si los proyectos ya están en Supabase pero sin thumbnail:

```bash
node scripts/upload-thumbnails.mjs --semestre=2025-I
```

Busca archivos en `public/images/archive/{semestre}/thumbs/`, los sube a Cloudinary con la jerarquía definida, y actualiza los registros en Supabase.

### Scripts disponibles

| Script | Propósito |
|--------|-----------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción (TypeScript + Vite) |
| `npm run preview` | Vista previa del build |
| `npm run prerender` | Generar HTML estático para SEO |
| `npm run build:seo` | Build + prerender |
| `node scripts/seed-projects.mjs` | Seed de proyectos en Supabase |
| `node scripts/upload-thumbnails.mjs` | Subir thumbnails a Cloudinary |
| `node scripts/fix-descriptions.mjs` | Corregir descripciones en DB |

---

## SEO

- **Meta tags dinámicos**: `react-helmet-async` inyecta title, description, OG tags, Twitter cards por página
- **Prerender**: `scripts/prerender.mjs` genera HTML estático de las 6 rutas principales con Puppeteer
- **Sitemap**: `scripts/generate-sitemap.mjs` genera `public/sitemap.xml` (6 URLs, changefreq monthly)
- **JSON-LD**: `src/lib/seo-schema.ts` genera schema.org estructurado (Organization, Website, Article, CollectionPage, Event, Book, BreadcrumbList)
- **Canonical URL**: `https://catedrapalestinacaminosderesistencia.com` configurado dinámicamente desde `VITE_SITE_URL`
- **BreadcrumbList**: JSON-LD estructurado en páginas secundarias (History, ONGs, Genero, Voces, Archive)
- **FAQPage schema**: en sección "Mitos vs Realidad" de History
- **Course schema**: en Home describiendo la cátedra como curso académico
- **VideoObject/PodcastEpisode schema**: exportados para uso en Voces
- **PWA**: manifest.json en la raíz con theme_color `#2E4731`

---

## Diseño

### Sistema de color

| Token | Hex | Uso |
|-------|-----|-----|
| `primary` | `#2E4731` | Verde olivo institucional |
| `primary-deep` | `#1d2f1f` | Verde profundo |
| `accent` | `#8B1D22` | Rojo terracota |
| `dark` | `#121212` | Fondos oscuros |
| `light` | `#F5F5F5` | Fondo claro |
| `fg` | `#121212` | Texto principal |
| `fg-mute` | `#4a4a48` | Texto secundario |

### Tipografía

| Clase | Fuente | Uso |
|-------|--------|-----|
| `font-serif` | Playfair Display | Títulos |
| `font-sans` | Inter | Cuerpo (default) |
| `font-mono` | JetBrains Mono | Metadata, eyebrows |

---

## Licencia

CC-BY-NC-4.0 — Creative Commons Attribution-NonCommercial 4.0 International.

---

## Créditos

**Cátedra Caminos de Resistencia**
Facultad de Derecho y Ciencias Políticas
Universidad Nacional de Colombia

En colaboración con la Embajada del Estado de Palestina en Colombia.

---

*Documentación generada el 21 de julio de 2026.*
