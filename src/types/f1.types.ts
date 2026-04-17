// Tipos del dominio F1 — basados en la estructura de respuesta de Jolpica/Ergast API

export interface Driver {
  driverId: string
  permanentNumber: string
  code: string
  givenName: string
  familyName: string
  dateOfBirth: string
  nationality: string
  url: string
}

export interface Constructor {
  constructorId: string
  name: string
  nationality: string
  url: string
}

export interface DriverStanding {
  position: string
  positionText: string
  points: string
  wins: string
  Driver: Driver
  Constructors: Constructor[]
}

export interface ConstructorStanding {
  position: string
  positionText: string
  points: string
  wins: string
  Constructor: Constructor
}

export interface Circuit {
  circuitId: string
  circuitName: string
  url: string
  Location: {
    lat: string
    long: string
    locality: string
    country: string
  }
}

export interface Race {
  season: string
  round: string
  raceName: string
  date: string
  time?: string
  url: string
  Circuit: Circuit
  FirstPractice?: { date: string; time: string }
  SecondPractice?: { date: string; time: string }
  ThirdPractice?: { date: string; time: string }
  Qualifying?: { date: string; time: string }
  Sprint?: { date: string; time: string }
  SprintQualifying?: { date: string; time: string }
}

export interface RaceResultDriver {
  number: string
  position: string
  positionText: string
  points: string
  Driver: Driver
  Constructor: Constructor
  grid: string
  laps: string
  status: string
  Time?: { millis: string; time: string }
  FastestLap?: {
    rank: string
    lap: string
    Time: { time: string }
    AverageSpeed: { units: string; speed: string }
  }
}

export interface RaceResult extends Race {
  Results: RaceResultDriver[]
}

export interface QualifyingResultDriver {
  number: string
  position: string
  Driver: Driver
  Constructor: Constructor
  Q1?: string
  Q2?: string
  Q3?: string
}

export interface QualifyingResult extends Race {
  QualifyingResults: QualifyingResultDriver[]
}

export interface StandingsList {
  season: string
  round: string
  DriverStandings?: DriverStanding[]
  ConstructorStandings?: ConstructorStanding[]
}

// Respuesta base de Jolpica — todas las respuestas vienen envueltas en MRData
export interface JolpicaResponse<T> {
  MRData: {
    xmlns: string
    series: string
    url: string
    limit: string
    offset: string
    total: string
  } & T
}
