import { NavLink } from 'react-router-dom'
import { Home, MapPinned } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/map', label: 'Map', icon: MapPinned },
]

export default function Sidebar({ onOpenFilters }) {
  return (
    <aside className="hidden md:flex md:w-20 lg:w-64 md:flex-col md:fixed md:inset-y-0 bg-slate court-lines z-30">
      <div className="flex items-center gap-3 px-4 lg:px-6 h-20 border-b border-white/10">
        <div className="w-20 h-20 overflow-hidden bg-transparent flex items-center justify-center shrink-0">
          <img src="/images/PCGSC_logo.png" alt="PCGSC logo" className="h-full w-full object-contain" />
        </div>
        <div className="hidden lg:block leading-tight">
          <p className="font-sans font-semibold text-white text-lg tracking-wide">PickleCourts</p>
          <p className="text-court-light text-xs font-sans tracking-widest">GENSAN</p>
        </div>
      </div>

      <nav className="flex-1 px-2 lg:px-4 py-6 space-y-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
                isActive ? 'bg-pickle/15 text-pickle-light' : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span className="hidden lg:inline font-medium text-sm">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="hidden lg:block px-6 py-5 border-t border-white/10">
        <p className="text-slate-400 text-xs leading-relaxed">
          All court names, logos, pictures, and trademarks displayed on this site are the property of their respective owners. Their inclusion in this directory is for informational/identification purposes only and does not imply endorsement or official affiliation.
        </p>
      </div>
    </aside>
  )
}
