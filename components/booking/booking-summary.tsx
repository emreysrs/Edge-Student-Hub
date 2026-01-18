"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Room } from "@/types"
import { Check } from "lucide-react"

interface BookingSummaryProps {
  bookingData: {
    checkIn: Date | null
    checkOut: Date | null
    roomId: string
    firstName: string
    lastName: string
    email: string
    phone: string
    university: string
    nationality: string
  }
  selectedRoom: Room | undefined
  nights: number
  totalPrice: number
  onBack: () => void
}

export function BookingSummary({ bookingData, selectedRoom, nights, totalPrice, onBack }: BookingSummaryProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleConfirm = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    toast({
      title: "Booking Confirmed!",
      description: `Your booking has been submitted. We'll send a confirmation email to ${bookingData.email} within 24 hours.`,
    })

    setIsSubmitting(false)
    
    // In a real app, redirect to a confirmation page
    setTimeout(() => {
      window.location.href = "/"
    }, 2000)
  }

  if (!selectedRoom || !bookingData.checkIn || !bookingData.checkOut) {
    return <div>Missing booking information</div>
  }

  return (
    <div className="space-y-6">
      {/* Room Details */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Room Details</h3>
          <div className="flex gap-4">
            <div className="relative w-32 h-24 flex-shrink-0">
              <Image
                src={selectedRoom.image}
                alt={selectedRoom.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <div className="font-medium">{selectedRoom.name}</div>
              <div className="text-sm text-muted-foreground mb-2">{selectedRoom.description}</div>
              <div className="flex flex-wrap gap-1">
                {selectedRoom.amenities.slice(0, 4).map((amenity) => (
                  <Badge key={amenity} variant="secondary" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Details */}
      <Card>
        <CardContent className="p-6 space-y-3">
          <h3 className="font-semibold mb-4">Booking Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Check-in</div>
              <div className="font-medium">{bookingData.checkIn.toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Check-out</div>
              <div className="font-medium">{bookingData.checkOut.toLocaleDateString()}</div>
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Duration</div>
            <div className="font-medium">{nights} nights</div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Info */}
      <Card>
        <CardContent className="p-6 space-y-3">
          <h3 className="font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Name</div>
              <div className="font-medium">{bookingData.firstName} {bookingData.lastName}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-medium">{bookingData.email}</div>
            </div>
            {bookingData.phone && (
              <div>
                <div className="text-sm text-muted-foreground">Phone</div>
                <div className="font-medium">{bookingData.phone}</div>
              </div>
            )}
            <div>
              <div className="text-sm text-muted-foreground">University</div>
              <div className="font-medium">{bookingData.university}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Nationality</div>
              <div className="font-medium">{bookingData.nationality}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Breakdown */}
      <Card>
        <CardContent className="p-6 space-y-3">
          <h3 className="font-semibold mb-4">Price Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">€{selectedRoom.price}/month × {(nights / 30).toFixed(1)} months</span>
              <span className="font-medium">€{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Cleaning fee</span>
              <span>€50.00</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Service fee</span>
              <span>€25.00</span>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">Total</span>
            <span className="text-2xl font-bold text-primary">€{(totalPrice + 75).toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1" disabled={isSubmitting}>
          Back
        </Button>
        <Button onClick={handleConfirm} className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? (
            "Processing..."
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Confirm Booking
            </>
          )}
        </Button>
      </div>

      <div className="text-xs text-muted-foreground text-center">
        By confirming, you agree to our Terms of Service and Privacy Policy. You will receive a confirmation email within 24 hours.
      </div>
    </div>
  )
}
