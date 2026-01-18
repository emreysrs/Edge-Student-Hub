"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Home, TrendingUp, Clock, CheckCircle, XCircle } from "lucide-react"

export default function AdminDashboard() {
  // Mock booking data
  const bookings = [
    {
      id: "1",
      guestName: "John Doe",
      room: "Cozy Single Room",
      checkIn: "2026-02-01",
      checkOut: "2026-08-31",
      status: "confirmed",
      total: 2700,
    },
    {
      id: "2",
      guestName: "Emma Schmidt",
      room: "Premium Studio",
      checkIn: "2026-03-15",
      checkOut: "2026-09-15",
      status: "pending",
      total: 3900,
    },
    {
      id: "3",
      guestName: "Ali Hassan",
      room: "Shared Double Room",
      checkIn: "2026-02-20",
      checkOut: "2026-08-20",
      status: "pending",
      total: 2100,
    },
  ]

  const stats = [
    { label: "Total Bookings", value: "24", icon: Calendar, color: "text-blue-600" },
    { label: "Occupied Rooms", value: "18/30", icon: Home, color: "text-green-600" },
    { label: "Pending Approvals", value: "5", icon: Clock, color: "text-orange-600" },
    { label: "Monthly Revenue", value: "€12,450", icon: TrendingUp, color: "text-purple-600" },
  ]

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage bookings and room availability</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                    <div className="text-3xl font-bold">{stat.value}</div>
                  </div>
                  <stat.icon className={`h-10 w-10 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bookings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Manage and approve student accommodation requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 mb-4 md:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{booking.guestName}</h3>
                      {booking.status === "confirmed" ? (
                        <Badge className="bg-green-500 hover:bg-green-600">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Confirmed
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-orange-500 text-white hover:bg-orange-600">
                          <Clock className="mr-1 h-3 w-3" />
                          Pending
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">
                      <Home className="inline h-3 w-3 mr-1" />
                      {booking.room}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <Calendar className="inline h-3 w-3 mr-1" />
                      {booking.checkIn} → {booking.checkOut}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right mr-4">
                      <div className="text-2xl font-bold text-primary">€{booking.total}</div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                    {booking.status === "pending" && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="default">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          <XCircle className="mr-1 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg text-center">
              <div className="text-sm text-muted-foreground mb-2">
                🔒 This is a demo admin dashboard. Backend integration coming soon!
              </div>
              <div className="text-xs text-muted-foreground">
                In the production version, you'll be able to approve/reject bookings, manage rooms, and view analytics.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Manage Rooms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">
                Update room availability and pricing
              </div>
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">View Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">
                Detailed reports and statistics
              </div>
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Send Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">
                Email guests and notifications
              </div>
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
