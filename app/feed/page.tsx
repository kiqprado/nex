'use client'

import { useEffect, useState } from "react"

import { ActivityDisplayResponse } from "../types/activity-api"

import { GetActivities } from "../services/activities/get-activities"

import { Menu } from "../components/menu"
import { ActivityDisplay } from "../components/activity-display"

export default function Feed() {
  const [ activities, setActivities ] = useState<ActivityDisplayResponse[]>([])
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    async function LoadActivities() {
      try {
        const activites = await GetActivities()
        setActivities(activites)
      } catch(error) {
        console.error(`Failed to Get Activities, ${error}`)
      } finally {
        setLoading(false)
      }
    }

    LoadActivities()
  }, [])

   if(loading) {
    return(
      <span 
        className="block m-auto tracking-wider text-lg"
      >
        Carregando as atividades...
      </span>
    )
  }

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