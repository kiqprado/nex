'use client'

import { useEffect, useState, useRef, useCallback } from "react"

import { CurrentPosition } from "../types/location"

export interface IUserLocation {
  position: CurrentPosition | null
  permission: 'prompt' | 'granted' | 'denied'
  loading: boolean
  error: GeolocationPositionError | null
  StartTracking: () => void
  StopTracking: () => void
}

export function UserLocation(): IUserLocation {
  const [ position, setPosition ] = useState<CurrentPosition | null>(null)
  const [ permission, setPermission ] = useState<'prompt' | 'granted' | 'denied'>('prompt')
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState<GeolocationPositionError | null>(null)

  const watchIDRef = useRef<number | null>(null)

  const handleRequestSuccess = useCallback(
    ({ coords, timestamp }:  GeolocationPosition) => {
      setPermission('granted')
      setLoading(false)
      setError(null)

      setPosition({
        latitude: coords.latitude,
        longitude: coords.longitude,
        altitude: coords.altitude,
        altitudeAccuracy: coords.altitudeAccuracy,
        speed: coords.speed,
        accuracy: coords.accuracy,
        heading: coords.heading,
        timestamp,
      })
  }, [])

  const handleRequestError = useCallback((err: GeolocationPositionError) => {
    setLoading(false)
    setError(err)

    if(err.code === err.PERMISSION_DENIED) {
      setPermission('denied')
    }
  }, [])

  const StartTracking = useCallback(() => {
    if(!navigator.geolocation) return
    if(watchIDRef.current !== null) {
      return
    }

    setLoading(true)
    setError(null)

    watchIDRef.current = navigator.geolocation.watchPosition(
      handleRequestSuccess,
      handleRequestError, 
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 10000
      }
    )
  }, [handleRequestSuccess, handleRequestError])

  const StopTracking = useCallback(() => {
    if(watchIDRef.current === null) return

    navigator.geolocation.clearWatch(watchIDRef.current)
    watchIDRef.current = null
    setLoading(false)
  }, [])

  useEffect(() => {
    return() => StopTracking()
  }, [StopTracking])

  return {
    position,
    permission,
    loading,
    error,
    
    StartTracking,
    StopTracking
  }
}