import { useState } from 'react'
import { useDriverStandings } from '@/hooks/useDriverStandings'
import { useConstructorStandings } from '@/hooks/useConstructorStandings'
import { DriverStandingsTable } from '@/components/features/standings/driver-standings'
import { ConstructorStandingsTable } from '@/components/features/standings/constructor-standings'
import { SeasonRaceList } from '@/components/features/history/season-race-list'
import { DriversChart, ConstructorsChart } from '@/components/features/standings/standings-chart'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ErrorMessage } from '@/components/ui/error-message'
import { Card } from '@/components/ui/card'

const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: CURRENT_YEAR - 1950 + 1 }, (_, i) => CURRENT_YEAR - i)

type MainTab = 'standings' | 'races'
type StandingsTab = 'drivers' | 'constructors'
type ViewMode = 'table' | 'chart'

export default function HistoryPage() {
  const [year, setYear] = useState(CURRENT_YEAR)
  const [mainTab, setMainTab] = useState<MainTab>('standings')
  const [standingsTab, setStandingsTab] = useState<StandingsTab>('drivers')
  const [viewMode, setViewMode] = useState<ViewMode>('table')

  const drivers = useDriverStandings(year)
  const constructors = useConstructorStandings(year)

  const isLoading = standingsTab === 'drivers' ? drivers.isLoading : constructors.isLoading
  const error     = standingsTab === 'drivers' ? drivers.error     : constructors.error
  const refetch   = standingsTab === 'drivers' ? drivers.refetch   : constructors.refetch

  return (
    <div className="py-8">
      {/* Header con selector de temporada */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">History</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">
            Formula 1 World Championship — {year} season
          </p>
        </div>

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="bg-[#111111] border border-[#222222] text-white text-sm rounded-lg px-3 py-2 font-heading cursor-pointer hover:border-[#333333] focus:outline-none focus:border-[#e10600] transition-colors duration-200"
          aria-label="Select season year"
        >
          {YEARS.map((y) => (
            <option key={y} value={y} className="bg-[#111111]">
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs principales: Standings / Races */}
      <div className="flex gap-1 mb-6 p-1 bg-[#111111] border border-[#222222] rounded-xl w-fit">
        {(['standings', 'races'] as MainTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setMainTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors duration-200 cursor-pointer
              ${mainTab === t ? 'bg-[#e10600] text-white' : 'text-[#a1a1aa] hover:text-white'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab: Carreras de la temporada */}
      {mainTab === 'races' && <SeasonRaceList year={year} />}

      {/* Tab: Clasificaciones */}
      {mainTab === 'standings' && (
        <div>
          {/* Sub-tabs drivers/constructors + toggle tabla/chart */}
          <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
            <div className="flex gap-1 p-1 bg-[#111111] border border-[#222222] rounded-xl w-fit">
              {(['drivers', 'constructors'] as StandingsTab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setStandingsTab(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors duration-200 cursor-pointer
                    ${standingsTab === t ? 'bg-[#222222] text-white' : 'text-[#52525b] hover:text-[#a1a1aa]'}`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex gap-1 p-1 bg-[#111111] border border-[#222222] rounded-xl w-fit">
              {(['table', 'chart'] as ViewMode[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setViewMode(v)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors duration-200 cursor-pointer
                    ${viewMode === v ? 'bg-[#222222] text-white' : 'text-[#52525b] hover:text-[#a1a1aa]'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {isLoading && <LoadingSpinner label="Loading standings..." />}
          {error && <ErrorMessage onRetry={refetch} />}

          {!isLoading && !error && viewMode === 'table' && (
            <>
              {standingsTab === 'drivers' && drivers.data && (
                <DriverStandingsTable standings={drivers.data} />
              )}
              {standingsTab === 'constructors' && constructors.data && (
                constructors.data.length > 0
                  ? <ConstructorStandingsTable standings={constructors.data} />
                  : <p className="text-sm text-[#52525b] py-4">
                      Constructor championship started in 1958.
                    </p>
              )}
            </>
          )}

          {!isLoading && !error && viewMode === 'chart' && (
            <Card padding="md">
              {standingsTab === 'drivers' && drivers.data && drivers.data.length > 0 && (
                <DriversChart standings={drivers.data} />
              )}
              {standingsTab === 'constructors' && constructors.data && (
                constructors.data.length > 0
                  ? <ConstructorsChart standings={constructors.data} />
                  : <p className="text-sm text-[#52525b] py-4 text-center">
                      Constructor championship started in 1958.
                    </p>
              )}
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
