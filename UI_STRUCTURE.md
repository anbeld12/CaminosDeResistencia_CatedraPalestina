# UI_STRUCTURE — Cátedra Caminos de Resistencia

Registro visual y de lineamientos de desarrollo del frontend.
Plataforma de Memoria y Solidaridad Académica · UNAL + Embajada del Estado de Palestina.

---

## 1. Stack técnico

| Capa | Tecnología | Notas |
|---|---|---|
| Bundler | **Vite** | No Webpack, no Parcel |
| UI | **React 18** | Componentes funcionales + hooks. Sin clases |
| Lenguaje | **TypeScript estricto** | `"jsx": "react-jsx"` |
| Estilos | **Tailwind CSS** | Sin CSS-in-JS, Sass o CSS Modules |
| Animación | **Framer Motion** | `<motion.*>`, `whileInView`, `AnimatePresence` |
| Iconos | **lucide-react** + `src/lib/icons.tsx` | SVG propios en `Icon.*` |
| DB | **Supabase PostgreSQL** | Almacenamiento de proyectos |
| Auth | **Supabase Auth** | Admin login (email + password) |
| Imágenes | **Cloudinary** | Hosting de thumbnails con CDN |
| API Admin | **Vercel Functions** | CRUD de proyectos (`api/admin/`) |
| Routing | **React Router DOM** | `<BrowserRouter>` en `App.tsx` |
| UI libs | Ninguna | Sin MUI, Chakra, shadcn |

---

## 2. Sistema de color

Definido en `tailwind.config.js` → `theme.extend.colors`.

| Token | Hex | Rol visual |
|---|---|---|
| `primary` | `#2E4731` | Verde olivo institucional |
| `primary-deep` | `#1d2f1f` | Verde olivo profundo |
| `accent` | `#8B1D22` | Rojo terracota · urgencia · CTAs |
| `dark` | `#121212` | Negro carbón · fondos profundos |
| `light` | `#F5F5F5` | Blanco humo · fondo principal claro |
| `light-warm` | `#FAFAF7` | Fondo cálido alternativo |
| `fg` | `#121212` | Texto principal |
| `fg-mute` | `#4a4a48` | Texto secundario |

**Dark mode:** estrategia `class` de Tailwind (`darkMode: 'class'`). El atributo `data-theme="dark"` en `<html>` se sincroniza con `class="dark"` desde `App.tsx`. Todos los componentes deben declarar variantes con modificadores `dark:`.

**Ejes visuales obligatorios:** `primary` y `accent` no pueden ser reemplazados ni desplazados como pivotes cromáticos.

---

## 3. Tipografía

| Clase | Familia | Uso |
|---|---|---|
| `font-serif` | Playfair Display | h1–h4, citas |
| `font-sans` | Inter | Cuerpo y UI (default) |
| `font-mono` | JetBrains Mono | Eyebrows, kickers, metadata |

- Carga: Google Fonts desde `index.html`.
- Tamaños de títulos: **siempre `clamp()` inline**, nunca px fijo.
- Composiciones reutilizables (`.h1`, `.h2`, `.h3`, `.eyebrow`, `.kicker`, `.lede`) viven en `@layer components` dentro de `src/styles/global.css`.

---

## 4. Estructura de archivos

```
src/
  main.tsx
  App.tsx               # Shell: routing (PageId), tema, localStorage
  styles/
    global.css          # @tailwind + @layer + reglas globales mínimas
  lib/
    types.ts            # PageId, PAGES + interfaces de dominio
    icons.tsx           # Icon.* (SVG propios)
  data/
    archive.ts          # PROJECTS, BIBLIOGRAPHY
    history.ts          # TIMELINE, GLOSSARY
    ongs.ts             # ONGS_LOGISTICAS, ALIADAS, CAMPO
  components/
    Nav.tsx
    Footer.tsx
    ImageSlot.tsx
    Reveal.tsx          # Wrapper Framer Motion
  pages/
    Home.tsx
    ONGs.tsx
    History.tsx
    Archive.tsx
```

---

## 5. Clases utilitarias propias (`global.css` → `@layer components`)

| Clase | Propósito |
|---|---|
| `.wrap` | Contenedor centrado con ancho máximo |
| `.section` | Padding vertical estándar de sección |
| `.page-head` | Cabecera de página |
| `.h1` `.h2` `.h3` | Títulos con tipografía serif + `clamp()` |
| `.eyebrow` | Etiqueta superior en mono |
| `.kicker` | Subtítulo destacado |
| `.lede` | Párrafo introductorio |
| `.btn` / `.btn-terra` | Botón base / variante terracota |
| `.chip` | Etiqueta pequeña |

Toda combinación de utilidades que se repita → mover a `@layer components`. Toda utilidad nueva → `@layer utilities`. **No crear archivos CSS adicionales.**

---

## 6. Patrones de diseño

### 6.1 Navegación (React Router DOM)
Rutas definidas en `App.tsx` con `<BrowserRouter>` y `<Routes>`.

**Rutas públicas** (dentro de `AppLayout` que incluye Nav + Footer):
`/`, `/historia`, `/ongs`, `/genero`, `/voces`, `/archivo`

**Rutas admin** (login sin layout, CRUD dentro de AppLayout con ProtectedRoute):
`/admin/login`, `/admin`, `/admin/projects/new`, `/admin/projects/:id/edit`

### 6.2 Tema light/dark
- Sincronizar `data-theme` y `class="dark"` en `<html>` desde `App.tsx`.
- Toggle manual desde la UI.
- Detección inicial: `window.matchMedia('(prefers-color-scheme: dark)')` **solo en JS**, nunca como media query CSS.

### 6.3 Animaciones (Framer Motion)
Patrón estándar de entrada en viewport:

```tsx
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: '-10% 0px' }}
transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
```

- Usar `<Reveal delay={...}>` cuando aplique.
- Escalonar incrementando `delay` (0.1, 0.2, 0.3…).
- **Prohibido** reintroducir IntersectionObserver manual.

### 6.4 Estructura canónica de página

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

### 6.5 Iconos
- **SVG propios:** `src/lib/icons.tsx`, expuestos como `Icon.Name`. Atributos obligatorios: `viewBox="0 0 24 24"`, `stroke="currentColor"`, `fill="none"`.
- **Genéricos:** `lucide-react`.

### 6.6 Imágenes placeholder
`<ImageSlot label="..." variant="olive | terra | carbon" />`.

---

## 7. Capa de datos

### Datos dinámicos (proyectos)
Los proyectos se almacenan en **Supabase** (tabla `projects`) y se consultan con el hook `useProjects()` desde `src/lib/useProjects.ts`. El hook cachea resultados en `localStorage` como fallback offline.

### Datos estáticos (bibliografía, líneas de tiempo, ONGs)
Archivos en `src/data/*.ts`: `BIBLIOGRAPHY`, `TIMELINE`, `GLOSSARY`, etc. Se importan directamente en los componentes que los usan.

### Admin panel
CRUD de proyectos vía Vercel Functions (`api/admin/projects.ts`, `api/admin/[id].ts`).
Autenticación con Supabase Auth (email + password).
Imágenes subidas a Cloudinary con firma signed vía `api/upload.ts`.

### Interfaces de dominio
`Project`, `Book`, `TimelineEntry`, … exportadas desde `src/lib/types.ts`.
Tipos de base de datos (`ProjectRow`) en `src/types/database.ts`.
Mapper snake_case → camelCase en `src/lib/mapper.ts`.

---

## 8. Convenciones de código

- Componentes en **PascalCase** con **named exports** (sin `default export`).
- Orden de clases Tailwind: **layout → spacing → typography → color → state**.
- Combinaciones repetidas → `@layer components`.
- Utilidades nuevas → `@layer utilities`.
- Comentarios solo como marcadores de sección: `{/* ============ NOMBRE ============ */}`.

---

## 9. Responsive

- Mobile-first.
- Breakpoints Tailwind por defecto.
- Breakpoint funcional principal: **`md` (768px)** — navbar colapsa, grids pasan a 1 columna.
- Títulos: `clamp()` inline, nunca px fijo.

---

## 10. Idioma

- **Contenido visible:** español.
- **Código (identificadores, comentarios técnicos):** inglés.
- Comentarios de sección admitidos en español o inglés según contexto.

---

## 11. Reglas duras — Qué NO hacer

- ❌ Instalar librerías de UI (MUI, Chakra, shadcn).
- ❌ Instalar otra librería de animación además de Framer Motion.
- ❌ Crear archivos CSS adicionales (todo va en `global.css` vía `@layer`).
- ❌ Usar `default export`.
- ❌ Reintroducir IntersectionObserver manual.
- ❌ Usar `@media (prefers-color-scheme: dark)` en CSS.
- ❌ Crear archivos de documentación sin que se pidan.
- ❌ Modificar la paleta sin mantener `primary` / `accent` como ejes visuales.
- ❌ Eliminar el grain overlay del `body`.
- ❌ Usar px fijos para tipografía de títulos — siempre `clamp()`.
- ❌ Exponer `SUPABASE_SERVICE_KEY` o `CLOUDINARY_API_SECRET` en el frontend.
