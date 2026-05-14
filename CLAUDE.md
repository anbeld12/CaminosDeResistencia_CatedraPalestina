# Cátedra Caminos de Resistencia — Guía de Diseño y Arquitectura

Plataforma de Memoria y Solidaridad Académica · UNAL + Embajada del Estado de Palestina.
Frontend en **Vite + React 18 + TypeScript + Tailwind CSS + Framer Motion**.

## Stack y restricciones

- **Vite** como bundler. No Webpack, no Parcel.
- **React 18** con componentes funcionales y hooks. No clases.
- **TypeScript estricto**. `"jsx": "react-jsx"` en tsconfig.
- **Tailwind CSS** como sistema de estilos. No CSS-in-JS, no Sass, no CSS Modules. El único CSS vanilla permitido vive en `src/styles/global.css` y se limita a: directivas `@tailwind`, `@layer` para utilidades/componentes propios, `@font-face`, y reglas globales no expresables como utilidad (grain overlay, scrollbars, selección).
- **Framer Motion** para todas las animaciones (`<motion.*>`, `whileInView`, `AnimatePresence`). No GSAP, no IntersectionObserver manual.
- **lucide-react** para iconos complementarios. Los SVG propios del proyecto siguen en `src/lib/icons.tsx`.
- **Sin state management externo** (no Redux, no Zustand). Estado con `useState` + `localStorage`.
- **Sin router externo** (no React Router). Navegación por estado en `App.tsx` con `PageId`.
- **Sin dependencias de UI** (no MUI, no Chakra, no shadcn). Todo es Tailwind + componentes propios.

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
src/
  main.tsx
  App.tsx               # Shell: routing (PageId), tema, localStorage
  styles/
    global.css          # @tailwind + @layer components/utilities + reglas globales mínimas
  lib/
    types.ts            # PageId, PAGES + interfaces de dominio (Project, Book, ...)
    icons.tsx           # Icon.* (SVG propios)
  data/
    archive.ts          # PROJECTS, BIBLIOGRAPHY
    history.ts          # TIMELINE, GLOSSARY
    ongs.ts             # ONGS_LOGISTICAS, ALIADAS, CAMPO
  components/
    Nav.tsx
    Footer.tsx
    ImageSlot.tsx
    Reveal.tsx          # Wrapper Framer Motion para entradas en viewport
  pages/
    Home.tsx
    ONGs.tsx
    History.tsx
    Archive.tsx
```

## Patrones de diseño a mantener

### 1. Navegación por estado (no URL)
Página activa en `App.tsx` como `useState<PageId>`, persistida en `localStorage('cdr-page')`. Al agregar página:
1. Agregar id a `PageId` en `types.ts`
2. Agregar entrada a `PAGES[]`
3. Agregar caso al objeto de render en `App.tsx`
4. Agregar al array `valid` en el inicializador

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

Toda información estática (`PROJECTS`, `BIBLIOGRAPHY`, `TIMELINE`, etc.) vive en `src/data/*.ts` con interfaces tipadas exportadas desde `src/lib/types.ts`. Las páginas importan los datos, nunca los redefinen inline.

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
- No usar React Router ni routing por URL
- No reintroducir IntersectionObserver manual
- No usar `@media (prefers-color-scheme: dark)`
- No crear archivos de documentación sin que se pida
- No modificar la paleta sin mantener primary/accent como ejes visuales
- No eliminar el grain overlay del body
- No usar px fijos para tipografía de títulos — siempre `clamp()`

## Idioma

Contenido visible en **español**. Código en **inglés**. Comentarios solo para marcar secciones: `{/* ============ NOMBRE ============ */}`.
