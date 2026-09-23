export default function ResetPasswordForm() {
  return(
    <form
      className="h-svh w-full max-w-md
        flex flex-col justify-center gap-6
        px-6
      "
    >
      <div className="flex flex-col gap-2">
        <h1
          className="text-2xl text-center 
            font-semibold tracking-wider text-zinc-100"
        >
          Nova senha
        </h1>

        <p className="text-sm leading-relaxed text-zinc-500">
          Crie uma nova senha para acessar sua conta.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="
            text-sm font-medium
            tracking-[0.15em]
            text-zinc-300
          "
        >
          Nova senha
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          className="
            nex-auth-input
            w-full rounded-xl border
            bg-zinc-950/80
            px-4 py-3.5

            text-zinc-100
            outline-none
            placeholder:text-zinc-600

            transition-all duration-300
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
          Confirmar nova senha
        </label>

        <input
          id="passwordConfirmation"
          name="passwordConfirmation"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          className="
            nex-auth-input
            w-full rounded-xl border
            bg-zinc-950/80
            px-4 py-3.5

            text-zinc-100
            outline-none
            placeholder:text-zinc-600

            transition-all duration-300
          "
        />
      </div>

      <button
        type="submit"
        className="
          mt-1
          w-full rounded-xl

          bg-[var(--nex-neon)]
          py-3.5

          font-semibold
          tracking-[0.16em]
          text-zinc-950

          shadow-[0_0_24px_var(--nex-neon-glow)]

          transition-all duration-300

          hover:brightness-110
          active:scale-[0.98]
        "
      >
        ALTERAR SENHA
      </button>
    </form>
  )
}