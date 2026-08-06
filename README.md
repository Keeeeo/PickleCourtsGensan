# PickleCourts GenSan

A responsive, pure front-end directory of pickleball courts in General Santos City, built with React + Vite + Tailwind CSS + react-leaflet.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## What's inside

- `src/data/courts.json` — 8 sample GenSan courts (name, address, coordinates, status, open play / booking availability, price, image).
- `src/hooks/useGeolocation.js` — wraps `navigator.geolocation.getCurrentPosition`.
- `src/utils/haversine.js` — Haversine great-circle distance + display formatting (`"5 km away"`, `"320 m away"`).
- `src/components/` — `Sidebar` (desktop nav), `MobileHeader` + `MobileDrawer` (mobile nav), `CourtCard`, `CardGrid`, `FilterPanel` (sort + availability filters).
- `src/pages/HomePage.jsx` — hero + searchable, filterable, sortable court grid.
- `src/pages/MapView.jsx` — Leaflet map centered on GenSan, one pin per court (green = open, gray = closed), a blue dot for the user's location, and popups with name/address/price/booking status.

## Design notes

- Palette and layout follow the brief exactly: Dark Slate `#0F172A` nav, Pickleball Green `#10B981` accent, Court Blue `#0284C7` secondary, Soft Gray `#F8FAFC` background, white cards.
- Display type is **Rajdhani** (a sporty, slightly condensed face used on court signage and scoreboards) paired with **Inter** for body copy and **JetBrains Mono** for small data labels (distances, prices, "GENSAN" wordmark) — the mono face signals "this is a live number," distinct from the reading type.
- Signature element: a repeating "kitchen line" rule (the dashed line under the non-volley zone every pickleball court shares) used as a quiet divider under the sidebar/header and hero, plus a faint horizontal-line texture on dark surfaces — a detail specific to the sport rather than a generic gradient or icon.
- Distance sort options are disabled (not hidden) until location is shared, so the control panel always shows the full feature set with an honest reason when something isn't available yet.

## Notes on this environment

This project was scaffolded with all source files but `npm install` has not been run here (no network access in this sandbox). Run the two commands above locally to install dependencies and start the dev server.
