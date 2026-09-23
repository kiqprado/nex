'use client'

import Link from "next/link"

export default function ForgotPasswordForm() {
  return(
    <form
      className="h-svh w-full max-w-md
        flex flex-col justify-center gap-7 px-6"
    >
      <div className="flex flex-col gap-2">
        <h1
          className="
            text-2xl font-semibold
            tracking-[0.12em]
            text-zinc-100
          "
        >
          Recuperar senha
        </h1>

        <p className="text-sm leading-relaxed text-zinc-500">
          Informe o e-mail ou telefone associado à sua conta.
          Enviaremos um código para confirmar sua identidade.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="identifier"
          className="
            text-sm font-medium
            tracking-[0.15em]
            text-zinc-300
          "
        >
          E-mail ou telefone
        </label>

        <input
          id="identifier"
          name="identifier"
          type="text"
          autoComplete="username"
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

      <button
        type="submit"
        className="
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
        ENVIAR CÓDIGO
      </button>

      <Link
        href="/"
        className="
          text-center text-sm
          text-zinc-400
          transition-colors
          hover:text-[var(--nex-neon)]
        "
      >
        Voltar para o login
      </Link>
    </form>
  )
}