'use client'

import { useEffect } from "react"

import { MapRef } from "react-map-gl/maplibre"

import { LngLatBounds } from 'maplibre-gl'

import { ActivityPointResponse } from "@/app/types/activity-api"

interface IActivityMapCamera {
  mapRef: React.RefObject<MapRef | null>
  points: ActivityPointResponse[]
}

export function ActivityMapCamera({ mapRef, points }: IActivityMapCamera) {
  useEffect(() => {
    if(!mapRef.current) return
    if(points.length === 0) return

    const bounds = new LngLatBounds()

    points.forEach(point => {
      bounds.extend([
        point.longitude,
        point.latitude
      ])
    })

    mapRef.current.fitBounds(bounds, {
      padding: 50,
      duration: 800,
      maxZoom: 17
    })
  }, [mapRef, points])

  return null
}