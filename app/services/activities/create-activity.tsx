import { API_URL } from "@/app/config/api"

import { Activity } from "@/app/types/activity"
import { ActivityResponse } from "@/app/types/activity-api"

import { CreateActivityPayload } from "./create-activity-payload"

export async function CreateActivity(activity: Activity): Promise<ActivityResponse> {
  const payload = CreateActivityPayload(activity)

  const response = await fetch(`${API_URL}/activities`, {
    method: 'POST',
    credentials: "include",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(payload)
  })

  if(!response.ok) {
    throw new Error(`Failed to Create activity: ${response.status}`)
  }

  return response.json() as Promise<ActivityResponse>
}