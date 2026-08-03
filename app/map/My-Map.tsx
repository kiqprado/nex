'use client'

import Map, {MapRef } from 'react-map-gl/maplibre'
import maplibregl from 'maplibre-gl'

import { CurrentPosition } from '../types/location'

import { UserMarker } from './User-Marker'
import { WorkOutPath } from './WorkOut-Path'
import { CameraController } from './Camera-Controller'

import { InitialMapView } from '../utils/initial-map-view'

interface IMyMap {
  mapRef: React.RefObject<MapRef | null>
  position: CurrentPosition | null
}

export function MyMap({ mapRef, position} : IMyMap) {

  return(
     <Map
      ref={mapRef}
      mapLib={maplibregl}
      initialViewState={InitialMapView}
      mapStyle="https://tiles.openfreemap.org/styles/liberty"
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <CameraController
        mapRef={mapRef}
        position={position}
      />
      <UserMarker/>
      <WorkOutPath/>
    </Map>
  )
}