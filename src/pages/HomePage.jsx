import { Search, MapPin } from 'lucide-react'
import CardGrid from '../components/CardGrid'

export default function HomePage({ courts, distances, locationStatus, query, onQueryChange, searchOpen }) {
  return (
    <main className="pb-16 bg-slate-50">
      <section className="relative overflow-hidden bg-white px-4 py-10 shadow-sm md:px-8 md:py-14">
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-100 to-transparent" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8">
          <div className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
            <span>⚡</span>
            10+ Courts Available
          </div>

          <div className="max-w-3xl">
            <h1 className="font-sans text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Find & Book Pickleball Courts in GenSan
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Discover the best courts, compare prices, and book your next game in one smooth experience.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_auto] items-center">
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
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              <MapPin className="mr-2 h-4 w-4 text-emerald-600" />
              Nearest courts
            </button>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              Distance filter
            </button>
          </div>

          {locationStatus !== 'granted' && (
            <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 shadow-sm">
              <MapPin className="h-4 w-4 text-emerald-600" />
              Share your location to see distances and sort by nearest.
            </div>
          )}
        </div>
      </section>

      <section className="px-4 md:px-8 py-10">
        <div className="mx-auto max-w-6xl">
          <CardGrid courts={courts} distances={distances} locationStatus={locationStatus} />
        </div>
      </section>
    </main>
  )
}
