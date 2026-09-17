import { ActivityDisplayResponse } from "@/app/types/activity-api"

const API_URL = 'http://localhost:3333'

export async function GetActivities(): Promise<ActivityDisplayResponse[]> {
  const response = await fetch(`${API_URL}/activities`)

  if(!response.ok) {
    throw new Error(`Failed to Fetch Activities on Feed ${response.status}`)
  }

  return response.json() as Promise<ActivityDisplayResponse[]>
}