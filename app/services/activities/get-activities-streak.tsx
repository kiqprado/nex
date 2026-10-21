import { API_URL } from "@/app/config/api"

import { ActivitiesStreakResponse } from "@/app/types/activity-api"

export async function GetActivitiesStreak(): Promise<ActivitiesStreakResponse> {
  const response = await fetch(`${API_URL}/activities/streak`, {
    credentials: 'include'
  })

  if(!response.ok) {
    throw new Error(`Failed to Fetch Activities Streak ${response.status}`)
  }

  return response.json() as Promise<ActivitiesStreakResponse>
}