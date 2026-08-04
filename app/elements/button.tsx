import { ReactNode, ComponentProps } from "react"
import { tv, type VariantProps } from "tailwind-variants"

const ButtonVariants = tv({
  base: ['p-2',
    'text-black text-3xl',
    'rounded-xl border border-white/10',
    'hover:brightness-110 hover:scale-105 active:scale-100',
    'transition-all duration-300'
  ],
  variants: {
    bgColor: {
      blue: `bg-gradient-to-br
        from-cyan-700 via-cyan-500 to-cyan-700
        shadow-[0_0_14px_rgba(34,211,238,.35)]`,
      violet: `bg-gradient-to-br
        from-fuchsia-700 via-purple-600 to-fuchsia-700
         shadow-[0_0_14px_rgba(34, 8, 37, 0.35)]`
    },
    visible: {
      true: 'visible',
      false: 'invisible pointer-events-none'
    }
  },
  defaultVariants: {
    bgColor: 'blue',
    visible: true
  }
})


interface IButton extends ComponentProps<'button'>,
VariantProps<typeof ButtonVariants>{
  icon: ReactNode
}

export function Button({icon, visible, bgColor, ...props} : IButton) {
  return(
    <button
      {...props}
      className={ButtonVariants({ visible, bgColor})}
    >
      {icon}
    </button>
  )
}