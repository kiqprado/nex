import { API_URL } from "@/app/config/api"

import { ActivityDetailsResponse } from "@/app/types/activity-api"

export async function GetActivityById(activityId: string): Promise<ActivityDetailsResponse> {
  const response = await fetch(`${API_URL}/activities/${activityId}`)

  if(response.status === 404) {
    throw new Error(`Activity not found ${response.status}`)
  }
  
  if(!response.ok) {
    throw new Error(`Failed to get activity: ${response.status}`)
  }

  return response.json() as Promise<ActivityDetailsResponse>
}