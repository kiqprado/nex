export type CurrentPosition = {
  longitude: number
  latitude: number
  altitude: number | null

  accuracy: number
  altitudeAccuracy: number | null
  speed: number | null
  
  heading: number | null
  timestamp: number
}