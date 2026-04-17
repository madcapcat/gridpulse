import { useQuery } from '@tanstack/react-query'
import { fetchRaceCalendar } from '@/services/jolpica'

export function useRaceCalendar(year: string | number = 'current') {
  return useQuery({
    queryKey: ['race-calendar', year],
    queryFn: () => fetchRaceCalendar(year),
    staleTime: 60 * 60 * 1000,  // calendario no cambia seguido
    gcTime: 24 * 60 * 60 * 1000,
  })
}
