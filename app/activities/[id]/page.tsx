'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import { Activity } from "@/app/types/activity"

import { ActivitySummary } from "@/app/components/activity-summary"

export default function ActivityPage() {
  const params = useParams<{id: string}>()
  const [ activity, setActivity ] = useState<Activity | null>(null)

  useEffect(() => {
    const storedActivities = localStorage.getItem('workout-activities')
    if(!storedActivities) return

    const activities: Activity[] = JSON.parse(storedActivities)

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