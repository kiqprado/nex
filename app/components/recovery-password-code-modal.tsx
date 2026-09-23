
interface IRecoveryPasswordCodeModal {
  onClose: () => void
}

export function RecoveryPasswordCodeModal({ onClose }: IRecoveryPasswordCodeModal) {
  return(
      <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/75
        px-5
        backdrop-blur-sm
      "
    >
      <div
        className="
          nex-auth-modal
          w-full max-w-sm
          rounded-2xl
          border border-zinc-800
          bg-zinc-950
          px-6 py-8
        "
      >
        <div className="flex flex-col gap-2 text-center">
          <h2
            className="
              text-xl font-semibold
              tracking-[0.12em]
              text-zinc-100
            "
          >
            Verifique seu código
          </h2>

          <p
            className="
              text-sm leading-relaxed
              text-zinc-500
            "
          >
            Digite o código de 6 dígitos que enviamos para você.
          </p>
        </div>

        <form className="mt-8 flex flex-col gap-7">
          <div className="flex justify-between gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                aria-label={`Dígito ${index + 1}`}
                className="
                  nex-code-input

                  h-12 min-w-0 flex-1
                  rounded-lg
                  border

                  bg-zinc-900/80

                  text-center
                  text-xl font-semibold
                  text-zinc-100

                  outline-none

                  transition-all
                  duration-300
                "
              />
            ))}
          </div>

          <button
            type="submit"
            className="
              w-full
              rounded-xl
              bg-[var(--nex-neon)]
              py-3.5

              font-semibold
              tracking-[0.16em]
              text-zinc-950

              shadow-[0_0_24px_var(--nex-neon-glow)]

              transition-all
              duration-300

              hover:brightness-110
              active:scale-[0.98]
            "
          >
            VERIFICAR
          </button>

          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              className="
                text-sm text-zinc-400
                transition-colors
                hover:text-[var(--nex-neon)]
              "
            >
              Não recebeu?{' '}
              <strong className="text-[var(--nex-neon)]">
                Reenviar código
              </strong>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="
                text-xs
                tracking-wider
                text-zinc-600
                hover:text-zinc-400
              "
            >
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}