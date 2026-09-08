'use client'

import { createContext, useState, useEffect, useMemo, useCallback, type ReactNode } from "react"

import { CreateInitialActivity, Activity } from "../types/activity"
import { WorkOutActivityState } from "../types/workout-state"
import { WorkoutRunTime } from "../types/workout-runtime"
import { WorkoutCategory } from "../types/workout-category"
import { CurrentPosition } from "../types/location"

import { UserLocation } from "../hooks/use-User-Location"
import { WorkOutTimer } from "../hooks/use-Workout-Timer"

import { IsValidPosition } from "../utils/location-setup/is-valid-position"
import { IsTrackablePosition } from "../utils/location-setup/is-trackable-position"
import { CalculateDistance } from "../utils/location-setup/calculate-distance"
import { CalculateElevate } from "../utils/location-setup/calculate-elevate"
import { CalculateSpeed } from "../utils/workout-setup/calculate-speed"
import { CalculatePace } from "../utils/workout-setup/calculate-pace"
import { SaveActivity } from "../utils/activity-storage"

interface IWorkOutContextData {
  activity: Activity
  workoutState: WorkOutActivityState
  elapsedSeconds: number
  activeSeconds: number
  runtime: WorkoutRunTime
  position: CurrentPosition | null

  SetWorkoutCategory(category: WorkoutCategory): void
  StartWorkout(): void
  PauseWorkout(): void
  ResumeWorkout(): void
  StopWorkout(mapSnapshot: string | null): void
  FinishWorkout(): Activity
  ResetWorkout(): void
}

export const WorkoutContext = createContext<IWorkOutContextData | null>(null)

interface WorkoutProviderProps {
  children: ReactNode
}

export function WorkOutProvider({children}: WorkoutProviderProps){
  const { position, StartTracking, StopTracking } = UserLocation()
  const [ activity, setActivity ] = useState(CreateInitialActivity())
  const [ workoutState, setWorkoutState ] =  useState<WorkOutActivityState>('idle')
  const [ runtime, setRuntime ] = useState<WorkoutRunTime>({currentSpeed: 0, currentPace: 0})
  const { elapsedSeconds, activeSeconds, ResetTimer} = WorkOutTimer(workoutState)

  // GPS
  useEffect(() => {
    StartTracking()

    return () => StopTracking()
  }, [StartTracking, StopTracking])

  // PATH GPS PROCESS
  useEffect(() => {
    if(workoutState !== 'running') return
    if(!position) return 
    if(!IsValidPosition(position)) return
    if(!IsTrackablePosition(position)) return

    setActivity(prev => {
      const lastPosition = prev.path.at(-1)

      if(!lastPosition) {
        return {
          ...prev,
          path: [position]
        }
      }

      if(lastPosition.latitude === position.latitude &&
        lastPosition.longitude === position.longitude) {
          return prev
      }

      const SegmentDistance = CalculateDistance(lastPosition, position)
      const SegmentDuration = (position.timestamp - lastPosition.timestamp) / 1000
      if(SegmentDuration <= 0) {
        return prev
      }

      const CurrentSpeed = CalculateSpeed(SegmentDistance, SegmentDuration)
      const CurrentPace = CalculatePace(SegmentDistance, SegmentDuration)
      const ElevationGain = CalculateElevate(lastPosition, position)

      const TotalDistance = prev.distance + SegmentDistance
      const TotalActiveDuration = prev.activeDuration + SegmentDuration

      const AverageSpeed = CalculateSpeed(TotalDistance, TotalActiveDuration)
      const AverageActivePace = CalculatePace(TotalDistance, TotalActiveDuration)

      setRuntime({
        currentPace: CurrentPace,
        currentSpeed: CurrentSpeed
      })

      return {
        ...prev,
        path: [...prev.path, position],
        distance: TotalDistance,
        activeDuration: TotalActiveDuration,
        averageSpeed: AverageSpeed,
        averageActivePace: AverageActivePace,
        elevationGain: prev.elevationGain + ElevationGain,
        maxSpeed: Math.max(prev.maxSpeed, CurrentSpeed),
        minSpeed: prev.minSpeed === 0 ? CurrentSpeed : Math.min(prev.minSpeed, CurrentSpeed)
      }

    })
  }, [position, workoutState])

  const SetWorkoutCategory = useCallback((category: WorkoutCategory) => {
    if(workoutState !== 'idle') return

    setActivity(prev => ({
      ...prev,
      category
    }))
  }, [workoutState])

  const StartWorkout = useCallback(() => {
    if(!position) return
    if(!IsValidPosition(position)) return
    if(!activity.category) {
      alert("Selecione uma categoria")
      return
    }

    setWorkoutState('running')

    setRuntime({
     currentPace: 0,
     currentSpeed: 0
    })

    setActivity(prev => ({
      ...prev,
      id: crypto.randomUUID(),

      startedAt: new Date(),
      finishedAt: null,
      path: [position],

      distance: 0,
      totalDuration: 0,
      activeDuration: 0,
      elevationGain: 0,

      averagePace: 0,
      averageSpeed: 0,

      maxSpeed: 0,
      minSpeed: 0,

      calories: 0,
      steps: 0
    })) 
  }, [position, activity.category])

  const PauseWorkout = useCallback(() => {
    setWorkoutState('paused')
  },[])

  const StopWorkout = useCallback((mapSnapshot: string | null) => {
    setWorkoutState('stopped')

    setActivity(prev => {
      const totalDuration = elapsedSeconds
      const activeDuration = activeSeconds

      return {
        ...prev,
        totalDuration,
        activeDuration,
        averagePace: CalculatePace(prev.distance, totalDuration),
        mapSnapshot
      }
    })
  },[elapsedSeconds, activeSeconds])

  const ResumeWorkout = useCallback(() => {
    setWorkoutState('running')
  },[])

  const FinishWorkout = useCallback((): Activity =>  {
    const totalDuration = elapsedSeconds
    const activeDuration = activeSeconds

    const finishedActivity: Activity = {
      ...activity,
      finishedAt: new Date(),

      totalDuration,
      activeDuration,

      averagePace: CalculatePace(activity.distance, totalDuration),
      averageActivePace: CalculatePace(activity.distance, activeDuration)
    }

    setActivity(finishedActivity)
    SaveActivity(finishedActivity)
    setWorkoutState('finished')

    return finishedActivity
  },[activity, elapsedSeconds, activeSeconds])

  const ResetWorkout = useCallback(() =>  {
    setWorkoutState('idle')
 
    ResetTimer()

    setRuntime({
      currentSpeed: 0,
      currentPace: 0,
    })

    setActivity(CreateInitialActivity())
  }, [ResetTimer])

  const value = useMemo(() => ({
    activity, workoutState, elapsedSeconds, activeSeconds, runtime, position, 
    SetWorkoutCategory, StartWorkout, PauseWorkout, StopWorkout, ResumeWorkout, FinishWorkout, ResetWorkout
  }),[activity, workoutState, elapsedSeconds, activeSeconds, runtime, position,
     SetWorkoutCategory, StartWorkout, PauseWorkout, StopWorkout, ResumeWorkout, FinishWorkout, ResetWorkout
  ])

  return(
    <WorkoutContext.Provider value = {value}>
      {children}
    </WorkoutContext.Provider>
  )
}
