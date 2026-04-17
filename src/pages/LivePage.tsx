import { Radio, CalendarClock } from 'lucide-react'
import { useLiveTiming } from '@/hooks/useLiveTiming'
import { useLastRaceResults } from '@/hooks/useRaceResults'
import { useRaceCalendar } from '@/hooks/useRaceCalendar'
import { LiveTimingTable } from '@/components/features/live-timing/live-timing-table'
import { WeatherWidget } from '@/components/features/live-timing/weather-widget'
import { RaceResultsTable } from '@/components/features/results/race-results-table'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { isNextRace, formatRaceDate, formatRelativeTime } from '@/utils/date'

// Componente separado para que los hooks no sean condicionales en LivePage
function NoSessionFallback() {
  const lastRace = useLastRaceResults()
  const calendar = useRaceCalendar()

  const nextRaceIndex = calendar.data ? isNextRace(calendar.data) : -1
  const nextRace = nextRaceIndex >= 0 ? calendar.data?.[nextRaceIndex] : undefined

  return (
    <div className="space-y-6">
      {nextRace && (
        <Card padding="md" className="border-[#222222]">
          <div className="flex items-center gap-2 mb-2">
            <CalendarClock className="w-4 h-4 text-[#a1a1aa]" aria-hidden="true" />
            <span className="text-xs text-[#a1a1aa] font-heading uppercase tracking-wider">
              Next Race
            </span>
          </div>
          <p className="font-heading font-bold text-white">{nextRace.raceName}</p>
          <p className="text-sm text-[#a1a1aa] mt-0.5">
            {nextRace.Circuit.circuitName}
            {nextRace.time && ` — ${nextRace.time.slice(0, 5)} UTC`}
          </p>
          <p className="text-xs text-[#52525b] mt-1">
            {formatRaceDate(nextRace.date)} ·{' '}
            {formatRelativeTime(`${nextRace.date}T${nextRace.time ?? '00:00:00Z'}`)}
          </p>
        </Card>
      )}

      <div>
        <h2 className="font-heading font-bold text-white mb-4">Last Race Results</h2>
        {lastRace.isLoading && <LoadingSpinner label="Loading results..." />}
        {lastRace.data && <RaceResultsTable result={lastRace.data} />}
      </div>
    </div>
  )
}

export default function LivePage() {
  const { session, isLive, isLoadingSession, isLoadingData, timingRows, weather } = useLiveTiming()

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-heading text-2xl font-bold text-white">Live Timing</h1>
            {isLive && (
              <Badge variant="red">
                <span className="flex items-center gap-1">
                  <Radio className="w-3 h-3" aria-hidden="true" />
                  LIVE
                </span>
              </Badge>
            )}
          </div>
          {session ? (
            <p className="text-sm text-[#a1a1aa]">
              {session.session_name} — {session.meeting_name} · {session.circuit_short_name}
            </p>
          ) : (
            <p className="text-sm text-[#a1a1aa]">No active session</p>
          )}
        </div>
      </div>

      {isLoadingSession && (
        <LoadingSpinner label="Checking for live sessions..." />
      )}

      {!isLoadingSession && !isLive && <NoSessionFallback />}

      {isLive && (
        <div className="space-y-4">
          {weather && <WeatherWidget weather={weather} />}

          {isLoadingData ? (
            <LoadingSpinner label="Loading live timing data..." />
          ) : (
            <Card padding="sm">
              <LiveTimingTable rows={timingRows} />
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
