"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { createBooking } from "@/lib/bookings"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { 
  Users, 
  Home, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Search,
  MoreVertical,
  Mail,
  Phone,
  Check,
  X,
  Clock,
  Eye,
  CheckCircle,
  XCircle,
  FileText,
  Trash2
} from "lucide-react"

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [bookings, setBookings] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+49 123 456 7890",
      room: "Single Studio A",
      checkIn: "2026-02-01",
      status: "confirmed",
      amount: "€420/month"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "+49 234 567 8901",
      room: "Shared Room B2",
      checkIn: "2026-02-15",
      status: "pending",
      amount: "€280/month"
    },
    {
      id: 3,
      name: "Emma Schmidt",
      email: "emma.s@email.com",
      phone: "+49 345 678 9012",
      room: "Premium Studio",
      checkIn: "2026-01-25",
      status: "confirmed",
      amount: "€520/month"
    },
    {
      id: 4,
      name: "Lucas Weber",
      email: "lucas.w@email.com",
      phone: "+49 456 789 0123",
      room: "Shared Room A1",
      checkIn: "2026-03-01",
      status: "pending",
      amount: "€280/month"
    },
    {
      id: 5,
      name: "Sophie Martinez",
      email: "sophie.m@email.com",
      phone: "+49 567 890 1234",
      room: "Single Studio B",
      checkIn: "2026-02-10",
      status: "cancelled",
      amount: "€420/month"
    }
  ])
  const [open, setOpen] = useState(false)
  const [newBooking, setNewBooking] = useState({
    name: "",
    email: "",
    phone: "",
    room: "",
    checkIn: "",
    status: "pending",
    amount: ""
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const stats = [
    {
      title: "Total Bookings",
      value: "45",
      change: "+20%",
      trend: "up",
      icon: Calendar,
      color: "text-blue-500"
    },
    {
      title: "Occupied Rooms",
      value: "38/50",
      change: "76% occupancy",
      trend: "up",
      icon: Home,
      color: "text-cyan-500"
    },
    {
      title: "Pending Applications",
      value: "12",
      change: "Requires review",
      trend: "neutral",
      icon: Clock,
      color: "text-sky-500"
    },
    {
      title: "Revenue This Month",
      value: "€18,450",
      change: "+15%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-500"
    }
  ]

  const handleApprove = (bookingId: number) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: "confirmed" } : booking
    ))
    toast({
      title: "Booking Approved",
      description: "The booking has been confirmed successfully.",
    })
  }

  const handleReject = (bookingId: number) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: "cancelled" } : booking
    ))
    toast({
      title: "Booking Rejected",
      description: "The booking has been cancelled.",
      variant: "destructive"
    })
  }

  const handleViewDetails = (bookingId: number) => {
    const booking = bookings.find(b => b.id === bookingId)
    toast({
      title: "Booking Details",
      description: `Viewing details for ${booking?.name}`,
    })
  }

  const handleDelete = (bookingId: number) => {
    setBookings(bookings.filter(booking => booking.id !== bookingId))
    toast({
      title: "Booking Deleted",
      description: "The booking has been removed from the system.",
      variant: "destructive"
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500 hover:bg-green-600"><Check className="w-3 h-3 mr-1" />Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
      case "cancelled":
        return <Badge variant="destructive"><X className="w-3 h-3 mr-1" />Cancelled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handleNewBookingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBooking({ ...newBooking, [e.target.name]: e.target.value })
  }

  const handleNewBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Basit validasyon
      if (!newBooking.name || !newBooking.email || !newBooking.room || !newBooking.checkIn) {
        toast({ title: "Eksik bilgi", description: "Tüm alanları doldurun.", variant: "destructive" })
        setLoading(false)
        return
      }
      // createBooking fonksiyonunu çağır
      const { data, error } = await createBooking({
        user_id: "admin-panel-manual", // gerçek user_id yerine dummy (veya seçilebilir)
        room_id: newBooking.room,
        check_in_date: newBooking.checkIn,
        check_out_date: newBooking.checkIn, // örnek, gerçek formda eklenmeli
        status: "confirmed",
        total_amount: 0,
        payment_status: "pending"
      })
      if (error) {
        toast({ title: "Hata", description: error, variant: "destructive" })
      } else {
        toast({ title: "Başarılı", description: "Yeni rezervasyon eklendi!" })
        setBookings([...bookings, { ...newBooking, id: Date.now() }])
        setOpen(false)
        setNewBooking({ name: "", email: "", phone: "", room: "", checkIn: "", status: "pending", amount: "" })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, Administrator</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold">
                    <Users className="w-4 h-4 mr-2" />
                    New Booking
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>New Booking</DialogTitle>
                  <form onSubmit={handleNewBookingSubmit} className="space-y-4">
                    <Input name="name" placeholder="Name" value={newBooking.name} onChange={handleNewBookingChange} required />
                    <Input name="email" placeholder="Email" value={newBooking.email} onChange={handleNewBookingChange} required />
                    <Input name="phone" placeholder="Phone" value={newBooking.phone} onChange={handleNewBookingChange} />
                    <Input name="room" placeholder="Room ID" value={newBooking.room} onChange={handleNewBookingChange} required />
                    <Input name="checkIn" type="date" placeholder="Check-in" value={newBooking.checkIn} onChange={handleNewBookingChange} required />
                    <Button type="submit" disabled={loading} className="w-full">{loading ? "Adding..." : "Add Booking"}</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <p className={`text-xs flex items-center mt-1 ${
                  stat.trend === "up" ? "text-green-600" : "text-gray-500"
                }`}>
                  {stat.trend === "up" && <TrendingUp className="w-3 h-3 mr-1" />}
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Bookings */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Recent Bookings</CardTitle>
                <CardDescription>Manage and review student applications</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search bookings..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Student</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Contact</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Room</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Check-in</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                            {booking.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{booking.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm space-y-1">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail className="w-3 h-3" />
                            {booking.email}
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone className="w-3 h-3" />
                            {booking.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{booking.room}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-600">{booking.checkIn}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-gray-900">{booking.amount}</div>
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="py-4 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleViewDetails(booking.id)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewDetails(booking.id)}>
                              <FileText className="w-4 h-4 mr-2" />
                              View Contract
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {booking.status === "pending" && (
                              <>
                                <DropdownMenuItem 
                                  onClick={() => handleApprove(booking.id)}
                                  className="text-green-600 focus:text-green-600"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Approve Booking
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleReject(booking.id)}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Reject Booking
                                </DropdownMenuItem>
                              </>
                            )}
                            {booking.status === "confirmed" && (
                              <DropdownMenuItem 
                                onClick={() => handleReject(booking.id)}
                                className="text-orange-600 focus:text-orange-600"
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Cancel Booking
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDelete(booking.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Booking
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">1-5</span> of <span className="font-semibold">45</span> bookings
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">1</Button>
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
