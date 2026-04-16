# GridPulse — AGENTS.md
# Archivo universal: válido para Claude Code, Cursor, Copilot, Windsurf, OpenCode

## Contexto del Proyecto
GridPulse es una app web global para fanáticos de la Fórmula 1.
Stack: React + TypeScript + Vite + Tailwind CSS + TanStack Query.
APIs: Jolpica F1, OpenF1, GNews, RSS feeds (todas gratuitas).
Deploy: Vercel via GitHub.

## Comandos Esenciales
```bash
pnpm dev          # servidor de desarrollo
pnpm build        # build de producción
pnpm preview      # previsualizar build
pnpm lint         # ESLint
pnpm type-check   # TypeScript sin emitir
pnpm test         # Vitest
```

## APIs
- Jolpica F1: https://api.jolpi.ca/ergast/f1/ — datos de temporada, sin key
- OpenF1: https://api.openf1.org/v1/ — timing en vivo, sin key
- GNews: https://gnews.io/api/v4/ — noticias, key en VITE_GNEWS_API_KEY
- Nunca hardcodear keys. Siempre variables de entorno.

## Principios de Comportamiento

1. **Pensar antes de codear** — surfacea supuestos, pregunta ante ambigüedad
2. **Simplicidad primero** — mínimo código viable, sin abstracciones especulativas
3. **Cambios quirúrgicos** — solo lo pedido, no refactorices código que funciona
4. **Orientado a metas** — define criterios verificables antes de implementar

## Convenciones
- Comentarios: español
- Variables/funciones: inglés (estándar industria)
- Componentes: PascalCase
- Archivos: kebab-case
- Commits: atómicos por feature
- No agregar librerías sin justificación explícita

## Qué NO hacer
- No sustituir linters con instrucciones de agente
- No agregar features no pedidos
- No crear abstracciones para uso único
- No hardcodear strings mágicos ni API keys
