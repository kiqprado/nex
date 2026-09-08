import { Activity } from "../types/activity"
import { WorkoutRunTime } from "../types/workout-runtime"

import { FormattedDistance } from "../utils/formatter-display-data/formatted-distance"
import { FormattedPace } from "../utils/formatter-display-data/formatted-pace"
import { FormattedSpeed } from "../utils/formatter-display-data/formatted-speed"
import { FormattedTimer } from "../utils/formatter-display-data/formatted-timer"
import { FormattedElevationGain } from "../utils/formatter-display-data/formatted-elevation-gain"
import { FormattedStep } from "../utils/formatter-display-data/formatted-steps"


interface IWorkoutStatsBar {
  activity: Activity
  runtime: WorkoutRunTime
  activeTimer: number
}

export function WorkoutStatsBar({activity, runtime, activeTimer}: IWorkoutStatsBar) {
  return(
  <div
    className="absolute bottom-[18%] left-1/2 -translate-x-1/2
    w-[96%] rounded-lg bg-zinc-900 px-6 py-2"
  >
    <div className="flex w-full gap-8 items-baseline">
      <div className="w-1/3 flex flex-col items-center">
        <span className="text-lg tabular-nums tracking-widest">
          {FormattedPace(runtime.currentPace)}
        </span>
        <h5 className="text-zinc-400 tracking-widest text-sm font-black">
          Ritmo
        </h5>
      </div>

      <div className="w-1/3 flex flex-col items-center">
        <span className="text-3xl tabular-nums tracking-wide">
          {FormattedDistance(activity.distance)}
          <small className="ml-0.5 text-xs">km</small>
        </span>
        <h5 className="text-zinc-400 tracking-widest text-sm font-black">
          Distância
        </h5>
      </div>

      <div className="w-1/3 flex flex-col items-center">
        <span className="text-lg tabular-nums tracking-widest">
          {FormattedTimer(activeTimer)}
        </span>
        <h5 className="text-zinc-400 tracking-widest text-sm font-black">
          Tempo
        </h5>
      </div>
    </div>
  </div>
  )
}