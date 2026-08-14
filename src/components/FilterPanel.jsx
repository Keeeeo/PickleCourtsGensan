import { X, ArrowDownAZ, ArrowUpZA, Users, CalendarCheck, Navigation, Wallet, Clock, Home, Sun } from 'lucide-react'

export const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name A–Z', icon: ArrowDownAZ },
  { value: 'name-desc', label: 'Name Z–A', icon: ArrowUpZA },
  { value: 'distance-asc', label: 'Nearest to you', icon: Navigation },
  { value: 'distance-desc', label: 'Farthest to you', icon: Navigation },
  { value: 'price-asc', label: 'Cheapest price', icon: Wallet },
  { value: 'price-desc', label: 'Most expensive', icon: Wallet },
]

export default function FilterPanel({
  open,
  onClose,
  sortBy,
  onSortChange,
  availability,
  onAvailabilityChange,
  locationStatus,
  onRequestLocation,
}) {
  if (!open) return null

  const toggleAvailability = (key) => {
    onAvailabilityChange({ ...availability, [key]: !availability[key] })
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-950/50" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white flex flex-col shadow-2xl">
        <div className="flex items-center justify-between h-16 px-5 border-b border-slate-100">
          <h2 className="font-sans font-bold text-lg text-slate-900">Filter & Sort</h2>
          <button onClick={onClose} aria-label="Close filters" className="p-2 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5 text-slate" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto thin-scroll px-5 py-6 space-y-8">
          <section>
            <h3 className="text-xs font-sans font-semibold tracking-widest text-slate-500 uppercase mb-3">Sort by</h3>
            <div className="space-y-2">
              {SORT_OPTIONS.map(({ value, label, icon: Icon }) => {
                const isDistance = value.startsWith('distance')
                const disabled = isDistance && locationStatus !== 'granted'
                const active = sortBy === value
                return (
                  <button
                    key={value}
                    disabled={disabled}
                    onClick={() => onSortChange(value)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-sans font-medium transition-colors ${
                      disabled
                        ? 'text-slate-300 cursor-not-allowed'
                        : active
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                    {disabled && <span className="ml-auto text-xs">needs location</span>}
                  </button>
                )
              })}
            </div>
            {locationStatus !== 'granted' && (
              <button
                onClick={onRequestLocation}
                className="mt-3 w-full text-center text-xs font-sans font-semibold text-emerald-600 py-2 rounded-lg border border-emerald-200 hover:bg-emerald-50"
              >
                Share location to sort by distance
              </button>
            )}
          </section>

          <section>
            <h3 className="text-xs font-sans font-semibold tracking-widest text-slate-500 uppercase mb-3">Availability</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availability.openNow}
                  onChange={() => toggleAvailability('openNow')}
                  className="w-4 h-4 rounded accent-emerald-600"
                />
                <Clock className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-sans font-medium text-slate-900">Open Now</span>
              </label>
              <label className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availability.openPlay}
                  onChange={() => toggleAvailability('openPlay')}
                  className="w-4 h-4 rounded accent-emerald-600"
                />
                <Users className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-sans font-medium text-slate-900">Open Play available</span>
              </label>
              <label className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availability.courtBooking}
                  onChange={() => toggleAvailability('courtBooking')}
                  className="w-4 h-4 rounded accent-emerald-600"
                />
                <CalendarCheck className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-sans font-medium text-slate-900">Court Booking available</span>
              </label>
              <label className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availability.indoor}
                  onChange={() => toggleAvailability('indoor')}
                  className="w-4 h-4 rounded accent-emerald-600"
                />
                <Home className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-sans font-medium text-slate-900">Indoor</span>
              </label>
              <label className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availability.outdoor}
                  onChange={() => toggleAvailability('outdoor')}
                  className="w-4 h-4 rounded accent-emerald-600"
                />
                <Sun className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-sans font-medium text-slate-900">Outdoor</span>
              </label>
            </div>
          </section>
        </div>

        <div className="p-5 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full bg-emerald-600 text-white font-sans font-semibold text-sm py-3 rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Show results
          </button>
        </div>
      </div>
    </div>
  )
}
