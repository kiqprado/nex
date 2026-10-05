'use client'
import Link from "next/link"
import Image from "next/image"

import { UseAuth } from "../../hooks/use-Auth"

import { Menu } from "../../components/menu"

import MaleAvatar from '../../../public/avatar-profile/male-avatar.jpg'
import { PulseIcon, StackPlusIcon, TrophyIcon, CaretDoubleRightIcon, QrCodeIcon } from "@phosphor-icons/react"

export default function Profile() {
  const { user, loading} = UseAuth()

  if(loading) {
    return null
  }

  if(!user) {
    return null
  }

  return(
    <div className="w-full px-6 py-3 flex flex-col gap-6">
      <header className="flex flex-col gap-6">
        <span className="block text-lg -mb-3 text-center tracking-widest">@{user.username}</span>
        <div className="flex items-center gap-6">
          <Image
            src={user.avatarUrl ?? MaleAvatar}
            alt="Avatar user photo profile"
            className="h-22 w-22 rounded-full"
          />
          <div className="flex flex-col gap-1">
            <h2 className="tracking-wider">{user.name}</h2>
            <span className="text-sm">São Paulo - SP, Brasil</span>
          </div>
        </div>
        <p>Bio do usuário</p>
        <div className="flex items-center justify-evenly">
          <div
            className="flex flex-col items-center"
          >
            <span className="text-sm tracking-wider">Atividades</span>
            <span>N° Total</span>
          </div>
          <div
            className="flex flex-col items-center"
          >
            <span className="text-sm tracking-wider">Semanas ativo</span>
            <span>N° Total</span>
          </div>
        </div>
        
        <div className="flex items-center justify-evenly">
          <button className="flex items-center gap-3">QR Code <QrCodeIcon size={22}/></button>
          <button>Editar Perfil</button>
        </div>
      </header>
      <section className="space-y-6">
        <h3>Esta semana</h3>
        <div className="w-full h-12 bg-amber-400">
        </div>
      </section>
      <section className="w-full space-y-6">
        <Link
          href={'/#'}
          className="flex w-full items-center gap-3"
        >
          <PulseIcon size={26}/>
          <div className="flex flex-col">
            <strong>Atividades</strong>
            <small>Hoje</small>
          </div>
          <CaretDoubleRightIcon
            size={18} 
            className="ml-auto"
          />
        </Link>
        <Link
          href={'/#'}
          className="flex w-full items-center gap-3"
        >
          <StackPlusIcon size={26}/>
          <div className="flex flex-col">
            <strong>Estatísticas</strong>
            <small>Este ano: 111km</small>
          </div>
          <CaretDoubleRightIcon
            size={18}
            className="ml-auto"
          />
        </Link>
        <Link
          href={'/#'}
          className="flex w-full items-center gap-3"
        >
          <TrophyIcon size={26}/>
          <div className="flex flex-col">
            <strong>Métricas</strong>
            <small>Veja todas</small>
          </div>
          <CaretDoubleRightIcon
            size={18}
            className="ml-auto"
          />
        </Link>
      </section>
      <Menu/>
    </div>  
  )
}
