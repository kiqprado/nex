import { OnboardingGuard } from '@/app/components/auth/onboarding-guard'

export default function OnboardingLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <OnboardingGuard>
      {children}
    </OnboardingGuard>
  )
}