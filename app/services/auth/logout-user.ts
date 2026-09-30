import { API_URL } from "@/app/config/api"

export async function LogoutUser(): Promise<void> {
  const response = await fetch(`${API_URL}/auth/logout`, 
    {method: "POST", credentials: "include"}
  )

  if(!response.ok) {
    throw new Error(`Failed to Logout user ${response.status}`)
  }
}