import CourtCard from './CourtCard'

export default function CardGrid({ courts, distances, locationStatus }) {
  if (courts.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="font-sans text-xl font-semibold text-slate-900">No courts match those filters</p>
        <p className="text-slate-500 text-sm mt-2">Try clearing a filter or adjusting your search.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courts.map((court) => (
        <CourtCard
          key={court.id}
          court={court}
          distanceKm={distances?.[court.id]}
          locationStatus={locationStatus}
        />
      ))}
    </div>
  )
}
