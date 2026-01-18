import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up - Edge Student Hub",
  description: "Create your Edge Student Hub account",
}

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
