'use client'

import { useMemo } from "react"
import { UseAuth } from "../hooks/use-Auth"

import { QRCodeSVG } from "qrcode.react"
import { XIcon } from "@phosphor-icons/react"

interface IQRCodeProfile {
  HandleToggleQRCodeProfileModal: () => void
}

export function QRCodeProfile({ HandleToggleQRCodeProfileModal }: IQRCodeProfile ) {
  const { user } = UseAuth()

  const profileUrl = useMemo(() => {
    if(!user?.username || typeof window === "undefined") return ""

    return `${window.location.origin}/profile/@${user.username}`
  }, [ user?.username ])

  if(!profileUrl) {
    return null
  }
  return(
    <div className="h-svh w-full inset-0 flex absolute bg-zinc-950/70 px-6">
      <div 
        className="m-auto flex flex-col gap-6 item-center justify-center relative p-8
        border border-zinc-500 rounded-xl bg-zinc-800"
      >
        <button
          onClick={HandleToggleQRCodeProfileModal}
          className="absolute top-1 right-1
          hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <XIcon size={22}/>
        </button>

        <div className="flex flex-col items-center gap-2">
          <h3 className="tracking-widest text-lg">@{user?.username}</h3>
          <small className="tracking-widest text-center">Escaneie o QR abaixo para ser direcionado ao perfil:</small>
        </div>

        <QRCodeSVG 
          className="self-center" 
          value={profileUrl} 
          size={220} 
          level="H" 
        />
      </div>
    </div>
  )
}