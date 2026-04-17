import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PageLayout } from '@/components/layout/page-layout'
import { ErrorBoundary } from '@/components/layout/error-boundary'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

// Lazy loading por ruta — el usuario solo descarga el codigo que necesita
const HomePage      = lazy(() => import('@/pages/HomePage'))
const LivePage      = lazy(() => import('@/pages/LivePage'))
const StandingsPage = lazy(() => import('@/pages/StandingsPage'))
const CalendarPage  = lazy(() => import('@/pages/CalendarPage'))
const ResultsPage   = lazy(() => import('@/pages/ResultsPage'))
const NewsPage      = lazy(() => import('@/pages/NewsPage'))
const HistoryPage   = lazy(() => import('@/pages/HistoryPage'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000,
    },
  },
})

function PageFallback() {
  return (
    <div className="py-24">
      <LoadingSpinner size="lg" label="Loading..." />
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ErrorBoundary>
          <PageLayout>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/"                       element={<HomePage />} />
                <Route path="/live"                   element={<LivePage />} />
                <Route path="/standings"              element={<StandingsPage />} />
                <Route path="/calendar"               element={<CalendarPage />} />
                <Route path="/results"                element={<ResultsPage />} />
                <Route path="/results/:year/:round"   element={<ResultsPage />} />
                <Route path="/news"                   element={<NewsPage />} />
                <Route path="/history"                element={<HistoryPage />} />
              </Routes>
            </Suspense>
          </PageLayout>
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
