'use client'

import { useContext } from "react"
import { WorkoutContext } from "../context/workout-context"

export function useWorkOut() {
  const context = useContext(WorkoutContext)

  if(!context) {
    throw new Error(
      'useWorkOut must be used a WorkoutProvider'
    )
  }

  return context
}



