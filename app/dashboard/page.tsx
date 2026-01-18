"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/auth"
import { getBookingsByUser } from "@/lib/bookings"
import { Calendar, Clock, Home, CreditCard, Mail, Phone, User as UserIcon } from "lucide-react"

interface Booking {
  id: string
  room_id: string
  check_in_date: string
  check_out_date: string
  status: 'pending' | 'confirmed' | 'cancelled'
  total_amount: number
  payment_status: 'pending' | 'paid' | 'refunded'
  created_at: string
  rooms?: {
    name: string
    type: string
    price: number
  }
}

export default function UserDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [totalMonths, setTotalMonths] = useState(0)
  const [totalSpent, setTotalSpent] = useState(0)

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    const { user: currentUser } = await getCurrentUser()
    
    if (!currentUser) {
      router.push("/login")
      return
    }

    setUser(currentUser)
    await loadBookings(currentUser.id)
  }

  async function loadBookings(userId: string) {
    const data = await getBookingsByUser(userId)
    setBookings(data)
    
    // Calculate total months and spent
    let months = 0
    let spent = 0
    
    data.forEach((booking) => {
      if (booking.status !== 'cancelled') {
        const checkIn = new Date(booking.check_in_date)
        const checkOut = new Date(booking.check_out_date)
        const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        months += diffDays / 30
        spent += booking.total_amount
      }
    })
    
    setTotalMonths(Math.round(months * 10) / 10)
    setTotalSpent(spent)
    setLoading(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500'
      case 'pending': return 'bg-yellow-500'
      case 'cancelled': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500'
      case 'pending': return 'bg-yellow-500'
      case 'refunded': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-4">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">My Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground truncate">Welcome back, {user?.email}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6 md:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Months</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMonths} months</div>
              <p className="text-xs text-muted-foreground">Time stayed at Edge</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings.length}</div>
              <p className="text-xs text-muted-foreground">All time reservations</p>
            </CardContent>
          </Card>

          <Card className="sm:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{totalSpent}</div>
              <p className="text-xs text-muted-foreground">All time payments</p>
            </CardContent>
          </Card>
        </div>

        {/* Bookings List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">My Reservations</CardTitle>
            <CardDescription className="text-sm">View and manage your bookings</CardDescription>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <div className="text-center py-8 md:py-12">
                <Home className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-base md:text-lg font-semibold mb-2">No bookings yet</h3>
                <p className="text-sm text-muted-foreground mb-4">Start by booking your first room</p>
                <Button asChild>
                  <a href="/booking">Book Now</a>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => {
                  const checkIn = new Date(booking.check_in_date)
                  const checkOut = new Date(booking.check_out_date)
                  const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                  const months = Math.round((diffDays / 30) * 10) / 10

                  return (
                    <Card key={booking.id} className="bg-gray-50">
                      <CardContent className="pt-4 md:pt-6">
                        <div className="flex flex-col gap-4">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-semibold text-base md:text-lg">
                                {booking.rooms?.name || 'Room'}
                              </h3>
                              <Badge className={`${getStatusColor(booking.status)} text-xs`}>
                                {booking.status}
                              </Badge>
                              <Badge className={`${getPaymentStatusColor(booking.payment_status)} text-xs`}>
                                {booking.payment_status}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">Check-in: {checkIn.toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">Check-out: {checkOut.toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 flex-shrink-0" />
                                <span>{months} months ({diffDays} days)</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CreditCard className="h-4 w-4 flex-shrink-0" />
                                <span>Total: €{booking.total_amount}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t">
                            <div>
                              <div className="text-xl md:text-2xl font-bold text-primary">€{booking.rooms?.price}/mo</div>
                              <p className="text-xs md:text-sm text-muted-foreground capitalize">{booking.rooms?.type} Room</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
