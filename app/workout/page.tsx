'use client'
import { useState, useRef } from 'react';

import { useWorkout } from '@/app/hooks/use-Workout'

import { MyMap } from '@/app/map/My-Map'
import { MapRef } from 'react-map-gl/maplibre'

import { WorkoutSettingsBar } from '@/app/components/workout-settings-bar'
import { WorkoutStatsBar  } from '@/app/components/workout-stats-bar'
import { WorkoutSummaryModal } from '@/app/components/workout-summary-modal'
import { ButtonBackToMe } from '@/app/elements/button-back-to-me'

import Link from 'next/link'

import { ArrowUDownLeftIcon } from '@phosphor-icons/react';

export default function Activity() {
  const mapRef = useRef<MapRef>(null)
  const [ workoutSummaryModal, setWorkoutSummaryModal ] = useState(false)
  const { activity, workoutState, activeSeconds, elapsedSeconds, runtime, position,
    StartWorkout, PauseWorkout, StopWorkout, ResumeWorkout
  } = useWorkout()

  function HandleToggleWorkoutSummaryModal() {
    setWorkoutSummaryModal(prev => !prev)
  }

  function HandleStopWorkout() {
    StopWorkout()
    HandleToggleWorkoutSummaryModal()
  }

  function HandleOnBackToMe() {
    if(!position)  return
    if(!mapRef.current) return

    mapRef.current.flyTo({
      center: [
        position.longitude,
        position.latitude
      ],
      zoom: 17,
      duration: 800
    })
  }

  return (
    <main className="h-svh w-full relative">
      <Link
        href={'/feed'}
        className="absolute z-10 top-2 left-2
          px-3 py-0.5 rounded-xl
          bg-zinc-950/70"
      >
        <ArrowUDownLeftIcon size={26}/>
      </Link>
      <div className='h-full w-full'>
        <MyMap
          mapRef={mapRef}
        />
      </div>

      <WorkoutStatsBar
        activity={activity}
        runtime={runtime}
        activeTimer={activeSeconds}
      />

      <WorkoutSettingsBar
        workoutState={workoutState}
        StartWorkout={StartWorkout}
        PauseWorkout={PauseWorkout}
        ResumeWorkout={ResumeWorkout}
        OnStopWorkout={HandleStopWorkout}
      />

      <ButtonBackToMe
        OnBackToMe={HandleOnBackToMe}
      />

      {workoutSummaryModal && (
        <WorkoutSummaryModal
          onCloseSummaryModal={HandleToggleWorkoutSummaryModal}
        />
      )}
    </main>
  );
}
