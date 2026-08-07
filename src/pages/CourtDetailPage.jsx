import { useParams, Link, Navigate } from 'react-router-dom'
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Users,
  CalendarCheck,
  Wallet,
  Navigation,
} from 'lucide-react'
import { formatDistance } from '../utils/haversine'

export default function CourtDetailPage({ courts, distances, locationStatus }) {
  const { id } = useParams()
  const court = courts.find((c) => c.id === id)

  if (!court) return <Navigate to="/" replace />

  const isOpen = court.status === 'open'
  const bookingUrl = court.booking?.url
  const externalTarget = bookingUrl?.startsWith('tel:') ? undefined : '_blank'
  const externalRel = externalTarget ? 'noreferrer' : undefined

  return (
    <main className="pb-16">
      {/* Banner */}
      <div className="relative h-56 md:h-80 w-full overflow-hidden">
        <img
          src={court.bannerUrl || court.imageUrl}
          alt={court.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        <Link
          to="/"
          className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur text-slate text-sm font-medium px-3 py-2 rounded-full hover:bg-white"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <span
          className={`absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
            isOpen ? 'bg-pickle text-white' : 'bg-slate-500 text-white'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-white' : 'bg-slate-300'}`} />
          {isOpen ? 'Open' : 'Closed'}
        </span>

        <div className="absolute inset-x-0 bottom-0 px-4 md:px-8 pb-5 max-w-6xl mx-auto left-0 right-0">
          <h1 className="font-display font-700 text-2xl md:text-4xl text-white leading-tight">
            {court.name}
          </h1>
          <p className="mt-1 flex items-center gap-1.5 text-white/90 text-sm">
            <MapPin className="w-4 h-4 shrink-0" />
            {court.address}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: details */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-card shadow-card p-5 md:p-6">
            <h2 className="font-display font-700 text-lg text-slate mb-4">Open Play & Court Booking</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{court.scheduleNote}</p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {court.hasOpenPlay ? (
                bookingUrl ? (
                  <a
                    href={bookingUrl}
                    target={externalTarget}
                    rel={externalRel}
                    className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-slate bg-slate-100 hover:bg-pickle/15 hover:text-pickle-dark transition-colors"
                  >
                    <Users className="w-4 h-4" />
                    Open Play
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-slate-400 bg-slate-50 cursor-not-allowed"
                  >
                    <Users className="w-4 h-4" />
                    Open Play
                  </button>
                )
              ) : (
                <span className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-slate-300 bg-slate-50">
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
                    className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-slate bg-slate-100 hover:bg-court/15 hover:text-court transition-colors"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    Court Booking
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-slate-400 bg-slate-50 cursor-not-allowed"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    Court Booking
                  </button>
                )
              ) : (
                <span className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-slate-300 bg-slate-50">
                  <CalendarCheck className="w-4 h-4" />
                  Court Booking
                </span>
              )}
            </div>
          </section>

          {court.gallery?.length > 0 && (
            <section>
              <h2 className="font-display font-700 text-lg text-slate mb-3">Courts & Location</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {court.gallery.map((src, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src={src}
                      alt={`${court.name} sample ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right column: contact + booking */}
        <aside className="space-y-5">
          <div className="bg-white rounded-card shadow-card p-5">
            <h2 className="font-display font-700 text-base text-slate mb-3">Contact</h2>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5 text-slate-600">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-court" />
                <span>{court.address}</span>
              </li>
              {court.contact?.phone && (
                <li className="flex items-center gap-2.5 text-slate-600">
                  <Phone className="w-4 h-4 shrink-0 text-court" />
                  <a href={`tel:${court.contact.phone.replace(/\s+/g, '')}`} className="hover:text-court">
                    {court.contact.phone}
                  </a>
                </li>
              )}
              {court.contact?.email && (
                <li className="flex items-center gap-2.5 text-slate-600">
                  <Mail className="w-4 h-4 shrink-0 text-court" />
                  <a href={`mailto:${court.contact.email}`} className="hover:text-court break-all">
                    {court.contact.email}
                  </a>
                </li>
              )}
              {court.contact?.facebook && (
                <li className="flex items-center gap-2.5 text-slate-600">
                  <Facebook className="w-4 h-4 shrink-0 text-court" />
                  <a
                    href={court.contact.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-court break-all"
                  >
                    Facebook page
                  </a>
                </li>
              )}
            </ul>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Wallet className="w-4 h-4" />
                Price
              </span>
              <span className="font-mono font-semibold text-slate">₱{court.pricePerHour}/hr</span>
            </div>

            {locationStatus === 'granted' && distances?.[court.id] != null && (
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Navigation className="w-4 h-4" />
                  Distance
                </span>
                <span className="font-mono font-semibold text-court">{formatDistance(distances[court.id])}</span>
              </div>
            )}
          </div>

          {bookingUrl && (
            <a
              href={bookingUrl}
              target={externalTarget}
              rel={externalRel}
              className="flex items-center justify-center gap-2 w-full bg-pickle hover:bg-pickle-dark text-white font-semibold text-sm py-3.5 rounded-xl shadow-card transition-colors"
            >
              {court.booking.label || 'Book now'}
            </a>
          )}

        </aside>
      </div>
    </main>
  )
}