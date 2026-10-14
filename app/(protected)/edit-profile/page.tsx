"use client"

import {type SubmitEventHandler, useState } from "react"
import { useRouter } from "next/navigation"

import { UseAuth } from "../../hooks/use-Auth"

import { CompleteProfile } from "../../services/auth/complete-profile"

import { BRAZILIAN_STATES } from "@/app/utils/brazilian-states"

export default function EditProfilePage() {
  const router = useRouter()
  const { user, SetUser } = UseAuth()

  const [ error, setError ] = useState<string | null>(null)
  const [ isSubmitting, setIsSubmitting ] = useState(false)

  const HandleEditProfile: SubmitEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "").trim()
    const username = String(formData.get("username") ?? "").trim().toLowerCase()
    const city = String(formData.get("city") ?? "").trim()
    const state = String(formData.get("state") ?? "").toUpperCase()
    const country = String(formData.get("country") ?? "").toUpperCase()
    const bio = String(formData.get("bio") ?? "").trim()

    if(name.length < 2 || username.length < 3 || !country || !state || city.length < 2) {
      setError("Preencha corretamente os campos obrigatórios.")
      return
    }

    if(country !== "BR" || !BRAZILIAN_STATES.some(item => item.code === state)) {
      setError("Selecione uma localização válida!")
      return
    }

    setError(null)
    setIsSubmitting(true)

    try {
      const response = await CompleteProfile({
        name,
        username,
        city,
        state,
        country,
        bio
      })

      SetUser(response.user)
      
      router.replace("/profile")
    } catch (error) {
      console.error("Failed to Complete Profile", error)
      setError(`Não foi possível completar seu Perfil. ${error}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="h-svh overflow-y-auto px-6 bg-zinc-950 text-zinc-100">
      <div className="h-full flex flex-col">
        <header className="mb-10">
          <span className="text-sm font-semibold tracking-[0.3em] text-(--nex-neon)">
            NeX
          </span>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            Edite seu perfil
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Atualize suas informações e como você aparece no NeX.
          </p>
        </header>

        <form onSubmit={HandleEditProfile} className="space-y-6 pb-8">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
              Nome
            </label>

            <input
              id="name"
              name="name"
              defaultValue={user?.name ?? ""}
              type="text"
              autoComplete="name"
              placeholder="Seu nome"
              minLength={2}
              maxLength={80}
              required
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3.5 text-zinc-100 outline-none transition placeholder:text-zinc-600 shadow-[0_10px_30px_var(--nex-purple-glow)] focus:border-(--nex-neon) focus:shadow-[0_0_0_3px_var(--nex-neon-glow),0_12px_32px_var(--nex-purple-glow)]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-zinc-300">
              Nome de usuário
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                @
              </span>

              <input
                id="username"
                name="username"
                defaultValue={user?.username ?? ""}
                type="text"
                autoComplete="username"
                placeholder="seuusuario"
                minLength={3}
                maxLength={30}
                pattern="[a-zA-Z0-9._]+"
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 py-3.5 pl-9 pr-4 text-zinc-100 outline-none transition placeholder:text-zinc-600 shadow-[0_10px_30px_var(--nex-purple-glow)] focus:border-(--nex-neon) focus:shadow-[0_0_0_3px_var(--nex-neon-glow),0_12px_32px_var(--nex-purple-glow)]"
              />
            </div>

            <p className="text-xs text-zinc-500">
              Esse será seu identificador único no NeX.
            </p>
          </div>

          <section className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold tracking-tight text-zinc-100">
                Sua localização
              </h2>

              <p className="text-sm leading-6 text-zinc-500">
                Informe sua localização para completar seu perfil.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="country" className="block text-sm font-medium text-zinc-300">
                País
              </label>

              <select
                id="country"
                name="country"
                defaultValue={user?.country?? "BR"}
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3.5 text-zinc-100 outline-none transition shadow-[0_10px_30px_var(--nex-purple-glow)] focus:border-(--nex-neon) focus:shadow-[0_0_0_3px_var(--nex-neon-glow),0_12px_32px_var(--nex-purple-glow)]"
              >
                <option value="BR"> Brasil </option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="state" className="block text-sm font-medium text-zinc-300">
                Estado
              </label>

              <select
                id="state"
                name="state"
                defaultValue={user?.state ?? ""}
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3.5 text-zinc-100 outline-none transition shadow-[0_10px_30px_var(--nex-purple-glow)] focus:border-(--nex-neon) focus:shadow-[0_0_0_3px_var(--nex-neon-glow),0_12px_32px_var(--nex-purple-glow)]"
              >
                <option value="" disabled>
                  Selecione seu estado
                </option>

                {BRAZILIAN_STATES.map(state => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="city" className="block text-sm font-medium text-zinc-300">
                Cidade
              </label>

              <input
                id="city"
                name="city"
                type="text"
                autoComplete="address-level2"
                defaultValue={user?.city ?? ""}
                placeholder="Sua cidade"
                minLength={2}
                maxLength={100}
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3.5 text-zinc-100 outline-none transition placeholder:text-zinc-600 shadow-[0_10px_30px_var(--nex-purple-glow)] focus:border-(--nex-neon) focus:shadow-[0_0_0_3px_var(--nex-neon-glow),0_12px_32px_var(--nex-purple-glow)]"
              />
            </div>
          </section>

          <div className="space-y-2">
            <label htmlFor="bio" className="block text-sm font-medium text-zinc-300">
              Bio <span className="ml-2 font-normal text-zinc-500">(opcional)</span>
            </label>

            <textarea
              id="bio"
              name="bio"
              defaultValue={user?.bio ?? ""}
              rows={3}
              maxLength={160}
              placeholder="Conte um pouco sobre você..."
              className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3.5 text-zinc-100 outline-none transition placeholder:text-zinc-600 shadow-[0_10px_30px_var(--nex-purple-glow)] focus:border-(--nex-neon) focus:shadow-[0_0_0_3px_var(--nex-neon-glow),0_12px_32px_var(--nex-purple-glow)]"
            />

            <p className="text-xs text-zinc-500">
              Máximo de 160 caracteres.
            </p>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={() => router.replace("/profile")}
            disabled={isSubmitting}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3.5 font-semibold text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-(--nex-neon) px-4 py-3.5 font-semibold text-zinc-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Salvando..." : "Salvar alterações"}
          </button>
        </form>
      </div>
    </main>
  )
}