import { useQuery } from '@tanstack/react-query'
import {
  fetchActiveSession,
  fetchDrivers,
  fetchPositions,
  fetchIntervals,
  fetchPitStops,
  fetchWeather,
} from '@/services/openf1'
import type { OpenF1Driver, OpenF1Position, OpenF1Interval, OpenF1PitStop } from '@/types/openf1.types'

export type LiveTimingRow = {
  driverNumber: number
  position: number
  acronym: string
  fullName: string
  teamName: string
  teamColor: string
  gapToLeader: number | null
  interval: number | null
  pitCount: number
  lastPitDuration: number | null
}

// Devuelve el registro más reciente por piloto de un array con campo date
function getLatestPerDriver<T extends { driver_number: number; date: string }>(items: T[]): Map<number, T> {
  const map = new Map<number, T>()
  for (const item of items) {
    const current = map.get(item.driver_number)
    if (!current || item.date > current.date) map.set(item.driver_number, item)
  }
  return map
}

function buildTimingRows(
  drivers: OpenF1Driver[],
  positions: OpenF1Position[],
  intervals: OpenF1Interval[],
  pits: OpenF1PitStop[],
): LiveTimingRow[] {
  const latestPositions = getLatestPerDriver(positions)
  const latestIntervals = getLatestPerDriver(intervals)

  const pitsByDriver = new Map<number, OpenF1PitStop[]>()
  for (const pit of pits) {
    const arr = pitsByDriver.get(pit.driver_number) ?? []
    arr.push(pit)
    pitsByDriver.set(pit.driver_number, arr)
  }

  return drivers
    .map((driver) => {
      const pos = latestPositions.get(driver.driver_number)
      const interval = latestIntervals.get(driver.driver_number)
      const driverPits = pitsByDriver.get(driver.driver_number) ?? []
      const lastPit = driverPits.length > 0
        ? driverPits.reduce((a, b) => (a.lap_number > b.lap_number ? a : b))
        : null

      return {
        driverNumber: driver.driver_number,
        position: pos?.position ?? 99,
        acronym: driver.name_acronym,
        fullName: driver.full_name,
        teamName: driver.team_name,
        teamColor: `#${driver.team_colour}`,
        gapToLeader: interval?.gap_to_leader ?? null,
        interval: interval?.interval ?? null,
        pitCount: driverPits.length,
        lastPitDuration: lastPit?.pit_duration ?? null,
      }
    })
    .sort((a, b) => a.position - b.position)
}

export function useLiveTiming() {
  // Verifica si hay sesión activa cada 30s
  const sessionQuery = useQuery({
    queryKey: ['live-session'],
    queryFn: fetchActiveSession,
    refetchInterval: 30_000,
    staleTime: 0,
  })

  const session = sessionQuery.data ?? null
  const sessionKey = session?.session_key
  const isLive = !!session

  // Pilotos — estáticos durante la sesión, no necesitan polling frecuente
  const driversQuery = useQuery({
    queryKey: ['live-drivers', sessionKey],
    queryFn: () => fetchDrivers(sessionKey!),
    enabled: isLive,
    staleTime: 5 * 60 * 1000,
  })

  const positionsQuery = useQuery({
    queryKey: ['live-positions', sessionKey],
    queryFn: () => fetchPositions(sessionKey!),
    enabled: isLive,
    refetchInterval: 5_000,
    staleTime: 0,
  })

  const intervalsQuery = useQuery({
    queryKey: ['live-intervals', sessionKey],
    queryFn: () => fetchIntervals(sessionKey!),
    enabled: isLive,
    refetchInterval: 5_000,
    staleTime: 0,
  })

  const pitsQuery = useQuery({
    queryKey: ['live-pits', sessionKey],
    queryFn: () => fetchPitStops(sessionKey!),
    enabled: isLive,
    refetchInterval: 10_000,
    staleTime: 0,
  })

  const weatherQuery = useQuery({
    queryKey: ['live-weather', sessionKey],
    queryFn: () => fetchWeather(sessionKey!),
    enabled: isLive,
    refetchInterval: 30_000,
    staleTime: 0,
  })

  const latestWeather = weatherQuery.data?.length
    ? weatherQuery.data[weatherQuery.data.length - 1]
    : null

  const timingRows =
    driversQuery.data && positionsQuery.data && intervalsQuery.data && pitsQuery.data
      ? buildTimingRows(driversQuery.data, positionsQuery.data, intervalsQuery.data, pitsQuery.data)
      : []

  return {
    session,
    isLive,
    isLoadingSession: sessionQuery.isLoading,
    isLoadingData: isLive && (driversQuery.isLoading || positionsQuery.isLoading),
    timingRows,
    weather: latestWeather,
  }
}
