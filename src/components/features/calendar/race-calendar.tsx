import { MapPin, Clock } from 'lucide-react'
import type { Race } from '@/types/f1.types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatShortDate, isRacePast, isNextRace } from '@/utils/date'
import { getCountryFlag } from '@/utils/flags'

type RaceCalendarProps = {
  races: Race[]
}

export function RaceCalendar({ races }: RaceCalendarProps) {
  const nextRaceIndex = isNextRace(races)

  return (
    <div className="space-y-2">
      {races.map((race, i) => {
        const past = isRacePast(race.date, race.time)
        const isNext = i === nextRaceIndex
        const flag = getCountryFlag(race.Circuit.Location.country.slice(0, 2).toUpperCase())
        const hasSprint = !!race.Sprint

        return (
          <Card
            key={race.round}
            padding="md"
            className={`transition-colors duration-150
              ${isNext ? 'border-[#e10600] bg-[#1a0000]' : ''}
              ${past ? 'opacity-50' : 'hover:border-[#333333]'}
            `}
          >
            <div className="flex items-center gap-4">
              {/* Round */}
              <span className="font-heading font-bold text-[#52525b] text-sm w-8 shrink-0">
                R{race.round}
              </span>

              {/* Flag + Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xl leading-none">{flag}</span>
                  <span className="font-heading font-bold text-white truncate">{race.raceName}</span>
                  {isNext && <Badge variant="red">Next Race</Badge>}
                  {hasSprint && <Badge variant="yellow">Sprint</Badge>}
                  {past && <Badge variant="default">Done</Badge>}
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-[#52525b]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" aria-hidden="true" />
                    {race.Circuit.Location.locality}, {race.Circuit.Location.country}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {formatShortDate(race.date)}
                    {race.time ? ` — ${race.time.slice(0, 5)} UTC` : ''}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
