import { NavLink } from 'react-router-dom'
import { Home, MapPinned, X, CircleDot } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/map', label: 'Map', icon: MapPinned },
]

export default function MobileDrawer({ open, onClose }) {
  if (!open) return null

  return (
    <div className="md:hidden fixed inset-0 z-40">
      <div className="absolute inset-0 bg-slate-950/60" onClick={onClose} />
      <div className="absolute inset-y-0 left-0 w-72 bg-slate court-lines animate-drawer-in flex flex-col">
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-pickle flex items-center justify-center">
              <CircleDot className="w-4 h-4 text-slate" strokeWidth={2.5} />
            </div>
            <span className="font-display font-700 text-white tracking-wide">PickleCourts</span>
          </div>
          <button onClick={onClose} aria-label="Close menu" className="p-2 text-white rounded-lg hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
                  isActive ? 'bg-pickle/15 text-pickle-light' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}
