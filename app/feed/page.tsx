'use client'

import { useEffect, useState } from "react"

import { Activity } from "../types/activity"

import { Menu } from "../components/menu"
import { ActivityDisplay } from "../components/activity-display"

export default function Feed() {
  const [ activities, setActivities ] = useState<Activity[]>([])

  useEffect(() => {
    const storedActivities = localStorage.getItem('workout-activities')
    if(!storedActivities) return

    const parsedActivities = JSON.parse(storedActivities)
    setActivities(parsedActivities)
  },[])
  
  return(
    <div
      className="flex flex-col justify-center gap-3 overflow-y-auto"
    >
      {activities.length > 0 ? (
        activities.slice().reverse().map(activity => (
          <ActivityDisplay
            key={activity.id}
            activity={activity}
          />
        ))
      ) : (
        <span className='block text-center tracking-widest'>
          Você ainda não resgitrou atividades.
        </span>
      )}
      <Menu/>
    </div>
  )
}