'use client'
import { useState, useRef } from 'react';

import { useWorkout } from './hooks/use-Workout';

import { MyMap } from '@/app/map/My-Map'
import { MapRef } from 'react-map-gl/maplibre'

import { WorkOutBar } from './components/workout-bar'
import { WorkOutStats  } from './components/workout-stats';
import { WorkOutActivityCheckListModal } from './components/workout-activity-checklist-modal';

export default function App() {
  const mapRef = useRef<MapRef>(null)
  const [ workoutStatsModal, setWorkoutStatsModal ] = useState(false)
  const { activity, workoutState, elapsedSeconds, runtime,
    StartWorkout, PauseWorkout, ResumeWorkout, FinishWorkout
  } = useWorkout()

  function HandleToggleWorkoutStatsModal() {
    setWorkoutStatsModal(prev => !prev)
  }

  function HandleFinishWorkout() {
    FinishWorkout()
    setWorkoutStatsModal(true)
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

      <WorkOutStats
        activity={activity}
        runtime={runtime}
        elapsedTimer={elapsedSeconds}
      />

      <WorkOutBar
        workoutState={workoutState}
        StartWorkout={StartWorkout}
        PauseWorkout={PauseWorkout}
        ResumeWorkout={ResumeWorkout}
        FinishWorkout={HandleFinishWorkout}
      />

      {workoutStatsModal && (
        <WorkOutActivityCheckListModal
          HandleToggleWorkoutStatsModal={HandleToggleWorkoutStatsModal}
          setWorkoutState={setWorkoutState}
          setElapsedTimer={setElapsedTimer}
        />
      )}
    </main>
  );
}
