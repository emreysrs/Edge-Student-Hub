"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { getCurrentUser, signOut, getUserRole } from "@/lib/auth"
import { Menu, X, Home, Building2, MapPin, Mail, Users, Calendar, LogIn, UserPlus, LogOut, User, Shield } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<'student' | 'admin' | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    const { user } = await getCurrentUser()
    setUser(user)
    
    if (user) {
      const { role } = await getUserRole(user.id)
      setUserRole(role)
    }
    
    setLoading(false)
  }

  async function handleSignOut() {
    const { error } = await signOut()
    if (!error) {
      setUser(null)
      setUserRole(null)
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out",
      })
      router.push("/")
    }
  }

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "#rooms", label: "Rooms", icon: Building2 },
    { href: "#location", label: "Location", icon: MapPin },
    { href: "#faq", label: "FAQ", icon: Users },
    { href: "#contact", label: "Contact", icon: Mail },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/ggg-logo.png"
            alt="GGG Germany GmbH - Edge Student Hub"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-3">
            {!loading && (
              <>
                {user ? (
                  <>
                    <Button variant="outline" asChild size="sm">
                      <Link href={userRole === 'admin' ? "/admin/dashboard" : "/dashboard"}>
                        {userRole === 'admin' ? <Shield className="mr-2 h-4 w-4" /> : <User className="mr-2 h-4 w-4" />}
                        {userRole === 'admin' ? 'Admin' : 'Dashboard'}
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleSignOut}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" asChild size="sm">
                      <Link href="/login">
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </Link>
                    </Button>
                    <Button asChild size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold">
                      <Link href="/signup">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Sign Up
                      </Link>
                    </Button>
                  </>
                )}
              </>
            )}
            <Button asChild className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold">
              <Link href="/booking">
                <Calendar className="mr-2 h-4 w-4" />
                Book Now
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-3 text-sm font-medium py-2 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="space-y-2 pt-2 border-t">
              {!loading && (
                <>
                  {user ? (
                    <>
                      <Button variant="outline" asChild className="w-full justify-start">
                        <Link href={userRole === 'admin' ? "/admin/dashboard" : "/dashboard"} onClick={() => setIsOpen(false)}>
                          {userRole === 'admin' ? <Shield className="mr-2 h-4 w-4" /> : <User className="mr-2 h-4 w-4" />}
                          {userRole === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          handleSignOut()
                          setIsOpen(false)
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" asChild className="w-full justify-start">
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          <LogIn className="mr-2 h-4 w-4" />
                          Login
                        </Link>
                      </Button>
                      <Button asChild className="w-full justify-start bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold">
                        <Link href="/signup" onClick={() => setIsOpen(false)}>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Sign Up
                        </Link>
                      </Button>
                    </>
                  )}
                </>
              )}
              <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold">
                <Link href="/booking" onClick={() => setIsOpen(false)}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
