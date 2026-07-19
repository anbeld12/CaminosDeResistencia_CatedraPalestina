# Fase 4: SEO On-Page

## Objetivo
Optimizar el contenido existente del sitio sin agregar texto nuevo. Corregir jerarquía de encabezados, agregar texto alternativo faltante en imágenes, mejorar el interlinking entre páginas y asegurar que los datos estructurados implícitos estén correctamente marcados.

## Archivos a modificar
- `src/pages/Home.tsx`
- `src/pages/History.tsx`
- `src/pages/ONGs.tsx`
- `src/pages/Genero.tsx`
- `src/pages/Voces.tsx`
- `src/pages/Archive.tsx`
- `src/components/ImageSlot.tsx` (alt text handling)
- `src/components/ImageGallery.tsx` (alt text handling)
- `src/components/MythCards.tsx`
- `src/components/Reveal.tsx`
- `src/data/history.ts` (timeline body text)
- `src/data/ongs.ts` (ONG card descriptions)

## Tareas

### 1. Jerarquía de encabezados (heading hierarchy)

Reglas:
- Exactamente 1 `<h1>` por página
- Los `<h2>` cubren secciones principales
- Los `<h3>` son subsecciones de `<h2>`
- Sin saltos de nivel (no pasar de h1 a h3 sin h2 intermedio)

Verificar por página:

| Página | H1 actual | ¿Correcto? |
|---|---|---|
| Home | "Caminos de Resistencia" (`<motion.h1>`) | Verificar que sea el único h1 |
| History | "Raíces milenarias" | Verificar |
| ONGs | "Savia y Sumud" | Verificar |
| Genero | "Palestina de todas" | Verificar |
| Voces | "Voces de la Resistencia" | Verificar |
| Archive | "Cosecha de saberes" | Verificar |

Cada página tiene subtítulos con `<h2>`, `<h3>`, `<h4>`. Verificar que todos sigan la jerarquía correcta sin depender de clases CSS para el tamaño visual.

**Acción:** Si hay `<h2>` que visualmente parecen h4, o `<h3>` que deberían ser h2, ajustar la etiqueta (no la clase CSS). Si hay un `<h4>` sin h3 padre, ajustar.

### 2. Texto alternativo (`alt`) en imágenes

Buscar todas las imágenes en el sitio:
- `<img>` directos (Nav.tsx: `/navbar-icon.png`)
- `<ImageSlot>` en todas las páginas
- `<ImageGallery>` en Voces.tsx
- SVG decorativos (rama de olivo en Home, iconos en icons.tsx)
- Imágenes de Wikimedia en Voces.tsx

Reglas:
- Imágenes **funcionales** (navbar-icon) → `alt` descriptivo con el destino
- Imágenes **decorativas** (olivo SVG, fondos) → `aria-hidden="true"` (ya debería estar)
- Imágenes **informativas** (fotos, murales) → `alt` que describa el contenido visual
- `<ImageSlot>` → verificar que el prop `alt` se pase correctamente al `<img>` interno
- `<ImageGallery>` → verificar que cada imagen tenga su `alt`

**Casos específicos a revisar:**

| Archivo | Imagen | Alt actual | Acción |
|---|---|---|---|
| Nav.tsx | `/navbar-icon.png` | `alt=""` | Cambiar a `alt="Caminos de Resistencia"` |
| Home.tsx | SVG rama de olivo | `aria-hidden="true"` | Ya correcto (decorativo) |
| Voces.tsx | 3 imágenes Wikimedia | `alt` largo descriptivo | Verificar que describen el contenido visual |
| ONGs.tsx | Imágenes brigada | vía `ImageSlot` | Verificar prop `alt` en los datos |
| Archive.tsx | Thumbnails de proyectos | `style={{ backgroundImage }}` | Son CSS backgrounds, no necesitan alt |

### 3. Interlinking entre páginas

Agregar enlaces contextuales entre páginas donde el contenido se relaciona naturalmente. No modificar la navegación principal (Nav/Footer).

**Enlaces a agregar (usando `<Link to="...">` de react-router-dom):**

| Desde | Hacia | Texto del enlace | Ubicación sugerida |
|---|---|---|---|
| History (timeline) | `/ongs` | "Organizaciones que trabajan en Palestina" | Después del glosario |
| History (myth cards) | `/voces` | "Arte y cultura como resistencia" | Al final de mitos |
| ONGs (tab vida) | `/archivo` | "Proyectos estudiantiles sobre el terreno" | Después de las cards |
| ONGs (tab partners) | `/genero` | "Género y derechos humanos" | Al final de aliadas |
| Genero (salud mental) | `/voces` | "Periodismo y voces desde Gaza" | Después de datos estadísticos |
| Genero (liderazgo) | `/archivo` | "Fanzine G12 completo" | En sección de fanzine |
| Voces (arte) | `/historia` | "Contexto histórico del muro" | En sección de murales |
| Voces (reporte CIJ) | `/historia` | "Línea histórica del conflicto" | Después del bloque CIJ |
| Archive (proyectos) | `/genero` | "Proyectos con enfoque de género" | Filtro sugerido |
| Archive (bibliografía) | `/voces` | "Autores recomendados en cultura y medios" | Después de bibliografía |

**Reglas:**
- Cada enlace debe ser contextual y relevante al párrafo donde se inserta
- Usar `<Link to="...">` (no `<a href>`)
- Los enlaces deben llevar la clase CSS `.btn`, `.btn.terra`, o ser inline dentro del texto
- No duplicar enlaces existentes

### 4. Datos estructurados implícitos (JSON-LD)

El sitio ya tiene datos bien estructurados en el código. Verificar que el JSON-LD inyectado vía Helmet refleje correctamente:

| Tipo de dato | Schema propuesto | Dónde va |
|---|---|---|
| Organización | `Organization` | Home (`<Helmet>`) — nombre, url, logo, sameAs (redes sociales si existen) |
| Página web | `WebSite` | Home — name, url, description, inLanguage |
| Artículo | `Article` | History, Genero, Voces — headline, description, datePublished |
| Colección | `CollectionPage` | Archive — descripción de la colección |
| Eventos | `Event` | History (timeline entries major) — name, startDate, description |
| Libros | `Book` | Archive (bibliografía) — author, name, datePublished |

**Acción:**
- Crear archivo `src/lib/seo-schema.ts` con funciones que generen los JSON-LD objects
- Cada página importa la función correspondiente y la usa en el `<Helmet>`
- No modificar los `<Helmet>` existentes, solo agregar el `<script type="application/ld+json">`

### 5. Validación

- `npm run build` sin errores TypeScript
- `npm run build:seo` prerenderiza 6/6 rutas
- Lighthouse audit:
  - Cada página tiene exactamente 1 h1
  - No hay encabezados con salto de nivel
  - Todas las imágenes funcionales tienen alt text
  - Las imágenes decorativas tienen `aria-hidden="true"`
- Validar con Google Rich Results Test: cada JSON-LD es válido
