import { API_URL } from "@/app/config/api"

import { ActivitiesCountResponse } from '@/app/types/activity-api'

export async function GetActivitiesCount(): Promise<ActivitiesCountResponse> {
  const response = await fetch(`${API_URL}/activities/count`, {
    credentials: "include"
  })

  if(!response.ok) {
    throw new Error(`Failed to Fetch Activities Count ${response.status}`)
  }

  return response.json() as Promise<ActivitiesCountResponse>
}

