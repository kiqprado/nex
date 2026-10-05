'use client'

import { useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

import { UseAuth } from "@/app/hooks/use-Auth"

interface IOnboardingGuard {
  children: ReactNode
}

export  function OnboardingGuard({children}: IOnboardingGuard) {
  const router = useRouter()
  const { user, loading, profileCompleted } = UseAuth()

  useEffect(() => {
    if(loading) {
      return
    }

    if(!user) {
      router.replace("/")
      return
    }

    if(profileCompleted) {
      router.replace("/feed")
    }
  }, [loading, user, profileCompleted, router])

  if(loading || !user || profileCompleted) {
    return null
  }

  return children
}