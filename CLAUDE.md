# GridPulse — CLAUDE.md

## WHAT: Contexto del Proyecto
GridPulse es una app web global para fanáticos de la Fórmula 1.
Muestra resultados en tiempo real, clasificaciones de pilotos y constructores,
calendario de carreras, estadísticas históricas y noticias — sin costo de APIs.

Ver @agent_docs/stack.md para el stack técnico completo.
Ver @agent_docs/architecture.md para decisiones de arquitectura.

## WHY: Propósito
Dar a los fans de F1 en cualquier parte del mundo una experiencia unificada:
datos en vivo durante el fin de semana de carrera, resultados históricos desde
1950 hasta hoy, y noticias actualizadas — todo en un solo lugar.

Proyecto exploratorio, sin fecha de entrega. Priorizamos calidad sobre velocidad.

## HOW: Comandos de Desarrollo
Ver @agent_docs/commands.md para la referencia completa.

```bash
pnpm dev          # servidor de desarrollo
pnpm build        # build de producción
pnpm preview      # previsualizar build
pnpm lint         # ESLint
pnpm type-check   # TypeScript sin emitir
pnpm test         # Vitest
```

## APIs Permitidas
Ver @agent_docs/apis.md para endpoints, límites y ejemplos.

| API         | Uso                              | Auth      |
|-------------|----------------------------------|-----------|
| Jolpica F1  | Clasificaciones, resultados, calendario, histórico | Sin key |
| OpenF1      | Timing en vivo durante carrera   | Sin key   |
| GNews       | Noticias de F1                   | Key gratis |
| RSS feeds   | Noticias complementarias         | Sin key   |

**Regla:** Nunca hardcodear API keys. Siempre usar variables de entorno `.env`.

## Comportamiento (Principios Karpathy)

**1. Pensar antes de codear**
Surfacea supuestos explícitamente. Si hay ambigüedad, presenta opciones y pregunta.
No elijas en silencio. Si existe una solución más simple, di que existe.

**2. Simplicidad primero**
Implementa el mínimo código viable para lo pedido.
Sin features especulativos. Sin abstracciones para uso único.
Sin error handling para escenarios imposibles.
Pregúntate: ¿diría un senior engineer que esto está sobrecomplicado? Si sí, reescribe.

**3. Cambios quirúrgicos**
Toca solo lo necesario para satisfacer el pedido.
No "mejores" código adyacente. No reformatees. No refactorices lo que funciona.
Mantén el estilo existente aunque lo harías diferente.
Cada línea cambiada debe trazarse directamente al pedido del usuario.

**4. Ejecución orientada a metas**
Convierte tareas en criterios verificables antes de implementar.
Ejemplo: "arregla el bug" → "escribe un test que lo reproduzca, luego hazlo pasar".
Para tareas multi-paso, enuncia un plan breve con pasos de verificación.

## Qué NO hacer
- No usar CLAUDE.md como sustituto de linters — ESLint y TypeScript hacen ese trabajo
- No agregar comentarios obvios o redundantes al código
- No crear helpers/utilidades para operaciones de un solo uso
- No diseñar para requerimientos hipotéticos futuros
- No importar librerías nuevas sin antes preguntar si está justificado
- No asumir que el usuario tiene experiencia técnica — explicar decisiones en español claro

## Convenciones
Ver @agent_docs/conventions.md para naming, estructura de carpetas y patrones.

- Comentarios en código: **español**
- Code reviews: **paso a paso**
- Commits: **atómicos por feature**
- Idioma de variables/funciones: **inglés** (estándar de la industria)
