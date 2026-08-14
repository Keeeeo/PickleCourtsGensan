import { NavLink } from 'react-router-dom'
import { Home, MapPinned, X } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/map', label: 'Map', icon: MapPinned },
]

export default function MobileDrawer({ open, onClose }) {
  if (!open) return null

  return (
    <div className="md:hidden fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-slate-950/60" onClick={onClose} />
      <div className="absolute inset-y-0 left-0 w-72 bg-slate court-lines animate-drawer-in flex flex-col">
        <div className="flex items-center gap-3 px-4 h-20 border-b border-white/10">
          <div className="w-20 h-20 overflow-hidden bg-transparent flex items-center justify-center shrink-0">
            <img src="/images/PCGSC_logo.png" alt="PCGSC logo" className="h-full w-full object-contain" />
          </div>
          <div className="flex-1 min-w-0 leading-tight">
            <p className="font-sans font-semibold text-white text-lg tracking-wide">PickleCourts</p>
            <p className="text-court-light text-xs font-sans tracking-widest">GENSAN</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="shrink-0 p-2 -mr-2 text-white rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-2 lg:px-4 py-6 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
                  isActive ? 'bg-pickle/15 text-pickle-light' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="font-medium text-sm">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-6 py-5 border-t border-white/10">
          <p className="text-slate-400 text-xs leading-relaxed">
            Every court on this list, one kitchen line at a time.
          </p>
        </div>
      </div>
    </div>
  )
}
