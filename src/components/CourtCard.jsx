import { Link } from 'react-router-dom'
import { useState } from 'react'
import { MapPin, Navigation, CircleDot } from 'lucide-react'
import { formatDistance } from '../utils/haversine'

export default function CourtCard({ court, distanceKm, locationStatus }) {
  const [hasImageError, setHasImageError] = useState(false)
  const isOpen = court.status === 'open'
  const bookingUrl = court.booking?.url
  const externalTarget = bookingUrl?.startsWith('tel:') ? undefined : '_blank'
  const externalRel = externalTarget ? 'noreferrer' : undefined

  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-video overflow-hidden rounded-t-3xl bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100">
        <Link to={`/court/${court.id}`} className="absolute inset-0 z-10" aria-label={`View details for ${court.name}`} />
        {!hasImageError && (
          <img
            src={court.imageUrl}
            alt={court.name}
            loading="lazy"
            onError={() => setHasImageError(true)}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        )}

        {hasImageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500">
            <div className="flex flex-col items-center gap-3 rounded-3xl bg-white/80 px-5 py-6 shadow-sm backdrop-blur-sm">
              <CircleDot className="h-10 w-10 text-emerald-600" />
              <p className="text-sm font-semibold">Court preview unavailable</p>
            </div>
          </div>
        )}

        <span className={`absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm ${isOpen ? 'border border-emerald-400/50' : 'border border-slate-500/30'}`}>
          <span className={`h-2.5 w-2.5 rounded-full ${isOpen ? 'bg-emerald-400' : 'bg-slate-400'}`} />
          {isOpen ? 'Open' : 'Closed'}
        </span>

        <span className="absolute right-4 top-4 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
          ₱{court.pricePerHour}/hr
        </span>
      </div>

      <div className="flex flex-col gap-4 p-5">
        <div className="space-y-3">
          <Link to={`/court/${court.id}`} className="block">
            <h3 className="text-lg font-semibold tracking-tight text-slate-900 hover:text-emerald-700">
              {court.name}
            </h3>
          </Link>
          <p className="flex items-center gap-2 text-sm text-slate-500">
            <MapPin className="h-4 w-4 text-emerald-600" />
            <span className="truncate">{court.address}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          {locationStatus === 'granted' && distanceKm != null ? (
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
              <Navigation className="h-4 w-4" />
              {formatDistance(distanceKm)}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 font-medium text-slate-400">
              <Navigation className="h-4 w-4" />
              Location off
            </span>
          )}
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span className="text-slate-500">
            {court.booking?.type ? court.booking.type.replace(/\b\w/g, (l) => l.toUpperCase()) : 'Booking info'}
          </span>
        </div>

        <div className="grid gap-3">
          {court.hasCourtBooking ? (
            bookingUrl ? (
              <a
                href={bookingUrl}
                target={externalTarget}
                rel={externalRel}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                Court Booking
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-400"
              >
                Court Booking
              </button>
            )
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-400"
            >
              Court Booking
            </button>
          )}

          {court.hasOpenPlay ? (
            bookingUrl ? (
              <a
                href={bookingUrl}
                target={externalTarget}
                rel={externalRel}
                className="inline-flex w-full items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
              >
                Open Play
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-400"
              >
                Open Play
              </button>
            )
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-400"
            >
              Open Play
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
