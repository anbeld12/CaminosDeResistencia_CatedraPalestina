---
name: audit-responsive
description: Ejecuta auditoría de responsividad y genera reporte de problemas de layout en móvil/tablet
---

# /audit-responsive

**Uso:** `/audit-responsive`

Ejecuta el agente `@audit-responsive` para escanear todo el proyecto en busca de problemas de responsividad.

## Qué hace

1. Escanea archivos:
   - `src/pages/*.tsx`
   - `src/components/*.tsx`
   - `src/styles/global.css`
   - `tailwind.config.js`

2. Detecta patrones problemáticos:
   - `overflow-x: auto` sin `-webkit-overflow-scrolling: touch`
   - `white-space: nowrap` sin manejo de desbordamiento
   - Grids con `span-*` sin breakpoint intermedio (640–980px)
   - `font-size` < 12px en mobile
   - `scrollBy`/`scrollLeft` sin desactivar en pantallas pequeñas

3. Genera `responsiveness-report.md` en la raíz con:
   - Lista de problemas por categoría
   - Archivo y línea de cada problema
   - Sugerencia de corrección

## Cuándo usar

- Antes de un deploy a producción
- Cuando se reporten bugs visuales en móvil
- Al añadir nuevos componentes con layouts complejos
- En revisiones de código trimestrales

## Flags

No requiere flags. El agente solo lee archivos y genera reporte, no modifica código.

## Ejemplo

```
/audit-responsive
```

El agente escaneará el proyecto y generará `responsiveness-report.md`. Revisa el archivo para ver los problemas encontrados y las correcciones sugeridas.
