# GridPulse — Stack Técnico

## Stack Principal

| Tecnología | Versión | Rol |
|------------|---------|-----|
| React | 18.x | UI library principal |
| TypeScript | 5.x | Tipado estático |
| Vite | 5.x | Build tool y dev server |
| Tailwind CSS | 3.x | Estilos utility-first |
| TanStack Query | 5.x | Data fetching, caching, polling |
| React Router | 6.x | Navegación SPA |
| Recharts | 2.x | Gráficas de clasificaciones y stats |
| pnpm | 9.x | Package manager |

## Herramientas de Calidad

| Herramienta | Uso |
|-------------|-----|
| ESLint | Linting — reglas estrictas TypeScript |
| Prettier | Formateo automático de código |
| Vitest | Testing unitario |
| TypeScript strict | Type checking sin compromisos |

## Por qué este stack y no otro

**React sobre Next.js:**
GridPulse es una SPA (Single Page App) orientada a datos en tiempo real.
Next.js agrega SSR/SSG que no necesitamos para este caso de uso.
Menos complejidad = menos superficie de error para un proyecto exploratorio.

**Vite sobre Create React App:**
CRA está en desuso. Vite es el estándar actual: 10-100x más rápido en dev,
bundle más pequeño en producción.

**Tailwind sobre CSS Modules o styled-components:**
El usuario no tiene experiencia en CSS. Tailwind permite estilizar directamente
en JSX con clases predefinidas, sin saltar entre archivos. Curva de aprendizaje
menor para revisar y entender el código.

**TanStack Query sobre fetch manual o Redux:**
Las APIs de F1 requieren polling (refetch cada N segundos para datos en vivo),
cache inteligente para no saturar endpoints gratuitos, y manejo de estados
loading/error/success. TanStack Query resuelve todo esto out-of-the-box.

**pnpm sobre npm/yarn:**
3x más rápido, usa menos espacio en disco, lockfile más confiable.
Estándar en proyectos modernos.

## Estructura de Carpetas del Proyecto

```
gridpulse/
├── public/                    # Assets estáticos (favicon, og-image)
├── src/
│   ├── components/
│   │   ├── ui/                # Componentes base reutilizables (Button, Card, Badge)
│   │   ├── layout/            # Header, Sidebar, Footer, PageLayout
│   │   └── features/          # Componentes por feature
│   │       ├── live-timing/   # Timing en vivo durante carrera
│   │       ├── standings/     # Clasificaciones pilotos y constructores
│   │       ├── calendar/      # Calendario de carreras
│   │       ├── results/       # Resultados de carreras
│   │       ├── news/          # Noticias de F1
│   │       └── history/       # Datos históricos
│   ├── pages/                 # Páginas de la app (una por ruta)
│   │   ├── HomePage.tsx
│   │   ├── LivePage.tsx
│   │   ├── StandingsPage.tsx
│   │   ├── CalendarPage.tsx
│   │   ├── NewsPage.tsx
│   │   └── HistoryPage.tsx
│   ├── hooks/                 # Custom hooks de data fetching
│   │   ├── useDriverStandings.ts
│   │   ├── useConstructorStandings.ts
│   │   ├── useLiveTiming.ts
│   │   ├── useRaceResults.ts
│   │   └── useNews.ts
│   ├── services/              # Clientes de API (una función por endpoint)
│   │   ├── jolpica.ts
│   │   ├── openf1.ts
│   │   └── news.ts
│   ├── types/                 # Interfaces y types de TypeScript
│   │   ├── f1.types.ts        # Driver, Constructor, Race, Lap, etc.
│   │   ├── openf1.types.ts    # Tipos específicos de OpenF1
│   │   └── news.types.ts      # Article, Feed, etc.
│   ├── utils/                 # Funciones helper puras
│   │   ├── date.ts            # Formateo de fechas y zonas horarias
│   │   ├── format.ts          # Formateo de tiempos de vuelta, posiciones
│   │   └── flags.ts           # Emojis de banderas por nacionalidad
│   ├── constants/             # Valores constantes del dominio F1
│   │   ├── teams.ts           # Colores oficiales de equipos 2025
│   │   └── circuits.ts        # Info de circuitos
│   ├── App.tsx                # Root component con Router
│   ├── main.tsx               # Entry point
│   └── index.css              # Tailwind directives
├── .env.example               # Variables de entorno de ejemplo (sin valores reales)
├── .env.local                 # Variables reales (gitignored)
├── CLAUDE.md
├── AGENTS.md
├── agent_docs/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── eslint.config.js
```
