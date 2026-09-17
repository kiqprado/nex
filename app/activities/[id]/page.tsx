'use client'

import { use, useEffect, useState } from "react"
import { useParams } from "next/navigation"

import { ActivityDetailsResponse } from "@/app/types/activity-api"

import { GetActivityById } from "@/app/services/activities/get-activity-by-id"

import { ActivitySummary } from "@/app/components/activity-summary"

interface IActivityPage {
  params: Promise<{id: string}>
}

export default function ActivityPage({ params }: IActivityPage) {
  const { id } = use(params)
  const [ activity, setActivity ] = useState<ActivityDetailsResponse | null>(null)
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    async function LoadActivity() {
      try{
        const activity = await GetActivityById(id)
        setActivity(activity)
      } catch(error) {
        console.error('Can´t not Loading Activity', error)
      } finally {
        setLoading(false)
      }
    }

    LoadActivity()
  }, [id])

  if(loading) {
    return(
      <span className="block m-auto tracking-wider text-lg">Carregando atividade</span>
    )
  }

  if(!activity) {
    return(
      <span 
        className="block m-auto tracking-wider text-lg"
      >
        Atividade não encontrada!
      </span>
    )
  }

  return(
    <ActivitySummary
      activity={activity}
    />
  )
} 