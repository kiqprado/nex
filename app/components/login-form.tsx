import { useRouter } from "next/navigation"

import Link from "next/link"

import { useState, type FormEventHandler } from 'react'

import { UseAuth } from "../hooks/use-Auth"

import { LoginUser } from "../services/auth/login-user"

export function LoginForm() {
  const router =  useRouter()
  const { SetUser } = UseAuth()

  const [ isLoading, setIsLoading ] = useState(false)

  const HandleLoginUser: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const identifier = String(formData.get("identifier") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    if(!identifier || !password) {
      return
    }

    setIsLoading(true)

    const minimumLoading = new Promise(resolve => setTimeout(resolve, 800))

    try {
      const  [ response ] = await Promise.all([
        LoginUser({
          identifier,
          password
        }),
        minimumLoading
      ])

      SetUser(response.user)

      router.replace("/feed")
    } catch (error) {
      console.error("Failed to Login User:", error)
    }

  }

  return (
    <div>
      <form
        onSubmit={HandleLoginUser}
        className="w-full m-auto max-w-md
          flex flex-col gap-7 px-6"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="identifier"
            className="tracking-[0.15em]
              text-sm font-medium text-zinc-300"
          >
            Usuário
          </label>

          <input
            id="identifier"
            name="identifier"
            type="text"
            autoComplete="username"
            placeholder="@joao321"
            className="nex-auth-input w-full px-4 py-3.5
              rounded-xl border bg-zinc-950/80
              text-zinc-100 outline-none placeholder:text-zinc-600
              transition-all duration-300"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium
              tracking-[0.15em] text-zinc-300"
          >
            Senha
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className="nex-auth-input w-full px-4 py-3.5
              rounded-xl border bg-zinc-950/80
              text-zinc-100 outline-none placeholder:text-zinc-600
              transition-all duration-300"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-1 py-3.5
            rounded-xl border border-[var(--nex-neon)] bg-[var(--nex-neon)]
            font-semibold tracking-[0.16em] text-zinc-950
            shadow-[0_0_24px_var(--nex-neon-glow)]
            transition-all duration-300 active:scale-[0.98]
            hover:brightness-110 hover:shadow-[0_0_35px_var(--nex-neon-glow)]"
        >
          ENTRAR
        </button>

        <div
          className="flex flex-col items-center gap-3 text-sm"
        >
          <Link
            href="/forgot-password"
            className="text-zinc-400 transition-colors
              hover:text-[var(--nex-neon)] tracking-wide"
          >
            Esqueceu sua senha?
          </Link>

          <Link
            href="/register"
            className="text-zinc-400 tracking-wider
              transition-colors hover:text-[var(--nex-neon)]"
          >
            Não possui uma conta?{' '}
            <strong className="font-semibold text-[var(--nex-neon)]">
              Cadastre-se
            </strong>
          </Link>
        </div>
      </form>

      {isLoading && (
        <div
          className="fixed inset-0 z-50
            flex items-center justify-center
            bg-zinc-950/90 backdrop-blur-sm"
        >
          <div
            className="w-[calc(100%-3rem)] max-w-sm px-6 py-7
              rounded-2xl border border-zinc-800
              bg-zinc-950 shadow-[0_0_45px_var(--nex-purple-glow)]"
          >
            <p
              className="
                mb-5
                text-center
                text-sm
                tracking-[0.15em]
                text-zinc-300
              "
            >
              Carregando perfil...
            </p>

            <div
              className="
                h-1.5
                w-full
                overflow-hidden
                rounded-full
                bg-zinc-800
              "
            >
              <div className="nex-loading-bar h-full rounded-full bg-[var(--nex-neon)]" />
            </div>
          </div>
        </div>
      )}
    </div>   
  )
}