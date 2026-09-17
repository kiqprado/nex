'use client'
import Link from "next/link"

import { ActivityDetailsResponse } from "../types/activity-api"

import { ActivityMetric } from "@/app/components/activity-metric"

import { ActivityMap } from "../map/activity/activity-map"

import { FormattedPace } from "@/app/utils/formatter-display-data/formatted-pace"
import { FormattedSpeed } from "@/app/utils/formatter-display-data/formatted-speed"
import { FormattedDistance } from "@/app/utils/formatter-display-data/formatted-distance"
import { FormattedDuration } from "@/app/utils/formatter-display-data/formatted-duration"

import { ThumbsUpIcon, ExportIcon, ArrowUDownLeftIcon } from "@phosphor-icons/react"

interface IActivitySummary {
  activity: ActivityDetailsResponse
}

export function ActivitySummary({ activity }: IActivitySummary) {
  return (
    <div className="min-h-svh bg-zinc-950 text-zinc-50">

      <div className="relative h-[44svh] w-full">
        <Link
          href="/feed"
          className="
            absolute z-10 top-4 left-4
            flex h-11 w-11 items-center justify-center
            rounded-full bg-zinc-950/70
          "
        >
          <ArrowUDownLeftIcon size={26} />
        </Link>

        <ActivityMap
          points={activity.points}
        />
      </div>

      <section
        className="relative -mt-3 px-6 pt-4 pb-10
          flex flex-col gap-7 rounded-t-2xl bg-zinc-950"
      >
        <div
          className="mx-auto h-1 w-12
          rounded-full bg-zinc-600"
        />

        <div className="flex items-center gap-3">
          <div
            className="h-12 w-12 shrink-0
              rounded-full bg-amber-300"
          />

          <div className="flex flex-col">
            <strong className="tracking-wide">
              Kaique Prado
            </strong>

            <small className="text-xs text-zinc-300">
              28 - Agosto - 2026 às 17:00
            </small>

            <small className="text-xs text-zinc-300">
              São Paulo, SP
            </small>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-wide">
            {activity.title ?? activity.sport.name}
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-7">
          <ActivityMetric
            label="Distância"
            value={FormattedDistance(activity.distance)}
          />

          <ActivityMetric
            label="Ritmo médio"
            value={FormattedPace(activity.averageActivePace)}
          />

          <ActivityMetric
            label="Tempo ativo"
            value={FormattedDuration(activity.activeDuration)}
          />

          <ActivityMetric
            label="Tempo total"
            value={FormattedDuration(activity.totalDuration)}
          />

          <ActivityMetric
            label="Elevação"
            value={`${activity.elevationGain} m`}
          />

          <ActivityMetric
            label="Calorias"
            value={`${activity.calories} Cal`}
          />

          <ActivityMetric
            label="Vel. média"
            value={FormattedSpeed(activity.averageSpeed)}
          />

          <ActivityMetric
            label="Vel. máxima"
            value={FormattedSpeed(activity.maxSpeed)}
          />

          {activity.steps > 0 && (
            <ActivityMetric
              label="Passos"
              value={activity.steps.toLocaleString('pt-BR')}
            />
          )}
        </div>

        <div className="flex items-center justify-evenly pt-2">
          <button type="button">
            <ThumbsUpIcon size={26} />
          </button>

          <button type="button">
            <ExportIcon size={26} />
          </button>
        </div>
      </section>
    </div>
  )
}