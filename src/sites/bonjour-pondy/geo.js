// The patch of coast the map covers, and how a latitude and longitude land on
// the map's fixed 1000 × 1128 drawing.

export const W = 1000
export const H = 1128

const BOUNDS = { north: 12.02, south: 11.86, west: 79.725, east: 79.87 }

export const project = ({ lat, lng }) => ({
  x: ((lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * W,
  y: ((BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south)) * H,
})

export const onMap = ({ lat, lng }) =>
  lat <= BOUNDS.north && lat >= BOUNDS.south && lng >= BOUNDS.west && lng <= BOUNDS.east
