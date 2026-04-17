import type { ReactNode } from 'react'
import { Header } from './header'

type PageLayoutProps = {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      {/* pt-14 para compensar el header fijo */}
      <main className="max-w-7xl mx-auto px-4 pt-14">
        {children}
      </main>
    </div>
  )
}
