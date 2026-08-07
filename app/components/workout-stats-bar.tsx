import { WorkoutActivity } from "../types/workout-activity"
import { WorkoutRunTime } from "../types/workout-runtime"

import { FormattedDistance } from "../utils/formatter-display-data/formatted-distance"
import { FormattedPace } from "../utils/formatter-display-data/formatted-pace"
import { FormattedSpeed } from "../utils/formatter-display-data/formatted-speed"
import { FormattedElapsedTimer } from "../utils/formatter-display-data/formatted-elapsed-timer"
import { FormattedElevationGain } from "../utils/formatter-display-data/formatted-elevation-gain"
import { FormattedStep } from "../utils/formatter-display-data/formatted-steps"


interface IWorkoutStatsBar {
  activity: WorkoutActivity
  runtime: WorkoutRunTime
  elapsedTimer: number
}

export function WorkoutStatsBar({activity, runtime, elapsedTimer}: IWorkoutStatsBar) {
  return(
    <div 
      className="absolute bottom-[18%] left-1/2 -translate-x-1/2
      w-[96%] flex flex-col justify-between rounded-lg bg-zinc-900 px-6 py-2"
    >
     <div className="flex items-baseline justify-between">
        <span className="text-lg tabular-nums">{FormattedPace(runtime.currentPace)}</span>
        <span 
          className="text-3xl tabular-nums"
        >
          {FormattedDistance(activity.distance)}
          <small className="text-xs ml-0.5">km</small>
        </span>
        <span className="text-lg tabular-nums">{FormattedElapsedTimer(elapsedTimer)}</span>
      </div>
      <div className="flex items-center justify-between">
        <h5 className="text-zinc-400 tracking-widest text-sm font-black">Ritmo</h5>
        <h5 className="text-zinc-400 tracking-widest text-sm font-black">Distância</h5>
        <h5 className="text-zinc-400 tracking-widest text-sm font-black">Tempo</h5>
      </div>
    </div>
  )
}