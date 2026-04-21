import type { ConstructorStanding } from '@/types/f1.types'
import { Card } from '@/components/ui/card'
import { getTeamColor } from '@/constants/teams'
import { getNationalityFlag } from '@/utils/flags'

type ConstructorStandingsProps = {
  standings: ConstructorStanding[]
}

export function ConstructorStandingsTable({ standings }: ConstructorStandingsProps) {
  return (
    <Card padding="sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[#52525b] font-mono text-xs border-b border-[#222222]">
            <th className="text-left py-2 px-3 w-10">POS</th>
            <th className="text-left py-2 px-3">CONSTRUCTOR</th>
            <th className="text-right py-2 px-3 w-12">W</th>
            <th className="text-right py-2 px-3 w-16">PTS</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((entry, i) => {
            const color = getTeamColor(entry.Constructor.constructorId)
            const flag = getNationalityFlag(entry.Constructor.nationality)
            const isTop3 = i < 3

            return (
              <tr
                key={entry.Constructor.constructorId}
                className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a] transition-colors duration-150"
              >
                {/* Posicion */}
                <td className="py-3 px-3">
                  <span className={`font-heading font-bold text-sm ${isTop3 ? 'text-[#e10600]' : 'text-[#52525b]'}`}>
                    {entry.position}
                  </span>
                </td>

                {/* Constructor */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-3">
                    {/* Barra de color del equipo */}
                    <div className="w-1 h-8 rounded-full shrink-0" style={{ backgroundColor: color }} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm leading-none">{flag}</span>
                        <span className="font-medium text-white">{entry.Constructor.name}</span>
                      </div>
                      <span className="text-xs text-[#52525b] mt-0.5 block">{entry.Constructor.nationality}</span>
                    </div>
                  </div>
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
