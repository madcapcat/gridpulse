// Tipos de OpenF1 API — datos en tiempo real durante sesiones

export interface OpenF1Session {
  session_key: number
  session_name: string
  session_type: string
  status: string
  meeting_key: number
  meeting_name: string
  circuit_key: number
  circuit_short_name: string
  country_name: string
  country_code: string
  location: string
  date_start: string
  date_end: string
  year: number
  gmt_offset: string
}

export interface OpenF1Driver {
  driver_number: number
  broadcast_name: string
  full_name: string
  name_acronym: string
  team_name: string
  team_colour: string
  first_name: string
  last_name: string
  headshot_url: string
  country_code: string
  session_key: number
  meeting_key: number
}

export interface OpenF1Position {
  date: string
  driver_number: number
  meeting_key: number
  position: number
  session_key: number
}

export interface OpenF1Interval {
  date: string
  driver_number: number
  gap_to_leader: number | null
  interval: number | null
  meeting_key: number
  session_key: number
}

export interface OpenF1PitStop {
  date: string
  driver_number: number
  lap_number: number
  meeting_key: number
  pit_duration: number
  session_key: number
}

export interface OpenF1Lap {
  date_start: string
  driver_number: number
  duration_sector_1: number | null
  duration_sector_2: number | null
  duration_sector_3: number | null
  i1_speed: number | null
  i2_speed: number | null
  is_pit_out_lap: boolean
  lap_duration: number | null
  lap_number: number
  meeting_key: number
  segments_sector_1: number[]
  segments_sector_2: number[]
  segments_sector_3: number[]
  session_key: number
  st_speed: number | null
}

export interface OpenF1Weather {
  air_temperature: number
  date: string
  humidity: number
  meeting_key: number
  pressure: number
  rainfall: number
  session_key: number
  track_temperature: number
  wind_direction: number
  wind_speed: number
}

export type TyreCompound = 'SOFT' | 'MEDIUM' | 'HARD' | 'INTERMEDIATE' | 'WET' | 'UNKNOWN'

export interface OpenF1Stint {
  compound: TyreCompound
  driver_number: number
  lap_end: number | null
  lap_start: number
  meeting_key: number
  session_key: number
  stint_number: number
  tyre_age_at_start: number
}

export interface OpenF1CarData {
  brake: number
  date: string
  driver_number: number
  drs: number
  meeting_key: number
  n_gear: number
  rpm: number
  session_key: number
  speed: number
  throttle: number
}
