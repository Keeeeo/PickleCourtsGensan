import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'

export default function MobileHeader({ onOpenDrawer }) {
  return (
    <header className="md:hidden sticky top-0 z-30 bg-slate court-lines">
      <div className="relative flex items-center h-16 px-4">
        <button
          onClick={onOpenDrawer}
          aria-label="Open menu"
          className="relative z-10 p-2 -ml-2 text-white rounded-lg hover:bg-white/10"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="absolute inset-0 flex items-center justify-center">
          <Link
            to="/"
            aria-label="Go to home"
            className="w-16 h-16 overflow-hidden bg-transparent flex items-center justify-center cursor-pointer transition-opacity hover:opacity-80"
          >
            <img src="/images/PCGSC_logo.png" alt="PCGSC logo" className="h-full w-full object-contain" />
          </Link>
        </div>
      </div>
    </header>
  )
}
