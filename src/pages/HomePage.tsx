import { Link } from 'react-router-dom'
import { ArrowRight, Trophy, Calendar } from 'lucide-react'
import { useDriverStandings } from '@/hooks/useDriverStandings'
import { useConstructorStandings } from '@/hooks/useConstructorStandings'
import { useLastRaceResults } from '@/hooks/useRaceResults'
import { useRaceCalendar } from '@/hooks/useRaceCalendar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { getTeamColor } from '@/constants/teams'
import { getNationalityFlag } from '@/utils/flags'
import { formatRaceDate, isNextRace, formatRelativeTime } from '@/utils/date'

export default function HomePage() {
  const drivers = useDriverStandings()
  const constructors = useConstructorStandings()
  const lastRace = useLastRaceResults()
  const calendar = useRaceCalendar()

  const nextRaceIndex = calendar.data ? isNextRace(calendar.data) : -1
  const nextRace = calendar.data?.[nextRaceIndex]
  const top3Drivers = drivers.data?.slice(0, 3) ?? []
  const top3Constructors = constructors.data?.slice(0, 3) ?? []
  const winner = lastRace.data?.Results[0]

  return (
    <div className="py-8 space-y-8">

      {/* Hero — próxima carrera */}
      {nextRace && (
        <Card padding="lg" className="border-[#e10600]/30 bg-gradient-to-br from-[#1a0000] to-[#111111]">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="red">Next Race</Badge>
                <span className="text-xs text-[#a1a1aa] font-heading">
                  {formatRelativeTime(`${nextRace.date}T${nextRace.time ?? '00:00:00Z'}`)}
                </span>
              </div>
              <h2 className="font-heading text-2xl font-bold text-white">{nextRace.raceName}</h2>
              <p className="text-[#a1a1aa] mt-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                {formatRaceDate(nextRace.date)}
                {nextRace.time && ` — ${nextRace.time.slice(0, 5)} UTC`}
              </p>
              <p className="text-sm text-[#52525b] mt-1">
                {nextRace.Circuit.circuitName} · {nextRace.Circuit.Location.country}
              </p>
            </div>
            <Link
              to="/calendar"
              className="flex items-center gap-1.5 text-sm text-[#e10600] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Full calendar <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Ultima carrera */}
        <Card padding="lg" className="lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" aria-hidden="true" />
              Last Race
            </h3>
            <Link to="/results" className="text-xs text-[#a1a1aa] hover:text-white transition-colors cursor-pointer flex items-center gap-1">
              Details <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {lastRace.isLoading && <LoadingSpinner size="sm" label="Loading..." />}
          {lastRace.data && (
            <div>
              <p className="text-sm text-[#a1a1aa] mb-3">{lastRace.data.raceName}</p>
              {winner && (
                <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg">
                  <span className="text-2xl">{getNationalityFlag(winner.Driver.nationality)}</span>
                  <div>
                    <p className="font-heading font-bold text-white">
                      {winner.Driver.givenName} {winner.Driver.familyName}
                    </p>
                    <Badge variant="team" color={getTeamColor(winner.Constructor.constructorId)}>
                      {winner.Constructor.name}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Driver standings top 3 */}
        <Card padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-white">Drivers</h3>
            <Link to="/standings" className="text-xs text-[#a1a1aa] hover:text-white transition-colors cursor-pointer flex items-center gap-1">
              Full standings <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {drivers.isLoading && <LoadingSpinner size="sm" label="Loading..." />}
          <div className="space-y-2">
            {top3Drivers.map((entry) => {
              const color = getTeamColor(entry.Constructors[0]?.constructorId ?? '')
              return (
                <div key={entry.Driver.driverId} className="flex items-center justify-between py-2 border-b border-[#1a1a1a] last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="font-heading font-bold text-[#e10600] w-5 text-sm">{entry.position}</span>
                    <span className="text-sm">{getNationalityFlag(entry.Driver.nationality)}</span>
                    <div>
                      <span className="text-sm font-medium text-white">{entry.Driver.familyName}</span>
                      <div className="mt-0.5">
                        <Badge variant="team" color={color}>{entry.Constructors[0]?.name}</Badge>
                      </div>
                    </div>
                  </div>
                  <span className="font-heading font-bold text-white">{entry.points}</span>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Constructor standings top 3 */}
        <Card padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-white">Constructors</h3>
            <Link to="/standings?tab=constructors" className="text-xs text-[#a1a1aa] hover:text-white transition-colors cursor-pointer flex items-center gap-1">
              Full standings <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {constructors.isLoading && <LoadingSpinner size="sm" label="Loading..." />}
          <div className="space-y-2">
            {top3Constructors.map((entry) => {
              const color = getTeamColor(entry.Constructor.constructorId)
              return (
                <div key={entry.Constructor.constructorId} className="flex items-center justify-between py-2 border-b border-[#1a1a1a] last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="font-heading font-bold text-[#e10600] w-5 text-sm">{entry.position}</span>
                    <div className="w-1 h-6 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-sm font-medium text-white">{entry.Constructor.name}</span>
                  </div>
                  <span className="font-heading font-bold text-white">{entry.points}</span>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
