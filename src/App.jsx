import { useMemo, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import MobileHeader from './components/MobileHeader'
import MobileDrawer from './components/MobileDrawer'
import FilterPanel from './components/FilterPanel'
import HomePage from './pages/HomePage'
import MapView from './pages/MapView'
import CourtDetailPage from './pages/CourtDetailPage'
import courtsData from './data/courts.json'
import { useGeolocation } from './hooks/useGeolocation'
import { haversineDistanceKm } from './utils/haversine'

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('name-asc')
  const [availability, setAvailability] = useState({ openPlay: false, courtBooking: false })

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

    const sorted = [...list].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'price-asc':
          return a.pricePerHour - b.pricePerHour
        case 'price-desc':
          return b.pricePerHour - a.pricePerHour
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
    <div className="min-h-screen bg-surface">
      <Sidebar onOpenFilters={() => setFiltersOpen(true)} />
      <MobileHeader
        onOpenDrawer={() => setDrawerOpen(true)}
        onOpenFilters={() => setFiltersOpen(true)}
        onOpenSearch={() => setSearchOpen((v) => !v)}
      />
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
                searchOpen={searchOpen}
              />
            }
          />
          <Route
            path="/map"
            element={
              <MapView
                courts={courtsData}
                distances={distances}
                position={position}
                locationStatus={locationStatus}
                onRequestLocation={requestLocation}
              />
            }
          />
          <Route
            path="/court/:id"
            element={
              <CourtDetailPage courts={courtsData} distances={distances} locationStatus={locationStatus} />
            }
          />
        </Routes>
      </div>
    </div>
  )
}
