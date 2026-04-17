import { useQuery } from '@tanstack/react-query'
import { fetchRaceResults, fetchLastRaceResults } from '@/services/jolpica'

export function useLastRaceResults() {
  return useQuery({
    queryKey: ['race-results', 'last'],
    queryFn: fetchLastRaceResults,
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  })
}

export function useRaceResults(year: string | number, round: string | number) {
  return useQuery({
    queryKey: ['race-results', year, round],
    queryFn: () => fetchRaceResults(year, round),
    staleTime: 60 * 60 * 1000,  // resultados historicos no cambian
    gcTime: 24 * 60 * 60 * 1000,
    enabled: !!year && !!round,
  })
}
