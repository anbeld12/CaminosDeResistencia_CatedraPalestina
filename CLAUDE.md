# Cátedra Caminos de Resistencia — Guía de Diseño y Arquitectura

Plataforma de Memoria y Solidaridad Académica · UNAL + Embajada del Estado de Palestina.
Frontend en **Vite + React 18 + TypeScript + CSS vanilla**.

## Stack y restricciones

- **Vite** como bundler. No Webpack, no Parcel.
- **React 18** con componentes funcionales y hooks. No clases.
- **TypeScript estricto**. `"jsx": "react-jsx"` en tsconfig.
- **CSS vanilla** en `src/styles/global.css`. No Tailwind, no CSS-in-JS, no Sass.
- **Sin librerías de animación** (no Framer Motion, no GSAP). Las animaciones son CSS + IntersectionObserver via `useReveal()`.
- **Sin state management externo** (no Redux, no Zustand). Estado con `useState` + `localStorage`.
- **Sin router externo** (no React Router). Navegación por estado en `App.tsx` con `PageId`.
- **Sin dependencias de UI** (no MUI, no Chakra, no shadcn). Todo es CSS propio.

## Paleta de color (CSS custom properties)

| Variable | Light | Dark | Uso |
|---|---|---|---|
| `--olive` | `#2E4731` | `#6f9456` | Color primario, bosque/esperanza |
| `--olive-deep` | `#1d2f1f` | `#4d6b3a` | Fondos profundos olive |
| `--terracotta` | `#8B1D22` | (mismo) | Acento cálido, urgencia, CTAs |
| `--carbon` | `#121212` | — | Fondos oscuros (sección Poética) |
| `--bg` | `#F5F5F5` | `#0b0c0a` | Fondo principal |
| `--bg-warm` | `#FAFAF7` | `#121310` | Fondo cálido alternativo |
| `--fg` | `#121212` | `#f1ede4` | Texto principal |
| `--fg-mute` | `#4a4a48` | `#a8a39a` | Texto secundario |
| `--line` | `rgba(18,18,18,0.12)` | `rgba(241,237,228,0.14)` | Bordes y separadores |

Al agregar colores nuevos, definirlos como CSS custom property en `:root` y su variante dark en `html[data-theme="dark"]`.

## Tipografía

| Variable | Fuente | Uso |
|---|---|---|
| `--serif` | Playfair Display | Títulos h1-h4, citas, nombres destacados |
| `--sans` | Inter | Cuerpo de texto, UI, botones |
| `--mono` | JetBrains Mono | Eyebrows, kickers, etiquetas, metadata, contadores |

Las fuentes se cargan desde Google Fonts en `index.html`. No agregar fuentes locales sin migrar las existentes.

### Jerarquía tipográfica

- **h1**: `clamp(48px, 8vw, 132px)`, line-height 0.95, letter-spacing -0.035em
- **h2**: `clamp(32px, 4.5vw, 64px)`, line-height 1.02
- **h3**: `clamp(22px, 2.2vw, 32px)`, line-height 1.15
- **Eyebrow**: mono 11px, letter-spacing 0.18em, uppercase, color `--fg-mute`
- **Kicker**: mono 11-12px, letter-spacing 0.14-0.18em, uppercase

## Estructura de archivos

```
src/
  main.tsx              # Entry point, monta <App /> en StrictMode
  App.tsx               # Shell: routing (PageId), tema (light/dark), localStorage
  styles/
    global.css          # Todo el CSS del proyecto (un solo archivo)
  lib/
    types.ts            # PageId, Page[], PAGES constant
    hooks.ts            # useReveal() — IntersectionObserver, useScrollY() — rAF scroll
    icons.tsx           # Icon.* (SVG components) + OliveMark
  components/
    Nav.tsx             # Navbar flotante glassmorphic + mobile sheet
    Footer.tsx          # Footer institucional 4 columnas
    ImageSlot.tsx       # Placeholder de imagen con stripes diagonales
  pages/
    Home.tsx            # Hero + Quote + Misión + Sticky Story + Poética + Simbología + CTA
    ONGs.tsx            # Tabs: Logística / Aliadas / Campo
    History.tsx         # Timeline horizontal + Mapa + Glosario + Nota
    Archive.tsx         # Proyectos filtrados + Bibliografía + Modal
```

## Patrones de diseño a mantener

### 1. Navegación por estado (no URL)
La página activa se guarda en `App.tsx` como `useState<PageId>` y se persiste en `localStorage('cdr-page')`. Al agregar una nueva página:
1. Agregar el id a `PageId` en `types.ts`
2. Agregar la entrada a `PAGES[]` en `types.ts`
3. Agregar el caso al objeto de render en `App.tsx`
4. Agregar al array `valid` en el inicializador de `useState`

### 2. Tema light/dark
El tema se controla con `data-theme` en `<html>`. Todas las variables dark van en `html[data-theme="dark"]` en `global.css`. Nunca usar media query `prefers-color-scheme` — el toggle es manual.

### 3. Animaciones de entrada (reveal)
Cada elemento que debe animar al entrar en viewport lleva class `reveal`. Opcionalmente `delay-1` a `delay-4` para escalonar. El hook `useReveal()` se llama una vez por página.
- `.reveal` -> `.is-pre` (fuera de viewport) -> `.is-in` (animado)
- No agregar animaciones JS ni librerías. Mantener este sistema CSS.

### 4. Estructura de página
Toda página sigue este patrón:
```tsx
export function MiPagina() {
  useReveal();
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <div className="row">
            <div>
              <div className="eyebrow reveal">...</div>
              <h1 className="reveal delay-1">...</h1>
            </div>
            <div className="reveal delay-2">
              <p className="lede">...</p>
            </div>
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

### 5. Layout containers
- `.wrap` — max-width 1280px, padding horizontal responsivo
- `.section` — padding vertical `clamp(80px, 12vh, 140px)`
- `.grid-2` — 2 columnas con gap 48px (colapsa a 1 col en mobile)
- `.grid-3` — 3 columnas con gap 32px

### 6. Componentes de UI recurrentes

| Componente CSS | Uso |
|---|---|
| `.eyebrow` | Label mono uppercase encima de títulos |
| `.kicker` | Similar a eyebrow, para subtítulos de sección |
| `.btn` | Botón base (borde, bg transparente) |
| `.btn.terra` | Botón terracotta (primario/CTA) |
| `.chip` / `.chips` | Filtros tipo tag, `.is-on` para activo |
| `.subtab` / `.subtabs` | Tabs de sub-navegación, `.is-active` |
| `.hr-rule` | Línea horizontal con texto centrado |
| `.card` / `.cards` | Tarjetas en grid 12 columnas |

### 7. Iconos SVG
Todos los iconos están en `src/lib/icons.tsx` como componentes funcionales dentro del objeto `Icon`. Al agregar un icono nuevo, agregarlo ahí como `Icon.NuevoNombre`. Usar `viewBox="0 0 24 24"`, `stroke="currentColor"`, `fill="none"`.

### 8. Imágenes placeholder
Mientras no haya assets reales, usar `<ImageSlot>` con `label` descriptivo y `variant` (olive/terra/carbon). Al reemplazar con imágenes reales, sustituir `<ImageSlot>` por `<img>` manteniendo el border-radius de 14px.

## Convenciones de código

- Componentes: PascalCase, exportados como named exports (`export function`)
- Archivos de página: `src/pages/NombrePagina.tsx`
- Componentes compartidos: `src/components/NombreComponente.tsx`
- Los datos estáticos (timeline, bibliografía, ONGs) van como constantes `const ALL_CAPS` en el mismo archivo de la página que los consume
- Props interfaces se definen inline en el archivo del componente
- No usar `default export`. Siempre named exports.
- CSS: un solo archivo `global.css`. Las clases siguen BEM simplificado: `.componente`, `.componente-parte`, `.is-estado`
- No crear archivos CSS por componente. No CSS modules.

## Responsive

- Breakpoint principal: `880px` (mobile). Se define en media queries dentro de `global.css`.
- Mobile: navbar colapsa a burger + mobile-sheet, grids pasan a 1 columna.
- Los tamaños tipográficos usan `clamp()` — no necesitan media queries adicionales.

## Qué NO hacer

- No instalar librerías de UI, animación o state management
- No crear archivos CSS adicionales — todo va en `global.css`
- No usar `default export`
- No usar React Router ni routing por URL
- No agregar CSS media queries `@media (prefers-color-scheme: dark)` — el tema lo controla el atributo `data-theme` en JS, no CSS. Sí es correcto usar `window.matchMedia('(prefers-color-scheme: dark)')` en JS para detección inicial del tema
- No crear archivos de documentación (README, CHANGELOG) sin que se pida
- No modificar la paleta sin mantener el contraste olive/terracotta como ejes visuales
- No eliminar el grain overlay (`body.grain::before`)
- No usar px fijos para tipografía de títulos — siempre `clamp()`

## Idioma

Todo el contenido visible es en **español**. El código (variables, funciones, componentes) es en **inglés**. Los comentarios de código son innecesarios salvo para marcar secciones visuales (`{/* ============ NOMBRE ============ */}`).
