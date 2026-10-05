"use client"

import {type SubmitEventHandler, useState } from "react"

import { UseAuth } from "../../hooks/use-Auth"

import { CompleteProfile } from "../../services/auth/complete-profile"

import { useRouter } from "next/navigation"

export default function CompleteProfilePage() {
  const router = useRouter()
  const { SetUser } = UseAuth()

  const [ error, setError ] = useState<string | null>(null)
  const [ isSubmitting, setIsSubmitting ] = useState(false)

  const HandleCompleteProfile: SubmitEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "").trim()
    const username = String(formData.get("username") ?? "").trim().toLowerCase()

    if(!name || !username) {
      setError("Preencha seu Nome e nome de Usuário")
      return
    }

    setError(null)
    setIsSubmitting(true)

    try {
      const response = await CompleteProfile({
        name,
        username
      })

      SetUser(response.user)
      
      router.replace("/feed")
    } catch (error) {
      console.error("Failed to Complete Profile", error)
      setError(`Não foi possível completar seu Perfil. ${error}`)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <main
      className="min-h-dvh px-6
        bg-zinc-950 text-zinc-100"
    >
      <div
        className="mx-auto flex min-h-dvh w-full max-w-md
          flex-col justify-center"
      >
        <header className="mb-10">
          <span
            className="
              text-sm
              font-semibold
              tracking-[0.3em]
              text-[var(--nex-neon)]
            "
          >
            NeX
          </span>

          <h1
            className="
              mt-4
              text-3xl
              font-semibold
              tracking-tight
            "
          >
            Complete seu perfil
          </h1>

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-zinc-400
            "
          >
            Como você quer aparecer para
            outras pessoas no NeX?
          </p>
        </header>

        <form
          onSubmit={HandleCompleteProfile}
          className="space-y-6"
        >
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="
                text-sm
                font-medium
                text-zinc-300
              "
            >
              Nome
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Seu nome"
              maxLength={80}
              required
              className="
                w-full
                rounded-xl
                border
                border-zinc-800
                bg-zinc-900/70
                px-4
                py-3.5
                text-zinc-100
                outline-none
                transition
                placeholder:text-zinc-600
                shadow-[0_10px_30px_var(--nex-purple-glow)]
                focus:border-[var(--nex-neon)]
                focus:shadow-[0_0_0_3px_var(--nex-neon-glow),0_12px_32px_var(--nex-purple-glow)]
              "
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="username"
              className="
                text-sm
                font-medium
                text-zinc-300
              "
            >
              Nome de usuário
            </label>

            <div className="relative">
              <span
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-zinc-500
                "
              >
                @
              </span>

              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="seuusuario"
                minLength={3}
                maxLength={30}
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-zinc-800
                  bg-zinc-900/70
                  py-3.5
                  pl-9
                  pr-4
                  text-zinc-100
                  outline-none
                  transition
                  placeholder:text-zinc-600
                  shadow-[0_10px_30px_var(--nex-purple-glow)]
                  focus:border-[var(--nex-neon)]
                  focus:shadow-[0_0_0_3px_var(--nex-neon-glow),0_12px_32px_var(--nex-purple-glow)]
                "
              />
            </div>

            <p
              className="
                text-xs
                text-zinc-500
              "
            >
              Esse será seu identificador único
              no NeX.
            </p>
          </div>

          {error && (
            <p
              role="alert"
              className="
                text-sm
                text-red-400
              "
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full
              rounded-xl
              bg-[var(--nex-neon)]
              px-4
              py-3.5
              font-semibold
              text-zinc-950
              transition
              hover:brightness-110
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isSubmitting
              ? "Salvando..."
              : "Continuar"}
          </button>
        </form>
      </div>
    </main>
  )
}