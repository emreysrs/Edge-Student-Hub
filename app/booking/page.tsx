"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookingCalendar } from "@/components/booking/booking-calendar"
import { RoomSelector } from "@/components/booking/room-selector"
import { PersonalDetails } from "@/components/booking/personal-details"
import { BookingSummary } from "@/components/booking/booking-summary"
import { rooms } from "@/lib/data"
import { Check, Calendar, Home, User, CreditCard } from "lucide-react"

type BookingStep = "dates" | "room" | "details" | "summary"

function BookingContent() {
  const searchParams = useSearchParams()
  const preselectedRoomId = searchParams.get("roomId")
  
  const [currentStep, setCurrentStep] = useState<BookingStep>("dates")
  const [bookingData, setBookingData] = useState({
    checkIn: null as Date | null,
    checkOut: null as Date | null,
    roomId: preselectedRoomId || "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    university: "",
    nationality: "",
  })

  const steps = [
    { id: "dates", label: "Select Dates", icon: Calendar },
    { id: "room", label: "Choose Room", icon: Home },
    { id: "details", label: "Your Details", icon: User },
    { id: "summary", label: "Confirm", icon: CreditCard },
  ]

  const currentStepIndex = steps.findIndex(s => s.id === currentStep)

  const selectedRoom = rooms.find(r => r.id === bookingData.roomId)
  const nights = bookingData.checkIn && bookingData.checkOut 
    ? Math.ceil((bookingData.checkOut.getTime() - bookingData.checkIn.getTime()) / (1000 * 60 * 60 * 24))
    : 0
  const dailyRate = selectedRoom ? selectedRoom.price / 30 : 0
  const totalPrice = nights * dailyRate

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Book Your Room</h1>
          <div className="text-lg text-muted-foreground">
            Complete the booking process in a few simple steps
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isCompleted = index < currentStepIndex
              const isCurrent = step.id === currentStep

              return (
                <div key={step.id} className="flex-1 flex items-center">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        isCompleted
                          ? "bg-primary text-primary-foreground"
                          : isCurrent
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? <Check className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                    </div>
                    <div className={`text-sm mt-2 font-medium ${isCurrent ? "text-primary" : "text-muted-foreground"}`}>
                      {step.label}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 transition-colors ${
                        index < currentStepIndex ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {currentStep === "dates" && "Select Your Dates"}
                  {currentStep === "room" && "Choose Your Room"}
                  {currentStep === "details" && "Personal Information"}
                  {currentStep === "summary" && "Confirm Your Booking"}
                </CardTitle>
                <CardDescription>
                  {currentStep === "dates" && "Pick your check-in and check-out dates"}
                  {currentStep === "room" && "Select from available rooms"}
                  {currentStep === "details" && "Fill in your contact details"}
                  {currentStep === "summary" && "Review and confirm your booking"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentStep === "dates" && (
                  <BookingCalendar
                    checkIn={bookingData.checkIn}
                    checkOut={bookingData.checkOut}
                    onDatesChange={(checkIn, checkOut) => {
                      setBookingData({ ...bookingData, checkIn, checkOut })
                    }}
                    onNext={() => setCurrentStep("room")}
                  />
                )}

                {currentStep === "room" && (
                  <RoomSelector
                    selectedRoomId={bookingData.roomId}
                    onRoomSelect={(roomId) => {
                      setBookingData({ ...bookingData, roomId })
                    }}
                    onNext={() => setCurrentStep("details")}
                    onBack={() => setCurrentStep("dates")}
                  />
                )}

                {currentStep === "details" && (
                  <PersonalDetails
                    data={bookingData}
                    onChange={(data) => setBookingData({ ...bookingData, ...data })}
                    onNext={() => setCurrentStep("summary")}
                    onBack={() => setCurrentStep("room")}
                  />
                )}

                {currentStep === "summary" && (
                  <BookingSummary
                    bookingData={bookingData}
                    selectedRoom={selectedRoom}
                    nights={nights}
                    totalPrice={totalPrice}
                    onBack={() => setCurrentStep("details")}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {bookingData.checkIn && bookingData.checkOut && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Dates</div>
                    <div className="font-medium">
                      {bookingData.checkIn.toLocaleDateString()} - {bookingData.checkOut.toLocaleDateString()}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{nights} nights</div>
                  </div>
                )}

                {selectedRoom && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Room</div>
                    <div className="font-medium">{selectedRoom.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">€{selectedRoom.price}/month</div>
                  </div>
                )}

                {totalPrice > 0 && (
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <div className="font-semibold">Total</div>
                      <div className="text-2xl font-bold text-primary">€{totalPrice.toFixed(2)}</div>
                    </div>
                  </div>
                )}

                {!bookingData.checkIn && (
                  <div className="text-sm text-muted-foreground">Select your dates to see pricing</div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 flex items-center justify-center">Loading...</div>}>
      <BookingContent />
    </Suspense>
  )
}
