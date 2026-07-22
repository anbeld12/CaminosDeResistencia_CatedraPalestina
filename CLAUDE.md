# Cátedra Caminos de Resistencia — Guía de Arquitectura y Desarrollo

Plataforma de Memoria y Solidaridad Académica · UNAL + Embajada del Estado de Palestina.

## Stack

### Frontend
- **Vite** como bundler
- **React 18** con componentes funcionales y hooks
- **TypeScript estricto**
- **Tailwind CSS** como sistema de estilos
- **Framer Motion** para animaciones
- **React Router DOM** para navegación

### Backend (serverless)
- **Supabase** — base de datos PostgreSQL, autenticación, API REST
- **Cloudinary** — hosting de imágenes con CDN
- **Vercel Functions** — API de administración (`api/`)

### Dependencias clave
- `@supabase/supabase-js` — cliente Supabase para frontend + serverless
- `cloudinary` — firma de uploads en Vercel Functions
- `lucide-react` — iconos genéricos
- SVG propios en `src/lib/icons.tsx`
- Sin librerías de UI externas (no MUI, Chakra, shadcn)

## Paleta de color (Tailwind theme)

Configurada en `tailwind.config.js` bajo `theme.extend.colors`:

| Token Tailwind | Valor | Uso |
|---|---|---|
| `primary` / `primary-deep` | `#2E4731` / `#1d2f1f` | Verde olivo, color institucional principal |
| `accent` | `#8B1D22` | Rojo terracota, urgencia, CTAs |
| `dark` | `#121212` | Negro carbón, fondos profundos |
| `light` | `#F5F5F5` | Blanco humo, fondo principal claro |
| `light-warm` | `#FAFAF7` | Fondo cálido alternativo |
| `fg` / `fg-mute` | `#121212` / `#4a4a48` | Texto principal y secundario |

Dark mode usa la estrategia `class` de Tailwind (`darkMode: 'class'`). El atributo `data-theme="dark"` en `<html>` se sincroniza con `class="dark"` desde `App.tsx`. Todos los componentes usan modificadores `dark:` para variantes oscuras.

## Tipografía

| Clase Tailwind | Fuente | Uso |
|---|---|---|
| `font-serif` | Playfair Display | Títulos h1-h4, citas |
| `font-sans` | Inter | Cuerpo y UI (default) |
| `font-mono` | JetBrains Mono | Eyebrows, kickers, metadata |

Fuentes cargadas desde Google Fonts en `index.html`. Para reducir repetición, las composiciones frecuentes (`.eyebrow`, `.kicker`, `.btn`, `.btn-terra`, `.chip`, `.wrap`, `.section`, `.h1`, `.h2`, `.h3`) se declaran en `@layer components` dentro de `global.css`.

## Estructura de archivos

```
Palestina-frontend/
├── api/
│   ├── upload.ts                     # POST: firma Cloudinary (signed upload)
│   └── admin/
│       ├── projects.ts               # POST: crear proyecto (admin)
│       └── [id].ts                   # PUT/DELETE: editar/eliminar proyecto (admin)
├── src/
│   ├── main.tsx
│   ├── App.tsx                       # Shell: React Router, tema, AuthProvider
│   ├── vite-env.d.ts                 # Tipos para import.meta.env
│   ├── styles/global.css             # @tailwind + @layer + reglas globales
│   ├── lib/
│   │   ├── supabase.ts               # Cliente Supabase tipado
│   │   ├── auth.tsx                   # AuthProvider + useAuth + ProtectedRoute
│   │   ├── useProjects.ts             # Hook: fetch proyectos desde Supabase
│   │   ├── mapper.ts                  # snake_case DB → camelCase frontend
│   │   ├── types.ts                   # Interfaces de dominio (Project, Page, ...)
│   │   └── icons.tsx                  # Icon.* (SVG propios)
│   ├── types/database.ts             # Tipos de filas DB (ProjectRow)
│   ├── data/
│   │   ├── archive.ts                # BIBLIOGRAPHY, KIND_GLYPH, buildKindFilters()
│   │   ├── history.ts                # TIMELINE, GLOSSARY
│   │   ├── projects-2025-1.ts        # Referencia para seed de datos
│   │   └── ongs.ts                   # ONGS_LOGISTICAS, ALIADAS, CAMPO
│   ├── components/
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   ├── ImageSlot.tsx
│   │   └── Reveal.tsx                # Wrapper Framer Motion
│   └── pages/
│       ├── Home.tsx
│       ├── History.tsx
│       ├── ONGs.tsx
│       ├── Genero.tsx
│       ├── Voces.tsx
│       ├── Archive.tsx
│       ├── NotFound.tsx
│       └── admin/
│           ├── Login.tsx             # Inicio de sesión
│           ├── Dashboard.tsx         # Lista de proyectos
│           └── ProjectForm.tsx       # Crear/editar proyecto
├── scripts/
│   ├── seed-projects.mjs             # Seed inicial de 26 proyectos
│   ├── upload-thumbnails.mjs         # Subir imágenes a Cloudinary
│   ├── fix-descriptions.mjs          # Corrección de descripciones
│   ├── prerender.mjs                 # Prerender para SEO
│   ├── generate-sitemap.mjs
│   └── convert-images.mjs
├── vercel.json                       # SPA rewrites para Vercel
├── .env.example                      # Template de variables de entorno
└── .env                              # Credenciales (no versionado)
```

## Patrones de diseño a mantener

### 1. Navegación (React Router DOM)
Rutas definidas en `App.tsx` con `<BrowserRouter>`. Las rutas públicas están dentro de `<AppLayout>` (Nav + Footer). Las rutas de admin tienen su propio layout.

| Ruta | Componente | Protegida |
|------|-----------|-----------|
| `/` | Home | No |
| `/historia` | History | No |
| `/ongs` | ONGs | No |
| `/genero` | Genero | No |
| `/voces` | Voces | No |
| `/archivo` | Archive | No |
| `/admin/login` | AdminLogin | No |
| `/admin` | AdminDashboard | Sí (ProtectedRoute) |
| `/admin/projects/new` | AdminProjectForm | Sí |
| `/admin/projects/:id/edit` | AdminProjectForm | Sí |
| `*` | NotFound | No |

Para agregar una página pública:
1. Crear componente en `src/pages/`
2. Agregar `<Route>` en `App.tsx`

### 2. Tema light/dark
Controlado con atributo `data-theme` y class `dark` en `<html>` (sincronizados en `App.tsx`). Toggle manual. La detección inicial puede usar `window.matchMedia('(prefers-color-scheme: dark)')` solo en JS.

### 3. Animaciones (Framer Motion)
Usar `<Reveal>` (wrapper interno) o `<motion.*>` directamente:
```tsx
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: '-10% 0px' }}
transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
```
Para escalonar, incrementar `transition.delay` (0.1, 0.2, 0.3…). No reintroducir IntersectionObserver manual.

### 4. Estructura de página
```tsx
export function MiPagina() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <Reveal><div className="eyebrow">...</div></Reveal>
              <Reveal delay={0.1}><h1 className="h1">...</h1></Reveal>
            </div>
            <Reveal delay={0.2}><p className="lede">...</p></Reveal>
          </div>
        </div>
      </header>
      <section className="section">
        <div className="wrap">...</div>
      </section>
    </>
  );
}
```

### 5. Iconos
- SVG propios: `src/lib/icons.tsx` como `Icon.Name`. `viewBox="0 0 24 24"`, `stroke="currentColor"`, `fill="none"`.
- Iconos genéricos: `lucide-react`.

### 6. Imágenes placeholder
`<ImageSlot>` con `label` y `variant` (olive/terra/carbon).

## Capa de datos

### Datos dinámicos (proyectos)
Los proyectos se almacenan en **Supabase** y se consultan con el hook `useProjects()`:

```tsx
const { projects, loading, error, refetch } = useProjects();
```

El hook:
- Consulta todos los registros de la tabla `projects` mediante el cliente Supabase anónimo
- Convierte snake_case DB → camelCase frontend vía `toProject()` mapper
- Cachea la respuesta en `localStorage('cdr-projects-cache')` como fallback offline
- Expone estados: `loading`, `error`, `refetch`

### Datos estáticos (bibliografía, líneas de tiempo, ONGs)
Archivos en `src/data/*.ts`: `BIBLIOGRAPHY`, `TIMELINE`, `GLOSSARY`, `ONGS_LOGISTICAS`, etc.
Se importan directamente en los componentes que los usan.

### Admin panel
Accesible en `/admin/login` con credenciales de Supabase Auth.
Operaciones CRUD viajan a las Vercel Functions en `api/admin/`:
- `POST /api/admin/projects` — crear proyecto
- `PUT /api/admin/[id]` — actualizar
- `DELETE /api/admin/[id]` — eliminar
- `POST /api/upload` — generar firma para Cloudinary signed upload

### Imágenes
Las miniaturas se alojan en **Cloudinary** con estructura de carpetas:
```
projects/{semestre}/{n}-{tipo}-{slug}
```
Ejemplo: `projects/2025-I/01-video-cementerio-de-memorias-stencil-y-minidocu`

## Variables de entorno

Copiar `.env.example` → `.env` y llenar:

| Variable | Dónde obtenerla |
|----------|----------------|
| `VITE_SUPABASE_URL` | Supabase Dashboard → Project Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase Dashboard → Project Settings → API → anon public key |
| `SUPABASE_SERVICE_KEY` | Supabase Dashboard → Project Settings → API → service_role secret |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Dashboard → Account Details |
| `CLOUDINARY_API_KEY` | Cloudinary Dashboard → Account Details |
| `CLOUDINARY_API_SECRET` | Cloudinary Dashboard → Account Details |

Las variables sin prefijo `VITE_` solo están disponibles en Vercel Functions (nunca se exponen al frontend).

## Scripts de mantenimiento

| Script | Uso |
|--------|-----|
| `npm run dev` | Desarrollo local (Vite) |
| `npm run build` | Build de producción |
| `node scripts/seed-projects.mjs` | Insertar proyectos en Supabase desde datos locales |
| `node scripts/upload-thumbnails.mjs` | Subir imágenes locales a Cloudinary y actualizar DB |
| `node scripts/prerender.mjs` | Generar HTML estático de rutas para SEO |

## Workflow para nuevo semestre

1. **Subir thumbnails** a `public/images/archive/{semestre}/thumbs/` (formato: `{n}_{Tipo}_{Titulo}.webp`)
2. **Crear proyectos desde el admin**: ir a `/admin/projects/new` y llenar el formulario
3. **Subir imágenes** a Cloudinary desde el admin (usar URL de Cloudinary en el campo thumbnail)
4. Verificar que aparecen en `/archivo`

## Convenciones de código

- Componentes: PascalCase, named exports
- No `default export`
- Las clases Tailwind se ordenan: layout → spacing → typography → color → state
- Combinaciones repetidas → `@layer components`. Utilidades nuevas → `@layer utilities`.

## Responsive

Mobile-first, breakpoints Tailwind por defecto. El breakpoint funcional principal es `md` (768px): navbar colapsa, grids pasan a 1 col. Títulos usan `clamp()` inline.

## Qué NO hacer

- No instalar librerías de UI (MUI, Chakra, shadcn)
- No instalar otra librería de animación además de Framer Motion
- No crear archivos CSS adicionales — todo va en `global.css` vía `@layer`
- No usar `default export`
- No reintroducir IntersectionObserver manual
- No usar `@media (prefers-color-scheme: dark)`
- No crear archivos de documentación sin que se pida
- No modificar la paleta sin mantener primary/accent como ejes visuales
- No eliminar el grain overlay del body
- No usar px fijos para tipografía de títulos — siempre `clamp()`

## Idioma

Contenido visible en **español**. Código en **inglés**. Comentarios solo para marcar secciones: `{/* ============ NOMBRE ============ */}`.
