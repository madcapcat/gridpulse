# GridPulse — Convenciones de Código

## Naming

### Archivos y carpetas
```
kebab-case         → archivos de componentes, hooks, servicios, utils
PascalCase.tsx     → SOLO para el archivo cuando exporta un componente principal

Ejemplos correctos:
  driver-standings.tsx    ← componente
  use-live-timing.ts      ← custom hook
  jolpica.ts              ← servicio de API
  date.ts                 ← utilidad

Ejemplos incorrectos:
  DriverStandings.tsx     ✗ (salvo que sea el componente principal de página)
  useLiveTiming.ts        ✗
  Jolpica.ts              ✗
```

### Componentes React
```typescript
// PascalCase siempre
export function DriverCard() {}
export function LiveTimingTable() {}
export function RaceResultRow() {}
```

### Hooks personalizados
```typescript
// Siempre prefijo "use", camelCase
export function useDriverStandings() {}
export function useLiveTiming() {}
export function useRaceResults(year: number, round: number) {}
```

### Variables y funciones
```typescript
// camelCase, en inglés
const driverStandings = []
const isSessionActive = false
function formatLapTime(ms: number): string {}
function getTeamColor(constructorId: string): string {}
```

### Constantes
```typescript
// SCREAMING_SNAKE_CASE para valores que nunca cambian
const MAX_DRIVERS = 20
const POLLING_INTERVAL_MS = 5000
const JOLPICA_BASE_URL = 'https://api.jolpi.ca/ergast/f1'
```

### TypeScript Types e Interfaces
```typescript
// PascalCase, sin prefijo "I"
type Driver = {}
type RaceResult = {}
interface StandingsEntry {}

// Tipos de props siempre con sufijo "Props"
type DriverCardProps = {}
type LiveTimingTableProps = {}
```

---

## Estructura de Componentes

### Orden interno de un componente
```typescript
// 1. Imports (externos primero, internos después)
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { DriverCard } from '@/components/features/standings'
import { useDriverStandings } from '@/hooks/useDriverStandings'
import type { Driver } from '@/types/f1.types'

// 2. Types/interfaces del archivo
type StandingsPageProps = {}

// 3. Constantes locales del componente
const SECTION_TITLE = 'Clasificación de Pilotos'

// 4. El componente
export function StandingsPage({}: StandingsPageProps) {
  // 4a. Hooks primero (estado, queries, efectos)
  const { data, isLoading, error } = useDriverStandings()

  // 4b. Handlers / funciones derivadas
  function handleRefresh() {}

  // 4c. Render
  return (...)
}
```

### Componentes pequeños vs grandes
```
Si un componente supera ~150 líneas → dividirlo en sub-componentes
Si la lógica de fetching es compleja → moverla a un custom hook
Si hay lógica de transformación de datos → moverla a utils/
```

---

## Patrones de Data Fetching

### Siempre usar custom hooks que encapsulen TanStack Query
```typescript
// hooks/useDriverStandings.ts
export function useDriverStandings(year = 'current') {
  return useQuery({
    queryKey: ['driver-standings', year],
    queryFn: () => fetchDriverStandings(year),
    staleTime: 5 * 60 * 1000,      // 5 minutos — datos de clasificación no cambian tan seguido
    gcTime: 30 * 60 * 1000,         // mantener en cache 30 minutos
  })
}

// hooks/useLiveTiming.ts
export function useLiveTiming() {
  return useQuery({
    queryKey: ['live-timing'],
    queryFn: fetchLiveTiming,
    refetchInterval: 5000,          // polling cada 5s durante carrera
    staleTime: 0,                   // siempre refrescar en vivo
  })
}
```

### Estados de carga y error — siempre manejarlos en la UI
```typescript
// Patrón estándar en cada página/sección con datos
if (isLoading) return <LoadingSpinner />
if (error) return <ErrorMessage message="No se pudieron cargar los datos" />
if (!data) return null
```

---

## Estilos con Tailwind

### Orden de clases (seguir este orden para consistencia)
```
1. Layout:      flex, grid, block, hidden
2. Posición:    relative, absolute, z-10
3. Dimensiones: w-full, h-64, max-w-md
4. Espaciado:   p-4, px-6, m-2, gap-4
5. Tipografía:  text-sm, font-bold, text-white
6. Colores:     bg-gray-900, border-red-500, text-zinc-400
7. Efectos:     rounded-xl, shadow-lg, opacity-80
8. Responsive:  md:flex-row, lg:grid-cols-3
9. States:      hover:bg-red-600, focus:outline-none
10. Transiciones: transition-colors, duration-200
```

### Colores de equipos F1 2025 (definidos en constants/teams.ts)
```
Red Bull Racing    → #3671C6
Ferrari            → #E8002D
Mercedes           → #27F4D2
McLaren            → #FF8000
Aston Martin       → #229971
Alpine             → #FF87BC
Williams           → #64C4FF
Haas               → #B6BABD
Sauber             → #52E252
RB (Racing Bulls)  → #6692FF
```

---

## TypeScript

### Siempre usar strict mode (ya configurado en tsconfig)
```typescript
// Bien — tipos explícitos en funciones públicas
function formatLapTime(milliseconds: number): string {}

// Bien — inferencia donde es obvio
const position = 1  // TypeScript infiere number

// Mal — any está prohibido salvo casos muy excepcionales documentados
const data: any = {}  ✗
```

### Tipos del dominio F1 (definidos en types/f1.types.ts)
Siempre importar desde ahí. Nunca redefinir los mismos tipos en otro archivo.

---

## Comentarios

- Idioma: **español**
- Solo donde la lógica NO es evidente por sí sola
- No comentar lo que el código ya dice

```typescript
// Bien — explica un "por qué" no obvio
// OpenF1 devuelve posición 0 cuando el piloto está en pits, lo normalizamos a null
const position = rawPosition === 0 ? null : rawPosition

// Mal — el código ya lo dice
// Suma uno al índice
const position = index + 1  ✗
```

---

## Imports

### Usar alias de paths (configurado en vite.config.ts y tsconfig.json)
```typescript
// Bien — alias @/
import { DriverCard } from '@/components/features/standings/driver-card'
import { useDriverStandings } from '@/hooks/useDriverStandings'
import type { Driver } from '@/types/f1.types'

// Mal — paths relativos largos
import { DriverCard } from '../../../components/features/standings/driver-card'  ✗
```

### Orden de imports
```
1. React y librerías externas
2. Componentes internos
3. Hooks internos
4. Servicios/utils
5. Types (con "import type")
```
