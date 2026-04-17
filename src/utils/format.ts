// Utilidades de formateo para datos de F1

// Convierte milisegundos a formato de tiempo de vuelta: 1:23.456
export function formatLapTime(milliseconds: number): string {
  const minutes = Math.floor(milliseconds / 60000)
  const seconds = Math.floor((milliseconds % 60000) / 1000)
  const ms = milliseconds % 1000
  return `${minutes}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(3, '0')}`
}

// Parsea un string de tiempo "1:23.456" a milisegundos
export function parseLapTime(time: string): number {
  const [minPart, rest] = time.split(':')
  const [secPart, msPart] = (rest ?? minPart).split('.')
  const minutes = rest ? parseInt(minPart) : 0
  const seconds = parseInt(secPart)
  const ms = parseInt((msPart ?? '0').padEnd(3, '0'))
  return minutes * 60000 + seconds * 1000 + ms
}

// Formatea puntos de clasificacion: "136" → "136 pts"
export function formatPoints(points: string | number): string {
  return `${points} pts`
}

// Formatea posicion con sufijo ordinal: 1 → "1st", 2 → "2nd", etc.
export function formatPosition(position: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const mod100 = position % 100
  const suffix = mod100 >= 11 && mod100 <= 13 ? 'th' : (suffixes[position % 10] ?? 'th')
  return `${position}${suffix}`
}

// Formatea la diferencia de tiempo: "+1.234" o "1 lap"
export function formatGap(gap: string | null | undefined): string {
  if (!gap) return '—'
  if (gap.includes('Lap')) return gap
  return gap.startsWith('+') ? gap : `+${gap}`
}

// Formatea velocidad en km/h
export function formatSpeed(speed: number): string {
  return `${Math.round(speed)} km/h`
}

// Trunca texto largo con ellipsis
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}…`
}
