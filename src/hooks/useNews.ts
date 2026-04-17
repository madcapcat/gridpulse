import { useQuery } from '@tanstack/react-query'
import { fetchAllNews } from '@/services/news'

export function useNews() {
  return useQuery({
    queryKey: ['f1-news'],
    queryFn: fetchAllNews,
    staleTime: 15 * 60 * 1000,  // cache agresivo — respeta límite de GNews
    gcTime: 60 * 60 * 1000,
    retry: 1,
  })
}
