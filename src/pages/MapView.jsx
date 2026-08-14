import { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Crosshair, Users, CalendarCheck, MapPin, Navigation, Plus, Minus, Search, X } from 'lucide-react'
import { formatDistance } from '../utils/haversine'
import { isCourtOpen } from '../utils/courtStatus'
import { formatPriceRange } from '../utils/price'

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

/** Vertically stacked +/- zoom buttons, styled to sit directly on top of the info card. */
function ZoomStack() {
  const map = useMap()
  return (
    <div className="flex flex-col w-11 rounded-xl overflow-hidden shadow-card bg-white border border-slate-200">
      <button
        type="button"
        onClick={() => map.zoomIn()}
        className="h-10 flex items-center justify-center text-slate-700 hover:bg-slate-50 border-b border-slate-200 active:bg-slate-100"
        aria-label="Zoom in"
      >
        <Plus className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => map.zoomOut()}
        className="h-10 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:bg-slate-100"
        aria-label="Zoom out"
      >
        <Minus className="w-4 h-4" />
      </button>
    </div>
  )
}

/**
 * Bottom-left cluster: zoom controls stacked on top of the court-count card,
 * with the "Share location" button placed beside the card.
 */
function BottomLeftControls({ totalCourts, locationStatus, onRequestLocation }) {
  return (
    <div className="absolute bottom-6 left-4 z-[1000] flex flex-col items-start gap-2">
      <ZoomStack />
      <div className="flex items-center gap-3">
        <div className="bg-white shadow-card rounded-xl px-4 py-2.5">
          <p className="font-display font-700 text-sm text-slate">GenSan Court Map</p>
          <p className="text-xs text-slate-500">{totalCourts} courts pinned</p>
        </div>
        {locationStatus !== 'granted' && (
          <button
            onClick={onRequestLocation}
            className="bg-court text-white text-xs font-semibold px-3 py-2.5 rounded-xl shadow-card hover:bg-court/90 whitespace-nowrap"
          >
            Share location
          </button>
        )}
      </div>
    </div>
  )
}

/** Flies/fits the map to the current search matches. Lives inside MapContainer so it can call useMap(). */
function SearchFlyTo({ query, matches }) {
  const map = useMap()

  useEffect(() => {
    if (!query.trim() || matches.length === 0) return

    const timeout = setTimeout(() => {
      if (matches.length === 1) {
        map.flyTo([matches[0].latitude, matches[0].longitude], 15, { duration: 0.75 })
      } else {
        const bounds = L.latLngBounds(matches.map((c) => [c.latitude, c.longitude]))
        map.fitBounds(bounds, { padding: [64, 64], maxZoom: 15 })
      }
    }, 300)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, matches.length])

  return null
}

/** Compact search bar pinned to the top-right of the map. */
function TopRightSearch({ value, onChange }) {
  return (
    <div className="absolute top-4 right-4 z-[1000] w-[min(15rem,calc(100vw-2rem))]">
      <div className="flex items-center gap-2 bg-white shadow-card rounded-xl px-3 py-2.5">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search courts..."
          aria-label="Search courts by name or address"
          className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="shrink-0 text-slate-400 hover:text-slate-600"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export default function MapView({ courts, distances, position, locationStatus, onRequestLocation }) {
  const center = position ? [position.latitude, position.longitude] : GENSAN_CENTER
  const [searchQuery, setSearchQuery] = useState('')

  const icons = useMemo(() => {
    const cache = {}
    return (isOpen) => {
      if (!(isOpen in cache)) cache[isOpen] = courtIcon(isOpen)
      return cache[isOpen]
    }
  }, [])

  const filteredCourts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return courts
    return courts.filter(
      (c) => c.name.toLowerCase().includes(q) || c.address?.toLowerCase().includes(q),
    )
  }, [courts, searchQuery])

  return (
    <main className="h-[calc(100vh-4rem)] md:h-screen relative isolate">
      <MapContainer center={center} zoom={13} scrollWheelZoom zoomControl={false} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredCourts.map((court) => {
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
              <Tooltip permanent direction="top" offset={[0, -30]} className="court-label" opacity={1}>
                {court.name}
              </Tooltip>

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
                    <span className="font-semibold text-slate-900">{formatPriceRange(court.pricePerHour)}</span>
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

        <BottomLeftControls
          totalCourts={filteredCourts.length}
          locationStatus={locationStatus}
          onRequestLocation={onRequestLocation}
        />
        <RecenterButton position={position} />
        <SearchFlyTo query={searchQuery} matches={filteredCourts} />
      </MapContainer>

      <TopRightSearch value={searchQuery} onChange={setSearchQuery} />
    </main>
  )
}
