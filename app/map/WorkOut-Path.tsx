'use client'

import { useMemo } from "react"

import { Layer, Source } from "react-map-gl/maplibre"

import { UseWorkOut } from "../context/workout-context"

export function WorkOutPath() {
  const { activity } = UseWorkOut()

  const routeGeoJson = useMemo(() => {
    return {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: activity.path.map(point => [
          point.longitude,
          point.latitude
        ])
      }
    }
  }, [activity.path])

  if(activity.path.length < 2) {
    return null
  }

  return(
    <Source
      id="workout-route"
      type="geojson"
      data={routeGeoJson}
    >
      <Layer
        id="workout-route-line"
        type="line"
        paint={{
          'line-color': '#22d3ee',
          'line-width': 6,
          'line-opacity': 0.9,
          'line-cap': 'round',
          'line-join': 'round',
        }}
      />
    </Source>
  )
}