import { CurrentPosition } from "./location"
import { WorkoutCategory } from "./workout-category"

export interface ActivitySport {
  id: string
  name: string
  slug: string

  icon: string | null

  createdAt: string
  updatedAt: string
}

export interface CreateActivityRequest {
  id: string

  startedAt: Date
  finishedAt: Date

  totalDuration: number
  activeDuration: number
  distance: number

  averagePace: number
  averageActivePace: number
  averageSpeed: number
  maxSpeed: number
  minSpeed: number

  calories: number
  elevationGain: number
  steps: number

  path: CurrentPosition[]
  category: WorkoutCategory

  mapSnapshot: string | null
}

export interface ActivityResponse {
  id: string

  userId: string
  sportId: string

  title: string
  description: string | null

  startedAt: string
  finishedAt: string

  totalDuration: number
  activeDuration: number
  distance: number

  averagePace: number
  averageActivePace: number
  averageSpeed: number
  maxSpeed: number
  minSpeed: number

  calories: number
  elevationGain: number
  steps: number

  mapSnapshotUrl: string | null

  createdAt: string
  updatedAt: string
}

export interface ActivityPointResponse {
  id: string
  activityId: string

  latitude: number
  longitude: number

  altitude: number | null
  altitudeAccuracy: number | null
  accuracy: number

  speed: number | null
  heading: number | null

  timestamp: string
}

export interface ActivitySportResponse {
  id: string

  name: string
  slug: string
  icon: string | null

  createdAt: string
  updatedAt: string
}

export interface ActivityDetailsResponse extends ActivityResponse {
  sport: ActivitySportResponse
  points: ActivityPointResponse[]
}

export interface ActivityDisplayResponse extends ActivityResponse {
  sport: ActivitySportResponse
}