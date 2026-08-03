'use client'

import { useEffect, useRef } from "react"

import { MapRef } from "react-map-gl/maplibre"

import { CurrentPosition } from "../types/location"

interface ICameraController {
  mapRef: React.RefObject<MapRef | null>
  position: CurrentPosition | null
}

export function CameraController({ mapRef, position}: ICameraController) {
  const hasPointCentered = useRef(false)

  useEffect(() => {
    if(!position) return
    if(!mapRef.current) return

    if(hasPointCentered.current) return

    mapRef.current.flyTo({
      center: [
        position.longitude,
        position.latitude
      ],
      zoom: 17,
      duration: 1000
    })

    hasPointCentered.current = true
  }, [position, mapRef])

  return null
}