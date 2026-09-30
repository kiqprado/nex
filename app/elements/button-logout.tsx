import { useRouter } from "next/navigation"

import { LogoutUser } from "../services/auth/logout-user"

export function LogoutButton() {
  const router = useRouter()

  async function HandleLogoutUser() {
    try {
      await LogoutUser()

      router.replace("/")
      router.refresh()
    } catch (error) {
      console.error("Failed to logout User", error)
    }
  }

  return(
     <button
      type="button"
      onClick={HandleLogoutUser}
    >
      Sair
    </button>
  )
}