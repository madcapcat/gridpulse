import { useQuery } from '@tanstack/react-query'
import { fetchDriverStandings } from '@/services/jolpica'

export function useDriverStandings(year: string | number = 'current') {
  return useQuery({
    queryKey: ['driver-standings', year],
    queryFn: () => fetchDriverStandings(year),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  })
}
