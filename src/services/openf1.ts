import type {
  OpenF1Session,
  OpenF1Driver,
  OpenF1Position,
  OpenF1Interval,
  OpenF1PitStop,
  OpenF1Lap,
  OpenF1Weather,
  OpenF1Stint,
} from '@/types/openf1.types'

const BASE_URL = 'https://api.openf1.org/v1'

async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`OpenF1 error: ${response.status}`)
  return response.json()
}

export async function fetchSessions(year: number = new Date().getFullYear()): Promise<OpenF1Session[]> {
  return fetchJSON<OpenF1Session[]>(`${BASE_URL}/sessions?year=${year}`)
}

// Devuelve la sesión activa actualmente, o null si no hay ninguna
export async function fetchActiveSession(): Promise<OpenF1Session | null> {
  const now = new Date().toISOString()
  const sessions = await fetchSessions()
  return sessions.find((s) => s.date_start <= now && s.date_end >= now) ?? null
}

export async function fetchDrivers(sessionKey: number | 'latest' = 'latest'): Promise<OpenF1Driver[]> {
  return fetchJSON<OpenF1Driver[]>(`${BASE_URL}/drivers?session_key=${sessionKey}`)
}

export async function fetchPositions(sessionKey: number | 'latest' = 'latest'): Promise<OpenF1Position[]> {
  return fetchJSON<OpenF1Position[]>(`${BASE_URL}/position?session_key=${sessionKey}`)
}

export async function fetchIntervals(sessionKey: number | 'latest' = 'latest'): Promise<OpenF1Interval[]> {
  return fetchJSON<OpenF1Interval[]>(`${BASE_URL}/intervals?session_key=${sessionKey}`)
}

export async function fetchPitStops(sessionKey: number | 'latest' = 'latest'): Promise<OpenF1PitStop[]> {
  return fetchJSON<OpenF1PitStop[]>(`${BASE_URL}/pit?session_key=${sessionKey}`)
}

export async function fetchLaps(sessionKey: number | 'latest' = 'latest', driverNumber?: number): Promise<OpenF1Lap[]> {
  const params = new URLSearchParams({ session_key: String(sessionKey) })
  if (driverNumber) params.set('driver_number', String(driverNumber))
  return fetchJSON<OpenF1Lap[]>(`${BASE_URL}/laps?${params}`)
}

export async function fetchWeather(sessionKey: number | 'latest' = 'latest'): Promise<OpenF1Weather[]> {
  return fetchJSON<OpenF1Weather[]>(`${BASE_URL}/weather?session_key=${sessionKey}`)
}

export async function fetchStints(sessionKey: number | 'latest' = 'latest'): Promise<OpenF1Stint[]> {
  return fetchJSON<OpenF1Stint[]>(`${BASE_URL}/stints?session_key=${sessionKey}`)
}
