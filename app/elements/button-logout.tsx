import { useRouter } from "next/navigation"
import { UseAuth } from "../hooks/use-Auth"

import { LogoutUser } from "../services/auth/logout-user"

export function LogoutButton() {
  const router = useRouter()
  const { SetUser } = UseAuth()

  async function HandleLogoutUser() {
    try {
      await LogoutUser()

      SetUser(null)

      router.replace("/")
    } catch (error) {
      console.error("Failed to logout User", error)
    }
  }

  return(
     <button
      type="button"
      onClick={HandleLogoutUser}
      className="absolute top-2 right-2
        tracking-wider text-sm"
    >
      Sair
    </button>
  )
}