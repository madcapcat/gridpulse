import { NavLink } from 'react-router-dom'
import { Radio, BarChart2, CalendarDays, Newspaper, Clock, History } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/',          label: 'Home',      icon: BarChart2   },
  { to: '/live',      label: 'Live',      icon: Radio       },
  { to: '/standings', label: 'Standings', icon: BarChart2   },
  { to: '/calendar',  label: 'Calendar',  icon: CalendarDays },
  { to: '/results',   label: 'Results',   icon: Clock       },
  { to: '/news',      label: 'News',      icon: Newspaper   },
  { to: '/history',   label: 'History',   icon: History     },
]

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#222222] bg-black/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-8">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-1 shrink-0">
          <span className="font-heading font-bold text-lg tracking-tight text-white">
            Grid<span className="text-[#e10600]">Pulse</span>
          </span>
        </NavLink>

        {/* Nav */}
        <nav className="flex items-center gap-1 overflow-x-auto" aria-label="Main navigation">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer
                ${isActive
                  ? 'text-white bg-[#1a1a1a]'
                  : 'text-[#a1a1aa] hover:text-white hover:bg-[#111111]'
                }`
              }
            >
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>

      </div>
    </header>
  )
}
