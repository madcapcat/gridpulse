// Utilidades de fechas para el dominio F1

// Formatea fecha de carrera: "2025-05-25" → "May 25, 2025"
export function formatRaceDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

// Formatea fecha corta: "2025-05-25" → "25 May"
export function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

// Devuelve tiempo relativo: "2 hours ago", "in 3 days"
export function formatRelativeTime(dateStr: string): string {
  const diff = new Date(dateStr).getTime() - Date.now()
  const abs = Math.abs(diff)
  const past = diff < 0

  const minutes = Math.floor(abs / 60000)
  const hours = Math.floor(abs / 3600000)
  const days = Math.floor(abs / 86400000)

  let label: string
  if (minutes < 60) label = `${minutes}m`
  else if (hours < 24) label = `${hours}h`
  else label = `${days}d`

  return past ? `${label} ago` : `in ${label}`
}

// Verifica si una carrera ya paso
export function isRacePast(dateStr: string, timeStr?: string): boolean {
  const datetime = timeStr ? new Date(`${dateStr}T${timeStr}`) : new Date(dateStr)
  return datetime < new Date()
}

// Verifica si una carrera es la proxima (la primera que aun no paso)
export function isNextRace(races: { date: string; time?: string }[]): number {
  return races.findIndex((r) => !isRacePast(r.date, r.time))
}

// Convierte fecha ISO a hora local del usuario con timezone
export function toLocalTime(isoString: string, timezone?: string): string {
  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone,
    timeZoneName: 'short',
  })
}
