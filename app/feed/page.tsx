'use client'

import { useEffect, useState } from "react"

import { WorkoutActivity } from "../types/workout-activity"

import { Menu } from "../components/menu"
import { ActivityDisplay } from "../components/activity-display"

export default function Feed() {
  const [activity, setActivity ] = useState<WorkoutActivity | null>(null)

  useEffect(() => {
    const storedActivity = localStorage.getItem('workout-activity')

    if(!storedActivity) return

    const parsedActivity: WorkoutActivity = JSON.parse(storedActivity)

    setActivity(parsedActivity)
  }, [])
  
  return(
    <div
      className="flex flex-col justify-center gap-3 overflow-y-auto"
    >
      { activity ? (
        <ActivityDisplay
          activity={activity}
        />
      ) : (
        <span 
          className="block text-center tracking-wider"
        >
          Você ainda não registrou atividade.
        </span>
      )}
      
      <Menu/>
    </div>
  )
}