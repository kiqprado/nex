'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"

import { type SubmitEventHandler } from "react"

import { RegisterUser } from "../services/auth/register-user"


export default function RegisterForm() {
  const router = useRouter()

  const HandleRegisterUser: SubmitEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const email = String(formData.get("email") ?? "").trim()
    const phone = String(formData.get("phone") ?? "").trim() 
    const password = String(formData.get("password") ?? "")
    const passwordConfirmation = String(formData.get("passwordConfirmation") ?? "")

    if(!phone && !email) {
      return
    }

    if(password !== passwordConfirmation) {
      alert("As Senhas devem ser iguais")
      return
    }

    try {
      await RegisterUser({
        email: email || undefined,
        phone: phone || undefined,
        password
      })

      router.push("/complete-profile")
    } catch(error) {
      console.error("Failed To Register this user", error)
    }
  }

  return(
    <div className="h-svh flex">
      <form
        onSubmit={HandleRegisterUser}
        className="m-auto w-full max-w-md
          flex flex-col gap-6 px-6"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="
              text-sm font-medium
              tracking-[0.15em]
              text-zinc-300
            "
          >
            E-mail
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="voce@email.com"
            className="
              nex-auth-input
              w-full
              rounded-xl
              border
              bg-zinc-950/80
              px-4 py-3.5

              text-zinc-100
              outline-none

              placeholder:text-zinc-600

              transition-all
              duration-300
            "
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-800" />

          <span
            className="
              text-[10px]
              tracking-[0.2em]
              text-zinc-600
            "
          >
            OU
          </span>

          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="phone"
            className="
              text-sm font-medium
              tracking-[0.15em]
              text-zinc-300
            "
          >
            Telefone
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(11) 99999-9999"
            className="
              nex-auth-input
              w-full
              rounded-xl
              border
              bg-zinc-950/80
              px-4 py-3.5

              text-zinc-100
              outline-none

              placeholder:text-zinc-600

              transition-all
              duration-300
            "
          />
        </div>

        <p className="text-xs leading-relaxed text-zinc-500">
          Informe seu e-mail ou telefone para criar sua conta.
        </p>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="
              text-sm font-medium
              tracking-[0.15em]
              text-zinc-300
            "
          >
            Senha
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            className="
              nex-auth-input
              w-full
              rounded-xl
              border
              bg-zinc-950/80
              px-4 py-3.5

              text-zinc-100
              outline-none

              placeholder:text-zinc-600

              transition-all
              duration-300
            "
          />

          <ul>
            <li 
              className="text-xs leading-relaxed tracking-widest text-zinc-500"
            >
                Mínimo de 7 caracteres
            </li>
            <li 
              className="text-xs leading-relaxed tracking-widest text-zinc-500"
            >
                Uma letra Maiúscula
            </li>
            <li 
              className="text-xs leading-relaxed tracking-widest text-zinc-500"
            >
                Mínimo de 1 número
            </li>
            <li 
              className="text-xs leading-relaxed tracking-widest text-zinc-500"
            >
                Caractere especial
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="passwordConfirmation"
            className="
              text-sm font-medium
              tracking-[0.15em]
              text-zinc-300
            "
          >
            Confirmar senha
          </label>

          <input
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            className="
              nex-auth-input
              w-full
              rounded-xl
              border
              bg-zinc-950/80
              px-4 py-3.5

              text-zinc-100
              outline-none

              placeholder:text-zinc-600

              transition-all
              duration-300
            "
          />
        </div>

        <button
          type="submit"
          className="
            mt-1
            w-full
            rounded-xl
            border border-[var(--nex-neon)]
            bg-[var(--nex-neon)]
            py-3.5

            font-semibold
            tracking-[0.16em]
            text-zinc-950

            shadow-[0_0_24px_var(--nex-neon-glow)]

            transition-all
            duration-300

            hover:brightness-110
            hover:shadow-[0_0_35px_var(--nex-neon-glow)]

            active:scale-[0.98]
          "
        >
          CRIAR CONTA
        </button>

        <div className="flex justify-center text-sm">
          <Link
            href="/"
            className="
              text-zinc-400
              transition-colors
              hover:text-[var(--nex-neon)]
            "
          >
            Já possui uma conta?{' '}
            <strong
              className="
                font-semibold
                text-[var(--nex-neon)]
              "
            >
              Entrar
            </strong>
          </Link>
        </div>
      </form>
    </div>
  )
}