import { useEffect, useMemo, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

/* -------------------------------------------------------------------------
   Real-World 2D Satellite Interactive Map for Bonjour Pondy.
   - 100% authentic high-resolution satellite imagery (Esri World Imagery)
   - Zero pins / pointers / markers (clean, unobstructed satellite landscape)
   - Pure 2D top-down view (no 3D tilt)
   - Non-invasive scroll (scrollWheelZoom disabled so card scrolling never jitters)
   - Smooth animated flyToBounds when switching between Day 1, 2, and 3
   - Sleek frosted-glass floating controls (Day badge, Recenter, Zoom In/Out)
   ------------------------------------------------------------------------- */

function getCoordinates(stop) {
  if (stop.point?.lat !== undefined && stop.point?.lng !== undefined) {
    return [stop.point.lat, stop.point.lng]
  }
  if (Array.isArray(stop.point?.at) && stop.point.at.length === 2) {
    return stop.point.at
  }
  return null
}

export default function TripMap({ stops, activeUid, offMap, caption }) {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)

  // Extract valid lat/lng coordinates for the day's route bounds
  const validStops = useMemo(() => {
    return stops
      .map((s) => {
        const coords = getCoordinates(s)
        return coords ? { ...s, coords } : null
      })
      .filter(Boolean)
  }, [stops])

  // Initialize Leaflet Map Instance with 2D Satellite TileLayer
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return

    // Pondicherry center [11.933, 79.833]
    const map = L.map(mapContainerRef.current, {
      center: [11.933, 79.833],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false, // Prevents mouse wheel hijacking when scrolling the card
      doubleClickZoom: true,
      touchZoom: true,
      dragging: true,
      fadeAnimation: true,
    })

    // High-Resolution Esri World Imagery (Satellite Data) - No API Key Needed
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 19,
        attribution: 'Esri, Maxar, Earthstar Geographics',
      },
    ).addTo(map)

    mapInstanceRef.current = map

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Smooth flyToBounds auto-framing when Day changes
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map || validStops.length === 0) return

    const latLngs = validStops.map((s) => s.coords)
    const bounds = L.latLngBounds(latLngs)

    map.flyToBounds(bounds, {
      padding: [48, 48],
      maxZoom: 15,
      duration: 1.1,
      easeLinearity: 0.25,
    })
  }, [validStops])

  // Pan smoothly to active stop when clicked in the itinerary list
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map || !activeUid) return

    const activeStop = validStops.find((s) => s.uid === activeUid)
    if (activeStop) {
      map.panTo(activeStop.coords, { animate: true, duration: 0.7 })
    }
  }, [activeUid, validStops])

  // Recenter / Fit current day's area
  const handleRecenter = () => {
    const map = mapInstanceRef.current
    if (!map || validStops.length === 0) return
    const bounds = L.latLngBounds(validStops.map((s) => s.coords))
    map.flyToBounds(bounds, {
      padding: [48, 48],
      maxZoom: 15,
      duration: 0.8,
    })
  }

  return (
    <div className="map real-apple-map is-satellite">
      {/* 2D Map Viewport */}
      <div className="real-map__canvas" ref={mapContainerRef} />

      {/* Floating Apple Header Badge */}
      {caption && (
        <div className="apple-map__badge">
          <span className="apple-map__badge-dot" />
          <span className="apple-map__badge-text">🛰️ Satellite · {caption}</span>
        </div>
      )}

      {/* Floating Navigation Tools (Bottom Right) */}
      <div className="real-map__nav-tools">
        {/* Recenter Button */}
        <button
          type="button"
          className="apple-tool-btn"
          onClick={handleRecenter}
          title="Fit day's area in view"
          aria-label="Fit view to day's area"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
          </svg>
        </button>

        {/* Zoom In */}
        <button
          type="button"
          className="apple-tool-btn"
          onClick={() => mapInstanceRef.current?.zoomIn()}
          title="Zoom in"
          aria-label="Zoom in"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        {/* Zoom Out */}
        <button
          type="button"
          className="apple-tool-btn"
          onClick={() => mapInstanceRef.current?.zoomOut()}
          title="Zoom out"
          aria-label="Zoom out"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* Off-map notice */}
      {offMap && offMap.length > 0 && (
        <div className="apple-map__off-notice">
          <span>
            {offMap.join(', ')} {offMap.length === 1 ? 'is' : 'are'} beyond the day's area
          </span>
        </div>
      )}
    </div>
  )
}
