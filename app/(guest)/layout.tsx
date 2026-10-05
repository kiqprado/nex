import { GuestGuard } from "../components/auth/guest-guard"

export default function GuestLayout({children}: Readonly<{children: React.ReactNode}>) {
  return(
    <GuestGuard>
      {children}
    </GuestGuard>
  )
}