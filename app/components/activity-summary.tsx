'use client'
import Link from "next/link"

import { Activity } from "@/app/types/activity"

import { FormattedPace } from "@/app/utils/formatter-display-data/formatted-pace"
import { FormattedSpeed } from "@/app/utils/formatter-display-data/formatted-speed"
import { FormattedDistance } from "@/app/utils/formatter-display-data/formatted-distance"
import { FormattedDuration } from "../utils/formatter-display-data/formatted-duration"

import { ThumbsUpIcon, ExportIcon, ArrowUDownLeftIcon } from "@phosphor-icons/react"

interface IActivitySummary{
  activity: Activity
}

export function ActivitySummary({ activity }: IActivitySummary) {
  return(
    <div className="h-svh relative">
      <Link
        href={'/feed'}
        className="absolute z-10 top-2 left-2
          px-3 py-0.5 rounded-xl
          bg-zinc-950/70"
      >
        <ArrowUDownLeftIcon size={26}/>
      </Link>

      <section
        className="h-[44%] w-full bg-sky-500"
      ></section>

      <section
        className="w-full flex flex-col gap-6 items-center justify-center"
      >
        <div className="h-1 rounded-xl bg-zinc-500 w-[15%]"/>

        <div className="flex items-center gap-3">
          <div
            className="h-12 w-12 rounded-full bg-amber-300"
          />
          <div className="flex flex-col">
            <strong className='tracking-widest'>Kaique Prado</strong>
            <small
              className="text-xs"
            > 
              28 - Agosto - 2026 ás 17:00 São Paulo, SP
            </small>
          </div>
        </div>

        <h2 className="text-lg tracking-wider">Título Atividade</h2>

        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
          <div className="flex flex-col items-center">
            <span className="tracking-widest">Distância</span>
            <strong className="text-xl font-bold">
              {FormattedDistance(activity.distance)}
            </strong>
          </div>

          <div className="flex flex-col items-center">
            <span className="tracking-widest">Ritmo médio</span>
            <strong className="text-xl font-bold">
              {FormattedPace(activity.averageActivePace)}
            </strong>
          </div>

          <div className="flex flex-col items-center">
            <span className="tracking-widest">Tempo Total</span>
            <strong className="text-xl font-bold">
              {FormattedDuration(activity.activeDuration)}
            </strong>
          </div>

          <div className="flex flex-col items-center">
            <span className="tracking-widest">Elevação</span>
            <strong className="text-xl font-bold">
              {activity.elevationGain}
            </strong>
          </div>

          <div className="flex flex-col items-center">
            <span className="tracking-widest">Calorias</span>
            <strong className="text-xl font-bold">
              {activity.calories}
            </strong>
          </div>

          <div className="flex flex-col items-center">
            <span className="tracking-widest">Vel. Média</span>
            <strong className="text-xl font-bold">
              {FormattedSpeed(activity.averageSpeed)}
            </strong>
          </div>
        </div>

        <div
          className="w-full flex items-center justify-evenly"
        >
          <button>
            <ThumbsUpIcon size={26}/>
          </button>
          <button>
            <ExportIcon size={26}/>
          </button>
        </div>
      </section>
    </div>
  )
}