# Prompt de Integración — Cátedra Caminos de Resistencia 2025-I

Este documento contiene toda la información necesaria para que un asistente de IA (o desarrollador) integre los 27 proyectos estudiantiles del semestre 2025-I en las páginas de la plataforma.

---

## 1. Stack y convenciones del proyecto

- **Vite + React 18** — componentes funcionales, hooks, named exports. Sin default export.
- **TypeScript estricto** — `"jsx": "react-jsx"` en tsconfig.
- **Tailwind CSS** — sistema de estilos único. El único CSS vanilla está en `src/styles/global.css` (directivas `@tailwind`, `@layer components/utilities`, `@font-face`, reglas globales mínimas).
- **Framer Motion** — animaciones con `<Reveal>`, `<motion.*>`, `AnimatePresence`. Sin IntersectionObserver manual.
- **lucide-react** — iconos genéricos. SVG propios en `src/lib/icons.tsx`.
- **Sin router externo** — navegación por estado en `App.tsx` con `PageId`.
- **Sin state management externo** — useState + localStorage.
- **Datos estáticos** en `src/data/*.ts`, nunca inline en componentes.
- **Contenido visible en español**, código en inglés.
- **Playfair Display** (`font-serif`) para títulos, **Inter** (`font-sans`) para cuerpo, **JetBrains Mono** (`font-mono`) para metadata.

---

## 2. Estructura de archivos relevante

```
/
├── src/
│   ├── App.tsx                    # Routing por estado (PageId)
│   ├── lib/
│   │   ├── types.ts               # Interfaces: Project, PodcastSeries, etc.
│   │   └── icons.tsx              # Iconos SVG propios
│   ├── data/
│   │   ├── archive.ts             # PROJECTS (36 total = 9 previos + 27 de 2025-1)
│   │   ├── projects-2025-1.ts     # 27 proyectos de 2025-I + PODCAST_SERIES
│   │   ├── history.ts             # TIMELINE, GLOSSARY
│   │   └── ongs.ts, myths.ts      # Otras fuentes de datos
│   ├── components/
│   │   ├── Nav.tsx, Footer.tsx
│   │   ├── ImageSlot.tsx          # Imágenes placeholder
│   │   └── Reveal.tsx             # Wrapper Framer Motion (entrada en viewport)
│   └── pages/
│       ├── Home.tsx               # Landing page
│       ├── History.tsx            # Línea de tiempo histórica
│       ├── ONGs.tsx               # Organizaciones aliadas
│       ├── Genero.tsx             # Mujer palestina y género
│       ├── Voces.tsx              # Cultura, periodismo, solidaridad, podcast
│       └── Archive.tsx            # Archivo de proyectos (filtros, modal)
├── public/
│   └── images/
│       └── archive/               # Thumbnails locales (ej: 35_Collage_Grupo09_Maqueta_Foto.jpeg)
├── 2025-1/                        # Archivos fuente sin referencia en el build
└── INTEGRATION_PROMPT.md          # Este archivo
```

---

## 3. Datos clave: los 27 proyectos de 2025-I

Todos están en `src/data/projects-2025-1.ts`. Cada proyecto sigue la interfaz:

```typescript
interface Project {
  id: number;
  kind: ProjectKind;        // 'mural' | 'collage' | 'video' | 'podcast' | 'fanzine' | 'ensayo' | 'grabado' | 'cartografia'
  title: string;
  author: string;
  year: string;
  n: string;
  tags: string[];
  description?: string;
  url?: string;              // Link a YouTube, Google Drive o Spotify
  urlAlt?: string;           // Transcripción / material complementario
  thumbnail?: string;        // Ruta local de imagen (ej: /images/archive/...)
  members?: string[];
  group?: string;
}
```

### Tabla resumen (ordenados por ID)

| ID | kind | Grupo | Título resumido | URL |
|---|---|---|---|---|
| 10 | mural | 5 | Caminos de Resistencia: Intervención en tela | Drive |
| 11 | collage | 10 | Mujer Palestina: Resistencia entre el Conflicto y Esperanza | Drive |
| 12 | fanzine | 12 | Fanzine Mujeres Palestinas | Drive |
| 13 | ensayo | 16 | Activismo Internacional y cubrimiento mediático | Drive |
| 14 | mural | 20 | Mural del Cuidado en contextos de guerra | Drive |
| 15 | mural | 4 | Mural de salud "Invisibilizados en Palestina" | Drive |
| 16 | grabado | 15 | Impresión en Linóleo | Drive |
| 18 | collage | 6 | Collage: memoria visual de Palestina | Drive |
| 19 | mural | 24 | Palestina: Bajo Fuego Sanamos | Drive |
| 20 | collage | 22 | Transformaciones: memoria desde el collage | Drive |
| 24 | video | 17 | Cap. 1: Grito de Libertad (videoclip musical) | YouTube |
| 25 | video | 1 | Cap. 2: Intifada (minidocumental stencil) | YouTube |
| 26 | video | 21 | Cap. 3: Memoria en Movimiento (video + podcast Educando Bajo Escombros) | YouTube |
| 27 | video | 23 | Cap. 4: Oh Rascal Children of Gaza (animación poema) | YouTube |
| 28 | cartografia | 3 | Línea de Tiempo: Territorio Palestino (3 pliegos + QR) | Drive |
| 29 | podcast | 13 | Voces Palestina — Ep. 1: Introducción histórica | YouTube |
| 30 | podcast | 13 | Voces Palestina — Ep. 2: Vida bajo ocupación | YouTube |
| 31 | podcast | 13 | Voces Palestina — Ep. 3: Resistencias culturales | YouTube |
| 32 | podcast | 13 | Voces Palestina — Ep. 4: Voces desde AL | YouTube |
| 33 | podcast | 18 | Voces de Palestina: La historia que Resiste | Spotify |
| 34 | video | 2 | Identidad Palestina: serie de videos cortos | Drive |
| 35 | collage | 9 | Fragmentos de un Territorio: maqueta en relieve | Drive |
| 36 | podcast | 7 | Palestina: La belleza entre el horror, la muerte y el genocidio | Spotify |
| 37 | collage | 11 | Collage: memoria del territorio | Drive |
| 38 | cartografia | 14 | Galería multimedia en tres formatos | Drive |
| 39 | mural | 19 | Pintando la verdad: el silencio es complicidad | Drive |
| 40 | podcast | 25 | Voces que resisten: entrevista sobre DDHH | Drive |

### Exportaciones adicionales en el mismo archivo

```typescript
export const PODCAST_SERIES: PodcastSeries  // Serie de 4 episodios del Grupo 13
```

`PODCAST_SERIES` ya se importa y usa en `Voces.tsx` en el `PodcastTab`. No modificar esa estructura.

### KIND_GLYPH

El objeto `KIND_GLYPH_2025_1` se mergea con `KIND_GLYPH` en `archive.ts`:

```typescript
mural: 'Mural · acrílico sobre lienzo',
fanzine: 'Fanzine · fotografía y datos',
grabado: 'Grabado · linóleo',
collage: 'Collage · composición visual',
```

No hay glyphs para video/podcast/ensayo/cartografia porque esos ya están definidos en `archive.ts`.

---

## 4. Páginas a modificar

---

### 4.1 Voces.tsx — Agregar tab "Videos" + enriquecer tab "Podcast"

#### 4.1.1 Agregar tab de Videos

Modificar el estado y array de tabs:

```typescript
const [tab, setTab] = useState<'arte' | 'periodismo' | 'solidaridad' | 'podcast' | 'videos'>('arte');

const tabs = [
  { id: 'arte',        label: 'Arte y Cultura' },
  { id: 'periodismo',  label: 'Periodismo y Narrativas' },
  { id: 'solidaridad', label: 'Solidaridad y Sur Global' },
  { id: 'podcast',     label: 'Podcast · Voces Palestina' },
  { id: 'videos',     label: 'Video · Serie documental' },
];
```

Actualizar el lede:

```tsx
<p className="lede">
  <strong>Arte, periodismo, solidaridad, podcast y video</strong> como formas de
  resistencia al borramiento. Cinco miradas que sostienen la memoria
  viva cuando los archivos callan.
</p>
```

Agregar render condicional:

```tsx
{tab === 'videos' && <VideoTab />}
```

#### 4.1.2 Crear componente VideoTab

Cread al final del archivo, antes del export de `Voces`. Usar los datos de `PROJECTS_2025_1` filtrando por `kind === 'video'` e IDs 24, 25, 26, 27.

**Diseño del componente:**

```tsx
import { PROJECTS_2025_1 } from '../data/projects-2025-1';
```

```tsx
function VideoTab() {
  const [active, setActive] = useState(0);
  const videos = PROJECTS_2025_1.filter(p => p.id >= 24 && p.id <= 27).sort((a, b) => a.id - b.id);
  const v = videos[active];
  // ... render
}
```

Estructura visual:
- Encabezado con cita o introducción (similar a `voces-open-quote`)
- Chips para cambiar de capítulo (similar a los episodios del podcast)
- Tarjeta con: título, descripción, nombre del grupo, lista de integrantes, botón "Ver video" que enlace a `v.url`

**IMPORTANTE**: No hay `members` en los datos de proyectos 30, 31, 32 (comparten miembros del 29). Para los videos, cada uno (24-27) sí tiene sus propios `members` — mostrarlos como `<details>` colapsable o inline.

#### 4.1.3 Enriquecer PodcastTab con podcasts adicionales

Debajo del reproductor de episodios de `PODCAST_SERIES`, agregar una sección:

```
─── · ───
Otros podcasts del semestre
```

Mostrar tarjetas compactas para los proyectos **33, 36, 40** (que son `kind: 'podcast'` pero no pertenecen a `PODCAST_SERIES`).

```tsx
const otrosPodcasts = PROJECTS_2025_1.filter(p => p.kind === 'podcast' && p.id >= 33);
```

Cada tarjeta: título, descripción corta, grupo, botón "Escuchar" con `url`.

---

### 4.2 Genero.tsx — Sección de producción estudiantil

Esta página habla del rol de la mujer palestina. Al final del contenido (antes del footer del page), agregar una sección "Producción estudiantil 2025-I".

Proyectos a incluir:

```typescript
const proyectosGenero = PROJECTS_2025_1.filter(p => [10, 11, 12].includes(p.id));
```

**Diseño:**

- Encabezado: `"Voces desde el aula · proyectos 2025-I"`
- Grid de 3 tarjetas (una por proyecto) usando el estilo existente de la página (`card`)
- Cada tarjeta: título, descripción, grupo con link al grupo, enlace al documento
- Usar `<Reveal>` con delays escalonados (0, 0.08, 0.16)

**Dónde insertar**: revisar la página primero para identificar la mejor posición — idealmente como una sección antes de la sección final o después del contenido principal. Si la página tiene tabs, crear un tab o agregarlo donde tenga más contexto.

---

### 4.3 History.tsx — Sección de recursos estudiantiles

La página de Historia tiene una línea de tiempo (`TIMELINE`) y un glosario (`GLOSSARY`). Al final, agregar:

```
─── · ───
Recursos elaborados por estudiantes 2025-I
```

Tres tarjetas horizontales con:

| Proyecto | Por qué |
|---|---|
| **ID 28** — Línea de Tiempo (Grupo 3) | Línea de tiempo física de 3 pliegos, desde 3500 a.C. Incluye QR a versión interactiva |
| **ID 38** — Galería multimedia (Grupo 14) | 3 estaciones: Gaza, Jerusalén Este, Cisjordania — fotos, narrativas, poemas |
| **IDs 29-32** — Podcast Voces Palestina (Grupo 13) | Ep.1: intro histórica, Ep.2: vida bajo ocupación |

Cada tarjeta: ícono + título + descripción + `url` + grupo.

---

### 4.4 Home.tsx — Sección "Cosecha 2025-I"

Como última sección antes del footer:

```
─── · ───
Cosecha 2025-I · proyectos destacados
```

Seleccionar 4-6 proyectos representativos de distintos tipos:

| ID | Título | Tipo |
|---|---|---|
| 28 | Línea de Tiempo: Territorio Palestino | cartografia |
| 14 | Mural del Cuidado en guerra | mural |
| 25 | Intifada / Cementerio de Memorias | video |
| 27 | Oh Rascal Children of Gaza | video (animación) |
| 39 | Pintando la verdad: el silencio es complicidad | mural |
| 12 | Fanzine Mujeres Palestinas | fanzine |

Mostrar como grid de tarjetas pequeñas. Cada una: título, grupo, kind (como badge), y un botón "Ver en Archivo" que llame a `setPage('archive')` (recibido como prop desde App.tsx — Home ya recibe `setPage`).

```tsx
// Home.tsx recibe setPage como prop
<button onClick={() => setPage('archive')} className="btn">Ver en Archivo →</button>
```

---

### 4.5 Archive.tsx — Thumbnail en modal (opcional, mejora)

Si el proyecto tiene campo `thumbnail` (actualmente solo ID 35), mostrar la imagen real en el modal en lugar del fondo de color genérico. Ya está implementado. Verificar que funcione correctamente con la imagen en `public/images/archive/35_Collage_Grupo09_Maqueta_Foto.jpeg`.

---

## 5. Cómo verificar la implementación

### Compilación

```bash
npx tsc --noEmit     # Sin errores de TypeScript
npx vite build       # Build exitoso
```

### Qué NO debe romperse

- [ ] La navegación por tabs en Voces debe seguir funcionando (arte, periodismo, solidaridad, podcast)
- [ ] `PODCAST_SERIES` y su tab no deben perder los 4 episodios con fuentes
- [ ] El Archivo debe seguir mostrando los 36 proyectos (9 previos + 27 de 2025-I)
- [ ] Los filtros por semestre y tipo deben seguir funcionando
- [ ] El modal del Archivo debe seguir mostrando descripción, miembros, grupo, url, urlAlt
- [ ] El dark mode no debe romperse
- [ ] La página de Inicio, Historia y Género deben renderizar sin errores incluso si el usuario no interactúa con las nuevas secciones (render condicional)

### Datos críticos que NO deben modificarse

- **No eliminar ni modificar** `src/data/archive.ts` — solo si es para agregar, no quitar
- **No modificar** los datos de `PODCAST_SERIES` en `projects-2025-1.ts` (ya está verificado)
- **No eliminar** proyectos existentes del array `PROJECTS_2025_1`
- **No cambiar** las interfaces en `types.ts` (solo agregar campos opcionales nuevos si hace falta)

### Qué archivos tocar

| Archivo | Tipo de cambio |
|---|---|
| `src/pages/Voces.tsx` | Agregar VideoTab, enriquecer PodcastTab, extender tipos de tab |
| `src/pages/Genero.tsx` | Nueva sección al final |
| `src/pages/History.tsx` | Nueva sección al final |
| `src/pages/Home.tsx` | Nueva sección al final (usar `setPage` prop ya existente) |
| `src/data/projects-2025-1.ts` | Solo lectura (los datos ya están completos) |
| `src/data/archive.ts` | Solo lectura |
| `src/lib/types.ts` | Solo lectura (ya tiene todo lo necesario) |

---

## 6. Notas técnicas importantes

1. **`KIND_GLYPH` no está definido para todos los nuevos kinds en projects-2025-1.ts** — si al renderizar el kind de un proyecto en Voces/Home/Historia/Género necesitas un label amigable, usa el objeto `KIND_GLYPH` que está en `archive.ts` (ya incluye `mural`, `fanzine`, `grabado`, `collage`). Para kinds sin glyph (ej: `cartografia`, `video`, `podcast`), usa el kind directamente capitalizado o define el label inline.

2. **Las animaciones** deben usar `<Reveal>` (wrapper estándar con `delay` incremental: 0, 0.08, 0.16, 0.24). No crear nuevos `motion.*` directos a menos que sea para `AnimatePresence` en secciones que aparecen/desaparecen.

3. **Los estilos** existentes de cada página están en `global.css` como componentes `@layer`. Para las nuevas secciones, usa combinaciones existentes como `section`, `wrap`, `card`, `grid-2`, `kicker`, `eyebrow`, `chip`, `btn`. Solo si el diseño lo requiere, agrega nuevas clases al `@layer components` en `global.css`.

4. **Importar PROJECTS_2025_1** desde `'../data/projects-2025-1'` no desde `'../data/archive'`. `archive.ts` exporta `PROJECTS` (combinado) y `KIND_FILTERS`, pero para filtrar solo 2025-I usa `PROJECTS_2025_1`.

5. **La carpeta `2025-1/`** en la raíz contiene los archivos fuente originales pero no debe referenciarse desde el código. Todo el contenido se accede vía URLs externas (YouTube, Google Drive, Spotify) o desde `public/images/archive/` para thumbnails locales.

