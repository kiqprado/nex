'use client'

import { useEffect, useState, useRef } from "react"

import { WorkOutActivityState } from "../types/workout-state"

export function WorkOutTimer(workoutState: WorkOutActivityState) {
  const [ elapsedSeconds, setElapsedSeconds ] = useState(0)
  
  const startedAtRef = useRef<number | null>(null)
  const pausedElapsedTimerRef = useRef(0)

  useEffect(() => {
    if(workoutState === 'idle') {
      startedAtRef.current = null
      pausedElapsedTimerRef.current = 0
      setElapsedSeconds(0)
      return
    }

    if(workoutState === 'paused') {
      pausedElapsedTimerRef.current = elapsedSeconds
      return
    }

    if(startedAtRef.current === null) {
      startedAtRef.current = Date.now() - pausedElapsedTimerRef.current * 1000
    }

    const interval = setInterval(() => {
      if(!startedAtRef.current) return

      setElapsedSeconds(Math.floor(Date.now() - startedAtRef.current) / 1000)
    }, 250)

    return () =>  clearInterval(interval)
  }, [workoutState])

  function ResetTimer() {
    startedAtRef.current = null
    pausedElapsedTimerRef.current = 0
    setElapsedSeconds(0)
  }

  return {
    elapsedSeconds,
    ResetTimer
  }
}