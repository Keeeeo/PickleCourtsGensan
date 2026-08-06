import CourtCard from './CourtCard'

export default function CardGrid({ courts, distances, locationStatus }) {
  if (courts.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="font-display font-700 text-xl text-slate">No courts match those filters</p>
        <p className="text-slate-500 text-sm mt-1">Try clearing a filter or two.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
