'use client'

import { useEffect, useState, useRef } from "react"

import { WorkOutActivityState } from "../types/workout-state"

export function WorkOutTimer(workoutState: WorkOutActivityState) {
  const [ elapsedSeconds, setElapsedSeconds ] = useState(0)
  const [ activeSeconds, setActiveSeconds ] = useState(0)

  const activityStartedAtRef = useRef<number | null>(null)
  const currentActivePeriodStartedAtRef = useRef<number | null>(null)

  const accumulatedActiveSecondsRef = useRef(0)
  const accumulatedElapsedSecondsRef = useRef(0)

  useEffect(() => {
    if(workoutState === 'idle') {
      activityStartedAtRef.current = null
      currentActivePeriodStartedAtRef.current = null

      accumulatedActiveSecondsRef.current = 0
      accumulatedElapsedSecondsRef.current = 0

      setElapsedSeconds(0)
      setActiveSeconds(0)

      return
    }

    const now = Date.now()

    if(activityStartedAtRef.current === null) {
      activityStartedAtRef.current = now
    }

    if(workoutState === 'running' && currentActivePeriodStartedAtRef.current === null) {
      currentActivePeriodStartedAtRef.current = now
    }

    if((workoutState === 'paused' || workoutState === 'stopped') 
      && currentActivePeriodStartedAtRef.current !== null) {

      const currentPeriodSeconds = (now - currentActivePeriodStartedAtRef.current) / 1000

      const elapsedPeriodSeconds = 
        (now - activityStartedAtRef.current!) / 1000 - accumulatedElapsedSecondsRef.current
      
      accumulatedActiveSecondsRef.current += currentPeriodSeconds
      accumulatedElapsedSecondsRef.current += elapsedPeriodSeconds

      currentActivePeriodStartedAtRef.current = null

      setElapsedSeconds(Math.floor(accumulatedElapsedSecondsRef.current))
      setActiveSeconds(Math.floor(accumulatedActiveSecondsRef.current))

      return
    }

    if(workoutState === 'finished') {
      return
    }

    const interval = setInterval(() => {
      const currentTime = Date.now()

      let currentElapsedSeconds = accumulatedElapsedSecondsRef.current
      let currentActiveSeconds = accumulatedActiveSecondsRef.current

      if(currentActivePeriodStartedAtRef.current !== null) {
        const currentPeriodSeconds = (currentTime - currentActivePeriodStartedAtRef.current) / 1000

        currentElapsedSeconds += currentPeriodSeconds
        currentActiveSeconds += currentPeriodSeconds
      }

      setElapsedSeconds(Math.floor(currentElapsedSeconds))
      setActiveSeconds(Math.floor(currentActiveSeconds))
    }, 250)

    return () => clearInterval(interval)
  }, [workoutState])

  function ResetTimer() {
    activityStartedAtRef.current = null
    currentActivePeriodStartedAtRef.current = null
    
    accumulatedElapsedSecondsRef.current = 0
    accumulatedActiveSecondsRef.current = 0

    setElapsedSeconds(0)
    setActiveSeconds(0)
  }

  return {
    elapsedSeconds,
    activeSeconds,
    ResetTimer
  }
}