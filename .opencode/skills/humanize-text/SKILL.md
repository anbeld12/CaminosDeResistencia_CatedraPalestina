---
name: humanize-text
description: Reescribe textos generados por IA con tono académico local (usa --auto para aplicar sin confirmación)
---

# /humanize-text

**Uso:** `/humanize-text` o `/humanize-text --auto`

Ejecuta el agente `@humanize-text` para reescribir contenidos generados por IA en los archivos del proyecto, aplicando reglas de estilo editorial académico local.

## Qué hace

1. Procesa archivos:
   - `src/pages/*.tsx`
   - `src/components/*.tsx`
   - Solo texto visible en: `p`, `h1`–`h6`, `li`, `blockquote`, `.lede`, `.pull-quote`, `.eyebrow`, `.kicker`

2. Aplica transformaciones:
   - **Voz pasiva → activa:** "fue realizado" → "realizamos"
   - **Adverbios -mente → frases directas:** "significativamente" → "de manera notable"
   - **Divide oraciones >25 palabras:** separa en 2–3 oraciones más cortas
   - **Elimina muletillas:** "cabe destacar", "no es metáfora", "sin embargo" (uso excesivo)
   - **Añade referencias locales:** "como trabajamos en la UNAL", "en el contexto colombiano"
   - **Expande contracciones informales:** solo mantiene en citas directas

3. Mantiene intacto:
   - IDs, nombres de variables, imports
   - Lógica de código y comentarios técnicos
   - Estructura de componentes React

## Cuándo usar

- Después de generar contenido con IA
- Antes de publicar contenido en producción
- En revisión editorial de páginas existentes
- Cuando el texto suene "robótico" o impersonal

## Flags

| Flag | Comportamiento |
|------|----------------|
| (ninguno) | Muestra diff interactivo de cada cambio, espera confirmación |
| `--auto` | Aplica todos los cambios directamente, crea backups `.original` |

## Ejemplos

### Modo interactivo
```
/humanize-text
```

Para cada cambio propuesto:
```
## Archivo: src/pages/Home.tsx

### Cambio 1
**Ubicación:** línea 45, dentro de `<p className="lede">`

**Antes:**
> La Cátedra fue establecida en 2023...

**Después:**
> Establecimos la Cátedra en 2023...

[ ] Aprobar cambio
[ ] Rechazar cambio
[ ] Editar manualmente
```

### Modo automático
```
/humanize-text --auto
```

1. Crea backup `archivo.tsx.original` (si hay >5 cambios)
2. Aplica todas las transformaciones
3. Genera resumen final con:
   - Archivos procesados y modificados
   - Total de transformaciones por tipo
   - Backups creados

## Estilo resultante

- **Tono:** académico pero accesible
- **Persona:** primera del plural ("trabajamos", "proponemos")
- **Registro:** formal pero cálido
- **Localidad:** referencias a UNAL, contexto colombiano
- **Longitud:** párrafos de 3–6 oraciones variadas

## Ejemplo de transformación

```
Antes:
"Es importante mencionar que la Cátedra fue concebida como un espacio de diálogo entre la Universidad Nacional de Colombia y la Embajada del Estado de Palestina."

Después:
"Concebimos la Cátedra como un espacio de diálogo entre la Universidad Nacional de Colombia y la Embajada del Estado de Palestina, siguiendo la línea del seminario de Memoria y Territorio de la UNAL."
```
