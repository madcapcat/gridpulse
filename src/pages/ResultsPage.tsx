import { useParams } from 'react-router-dom'
import { useLastRaceResults, useRaceResults } from '@/hooks/useRaceResults'
import { RaceResultsTable } from '@/components/features/results/race-results-table'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ErrorMessage } from '@/components/ui/error-message'

function LastRaceResults() {
  const { data, isLoading, error, refetch } = useLastRaceResults()
  if (isLoading) return <LoadingSpinner label="Loading results..." />
  if (error) return <ErrorMessage onRetry={refetch} />
  if (!data) return null
  return <RaceResultsTable result={data} />
}

function SpecificRaceResults({ year, round }: { year: string; round: string }) {
  const { data, isLoading, error, refetch } = useRaceResults(year, round)
  if (isLoading) return <LoadingSpinner label="Loading results..." />
  if (error) return <ErrorMessage onRetry={refetch} />
  if (!data) return null
  return <RaceResultsTable result={data} />
}

export default function ResultsPage() {
  const { year, round } = useParams()

  return (
    <div className="py-8">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-white">Race Results</h1>
        <p className="text-sm text-[#a1a1aa] mt-1">
          {year && round ? `Round ${round}, ${year}` : 'Latest race'}
        </p>
      </div>

      {year && round
        ? <SpecificRaceResults year={year} round={round} />
        : <LastRaceResults />
      }
    </div>
  )
}
