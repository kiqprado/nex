'use client'

import { useMemo } from "react"
import { Layer, Source } from "react-map-gl/maplibre"

import { ActivityPointResponse } from "@/app/types/activity-api"

interface IActivityMapPath {
  points: ActivityPointResponse[]
}

export function ActivityMapPath({ points}: IActivityMapPath) {
  const routeGeoJson = useMemo(() => ({
    type: 'Feature' as const,
    properties: {},
    geometry: {
      type: 'LineString' as const,
      coordinates: points.map(point =>[
        point.longitude,
        point.latitude
      ])
    }
  }), [points])

  if(points.length < 2) {
    return null
  }

  return(
    <Source
      id="activity-route"
      type="geojson"
      data={routeGeoJson}
    >
      <Layer
        id="activity-route-line"
        type="line"

        layout={{
          'line-cap': 'round',
          'line-join': 'round'
        }}

        paint={{
          'line-color': '#22d3ee',
          'line-width': 6,
          'line-opacity': 0.9
        }}
      />
    </Source>
  )
}