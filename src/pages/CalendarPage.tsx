import { useRaceCalendar } from '@/hooks/useRaceCalendar'
import { RaceCalendar } from '@/components/features/calendar/race-calendar'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ErrorMessage } from '@/components/ui/error-message'

export default function CalendarPage() {
  const { data, isLoading, error, refetch } = useRaceCalendar()

  return (
    <div className="py-8">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-white">Race Calendar</h1>
        <p className="text-sm text-[#a1a1aa] mt-1">2025 Formula 1 World Championship — {data?.length ?? '—'} races</p>
      </div>

      {isLoading && <LoadingSpinner label="Loading calendar..." />}
      {error && <ErrorMessage onRetry={refetch} />}
      {data && <RaceCalendar races={data} />}
    </div>
  )
}
