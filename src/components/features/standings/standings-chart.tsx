import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import type { DriverStanding, ConstructorStanding } from '@/types/f1.types'
import { getTeamColor } from '@/constants/teams'

type DriversChartProps = {
  standings: DriverStanding[]
}

type ConstructorsChartProps = {
  standings: ConstructorStanding[]
}

const tooltipStyle = {
  contentStyle: {
    backgroundColor: '#111111',
    border: '1px solid #222222',
    borderRadius: 8,
    fontSize: 12,
  },
  labelStyle: { color: '#ffffff', fontFamily: 'Fira Code' },
  itemStyle: { color: '#a1a1aa' },
  cursor: { fill: '#ffffff08' },
}

export function DriversChart({ standings }: DriversChartProps) {
  const data = standings.slice(0, 10).map((s) => ({
    name: s.Driver.familyName.slice(0, 3).toUpperCase(),
    points: Number(s.points),
    color: getTeamColor(s.Constructors[0]?.constructorId ?? ''),
    label: `${s.Driver.givenName} ${s.Driver.familyName}`,
  }))

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: '#52525b', fontSize: 11, fontFamily: 'Fira Code' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#52525b', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          {...tooltipStyle}
          // Recharts pasa el nombre de campo ("points") como name — lo reemplazamos por el nombre completo del piloto
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter={(value: any, _name: any, entry: any) => [`${value} pts`, entry?.payload?.label ?? '']}
        />
        <Bar dataKey="points" radius={[4, 4, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function ConstructorsChart({ standings }: ConstructorsChartProps) {
  const data = standings.map((s) => ({
    // Primera palabra del nombre para que quepa en el eje X
    name: s.Constructor.name.split(' ')[0],
    points: Number(s.points),
    color: getTeamColor(s.Constructor.constructorId),
    label: s.Constructor.name,
  }))

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: '#52525b', fontSize: 11, fontFamily: 'Fira Code' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#52525b', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          {...tooltipStyle}
          // Recharts pasa el nombre de campo ("points") como name — lo reemplazamos por el nombre completo del piloto
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter={(value: any, _name: any, entry: any) => [`${value} pts`, entry?.payload?.label ?? '']}
        />
        <Bar dataKey="points" radius={[4, 4, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
