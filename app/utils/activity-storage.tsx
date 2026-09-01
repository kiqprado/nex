import { WorkoutActivity } from "../types/workout-activity"

const ACTIVITY_STORAGE_KEY = "workout-activities"

export function SaveActivity(activity: WorkoutActivity) {
  const activities = GetActivities()

  const updateActivities = [
    ...activities,
    activity
  ]

  localStorage.setItem(
    ACTIVITY_STORAGE_KEY,
    JSON.stringify(updateActivities)
  )
}


export function GetActivities(): WorkoutActivity[] {
  const storedActivities = localStorage.getItem(ACTIVITY_STORAGE_KEY)

  if(!storedActivities) {
    return []
  }

  const activities = JSON.parse(storedActivities)
  
  return activities.map((activity: WorkoutActivity) => ({
    ...activity,
    startedAt: activity.startedAt ? new Date(activity.startedAt) : null,
    finishedAt: activity.finishedAt ? new Date(activity.finishedAt) : null
  }))
}

export function DeleteActivity(activityID: string) {
  
}