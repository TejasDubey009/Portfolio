import { useEffect, useMemo, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { placeById } from './data'
import { Photo } from '../shared/img'

/* -------------------------------------------------------------------------
   Real-World Apple/Google Style Interactive Map for Bonjour Pondy.
   Powered by real OpenStreetMap / CartoDB & Esri Satellite data:
   - Real geographic coordinates, coastlines, and street geometry
   - CartoDB Positron base: Clean Apple Maps light vector aesthetic
   - Esri World Imagery base: High-resolution satellite photography
   - Category-based Apple POI glyph markers (NO "1 2 3" numbering)
   - Smooth animated flyToBounds when switching between Day 1, 2, and 3
   - 3D perspective flyover tilt
   - Floating Apple frosted-glass controls & interactive preview card
   ------------------------------------------------------------------------- */

// Category icons for Apple POI glyph pins (no 1-2-3 numbering!)
const CATEGORY_ICONS = {
  heritage: `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M12 2L2 7v2h20V7L12 2zm-7 9v8h2v-8H5zm5 0v8h2v-8h-2zm5 0v8h2v-8h-2zm5 0v8h2v-8h-2zM3 21v2h18v-2H3z"/>
    </svg>`,
  spirit: `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M12 2c-.6 2.3-2 4.4-4 5.8 1.4 1 2.6 2.3 3.4 3.9.4.7.7 1.4.9 2.1.2-.7.5-1.4.9-2.1.8-1.6 2-2.9 3.4-3.9-2-1.4-3.4-3.5-4-5.8zm-1.8 13.9C8.3 14.8 6.2 14 4 14c1 2.3 2.7 4.2 4.9 5.3 1.3-.9 2.5-2 3.3-3.4zm3.6 0c.8 1.4 2 2.5 3.3 3.4 2.2-1.1 3.9-3 4.9-5.3-2.2 0-4.3.8-6.2 1.9z"/>
    </svg>`,
  beach: `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9zm-1.5 13.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm4.5-5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>`,
  food: `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 5h-2V5h2v3zM2 21h18v2H2z"/>
    </svg>`,
  nature: `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M17 12c0-2.76-2.24-5-5-5s-5 2.24-5 5c0 1.66.81 3.13 2.06 4.06L9 21h6l-.06-4.94C16.19 15.13 17 13.66 17 12z"/>
    </svg>`,
  shop: `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z"/>
    </svg>`,
  meal: `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
    </svg>`,
}

function getCategory(stop) {
  if (stop.kind === 'meal') return 'meal'
  const cats = stop.point?.cats
  if (Array.isArray(cats) && cats.length > 0) {
    return cats[0]
  }
  return 'heritage'
}

function getCoordinates(stop) {
  if (stop.point?.lat !== undefined && stop.point?.lng !== undefined) {
    return [stop.point.lat, stop.point.lng]
  }
  if (Array.isArray(stop.point?.at) && stop.point.at.length === 2) {
    return stop.point.at
  }
  return null
}

export default function TripMap({ stops, activeUid, onPick, offMap, caption }) {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersLayerRef = useRef(null)
  const routeLayerRef = useRef(null)
  const baseTileLayerRef = useRef(null)

  const [mapMode, setMapMode] = useState('map') // 'map' (Apple Positron) or 'satellite' (Esri Imagery)
  const [tilted, setTilted] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState(null)

  // Extract stops that have valid lat/lng coordinates
  const validStops = useMemo(() => {
    return stops
      .map((s) => {
        const coords = getCoordinates(s)
        return coords ? { ...s, coords, category: getCategory(s) } : null
      })
      .filter(Boolean)
  }, [stops])

  // Track active stop for preview card
  useEffect(() => {
    if (!activeUid) {
      setSelectedPlace(null)
      return
    }
    const current = validStops.find((s) => s.uid === activeUid)
    if (current && current.point?.id && placeById[current.point.id]) {
      setSelectedPlace({
        ...placeById[current.point.id],
        order: current.order,
        uid: current.uid,
      })
    } else if (current && current.kind === 'meal') {
      setSelectedPlace({
        id: current.uid,
        name: current.name,
        cost: current.point?.cost,
        order: current.order,
        isMeal: true,
        uid: current.uid,
      })
    }
  }, [activeUid, validStops])

  // Initialize Leaflet Map Instance
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return

    // Pondicherry Promenade center: [11.933, 79.833]
    const map = L.map(mapContainerRef.current, {
      center: [11.933, 79.833],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
      fadeAnimation: true,
    })

    // CartoDB Positron (Apple Maps Light Vector Style)
    const positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map)

    baseTileLayerRef.current = positron

    // Dedicated layers for markers and route
    const routeLayer = L.layerGroup().addTo(map)
    const markersLayer = L.layerGroup().addTo(map)
    routeLayerRef.current = routeLayer
    markersLayerRef.current = markersLayer

    mapInstanceRef.current = map

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Switch between Apple Map & Satellite Imagery
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    if (baseTileLayerRef.current) {
      map.removeLayer(baseTileLayerRef.current)
    }

    if (mapMode === 'satellite') {
      // Esri World Imagery (High-Resolution Satellite)
      baseTileLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 19 },
      ).addTo(map)
    } else {
      // CartoDB Positron (Apple Maps Light Mode)
      baseTileLayerRef.current = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        { maxZoom: 19, subdomains: 'abcd' },
      ).addTo(map)
    }
  }, [mapMode])

  // Update Markers, Route & Auto-Frame when Day stops change
  useEffect(() => {
    const map = mapInstanceRef.current
    const markersLayer = markersLayerRef.current
    const routeLayer = routeLayerRef.current
    if (!map || !markersLayer || !routeLayer) return

    markersLayer.clearLayers()
    routeLayer.clearLayers()

    if (validStops.length === 0) return

    const latLngs = validStops.map((s) => s.coords)

    // Draw Smooth Glowing Route Polyline
    if (latLngs.length > 1) {
      // Glow underlay
      L.polyline(latLngs, {
        color: mapMode === 'satellite' ? '#38bdf8' : '#007aff',
        weight: 8,
        opacity: 0.35,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(routeLayer)

      // Main line
      L.polyline(latLngs, {
        color: mapMode === 'satellite' ? '#38bdf8' : '#007aff',
        weight: 3.5,
        opacity: 0.95,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(routeLayer)
    }

    // Add Category-based Apple POI Glyph Markers (NO 1-2-3 numbering!)
    validStops.forEach((s) => {
      const active = s.uid === activeUid
      const cat = s.category || 'heritage'
      const iconSvg = CATEGORY_ICONS[cat] || CATEGORY_ICONS.heritage

      const customIcon = L.divIcon({
        className: 'apple-poi-container',
        html: `
          <div class="apple-poi-marker cat--${cat} ${active ? 'is-active' : ''}">
            <div class="apple-poi-badge">
              <span class="apple-poi-glyph">${iconSvg}</span>
              ${active ? '<span class="apple-poi-pulse"></span>' : ''}
            </div>
            <div class="apple-poi-pointer"></div>
            <div class="apple-poi-shadow"></div>
          </div>
        `,
        iconSize: [34, 44],
        iconAnchor: [17, 44],
      })

      const marker = L.marker(s.coords, { icon: customIcon }).addTo(markersLayer)

      marker.on('click', () => {
        onPick(s.uid)
        if (s.point?.id && placeById[s.point.id]) {
          setSelectedPlace({
            ...placeById[s.point.id],
            order: s.order,
            uid: s.uid,
          })
        } else if (s.kind === 'meal') {
          setSelectedPlace({
            id: s.uid,
            name: s.name,
            cost: s.point?.cost,
            order: s.order,
            isMeal: true,
            uid: s.uid,
          })
        }
        map.panTo(s.coords, { animate: true, duration: 0.5 })
      })
    })

    // Smooth Apple flyToBounds animation when Day changes
    const bounds = L.latLngBounds(latLngs)
    map.flyToBounds(bounds, {
      padding: [54, 54],
      maxZoom: 15,
      duration: 1.1,
      easeLinearity: 0.25,
    })
  }, [validStops, activeUid, mapMode, onPick])

  // Recenter / Fit Day Stops
  const handleRecenter = () => {
    const map = mapInstanceRef.current
    if (!map || validStops.length === 0) return
    const bounds = L.latLngBounds(validStops.map((s) => s.coords))
    map.flyToBounds(bounds, {
      padding: [54, 54],
      maxZoom: 15,
      duration: 0.8,
    })
  }

  return (
    <div className={`map real-apple-map${tilted ? ' is-3d-tilted' : ''}${mapMode === 'satellite' ? ' is-satellite' : ''}`}>
      {/* 3D Perspective Viewport */}
      <div className="real-map__perspective-wrapper">
        <div className="real-map__canvas" ref={mapContainerRef} />
      </div>

      {/* Floating Apple Header Badge */}
      {caption && (
        <div className="apple-map__badge">
          <span className="apple-map__badge-dot" />
          <span className="apple-map__badge-text">{caption}</span>
        </div>
      )}

      {/* Top Floating Apple Mode Controls */}
      <div className="real-map__top-controls">
        {/* Map / Satellite Layer Switcher */}
        <div className="apple-seg-control" role="group" aria-label="Map layer">
          <button
            type="button"
            className={mapMode === 'map' ? 'is-active' : ''}
            onClick={() => setMapMode('map')}
          >
            Map
          </button>
          <button
            type="button"
            className={mapMode === 'satellite' ? 'is-active' : ''}
            onClick={() => setMapMode('satellite')}
          >
            Satellite
          </button>
        </div>

        {/* 2D / 3D Perspective Tilt Switcher */}
        <div className="apple-seg-control" role="group" aria-label="Perspective">
          <button
            type="button"
            className={!tilted ? 'is-active' : ''}
            onClick={() => setTilted(false)}
          >
            2D
          </button>
          <button
            type="button"
            className={tilted ? 'is-active' : ''}
            onClick={() => setTilted(true)}
          >
            3D
          </button>
        </div>
      </div>

      {/* Bottom-Right Apple Navigation Tools */}
      <div className="real-map__nav-tools">
        {/* Recenter Button */}
        <button
          type="button"
          className="apple-tool-btn"
          onClick={handleRecenter}
          title="Fit day's stops in view"
          aria-label="Fit view to day's route"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
          </svg>
        </button>

        {/* Zoom In / Out Buttons */}
        <button
          type="button"
          className="apple-tool-btn"
          onClick={() => mapInstanceRef.current?.zoomIn()}
          title="Zoom in"
          aria-label="Zoom in"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        <button
          type="button"
          className="apple-tool-btn"
          onClick={() => mapInstanceRef.current?.zoomOut()}
          title="Zoom out"
          aria-label="Zoom out"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* Floating Apple Place Preview Card on Marker Click */}
      {selectedPlace && (
        <div className="apple-card rise" role="dialog" aria-label={selectedPlace.name}>
          <button
            type="button"
            className="apple-card__close"
            onClick={() => setSelectedPlace(null)}
            aria-label="Dismiss preview"
          >
            ✕
          </button>
          <div className="apple-card__content">
            {selectedPlace.photo && (
              <div className="apple-card__thumb">
                <Photo id={selectedPlace.photo} alt={selectedPlace.name} ratio={1} widths={[120]} />
              </div>
            )}
            <div className="apple-card__info">
              {selectedPlace.cats && selectedPlace.cats.length > 0 && (
                <span className="apple-card__category-badge">
                  {selectedPlace.cats.join(' · ').toUpperCase()}
                </span>
              )}
              <h4 className="apple-card__title">{selectedPlace.name}</h4>
              {selectedPlace.blurb && <p className="apple-card__blurb">{selectedPlace.blurb}</p>}
              <div className="apple-card__meta">
                {selectedPlace.mins && <span>⏱ {selectedPlace.mins} mins</span>}
                {selectedPlace.cost !== undefined && <span>₹ {selectedPlace.cost || 'Free'}</span>}
                {selectedPlace.tip && (
                  <button
                    type="button"
                    className="apple-card__view-btn"
                    onClick={() => onPick(selectedPlace.uid || selectedPlace.id)}
                  >
                    View in itinerary →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Off-map notice */}
      {offMap.length > 0 && (
        <div className="apple-map__off-notice">
          <span>{offMap.join(', ')} {offMap.length === 1 ? 'is' : 'are'} beyond the day's route</span>
        </div>
      )}
    </div>
  )
}
