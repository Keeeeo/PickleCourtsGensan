import { Search, MapPin, SlidersHorizontal } from 'lucide-react'
import CardGrid from '../components/CardGrid'

export default function HomePage({ courts, distances, locationStatus, query, onQueryChange, onRequestLocation, onOpenFilters }) {
  return (
    <main className="pb-16 bg-slate-50">
      <section className="relative overflow-hidden bg-white px-4 pt-8 pb-6 shadow-sm md:px-8 md:pt-10 md:pb-8">
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-100 to-transparent" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6">
          <div className="max-w-5xl">
            <h1 className="font-sans text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl whitespace-normal">
              Find & Book Pickleball Courts in GenSan
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Discover the best courts, compare prices, and book your next game in one smooth experience.
            </p>
          </div>

          {locationStatus !== 'granted' && (
            <div className="grid gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-1.5 text-sm text-slate-600 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-500" />
                Share your location to see distances and sort by nearest.
              </div>
              <button
                type="button"
                onClick={onRequestLocation}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-200"
              >
                Share location
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Search & filter bar: pinned to the top of the viewport (below the mobile
          header on small screens) with a frosted-glass look so it stays reachable
          and unobtrusive while the court list scrolls underneath it. */}
      <div className="sticky top-16 md:top-0 z-20 border-b border-white/40 bg-white/70 px-4 py-4 shadow-md backdrop-blur-md supports-[backdrop-filter]:bg-white/60 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-[1fr_auto] items-center">
          <div className="relative w-full min-w-0">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search courts by name"
              className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <button
            type="button"
            onClick={onOpenFilters}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      <section className="px-4 md:px-8 py-6">
        <div className="mx-auto max-w-6xl">
          <CardGrid courts={courts} distances={distances} locationStatus={locationStatus} />
        </div>
      </section>
    </main>
  )
}
