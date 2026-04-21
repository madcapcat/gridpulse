import type { LiveTimingRow } from '@/hooks/useLiveTiming'
import { TyreCompoundBadge } from '@/components/ui/tyre-compound'

type LiveTimingTableProps = {
  rows: LiveTimingRow[]
}

function formatGap(seconds: number | null): string {
  if (seconds === null || seconds === 0) return '—'
  return `+${seconds.toFixed(3)}`
}

export function LiveTimingTable({ rows }: LiveTimingTableProps) {
  if (rows.length === 0) {
    return (
      <div className="py-8 text-center text-[#52525b] text-sm font-heading">
        Esperando datos de telemetría...
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[#52525b] font-mono text-xs border-b border-[#222222]">
            <th className="text-left py-2 px-3 w-10">POS</th>
            <th className="text-left py-2 px-3 w-10">NO.</th>
            <th className="text-left py-2 px-3">DRIVER</th>
            <th className="text-left py-2 px-3 hidden sm:table-cell">TEAM</th>
            <th className="text-right py-2 px-3">GAP</th>
            <th className="text-right py-2 px-3 hidden md:table-cell">INT</th>
            <th className="text-left py-2 px-3 hidden sm:table-cell">TYRE</th>
            <th className="text-right py-2 px-3 w-10">PITS</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.driverNumber}
              className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a] transition-colors duration-150"
            >
              <td className="py-3 px-3">
                <span className={`font-heading font-bold ${row.position === 1 ? 'text-yellow-400' : 'text-[#52525b]'}`}>
                  {row.position < 99 ? row.position : '—'}
                </span>
              </td>

              <td className="py-3 px-3 font-heading text-[#52525b]">{row.driverNumber}</td>

              <td className="py-3 px-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-1 h-6 rounded-full shrink-0"
                    style={{ backgroundColor: row.teamColor }}
                  />
                  <div>
                    <span className="font-heading font-bold text-white">{row.acronym}</span>
                    <p className="text-xs text-[#52525b] hidden sm:block">{row.fullName}</p>
                  </div>
                </div>
              </td>

              <td className="py-3 px-3 hidden sm:table-cell text-xs text-[#a1a1aa]">
                {row.teamName}
              </td>

              <td className="py-3 px-3 text-right font-heading text-sm">
                {row.position === 1 ? (
                  <span className="text-yellow-400">LEADER</span>
                ) : (
                  <span className="text-[#a1a1aa]">{formatGap(row.gapToLeader)}</span>
                )}
              </td>

              <td className="py-3 px-3 text-right font-heading text-sm hidden md:table-cell text-[#a1a1aa]">
                {row.position === 1 ? '—' : formatGap(row.interval)}
              </td>

              <td className="py-3 px-3 hidden sm:table-cell">
                {row.compound
                  ? <TyreCompoundBadge compound={row.compound} />
                  : <span className="text-[#52525b]">—</span>
                }
              </td>

              <td className="py-3 px-3 text-right font-heading font-bold text-white">
                {row.pitCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
