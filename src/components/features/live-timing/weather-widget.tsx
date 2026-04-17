import { Thermometer, Droplets, Wind } from 'lucide-react'
import type { OpenF1Weather } from '@/types/openf1.types'
import { Card } from '@/components/ui/card'

type WeatherWidgetProps = {
  weather: OpenF1Weather
}

export function WeatherWidget({ weather }: WeatherWidgetProps) {
  const isWet = weather.rainfall > 0

  return (
    <Card padding="sm">
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <div className="flex items-center gap-1.5 text-[#a1a1aa]">
          <Thermometer className="w-3.5 h-3.5 text-[#e10600]" aria-hidden="true" />
          Air <span className="text-white font-heading ml-1">{weather.air_temperature}°C</span>
        </div>

        <div className="flex items-center gap-1.5 text-[#a1a1aa]">
          <Thermometer className="w-3.5 h-3.5 text-orange-400" aria-hidden="true" />
          Track <span className="text-white font-heading ml-1">{weather.track_temperature}°C</span>
        </div>

        <div className="flex items-center gap-1.5 text-[#a1a1aa]">
          <Droplets
            className={`w-3.5 h-3.5 ${isWet ? 'text-blue-400' : 'text-[#52525b]'}`}
            aria-hidden="true"
          />
          {isWet
            ? <span className="text-blue-400 font-heading font-bold">WET</span>
            : <span className="text-white font-heading">DRY</span>
          }
        </div>

        <div className="flex items-center gap-1.5 text-[#a1a1aa]">
          <Wind className="w-3.5 h-3.5" aria-hidden="true" />
          Wind <span className="text-white font-heading ml-1">{weather.wind_speed} m/s</span>
        </div>

        <div className="text-[#52525b] text-xs self-center">
          Humidity: <span className="text-[#a1a1aa] font-heading">{weather.humidity}%</span>
        </div>
      </div>
    </Card>
  )
}
