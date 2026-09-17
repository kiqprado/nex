'use client'

import { useEffect, useRef } from "react"
import { useWorkout } from "@/app/hooks/use-Workout"
import { MapRef } from "react-map-gl/maplibre"

interface ICameraController {
  mapRef: React.RefObject<MapRef | null>
}

export function CameraController({ mapRef}: ICameraController) {
  const { position } = useWorkout()
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