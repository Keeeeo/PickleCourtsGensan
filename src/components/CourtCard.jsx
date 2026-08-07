import { Link } from 'react-router-dom'
import { MapPin, Navigation, Users, CalendarCheck } from 'lucide-react'
import { formatDistance } from '../utils/haversine'

export default function CourtCard({ court, distanceKm, locationStatus }) {
  const isOpen = court.status === 'open'
  const bookingUrl = court.booking?.url
  const externalTarget = bookingUrl?.startsWith('tel:') ? undefined : '_blank'
  const externalRel = externalTarget ? 'noreferrer' : undefined

  return (
    <div className="group bg-white rounded-card shadow-card hover:shadow-cardHover transition-shadow overflow-hidden flex flex-col">
      <Link to={`/court/${court.id}`} className="relative h-40 overflow-hidden block">
        <img
          src={court.imageUrl}
          alt={court.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span
          className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
            isOpen ? 'bg-pickle text-white' : 'bg-slate-500 text-white'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-white' : 'bg-slate-300'}`} />
          {isOpen ? 'Open' : 'Closed'}
        </span>
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-950/40 to-transparent" />
      </Link>

      <div className="p-4 flex-1 flex flex-col">
        <Link to={`/court/${court.id}`}>
          <h3 className="font-display font-700 text-lg text-slate leading-snug hover:text-pickle-dark transition-colors">
            {court.name}
          </h3>
        </Link>

        <p className="mt-1 flex items-start gap-1.5 text-sm text-slate-500">
          <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-court" />
          <span>{court.address}</span>
        </p>

        <div className="mt-2 flex items-center gap-3 text-xs font-mono">
          {locationStatus === 'granted' && distanceKm != null ? (
            <span className="flex items-center gap-1 text-court font-semibold">
              <Navigation className="w-3.5 h-3.5" />
              {formatDistance(distanceKm)}
            </span>
          ) : (
            <span className="text-slate-400">Location off</span>
          )}
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-semibold">₱{court.pricePerHour}/hr</span>
        </div>

        {/* Open the court’s external booking / website URL when available. */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {court.hasOpenPlay ? (
            bookingUrl ? (
              <a
                href={bookingUrl}
                target={externalTarget}
                rel={externalRel}
                className="flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium bg-slate-100 text-slate hover:bg-pickle/15 hover:text-pickle-dark transition-colors"
              >
                <Users className="w-4 h-4" />
                Open Play
              </a>
            ) : (
              <Link
                to={`/court/${court.id}`}
                className="flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium bg-slate-100 text-slate hover:bg-pickle/15 hover:text-pickle-dark transition-colors"
              >
                <Users className="w-4 h-4" />
                Open Play
              </Link>
            )
          ) : (
            <span className="flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium bg-slate-50 text-slate-400">
              <Users className="w-4 h-4" />
              Open Play
            </span>
          )}

          {court.hasCourtBooking ? (
            bookingUrl ? (
              <a
                href={bookingUrl}
                target={externalTarget}
                rel={externalRel}
                className="flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium bg-slate-100 text-slate hover:bg-court/15 hover:text-court transition-colors"
              >
                <CalendarCheck className="w-4 h-4" />
                Court Booking
              </a>
            ) : (
              <Link
                to={`/court/${court.id}`}
                className="flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium bg-slate-100 text-slate hover:bg-court/15 hover:text-court transition-colors"
              >
                <CalendarCheck className="w-4 h-4" />
                Court Booking
              </Link>
            )
          ) : (
            <span className="flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium bg-slate-50 text-slate-400">
              <CalendarCheck className="w-4 h-4" />
              Court Booking
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
