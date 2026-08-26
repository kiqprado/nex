'use client'

import { Menu } from "../components/menu"
import { Activity } from "../components/activity"

export default function Feed() {
  return(
    <div
      className="flex flex-col justify-center gap-3 overflow-y-auto"
    >
      <Activity/>
      <Activity/>
      <Menu/>
    </div>
  )
}