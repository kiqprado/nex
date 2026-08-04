'use client'

import { useWorkout } from "../hooks/use-Workout"
import { Marker } from "react-map-gl/maplibre"

export function UserMarker() {
  const { position } = useWorkout()
  if(!position) return

  return(
    <Marker
      longitude={position.longitude}
      latitude={position.latitude}
      anchor="center"
    >
      <div className="relative">
        <div
          className="absolute inset-0
            h-10 w-10 rounded-full
            bg-cyan-400/20 animate-ping"
        />
        <div
          className="relative h-8 w-8
            rounded-full border-4 border-white
            bg-gradient-to-br
            from-cyan-700
            via-cyan-500
            to-cyan-700
            shadow-lg"
        />
      </div>
    </Marker>
  )
}