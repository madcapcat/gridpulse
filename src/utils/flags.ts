// Emojis de banderas por nacionalidad — basado en nombres usados por Jolpica API

const NATIONALITY_FLAGS: Record<string, string> = {
  Dutch: '🇳🇱',
  British: '🇬🇧',
  Monégasque: '🇲🇨',
  Australian: '🇦🇺',
  Spanish: '🇪🇸',
  Mexican: '🇲🇽',
  Canadian: '🇨🇦',
  Finnish: '🇫🇮',
  French: '🇫🇷',
  German: '🇩🇪',
  Japanese: '🇯🇵',
  Chinese: '🇨🇳',
  American: '🇺🇸',
  Thai: '🇹🇭',
  Danish: '🇩🇰',
  Italian: '🇮🇹',
  Brazilian: '🇧🇷',
  Argentine: '🇦🇷',
  Belgian: '🇧🇪',
  Austrian: '🇦🇹',
  Swiss: '🇨🇭',
  Russian: '🇷🇺',
  New Zealander: '🇳🇿',
  Colombian: '🇨🇴',
  Venezuelan: '🇻🇪',
  Indonesian: '🇮🇩',
  Polish: '🇵🇱',
}

export function getNationalityFlag(nationality: string): string {
  return NATIONALITY_FLAGS[nationality] ?? '🏁'
}

// Codigo de pais ISO a emoji de bandera (para OpenF1 que usa codigos ISO)
export function getCountryFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🏁'
  // Convierte codigo ISO a emoji usando unicode regional indicator symbols
  return countryCode
    .toUpperCase()
    .split('')
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join('')
}
