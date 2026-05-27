---
name: fix-colors
description: Analiza literales de color y sugiere reemplazos por variables CSS (usa --apply para aplicar cambios)
---

# /fix-colors

**Uso:** `/fix-colors` o `/fix-colors --apply`

Ejecuta el agente `@fix-colors` para analizar todos los archivos en busca de literales de color (#hex, rgb, hsl) y sugerir reemplazos por variables CSS del proyecto.

## Qué hace

1. Escanea archivos:
   - `src/**/*.tsx`
   - `src/styles/global.css`
   - `tailwind.config.js`
   - `src/**/*.ts` (si contienen colores)

2. Para cada literal detectado:
   - Ignora colores en comentarios
   - Busca variable CSS equivalente existente
   - Si no existe y aparece >2 veces, sugiere nueva variable
   - Verifica contraste WCAG 2.1 AA (≥4.5:1 para texto normal)

3. Genera `color-tokens-report.md` con:
   - Mapeo literal → variable
   - Nuevas variables sugeridas
   - Problemas de contraste detectados
   - Bloque CSS para agregar al proyecto

## Cuándo usar

- Al iniciar refactorización de sistema de diseño
- Cuando se detecten colores inconsistentes en la UI
- Antes de implementar dark mode en nuevos componentes
- En auditorías de accesibilidad

## Flags

| Flag | Comportamiento |
|------|----------------|
| (ninguno) | Solo genera reporte, no modifica archivos |
| `--apply` | Aplica reemplazos automáticamente tras mostrar diff de cada cambio |

## Ejemplos

### Solo reporte
```
/fix-colors
```

Genera `color-tokens-report.md` para revisión manual.

### Aplicar cambios
```
/fix-colors --apply
```

1. Muestra diff de cada reemplazo propuesto
2. Espera confirmación del usuario
3. Aplica cambios confirmados
4. Crea backups `.original` solo si hay más de 10 cambios en un archivo

## Variables existentes

El agente mapea a estas variables de `src/styles/global.css`:

- `--olive`, `--olive-deep`, `--olive-soft`
- `--terracotta`, `--terracotta-soft`
- `--carbon`, `--smoke`, `--paper`
- `--ink`, `--ink-mute`
- `--line`, `--line-soft`
- `--bg`, `--bg-warm`, `--fg`, `--fg-mute`
