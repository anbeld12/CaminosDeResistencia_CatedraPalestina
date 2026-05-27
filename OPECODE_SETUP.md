# OpenCode Setup — Catedra Caminos de Resistencia

Configuracion de OpenCode para el proyecto. Tres agentes especializados disponibles como subagentes y comandos slash.

## Estructura

```
opencode.json              # Config principal: provider, permisos, comandos, agentes
.opencode/
  agents/
    audit-responsive.md    # Prompt completo del agente auditor de responsividad
    fix-colors.md          # Prompt completo del agente de limpieza cromatica
    humanize-text.md       # Prompt completo del agente reescritor de contenido
  skills/
    audit-responsive/
      SKILL.md             # Documentacion del comando /audit-responsive
    fix-colors/
      SKILL.md             # Documentacion del comando /fix-colors
    humanize-text/
      SKILL.md             # Documentacion del comando /humanize-text
```

## Convenciones

- **Agentes** definidos en `.opencode/agents/*.md` con frontmatter YAML (`description`, `mode`, `permission`) + prompt en markdown
- **Metadata de agentes** duplicada en `opencode.json` bajo `"agent"` para control de permisos y visibilidad
- **Comandos slash** en `opencode.json` bajo `"command"` usando `template` + `agent` para delegar al subagente
- **Skills** en `.opencode/skills/<nombre>/SKILL.md` con frontmatter (`name`, `description`) — solo documentacion, no prompts

## Comandos disponibles

| Comando | Agente | Descripcion |
|---------|--------|-------------|
| `/audit-responsive` | `@audit-responsive` | Escanea responsividad, genera `responsiveness-report.md`. Solo lectura. |
| `/fix-colors` | `@fix-colors` | Analiza literales de color, genera `color-tokens-report.md`. Con `--apply` aplica cambios. |
| `/humanize-text` | `@humanize-text` | Reescribe textos IA con tono academico local. Con `--auto` aplica sin confirmacion. |

## Como anadir un nuevo agente

1. Crear `.opencode/agents/nuevo-agente.md` con frontmatter:

```yaml
---
description: Que hace el agente
mode: subagent
permission:
  edit: ask
  bash: ask
---
# Agente ...

Prompt completo aqui...
```

2. Agregar metadata en `opencode.json`:

```jsonc
{
  "agent": {
    "nuevo-agente": {
      "description": "Que hace el agente",
      "mode": "subagent",
      "permission": { "edit": "ask", "bash": "ask" }
    }
  }
}
```

3. (Opcional) Agregar comando slash en `opencode.json`:

```jsonc
{
  "command": {
    "nuevo-agente": {
      "description": "Descripcion corta",
      "template": "Ejecuta el agente @nuevo-agente para...",
      "agent": "nuevo-agente"
    }
  }
}
```

4. (Opcional) Crear skill en `.opencode/skills/nuevo-agente/SKILL.md` para documentacion.

## Proveedores

Configurar con `/connect` en el TUI. El archivo `opencode.json` tiene `"provider": {}` como base. Las credenciales se guardan en `~/.local/share/opencode/auth.json`.

## Permisos globales

```json
{
  "permission": {
    "edit": "ask",
    "bash": "ask"
  }
}
```

Cada agente puede sobrescribir estos permisos en su configuracion individual.
