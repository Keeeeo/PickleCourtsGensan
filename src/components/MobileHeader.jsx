import { Menu, Search, SlidersHorizontal, CircleDot } from 'lucide-react'

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

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-pickle flex items-center justify-center">
            <CircleDot className="w-4 h-4 text-slate" strokeWidth={2.5} />
          </div>
          <span className="font-display font-700 text-white tracking-wide">PickleCourts</span>
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
