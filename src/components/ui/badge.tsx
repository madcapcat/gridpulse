type BadgeVariant = 'default' | 'red' | 'green' | 'yellow' | 'team'

type BadgeProps = {
  children: React.ReactNode
  variant?: BadgeVariant
  color?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-[#1a1a1a] text-[#a1a1aa] border border-[#333333]',
  red:     'bg-red-950/50 text-red-400 border border-red-900',
  green:   'bg-green-950/50 text-green-400 border border-green-900',
  yellow:  'bg-yellow-950/50 text-yellow-400 border border-yellow-900',
  team:    'border',
}

export function Badge({ children, variant = 'default', color }: BadgeProps) {
  const base = 'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium font-mono'

  if (variant === 'team' && color) {
    return (
      <span
        className={`${base} ${variantClasses.team}`}
        style={{ color, borderColor: `${color}40`, backgroundColor: `${color}15` }}
      >
        {children}
      </span>
    )
  }

  return <span className={`${base} ${variantClasses[variant]}`}>{children}</span>
}
