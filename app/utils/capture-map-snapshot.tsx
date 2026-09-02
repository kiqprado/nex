import { MapRef } from "react-map-gl/maplibre"

export function CaptureMapSnapshot(mapRef: React.RefObject<MapRef | null>): string | null {
  const map = mapRef.current?.getMap()

  if(!map) return null

  const canvas = map.getCanvas()

  return canvas.toDataURL(
    'image/jpeg',
    0.75
  )
}