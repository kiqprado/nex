import { API_URL } from "@/app/config/api"

import type { AuthResponse, CompleteUserProfile} from "@/app/types/auth-api"

export async function CompleteProfile(data: CompleteUserProfile): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/profile`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  )

  if(!response.ok) {
    throw new Error(`Failed to Complete user Profile ${response.status}`)
  }

  return response.json() as Promise<AuthResponse>
}