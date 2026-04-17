import type { JolpicaResponse, DriverStanding, ConstructorStanding, Race, RaceResult, QualifyingResult, StandingsList } from '@/types/f1.types'

const BASE_URL = 'https://api.jolpi.ca/ergast/f1'

async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Jolpica error: ${response.status}`)
  return response.json()
}

export async function fetchDriverStandings(year: string | number = 'current'): Promise<DriverStanding[]> {
  type R = JolpicaResponse<{ StandingsTable: { StandingsLists: StandingsList[] } }>
  const data = await fetchJSON<R>(`${BASE_URL}/${year}/driverStandings.json`)
  return data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings ?? []
}

export async function fetchConstructorStandings(year: string | number = 'current'): Promise<ConstructorStanding[]> {
  type R = JolpicaResponse<{ StandingsTable: { StandingsLists: StandingsList[] } }>
  const data = await fetchJSON<R>(`${BASE_URL}/${year}/constructorStandings.json`)
  return data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings ?? []
}

export async function fetchRaceCalendar(year: string | number = 'current'): Promise<Race[]> {
  type R = JolpicaResponse<{ RaceTable: { Races: Race[] } }>
  const data = await fetchJSON<R>(`${BASE_URL}/${year}.json`)
  return data.MRData.RaceTable.Races
}

export async function fetchLastRaceResults(): Promise<RaceResult | null> {
  type R = JolpicaResponse<{ RaceTable: { Races: RaceResult[] } }>
  const data = await fetchJSON<R>(`${BASE_URL}/current/last/results.json`)
  return data.MRData.RaceTable.Races[0] ?? null
}

export async function fetchRaceResults(year: string | number, round: string | number): Promise<RaceResult | null> {
  type R = JolpicaResponse<{ RaceTable: { Races: RaceResult[] } }>
  const data = await fetchJSON<R>(`${BASE_URL}/${year}/${round}/results.json`)
  return data.MRData.RaceTable.Races[0] ?? null
}

export async function fetchQualifyingResults(year: string | number, round: string | number): Promise<QualifyingResult | null> {
  type R = JolpicaResponse<{ RaceTable: { Races: QualifyingResult[] } }>
  const data = await fetchJSON<R>(`${BASE_URL}/${year}/${round}/qualifying.json`)
  return data.MRData.RaceTable.Races[0] ?? null
}

export async function fetchSeasonList(): Promise<{ season: string; url: string }[]> {
  type R = JolpicaResponse<{ SeasonTable: { Seasons: { season: string; url: string }[] } }>
  const data = await fetchJSON<R>(`${BASE_URL}/seasons.json?limit=100`)
  return data.MRData.SeasonTable.Seasons
}
