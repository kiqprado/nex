import { CurrentPosition } from "./location"
import { WorkoutCategory } from "./workout-category"

export interface Activity {
  id: string

  startedAt:  Date | null
  finishedAt: Date | null

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
  mapSnapshot: string | null
  category: WorkoutCategory | null
}

export function CreateInitialActivity(): Activity {
  return {
    id: '',

    startedAt: null,
    finishedAt: null,

    totalDuration: 0,
    activeDuration: 0,
    distance: 0,

    averagePace: 0,
    averageActivePace: 0,
    averageSpeed: 0,
    maxSpeed: 0,
    minSpeed: 0,

    calories: 0,
    elevationGain: 0,
    steps: 0,

    path: [],
    mapSnapshot: null,
    category: null
  }
}