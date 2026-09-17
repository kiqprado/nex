'use client'

import { useRef } from "react"

import Map, { MapRef } from "react-map-gl/maplibre"
import maplibregl from 'maplibre-gl'

import { ActivityPointResponse } from "@/app/types/activity-api"

import { ActivityMapPath } from "./activity-map-path"
import { ActivityMapCamera } from "./activity-map-camera"

interface IActivityMap {
  points: ActivityPointResponse[]
}

export function ActivityMap({ points }: IActivityMap) {
  const mapRef = useRef<MapRef | null>(null)

  return (
    <Map
      ref={mapRef}
      mapLib={maplibregl}

      initialViewState={{
        longitude: points[0]?.longitude ?? -47.008236,
        latitude: points[0]?.latitude ?? -24.317812,
        zoom: 14
      }}

      mapStyle="https://tiles.openfreemap.org/styles/liberty"

      style={{
        width: '100%',
        height: '100%'
      }}
    >
      <ActivityMapCamera
        mapRef={mapRef}
        points={points}
      />

      <ActivityMapPath
        points={points}
      />
    </Map>
  )
}