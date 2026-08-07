import { Menu, Search, SlidersHorizontal } from 'lucide-react'

export default function MobileHeader({ onOpenDrawer, onOpenFilters, onOpenSearch }) {
  return (
    <header className="md:hidden sticky top-0 z-30 bg-slate court-lines">
      <div className="flex items-center justify-between h-16 px-4">
        <button
          onClick={onOpenDrawer}
          aria-label="Open menu"
          className="p-2 -ml-2 text-white rounded-lg hover:bg-white/10"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-16 h-16 overflow-hidden bg-transparent flex items-center justify-center">
            <img src="/images/PCGSC_logo.png" alt="PCGSC logo" className="h-full w-full object-contain" />
          </div>
          <span className="font-sans font-semibold text-white tracking-wide">PickleCourts</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onOpenSearch}
            aria-label="Search"
            className="p-2 text-white rounded-lg hover:bg-white/10"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={onOpenFilters}
            aria-label="Filters"
            className="p-2 text-white rounded-lg hover:bg-white/10"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
