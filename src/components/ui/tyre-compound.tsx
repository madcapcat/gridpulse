import type { TyreCompound } from '@/types/openf1.types'

const COMPOUND_CONFIG: Record<TyreCompound, { bg: string; letter: string; textColor: string }> = {
  SOFT:         { bg: '#DA291C', letter: 'S', textColor: '#fff' },
  MEDIUM:       { bg: '#FFC906', letter: 'M', textColor: '#000' },
  HARD:         { bg: '#EBEBEB', letter: 'H', textColor: '#000' },
  INTERMEDIATE: { bg: '#39B54A', letter: 'I', textColor: '#fff' },
  WET:          { bg: '#0067FF', letter: 'W', textColor: '#fff' },
  UNKNOWN:      { bg: '#52525b', letter: '?', textColor: '#fff' },
}

type TyreCompoundProps = {
  compound: TyreCompound
  size?: number
}

export function TyreCompoundBadge({ compound, size = 22 }: TyreCompoundProps) {
  const config = COMPOUND_CONFIG[compound] ?? COMPOUND_CONFIG.UNKNOWN

  return (
    <span
      title={compound}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: config.bg,
        color: config.textColor,
        fontSize: size * 0.45,
        fontWeight: 700,
        fontFamily: 'var(--font-heading, monospace)',
        flexShrink: 0,
        lineHeight: 1,
      }}
      aria-label={`Tyre: ${compound}`}
    >
      {config.letter}
    </span>
  )
}
