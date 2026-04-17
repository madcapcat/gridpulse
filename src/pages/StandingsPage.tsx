import { useState } from 'react'
import { useDriverStandings } from '@/hooks/useDriverStandings'
import { useConstructorStandings } from '@/hooks/useConstructorStandings'
import { DriverStandingsTable } from '@/components/features/standings/driver-standings'
import { ConstructorStandingsTable } from '@/components/features/standings/constructor-standings'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ErrorMessage } from '@/components/ui/error-message'

type Tab = 'drivers' | 'constructors'

export default function StandingsPage() {
  const [tab, setTab] = useState<Tab>('drivers')

  const drivers = useDriverStandings()
  const constructors = useConstructorStandings()

  const isLoading = tab === 'drivers' ? drivers.isLoading : constructors.isLoading
  const error     = tab === 'drivers' ? drivers.error     : constructors.error
  const refetch   = tab === 'drivers' ? drivers.refetch   : constructors.refetch

  return (
    <div className="py-8">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-white">Standings</h1>
        <p className="text-sm text-[#a1a1aa] mt-1">2025 Formula 1 World Championship</p>
      </div>

      {/* Tabs drivers / constructors */}
      <div className="flex gap-1 mb-6 p-1 bg-[#111111] border border-[#222222] rounded-xl w-fit">
        {(['drivers', 'constructors'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors duration-200 cursor-pointer
              ${tab === t ? 'bg-[#e10600] text-white' : 'text-[#a1a1aa] hover:text-white'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {isLoading && <LoadingSpinner label="Loading standings..." />}
      {error && <ErrorMessage onRetry={refetch} />}

      {tab === 'drivers' && drivers.data && (
        <DriverStandingsTable standings={drivers.data} />
      )}
      {tab === 'constructors' && constructors.data && (
        <ConstructorStandingsTable standings={constructors.data} />
      )}
    </div>
  )
}
