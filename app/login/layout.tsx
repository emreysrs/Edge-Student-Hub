import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login - Edge Student Hub",
  description: "Sign in to your Edge Student Hub account",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
