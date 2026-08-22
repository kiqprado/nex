'use client'
import { useState, useRef } from 'react';

import { useWorkout } from './hooks/use-Workout';

import { MyMap } from '@/app/map/My-Map'
import { MapRef } from 'react-map-gl/maplibre'

import { WorkoutSettingsBar } from './components/workout-settings-bar'
import { WorkoutStatsBar  } from './components/workout-stats-bar';
import { WorkoutSummaryModal } from './components/workout-summary-modal';
import { ButtonBackToMe } from '@/app/elements/button-back-to-me'

export default function App() {
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
      <h1 
        className="absolute z-10 top-1 left-2"
      >
        Ne<span className="text-lime-300">X</span>
      </h1>
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
