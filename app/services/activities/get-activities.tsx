import { API_URL } from "@/app/config/api"

import { ActivityDisplayResponse } from "@/app/types/activity-api"

export async function GetActivities(): Promise<ActivityDisplayResponse[]> {
  const response = await fetch(`${API_URL}/activities`)

  if(!response.ok) {
    throw new Error(`Failed to Fetch Activities on Feed ${response.status}`)
  }

  return response.json() as Promise<ActivityDisplayResponse[]>
}