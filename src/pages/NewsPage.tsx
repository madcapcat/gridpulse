import { RefreshCw } from 'lucide-react'
import { useNews } from '@/hooks/useNews'
import { NewsCard } from '@/components/features/news/news-card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ErrorMessage } from '@/components/ui/error-message'

export default function NewsPage() {
  const { data, isLoading, error, refetch, isFetching } = useNews()

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">F1 News</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">
            {data ? `${data.length} articles` : 'Latest Formula 1 news'}
          </p>
        </div>

        {/* Refresh manual — respeta el limite de GNews */}
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-2 px-3 py-2 text-sm text-[#a1a1aa] hover:text-white border border-[#222222] hover:border-[#333333] rounded-lg transition-colors duration-200 cursor-pointer disabled:opacity-50"
          aria-label="Refresh news"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} aria-hidden="true" />
          Refresh
        </button>
      </div>

      {isLoading && <LoadingSpinner label="Loading news..." />}
      {error && <ErrorMessage message="Could not load news. Check your GNews API key." onRetry={refetch} />}

      {data && data.length === 0 && (
        <div className="py-12 text-center text-[#a1a1aa] text-sm">
          No articles found. Add a GNews API key to <code className="font-heading text-xs bg-[#1a1a1a] px-1.5 py-0.5 rounded">.env.local</code> for more results.
        </div>
      )}

      {data && data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((article) => (
            <NewsCard key={article.url} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}
