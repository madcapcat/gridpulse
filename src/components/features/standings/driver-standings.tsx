import { Trophy } from 'lucide-react'
import type { DriverStanding } from '@/types/f1.types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TeamLogo } from '@/components/ui/team-logo'
import { getTeamColor, getTeamLogo } from '@/constants/teams'
import { getNationalityFlag } from '@/utils/flags'

type DriverStandingsProps = {
  standings: DriverStanding[]
}

export function DriverStandingsTable({ standings }: DriverStandingsProps) {
  return (
    <Card padding="sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[#52525b] font-mono text-xs border-b border-[#222222]">
            <th className="text-left py-2 px-3 w-10">POS</th>
            <th className="text-left py-2 px-3">DRIVER</th>
            <th className="text-left py-2 px-3 hidden sm:table-cell">TEAM</th>
            <th className="text-right py-2 px-3 w-12">W</th>
            <th className="text-right py-2 px-3 w-16">PTS</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((entry, i) => {
            const constructorId = entry.Constructors[0]?.constructorId ?? ''
            const teamColor = getTeamColor(constructorId)
            const hasLogo = !!getTeamLogo(constructorId)
            const flag = getNationalityFlag(entry.Driver.nationality)
            const isTop3 = i < 3

            return (
              <tr
                key={entry.Driver.driverId}
                className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a] transition-colors duration-150"
              >
                {/* Posicion */}
                <td className="py-3 px-3">
                  <span className={`font-heading font-bold text-sm ${isTop3 ? 'text-[#e10600]' : 'text-[#52525b]'}`}>
                    {isTop3 && i === 0 ? <Trophy className="w-3.5 h-3.5 inline text-yellow-400 mr-0.5" /> : null}
                    {entry.position}
                  </span>
                </td>

                {/* Piloto */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{flag}</span>
                    <div>
                      <span className="font-medium text-white">
                        {entry.Driver.givenName}{' '}
                        <span className="font-heading font-bold">{entry.Driver.familyName}</span>
                      </span>
                      {/* Mobile: badge de equipo debajo del nombre */}
                      <div className="sm:hidden mt-0.5">
                        {hasLogo
                          ? <TeamLogo constructorId={constructorId} />
                          : <Badge variant="team" color={teamColor}>{entry.Constructors[0]?.name}</Badge>
                        }
                      </div>
                    </div>
                  </div>
                </td>

                {/* Equipo — logo si existe, badge de texto si no */}
                <td className="py-3 px-3 hidden sm:table-cell">
                  {hasLogo
                    ? <TeamLogo constructorId={constructorId} />
                    : <Badge variant="team" color={teamColor}>{entry.Constructors[0]?.name}</Badge>
                  }
                </td>

                {/* Victorias */}
                <td className="py-3 px-3 text-right font-heading text-[#a1a1aa]">
                  {entry.wins}
                </td>

                {/* Puntos */}
                <td className="py-3 px-3 text-right">
                  <span className="font-heading font-bold text-white">{entry.points}</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Card>
  )
}
