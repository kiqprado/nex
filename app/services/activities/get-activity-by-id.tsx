import { ActivityDetailsResponse } from "@/app/types/activity-api"

const API_URL = 'http://localhost:3333'

export async function GetActivityById(activityId: string): Promise<ActivityDetailsResponse> {
  const response = await fetch(`${API_URL}/activities/${activityId}`)

  if(response.status === 404) {
    return null
  }
  
  if(!response.ok) {
    throw new Error(`Failed to get activity: ${response.status}`)
  }

  return response.json() as Promise<ActivityDetailsResponse>
}