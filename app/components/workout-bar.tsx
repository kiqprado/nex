'use client'

import { WorkOutActivityState } from '../types/workout-state'

import { Button } from '../elements/button'
import { ButtonCategory } from '../elements/button-category'
import { PlayIcon, PauseIcon, StopIcon } from '@phosphor-icons/react'

interface IWorkOutBar {
  workoutState: WorkOutActivityState
  StartWorkout: () => void
  PauseWorkout: () => void
  ResumeWorkout: () => void
  FinishWorkout: () =>  void
}

export function WorkOutBar({ 
  workoutState,
  StartWorkout,
  PauseWorkout,
  ResumeWorkout,
  FinishWorkout
}: IWorkOutBar) {
  
  function HandleWorkoutToggleState() {
    if( workoutState === 'idle') {
      StartWorkout()
      return
    }

    if(workoutState === 'running') {
      PauseWorkout()
      return
    }

    ResumeWorkout()
  }

  function HandleStopWorkout() {
    FinishWorkout()
  }

  return(
    <div
      className="absolute z-10 bottom-0
      h-[15%] w-full flex items-center justify-between px-12
      bg-zinc-900 border border-zinc-950 rounded-t-md"
    >
      <ButtonCategory/>

      <Button
        onClick={HandleWorkoutToggleState}
        icon={ workoutState === 'running' ? <PauseIcon/> : <PlayIcon/>}
        bgColor='blue'
      />
      
      <Button
        onClick={HandleStopWorkout}
        visible={workoutState !== 'idle'}
        icon={<StopIcon/>}
        bgColor='violet'
      />     
    </div>
  )
}