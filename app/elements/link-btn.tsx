import Link from "next/link"
import { ComponentProps, ReactNode } from "react"

interface ILinkButton extends ComponentProps<typeof Link> {
  children: ReactNode
}

export function LinkButton({children, ...props}: ILinkButton) {
  return(
    <Link
      {...props}
      className='flex flex-col gap-2 items-center justify-center'
    >
      {children}
    </Link>
  )
}