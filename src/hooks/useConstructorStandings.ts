import { useQuery } from '@tanstack/react-query'
import { fetchConstructorStandings } from '@/services/jolpica'

export function useConstructorStandings(year: string | number = 'current') {
  return useQuery({
    queryKey: ['constructor-standings', year],
    queryFn: () => fetchConstructorStandings(year),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  })
}
