"use client"

import Image from "next/image"
import { rooms } from "@/lib/data"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Users, Maximize } from "lucide-react"

interface RoomSelectorProps {
  selectedRoomId: string
  onRoomSelect: (roomId: string) => void
  onNext: () => void
  onBack: () => void
}

export function RoomSelector({ selectedRoomId, onRoomSelect, onNext, onBack }: RoomSelectorProps) {
  const availableRooms = rooms.filter(r => r.available)
  const isNextDisabled = !selectedRoomId

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        {availableRooms.map((room) => (
          <Card
            key={room.id}
            className={`cursor-pointer transition-all ${
              selectedRoomId === room.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onRoomSelect(room.id)}
          >
            <div className="relative h-32 w-full">
              <Image
                src={room.image}
                alt={room.name}
                fill
                className="object-cover rounded-t-lg"
              />
              {selectedRoomId === room.id && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{room.name}</CardTitle>
              <CardDescription className="flex items-center gap-3 text-xs">
                <span className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {room.capacity}
                </span>
                <span className="flex items-center">
                  <Maximize className="h-3 w-3 mr-1" />
                  {room.size}m²
                </span>
              </CardDescription>
            </CardHeader>

            <CardContent className="pb-3">
              <div className="flex flex-wrap gap-1">
                {room.amenities.slice(0, 3).map((amenity) => (
                  <Badge key={amenity} variant="secondary" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter>
              <div className="w-full flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold text-primary">€{room.price}</div>
                  <div className="text-xs text-muted-foreground">per month</div>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={onNext} disabled={isNextDisabled} className="flex-1">
          Continue to Details
        </Button>
      </div>
    </div>
  )
}
