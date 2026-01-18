import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - Edge Student Hub",
  description: "Admin panel for managing bookings and rooms",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
