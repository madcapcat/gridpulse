import type { RaceResult } from '@/types/f1.types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getTeamColor } from '@/constants/teams'
import { getNationalityFlag } from '@/utils/flags'
import { formatGap } from '@/utils/format'

type RaceResultsTableProps = {
  result: RaceResult
}

export function RaceResultsTable({ result }: RaceResultsTableProps) {
  return (
    <div>
      {/* Header de carrera */}
      <div className="mb-4">
        <h2 className="font-heading text-xl font-bold text-white">{result.raceName}</h2>
        <p className="text-sm text-[#a1a1aa]">
          {result.Circuit.circuitName} — Round {result.round}, {result.season}
        </p>
      </div>

      <Card padding="sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[#52525b] font-mono text-xs border-b border-[#222222]">
              <th className="text-left py-2 px-3 w-10">POS</th>
              <th className="text-left py-2 px-3 w-10">NO.</th>
              <th className="text-left py-2 px-3">DRIVER</th>
              <th className="text-left py-2 px-3 hidden sm:table-cell">TEAM</th>
              <th className="text-right py-2 px-3 hidden md:table-cell">LAPS</th>
              <th className="text-right py-2 px-3">GAP</th>
              <th className="text-right py-2 px-3 w-10">PTS</th>
            </tr>
          </thead>
          <tbody>
            {result.Results.map((r) => {
              const teamColor = getTeamColor(r.Constructor.constructorId)
              const flag = getNationalityFlag(r.Driver.nationality)
              const isWinner = r.position === '1'
              const dnf = !r.Time && r.status !== 'Finished' && !r.status.includes('+')

              return (
                <tr
                  key={r.Driver.driverId}
                  className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a] transition-colors duration-150"
                >
                  {/* Posicion */}
                  <td className="py-3 px-3">
                    <span className={`font-heading font-bold ${isWinner ? 'text-yellow-400' : 'text-[#52525b]'}`}>
                      {dnf ? 'DNF' : r.positionText}
                    </span>
                  </td>

                  {/* Numero */}
                  <td className="py-3 px-3 font-heading text-[#52525b]">{r.number}</td>

                  {/* Piloto */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="text-base leading-none">{flag}</span>
                      <div>
                        <span className="text-white">
                          {r.Driver.givenName}{' '}
                          <span className="font-heading font-bold">{r.Driver.familyName}</span>
                        </span>
                        <div className="sm:hidden mt-0.5">
                          <Badge variant="team" color={teamColor}>{r.Constructor.name}</Badge>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Equipo */}
                  <td className="py-3 px-3 hidden sm:table-cell">
                    <Badge variant="team" color={teamColor}>{r.Constructor.name}</Badge>
                  </td>

                  {/* Vueltas */}
                  <td className="py-3 px-3 text-right font-heading text-[#a1a1aa] hidden md:table-cell">
                    {r.laps}
                  </td>

                  {/* Gap / Tiempo */}
                  <td className="py-3 px-3 text-right font-heading text-sm">
                    {isWinner ? (
                      <span className="text-yellow-400">{r.Time?.time ?? '—'}</span>
                    ) : dnf ? (
                      <span className="text-[#52525b]">{r.status}</span>
                    ) : (
                      <span className="text-[#a1a1aa]">{formatGap(r.Time?.time ?? r.status)}</span>
                    )}
                  </td>

                  {/* Puntos */}
                  <td className="py-3 px-3 text-right">
                    <span className={`font-heading font-bold ${Number(r.points) > 0 ? 'text-white' : 'text-[#52525b]'}`}>
                      {r.points}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
