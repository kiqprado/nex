'use client'

import { useRouter } from "next/navigation"

import { useWorkout } from "../hooks/use-Workout"

import { FormattedDistance } from "../utils/formatter-display-data/formatted-distance"
import { FormattedTimer } from "../utils/formatter-display-data/formatted-timer"
import { FormattedPace } from "../utils/formatter-display-data/formatted-pace"
import { FormattedSpeed } from "../utils/formatter-display-data/formatted-speed"
import { FormattedElevationGain } from "../utils/formatter-display-data/formatted-elevation-gain"

import Image from "next/image"

interface IWorkoutSummaryModal {
  onCloseSummaryModal: () => void
}

export function WorkoutSummaryModal({onCloseSummaryModal}: IWorkoutSummaryModal) {
  const router = useRouter()

  const {ResetWorkout, FinishWorkout, activity} = useWorkout()

  async function HandleSaveWorkout() {
    try {
      const createdActivity = await FinishWorkout()
      onCloseSummaryModal()
      router.push(`/activities/${createdActivity.id}`)
    } catch(error) {
      console.error('Failed to Save Activity', error)
    }
  }

  function HandleBackToWorkout() {
    onCloseSummaryModal()
  }

  function HandleDeleteWorkout() {
    ResetWorkout()
    onCloseSummaryModal()
  }
  
  return(
    <div className="h-svh w-full inset-0 absolute z-50 flex bg-zinc-950/50">
      <div 
        className="m-auto w-[88%] min-h-[88%] px-6 py-4
          flex flex-col items-center gap-4
         rounded-lg bg-zinc-800"
      >
        {activity.mapSnapshot && (
          <div className="relative h-48 w-full overflow-hidden rounded-xl">
            <Image
              src={activity.mapSnapshot}
              alt="Trajeto da atividade"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        <div className='text-center space-y-2'>
          <h2>Atividade Final</h2>
          <h3 className="text-xl">{activity.category}</h3>
        </div>

        <div className='space-y-4'>
          <div className='flex flex-col items-center justify-center'>
            <span>Distância</span>
            <span>{FormattedDistance(activity.distance)}</span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col items-center justify-center'>
              <span>Tempo Ativo</span>
              <span>{FormattedTimer(activity.activeDuration)}</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <span>Ritmo Ativo</span>
              <span>{FormattedPace(activity.averageActivePace)}</span>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col items-center justify-center'>
              <span>Tempo Total</span>
              <span>{FormattedTimer(activity.totalDuration)}</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <span>Ritmo Total</span>
              <span>{FormattedPace(activity.averagePace)}</span>
            </div>
          </div>
          <div className='flex items-center gap-4 justify-between'>
            <div className='flex flex-col items-center justify-center'>
              <span>Vel. média</span>
              <span>{FormattedSpeed(activity.averageSpeed)}</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <span>Elevação</span>
              <span>{FormattedElevationGain(activity.elevationGain)}</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <span>Déf. Calórico</span>
              <span>{activity.calories}</span>
            </div>
          </div>

        </div>

        <div className="w-full flex flex-col items-center justify-between">
          <button
            className="w-full"
            onClick={HandleSaveWorkout}
          >
            Salvar atividade
          </button>
          
          <div className="w-full flex justify-evenly">
            <button
              onClick={HandleBackToWorkout}
            >
              Voltar
            </button>
            <button
              onClick={HandleDeleteWorkout}
            >
              Deletar
            </button>
          </div>
         
        </div>
      </div>
    </div>
  )
}