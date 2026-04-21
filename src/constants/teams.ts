// Logos de equipos — archivos en public/logos/teams/
export const TEAM_LOGOS: Record<string, string> = {
  'red_bull':     '/logos/teams/red-bull.svg',
  'ferrari':      '/logos/teams/ferrari.svg',
  'mercedes':     '/logos/teams/mercedes.svg',
  'mclaren':      '/logos/teams/mclaren.svg',
  'aston_martin': '/logos/teams/aston-martin.png',
  'alpine':       '/logos/teams/alpine.svg',
  'williams':     '/logos/teams/williams.svg',
  'haas':         '/logos/teams/haas.svg',
  'sauber':       '/logos/teams/sauber.svg',
  'rb':           '/logos/teams/rb.svg',
}

export function getTeamLogo(constructorId: string): string | null {
  return TEAM_LOGOS[constructorId.toLowerCase()] ?? null
}

// Colores oficiales de equipos F1 2025
export const TEAM_COLORS: Record<string, string> = {
  'red_bull': '#3671C6',
  'ferrari': '#E8002D',
  'mercedes': '#27F4D2',
  'mclaren': '#FF8000',
  'aston_martin': '#229971',
  'alpine': '#FF87BC',
  'williams': '#64C4FF',
  'haas': '#B6BABD',
  'sauber': '#52E252',
  'rb': '#6692FF',
}

// Nombres de equipos para mostrar en UI
export const TEAM_NAMES: Record<string, string> = {
  'red_bull': 'Red Bull Racing',
  'ferrari': 'Ferrari',
  'mercedes': 'Mercedes',
  'mclaren': 'McLaren',
  'aston_martin': 'Aston Martin',
  'alpine': 'Alpine',
  'williams': 'Williams',
  'haas': 'Haas',
  'sauber': 'Sauber',
  'rb': 'Racing Bulls',
}

export function getTeamColor(constructorId: string): string {
  return TEAM_COLORS[constructorId.toLowerCase()] ?? '#ffffff'
}
