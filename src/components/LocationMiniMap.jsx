import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'

function pinIcon() {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: 28px; height: 28px; border-radius: 50% 50% 50% 0;
        background: #10B981; transform: rotate(-45deg);
        display:flex; align-items:center; justify-content:center;
        box-shadow: 0 2px 6px rgba(15,23,42,0.35); border: 2px solid white;
      ">
        <div style="width:7px;height:7px;border-radius:50%;background:white; transform: rotate(45deg);"></div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
  })
}

/**
 * Small, non-interactive location snippet map used on the Court Details page.
 * Centers on the court's latitude/longitude and drops a single pin marker.
 */
export default function LocationMiniMap({ latitude, longitude, name }) {
  if (latitude == null || longitude == null) return null

  const position = [latitude, longitude]

  return (
    <div className="h-40 w-full rounded-xl overflow-hidden border border-slate-200">
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        touchZoom={false}
        zoomControl={false}
        attributionControl={false}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={pinIcon()} />
      </MapContainer>
    </div>
  )
}
