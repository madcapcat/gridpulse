// Info de circuitos del calendario F1 2025
export interface CircuitInfo {
  name: string
  country: string
  city: string
  laps: number
  lapDistance: number // km
  timezone: string
}

export const CIRCUITS: Record<string, CircuitInfo> = {
  albert_park: { name: 'Albert Park', country: 'Australia', city: 'Melbourne', laps: 58, lapDistance: 5.278, timezone: 'Australia/Melbourne' },
  bahrain: { name: 'Bahrain International Circuit', country: 'Bahrain', city: 'Sakhir', laps: 57, lapDistance: 5.412, timezone: 'Asia/Bahrain' },
  jeddah: { name: 'Jeddah Corniche Circuit', country: 'Saudi Arabia', city: 'Jeddah', laps: 50, lapDistance: 6.174, timezone: 'Asia/Riyadh' },
  suzuka: { name: 'Suzuka International Racing Course', country: 'Japan', city: 'Suzuka', laps: 53, lapDistance: 5.807, timezone: 'Asia/Tokyo' },
  shanghai: { name: 'Shanghai International Circuit', country: 'China', city: 'Shanghai', laps: 56, lapDistance: 5.451, timezone: 'Asia/Shanghai' },
  miami: { name: 'Miami International Autodrome', country: 'USA', city: 'Miami', laps: 57, lapDistance: 5.412, timezone: 'America/New_York' },
  imola: { name: 'Autodromo Enzo e Dino Ferrari', country: 'Italy', city: 'Imola', laps: 63, lapDistance: 4.909, timezone: 'Europe/Rome' },
  monaco: { name: 'Circuit de Monaco', country: 'Monaco', city: 'Monte Carlo', laps: 78, lapDistance: 3.337, timezone: 'Europe/Monaco' },
  catalunya: { name: 'Circuit de Barcelona-Catalunya', country: 'Spain', city: 'Barcelona', laps: 66, lapDistance: 4.657, timezone: 'Europe/Madrid' },
  villeneuve: { name: 'Circuit Gilles Villeneuve', country: 'Canada', city: 'Montreal', laps: 70, lapDistance: 4.361, timezone: 'America/Toronto' },
  red_bull_ring: { name: 'Red Bull Ring', country: 'Austria', city: 'Spielberg', laps: 71, lapDistance: 4.318, timezone: 'Europe/Vienna' },
  silverstone: { name: 'Silverstone Circuit', country: 'UK', city: 'Silverstone', laps: 52, lapDistance: 5.891, timezone: 'Europe/London' },
  hungaroring: { name: 'Hungaroring', country: 'Hungary', city: 'Budapest', laps: 70, lapDistance: 4.381, timezone: 'Europe/Budapest' },
  spa: { name: 'Circuit de Spa-Francorchamps', country: 'Belgium', city: 'Spa', laps: 44, lapDistance: 7.004, timezone: 'Europe/Brussels' },
  zandvoort: { name: 'Circuit Zandvoort', country: 'Netherlands', city: 'Zandvoort', laps: 72, lapDistance: 4.259, timezone: 'Europe/Amsterdam' },
  monza: { name: 'Autodromo Nazionale Monza', country: 'Italy', city: 'Monza', laps: 53, lapDistance: 5.793, timezone: 'Europe/Rome' },
  baku: { name: 'Baku City Circuit', country: 'Azerbaijan', city: 'Baku', laps: 51, lapDistance: 6.003, timezone: 'Asia/Baku' },
  marina_bay: { name: 'Marina Bay Street Circuit', country: 'Singapore', city: 'Singapore', laps: 62, lapDistance: 4.940, timezone: 'Asia/Singapore' },
  americas: { name: 'Circuit of the Americas', country: 'USA', city: 'Austin', laps: 56, lapDistance: 5.513, timezone: 'America/Chicago' },
  rodriguez: { name: 'Autodromo Hermanos Rodriguez', country: 'Mexico', city: 'Mexico City', laps: 71, lapDistance: 4.304, timezone: 'America/Mexico_City' },
  interlagos: { name: 'Autodromo Jose Carlos Pace', country: 'Brazil', city: 'São Paulo', laps: 71, lapDistance: 4.309, timezone: 'America/Sao_Paulo' },
  vegas: { name: 'Las Vegas Strip Circuit', country: 'USA', city: 'Las Vegas', laps: 50, lapDistance: 6.201, timezone: 'America/Los_Angeles' },
  losail: { name: 'Lusail International Circuit', country: 'Qatar', city: 'Lusail', laps: 57, lapDistance: 5.380, timezone: 'Asia/Qatar' },
  yas_marina: { name: 'Yas Marina Circuit', country: 'UAE', city: 'Abu Dhabi', laps: 58, lapDistance: 5.281, timezone: 'Asia/Dubai' },
}
