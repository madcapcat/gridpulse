import { getTeamLogo } from '@/constants/teams'

type TeamLogoProps = {
  constructorId: string
  className?: string
}

// Muestra el logo en una píldora blanca para que sea visible sobre cualquier fondo oscuro
export function TeamLogo({ constructorId, className }: TeamLogoProps) {
  const src = getTeamLogo(constructorId)
  if (!src) return null

  return (
    <div className={`inline-flex items-center justify-center bg-white rounded px-2 h-7 overflow-hidden ${className ?? ''}`}>
      <img
        src={src}
        alt=""
        loading="lazy"
        style={{ maxHeight: '16px', width: 'auto', maxWidth: '80px' }}
      />
    </div>
  )
}
