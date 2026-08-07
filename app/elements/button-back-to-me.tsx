'use client'

import { ArrowsInCardinalIcon } from '@phosphor-icons/react'

export function ButtonBackToMe(){
  return(
    <button
      title='Voltar a minha posição.'
      className="group absolute right-3 bottom-[33%]
      flex h-12 w-12 items-center justify-center
      rounded-2xl border border-cyan-400/20
      bg-zinc-950/90 backdrop-blur-md
      shadow-[0_0_18px_rgba(34,211,238,.12)]
      transition-all duration-300
      hover:border-cyan-400/60
      hover:shadow-[0_0_22px_rgba(34,211,238,.35)]
      hover:scale-105 active:scale-95"
    >
      <div
        className="absolute h-12 w-12
        rounded-2xl bg-cyan-400/10 animate-ping"
      />
      <ArrowsInCardinalIcon 
        size={36}
        className="relative text-cyan-300
          transition-transform duration-300
          group-hover:rotate-12"
      />
    </button>
  )
}