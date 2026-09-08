import { MapRef } from "react-map-gl/maplibre"

type MapSnapshotPreset = 'preview' | 'feed'

const MAP_SNAPSHOT_PRESETS = {
  preview: {
    width: 480,
    quality: 0.55
  },
  feed: {
    width: 800,
    quality: 0.7
  }
} as const

export function CaptureMapSnapshot(
  mapRef: React.RefObject<MapRef | null>,
  preset: MapSnapshotPreset
): string | null {
  const map = mapRef.current?.getMap()

  if(!map) return null

  const sourceCanvas = map.getCanvas()
  const { width, quality } = MAP_SNAPSHOT_PRESETS[preset]

  const aspectRatio = sourceCanvas.height / sourceCanvas.width
  const targetHeight = Math.round(width * aspectRatio)

  const snapShotCanvas =  document.createElement('canvas')

  snapShotCanvas.width = width
  snapShotCanvas.height = targetHeight

  const context = snapShotCanvas.getContext('2d')
  if(!context) return null

  context.drawImage(
    sourceCanvas,
    0,
    0,
    width,
    targetHeight
  )

  return snapShotCanvas.toDataURL(
    'image/jpeg',
    0.65
  )
}