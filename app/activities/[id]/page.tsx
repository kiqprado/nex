'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import { WorkoutActivity } from "@/app/types/workout-activity"

import { ActivitySummary } from "@/app/components/activity-summary"

export default function ActivityPage() {
  const params = useParams<{id: string}>()
  const [ activity, setActivity ] = useState<WorkoutActivity | null>(null)

  useEffect(() => {
    const storedActivities = localStorage.getItem('workout-activities')
    if(!storedActivities) return

    const activities: WorkoutActivity[] = JSON.parse(storedActivities)

    const foundActivity = activities.find(activity => activity.id === params.id)
    if(foundActivity) {
      setActivity(foundActivity)
    }
  }, [params.id])

  if(!activity) {
    return(
      <div>
        Atividade não encontrada!
      </div>
    )
  }

  return(
    <ActivitySummary
      activity={activity}
    />
  )
} 