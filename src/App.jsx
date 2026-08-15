import { useMemo, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import MobileHeader from './components/MobileHeader'
import MobileDrawer from './components/MobileDrawer'
import FilterPanel from './components/FilterPanel'
import HomePage from './pages/HomePage'
import MapView from './pages/MapView'
import CourtDetailPage from './pages/CourtDetailPage'
import AboutPage from './pages/AboutPage'
import courtsData from './data/courts.json'
import { useGeolocation } from './hooks/useGeolocation'
import { haversineDistanceKm } from './utils/haversine'
import { isCourtOpen } from './utils/courtStatus'
import { getMinPrice, getMaxPrice } from './utils/price'

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('name-asc')
  const [availability, setAvailability] = useState({
    openPlay: false,
    courtBooking: false,
    openNow: false,
    indoor: false,
    outdoor: false,
  })

  const { position, status: locationStatus, request: requestLocation } = useGeolocation({ auto: true })

  const distances = useMemo(() => {
    if (!position) return {}
    const map = {}
    for (const court of courtsData) {
      map[court.id] = haversineDistanceKm(
        position.latitude,
        position.longitude,
        court.latitude,
        court.longitude,
      )
    }
    return map
  }, [position])

  const visibleCourts = useMemo(() => {
    let list = courtsData.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()))

    if (availability.openPlay) list = list.filter((c) => c.hasOpenPlay)
    if (availability.courtBooking) list = list.filter((c) => c.hasCourtBooking)
    if (availability.openNow) list = list.filter((c) => isCourtOpen(c.openingTime, c.closingTime))
    if (availability.indoor) list = list.filter((c) => c.isIndoor)
    if (availability.outdoor) list = list.filter((c) => c.isOutdoor)

    const sorted = [...list].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'price-asc':
          return (getMinPrice(a.pricePerHour) ?? Infinity) - (getMinPrice(b.pricePerHour) ?? Infinity)
        case 'price-desc':
          return (getMaxPrice(b.pricePerHour) ?? -Infinity) - (getMaxPrice(a.pricePerHour) ?? -Infinity)
        case 'distance-asc':
          return (distances[a.id] ?? Infinity) - (distances[b.id] ?? Infinity)
        case 'distance-desc':
          return (distances[b.id] ?? -Infinity) - (distances[a.id] ?? -Infinity)
        default:
          return 0
      }
    })

    return sorted
  }, [query, availability, sortBy, distances])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Sidebar onOpenFilters={() => setFiltersOpen(true)} />
      <MobileHeader onOpenDrawer={() => setDrawerOpen(true)} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <FilterPanel
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        sortBy={sortBy}
        onSortChange={setSortBy}
        availability={availability}
        onAvailabilityChange={setAvailability}
        locationStatus={locationStatus}
        onRequestLocation={requestLocation}
      />

      <div className="md:pl-20 lg:pl-64">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                courts={visibleCourts}
                distances={distances}
                locationStatus={locationStatus}
                query={query}
                onQueryChange={setQuery}
                onRequestLocation={requestLocation}
                onOpenFilters={() => setFiltersOpen(true)}
              />
            }
          />
          <Route
            path="/map"
            element={
              <MapView
                courts={visibleCourts}
                distances={distances}
                position={position}
                locationStatus={locationStatus}
                onRequestLocation={requestLocation}
                query={query}
                onQueryChange={setQuery}
                onOpenFilters={() => setFiltersOpen(true)}
              />
            }
          />
          <Route
            path="/court/:id"
            element={
              <CourtDetailPage courts={courtsData} distances={distances} locationStatus={locationStatus} />
            }
          />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </div>
  )
}
