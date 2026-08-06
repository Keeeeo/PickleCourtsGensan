import { Search, MapPin } from 'lucide-react'
import CardGrid from '../components/CardGrid'

export default function HomePage({ courts, distances, locationStatus, query, onQueryChange, searchOpen }) {
  return (
    <main>
      <section className="kitchen-line bg-white px-4 md:px-8 pt-10 pb-8">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-xs tracking-widest text-pickle-dark uppercase mb-2">
            General Santos City
          </p>
          <h1 className="font-display font-700 text-3xl md:text-5xl text-slate leading-tight">
            Find your next <span className="text-pickle-dark">kitchen line</span> in GenSan.
          </h1>
          <p className="mt-3 text-slate-500 max-w-xl">
            {courts.length} court{courts.length === 1 ? '' : 's'} listed — open play schedules, bookings, and
            prices, all in one place.
          </p>

          <div className={`mt-6 ${searchOpen ? 'block' : 'hidden'} md:block`}>
            <div className="relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search courts by name..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-pickle/40 focus:border-pickle"
              />
            </div>
          </div>

          {locationStatus !== 'granted' && (
            <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5" />
              Share your location to see distances and sort by nearest.
            </p>
          )}
        </div>
      </section>

      <section className="px-4 md:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <CardGrid courts={courts} distances={distances} locationStatus={locationStatus} />
        </div>
      </section>
    </main>
  )
}
