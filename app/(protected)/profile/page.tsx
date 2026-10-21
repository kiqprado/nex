'use client'

import Link from "next/link"
import Image from "next/image"

import { useState, useEffect } from "react"

import { UseAuth } from "../../hooks/use-Auth"

import { ActivitiesStreakResponse } from "@/app/types/activity-api"

import { GetActivitiesCount } from '@/app/services/activities/get-activities-count'
import { GetActivitiesStreak } from "@/app/services/activities/get-activities-streak"

import { Menu } from "../../components/menu"
import { QRCodeProfile } from "../../components/qr-code-profile"
import { LogoutButton } from "@/app/elements/button-logout"

import MaleAvatar from '../../../public/avatar-profile/male-avatar.jpg'
import { PulseIcon, StackPlusIcon, TrophyIcon, CaretDoubleRightIcon, QrCodeIcon, FireIcon } from "@phosphor-icons/react"



export default function Profile() {
  const { user, loading} = UseAuth()
  const [ activitiesCount, setActivitiesCount ] = useState<number | null>(null)
  const [ loadingActivitiesCount, setLoadingActivitiesCount ] = useState(true)
  const [ activitiesStreak, setActivitiesStreak ] = useState<ActivitiesStreakResponse | null>(null)
  const [ loadingActivitiesStreak, setLoadingActivitiesStreak ] = useState(true)
  const [ QRCodeProfileModal, setQRCodeProfileModal ] = useState(false)

  if(loading) {
    return null
  }

  if(!user) {
    return null
  }

  function HandleToggleQRCodeProfileModal() {
    setQRCodeProfileModal(prev => !prev)
  }

  useEffect(() => {
    async function LoadActivitiesCount() {
      try {
        const activities = await GetActivitiesCount()
        setActivitiesCount(activities.count)
      } catch (error) {
        console.error("Failed to Get Activities Count", error)
      } finally {
        setLoadingActivitiesCount(false)
      }
    }

    LoadActivitiesCount()
  }, [])

  useEffect(() => {
    let cancelled = false

    async function LoadActivitiesStreak() {
      try {
        const streak = await GetActivitiesStreak()

        if(!cancelled) {
          setActivitiesStreak(streak)
        }
      } catch (error) {
        console.error("Failed to Get Activities Streak", error)
      } finally {
        if(!cancelled) {
          setLoadingActivitiesStreak(false)
        }
      }
    }

    LoadActivitiesStreak()

    return () => {
      cancelled = true
    }
  }, [])
 
  return(
    <div 
      className="w-full h-svh relative 
      px-6 py-3 flex flex-col gap-6 "
    >
      <LogoutButton/>
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
        <p>{user.bio}</p>
        <div className="flex items-center justify-evenly">
          <div
            className="flex flex-col items-center"
          >
            <span className="text-sm tracking-wider">Atividades</span>
            <span>{loadingActivitiesCount ? "..." : activitiesCount ?? "-"}</span>
          </div>
          <div
            className="flex flex-col items-center"
          >
            <span className="text-sm tracking-wider">Semanas ativo</span>
            <div
              className="flex items-center justify-center gap-3"
            >
              <span>
                <FireIcon
                  weight="fill"
                  size={26}
                  className={`streak-fire font-semibold tabular-nums
                    ${activitiesStreak?.weeklyLevel
                    ? `streak-fire-${activitiesStreak.weeklyLevel}`: ''}`}
                />
              </span>
              <span>{loadingActivitiesStreak ? "..." : activitiesStreak?.weeklyStreak ?? "-"}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-evenly">
          <button 
            onClick={HandleToggleQRCodeProfileModal}
            className="flex items-center gap-3"
          >
            QR Code <QrCodeIcon size={22}/>
          </button>
          <Link
            href={"/edit-profile"}
          >
            Editar Perfil
          </Link>
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

      {QRCodeProfileModal && (
        <QRCodeProfile
          HandleToggleQRCodeProfileModal={HandleToggleQRCodeProfileModal}
        />
      )}
    </div>  
  )
}
