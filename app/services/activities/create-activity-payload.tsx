import { Activity } from "@/app/types/activity"
import { CreateActivityRequest } from "@/app/types/activity-api"

export function CreateActivityPayload(activity: Activity): CreateActivityRequest {
  if(!activity.startedAt) {
    throw new Error("Activity has no startedAt")
  }

  if (!activity.finishedAt) {
    throw new Error("Activity has no finishedAt")
  }
   
  if (!activity.category) {
    throw new Error("Activity has no category")
  }

  return {
    id: activity.id,

    startedAt: activity.startedAt,
    finishedAt: activity.finishedAt,

    totalDuration: activity.totalDuration,
    activeDuration: activity.activeDuration,
    distance: activity.distance,

    averagePace: activity.averagePace,
    averageActivePace: activity.averageActivePace,
    averageSpeed: activity.averageSpeed,
    maxSpeed: activity.maxSpeed,
    minSpeed: activity.minSpeed,

    calories: activity.calories,
    elevationGain: activity.elevationGain,
    steps: activity.steps,

    path: activity.path,
    category: activity.category,

    mapSnapshot: null
  }

}