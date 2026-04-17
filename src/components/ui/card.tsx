import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
}

const paddingMap = { sm: 'p-3', md: 'p-4', lg: 'p-6' }

export function Card({ children, className = '', padding = 'md' }: CardProps) {
  return (
    <div
      className={`bg-[#111111] border border-[#222222] rounded-xl ${paddingMap[padding]} ${className}`}
    >
      {children}
    </div>
  )
}
