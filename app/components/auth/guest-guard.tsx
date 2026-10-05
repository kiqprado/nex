'use client'

import { useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

import { UseAuth } from "@/app/hooks/use-Auth"

interface IGuestGuard {
  children: ReactNode
}

export function GuestGuard({ children }: IGuestGuard) {
  const router = useRouter()
  const { user, loading, profileCompleted} = UseAuth()

  useEffect(() => {
   if(loading || !user) {
    return
   }

   if(!profileCompleted) {
    router.replace("/complete-profile")
    return
   }

   router.replace("/feed")
  }, [user, router, loading, profileCompleted])

  if(loading || user) {
    return null
  }

  return children
}