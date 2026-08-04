'use client'

import { useState } from "react"

import { useWorkout } from "../hooks/use-Workout"
import { WorkoutCategory } from '../types/workout-category'

import Image from "next/image"
import { StaticImageData } from "next/image"

import Run_male from '@/public/avatar_sports/male_run.svg'
import Run_female from '@/public/avatar_sports/female_run.svg'
import Walk_male from '@/public/avatar_sports/male_walk.svg'
import Walk_female from '@/public/avatar_sports/female_walk.svg'
import Hike_male from '@/public/avatar_sports/male_hike.svg'
import Hike_female from '@/public/avatar_sports/female_hike.svg'

const isMale =  false

const categories: {id: WorkoutCategory, title: string, image: StaticImageData}[] = [
  {
    id: 'hiking',
    title: 'Hike',
    image: isMale ? Hike_male : Hike_female,
  },
  {
    id: 'walking',
    title: 'Walk',
    image: isMale ? Walk_male :  Walk_female,
  },
  {
    id: 'running',
    title: 'Run',
    image: isMale ? Run_male : Run_female,
  },
]


export function ButtonCategory() {
  const [ openOptions, setOpenOptions ] = useState(false)
  const { activity, workoutState, SetWorkoutCategory} = useWorkout()

  const selected = categories.find(
    category => category.id === activity.category
  )

  const canChangeCategory = workoutState === 'idle'

  function HandleSelectCategory(category: WorkoutCategory) {
    if(!canChangeCategory) return
    SetWorkoutCategory(category)
    setOpenOptions(false)
  }

  return(
    <div className="relative">
      <button
        onClick={() => setOpenOptions(prev => !prev)}
        disabled={!canChangeCategory}
        className={`flex items-center justify-between gap-4
          px-2 py-2 rounded-xl border border-white/10
          transition-all duration-300
          ${openOptions
            ? `bg-gradient-to-br
               from-fuchsia-700
               via-purple-600
               to-fuchsia-700
                shadow-[0_0_18px_rgba(217,70,239,.45)]`
            : `bg-gradient-to-br
               from-cyan-700
               via-cyan-500
               to-cyan-700
                shadow-[0_0_14px_rgba(34,211,238,.35)]`
          }
          hover:brightness-110 hover:scale-105 active:scale-100
          disabled:opacity-50 disabled:pointer-events-none`}
      >
        {selected ? (
          <Image
            src={selected.image}
            alt={selected.title}
            width={48}
            height={48}
          />
        ) : (
          <span className="px-2 text-sm text-white">
            Escolha
          </span>
        )}
      </button>

      {openOptions && canChangeCategory && (
        <div
          className="absolute bottom-[110%] left-0
            w-full flex flex-col gap-2 p-2
            rounded-xl bg-zinc-950/90
            backdrop-blur-md border border-white/10
            shadow-[0_0_24px_rgba(0,0,0,.35)]"
        >
          {categories.map(category => {
            const active = category.id === activity.category

            return (
              <button
                key={category.id}
                onClick={() => HandleSelectCategory(category.id)}
                className={`flex flex-col items-center gap-3
                  rounded-lg px-3 py-2 transition-all duration-300
                  ${active
                    ? `bg-gradient-to-br
                      from-fuchsia-700
                      via-purple-600
                      to-fuchsia-700`
                    : `bg-gradient-to-br
                      from-cyan-700
                      via-cyan-500
                      to-cyan-700`
                  }
                  hover:scale-[1.03]`}
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  width={48}
                  height={48}
                />

                <span className="font-medium text-sm text-white">
                  {category.title}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}