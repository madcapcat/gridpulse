import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useRaceCalendar } from '@/hooks/useRaceCalendar'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ErrorMessage } from '@/components/ui/error-message'
import { formatRaceDate, isRacePast } from '@/utils/date'

type SeasonRaceListProps = {
  year: number
}

export function SeasonRaceList({ year }: SeasonRaceListProps) {
  const { data, isLoading, error, refetch } = useRaceCalendar(year)

  if (isLoading) return <LoadingSpinner label="Loading races..." />
  if (error) return <ErrorMessage onRetry={refetch} />
  if (!data || data.length === 0) {
    return <p className="text-sm text-[#52525b] py-4">No race data available for {year}.</p>
  }

  return (
    <div className="space-y-2">
      {data.map((race) => {
        const past = isRacePast(race.date)
        return (
          <div
            key={race.round}
            className={`flex items-center justify-between p-3 rounded-lg border transition-colors duration-150
              ${past
                ? 'border-[#1a1a1a] opacity-80 hover:opacity-100'
                : 'border-[#222222] border-[#e10600]/20 bg-[#0d0000]'
              }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-heading text-[#52525b] text-xs w-6 shrink-0">{race.round}</span>
              <div className="min-w-0">
                <p className="text-sm text-white font-medium truncate">{race.raceName}</p>
                <p className="text-xs text-[#52525b]">
                  {race.Circuit.circuitName} · {race.Circuit.Location.country} · {formatRaceDate(race.date)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-3">
              {past && (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#52525b]" aria-hidden="true" />
                  <Link
                    to={`/results/${year}/${race.round}`}
                    className="flex items-center gap-1 text-xs text-[#a1a1aa] hover:text-[#e10600] transition-colors duration-200 cursor-pointer"
                  >
                    Results <ArrowRight className="w-3 h-3" />
                  </Link>
                </>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
