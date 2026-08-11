import { useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Crosshair, Users, CalendarCheck, MapPin, Navigation } from 'lucide-react'
import { formatDistance } from '../utils/haversine'
import { isCourtOpen } from '../utils/courtStatus'

const GENSAN_CENTER = [6.1167, 125.1716]

function courtIcon(isOpen) {
  const color = isOpen ? '#10B981' : '#64748B'
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: 30px; height: 30px; border-radius: 50% 50% 50% 0;
        background: ${color}; transform: rotate(-45deg);
        display:flex; align-items:center; justify-content:center;
        box-shadow: 0 2px 6px rgba(15,23,42,0.35); border: 2px solid white;
      ">
        <div style="width:8px;height:8px;border-radius:50%;background:white; transform: rotate(45deg);"></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
  })
}

const userIcon = L.divIcon({
  className: '',
  html: `
    <div style="width:18px;height:18px;border-radius:50%;background:#0284C7;border:3px solid white;box-shadow:0 0 0 4px rgba(2,132,199,0.25), 0 2px 6px rgba(15,23,42,0.4);"></div>
  `,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
})

function RecenterButton({ position }) {
  const map = useMap()
  if (!position) return null
  return (
    <button
      onClick={() => map.flyTo([position.latitude, position.longitude], 14)}
      className="absolute bottom-6 right-4 z-[1000] bg-white shadow-card rounded-full p-3 hover:bg-slate-50"
      aria-label="Center on my location"
    >
      <Crosshair className="w-5 h-5 text-court" />
    </button>
  )
}

export default function MapView({ courts, distances, position, locationStatus, onRequestLocation }) {
  const center = position ? [position.latitude, position.longitude] : GENSAN_CENTER

  const icons = useMemo(() => {
    const cache = {}
    return (isOpen) => {
      if (!(isOpen in cache)) cache[isOpen] = courtIcon(isOpen)
      return cache[isOpen]
    }
  }, [])

  return (
    <main className="h-[calc(100vh-4rem)] md:h-screen relative">
      <div className="absolute top-4 left-4 right-4 md:left-6 md:right-auto z-[1000] flex items-center gap-3">
        <div className="bg-white shadow-card rounded-xl px-4 py-2.5">
          <p className="font-display font-700 text-sm text-slate">GenSan Court Map</p>
          <p className="text-xs text-slate-500">{courts.length} courts pinned</p>
        </div>
        {locationStatus !== 'granted' && (
          <button
            onClick={onRequestLocation}
            className="bg-court text-white text-xs font-semibold px-3 py-2.5 rounded-xl shadow-card hover:bg-court/90"
          >
            Share location
          </button>
        )}
      </div>

      <MapContainer center={center} zoom={13} scrollWheelZoom className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {courts.map((court) => {
          const bookingUrl = court.booking?.url
          const externalTarget = bookingUrl?.startsWith('tel:') ? undefined : '_blank'
          const externalRel = externalTarget ? 'noreferrer' : undefined
          const distanceKm = distances?.[court.id]

          return (
            <Marker
              key={court.id}
              position={[court.latitude, court.longitude]}
              icon={icons(isCourtOpen(court.openingTime, court.closingTime))}
            >
              <Popup>
                <div className="flex flex-col gap-4 p-5">
                  <div className="space-y-3">
                    <p className="text-lg font-semibold tracking-tight text-slate-900">{court.name}</p>
                    <p className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="h-4 w-4 shrink-0 text-emerald-600" />
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
                    <span className="font-semibold text-slate-900">₱{court.pricePerHour}/hr</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {court.hasCourtBooking ? (
                      bookingUrl ? (
                        <a
                          href={bookingUrl}
                          target={externalTarget}
                          rel={externalRel}
                          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-200"
                        >
                          <CalendarCheck className="h-4 w-4" />
                          Book a Court
                        </a>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-400"
                        >
                          <CalendarCheck className="h-4 w-4" />
                          Book a Court
                        </button>
                      )
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-400"
                      >
                        <CalendarCheck className="h-4 w-4" />
                        Book a Court
                      </button>
                    )}

                    {court.hasOpenPlay ? (
                      bookingUrl ? (
                        <a
                          href={bookingUrl}
                          target={externalTarget}
                          rel={externalRel}
                          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-200"
                        >
                          <Users className="h-4 w-4" />
                          Join Open Play
                        </a>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-400"
                        >
                          <Users className="h-4 w-4" />
                          Join Open Play
                        </button>
                      )
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-400"
                      >
                        <Users className="h-4 w-4" />
                        Join Open Play
                      </button>
                    )}
                  </div>

                  {court.googleMapsUrl && (
                    <a
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                      href={court.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin className="h-4 w-4 text-white" />
                      <span className='!text-white'>Get Directions</span>
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          )
        })}

        {position && <Marker position={[position.latitude, position.longitude]} icon={userIcon} />}

        <RecenterButton position={position} />
      </MapContainer>
    </main>
  )
}
