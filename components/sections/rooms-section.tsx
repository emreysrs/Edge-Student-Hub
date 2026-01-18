"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getAllRooms } from "@/lib/rooms"
import { Room } from "@/types"
import { Wifi, Wind, Users, Maximize, Check, X } from "lucide-react"

export function RoomsSection() {
  const [filter, setFilter] = useState<"all" | "single" | "double" | "quad">("all")
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRooms() {
      const data = await getAllRooms()
      setRooms(data)
      setLoading(false)
    }
    loadRooms()
  }, [])

  const filteredRooms = filter === "all" ? rooms : rooms.filter(room => room.type === filter)

  return (
    <section id="rooms" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Rooms</h2>
          <div className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our range of comfortable, fully-furnished rooms designed for student life.
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All Rooms
          </Button>
          <Button
            variant={filter === "quad" ? "default" : "outline"}
            onClick={() => setFilter("quad")}
          >
            Quad Rooms (4-Person)
          </Button>
          <Button
            variant={filter === "double" ? "default" : "outline"}
            onClick={() => setFilter("double")}
          >
            Double Rooms
          </Button>
          <Button
            variant={filter === "single" ? "default" : "outline"}
            onClick={() => setFilter("single")}
          >
            Private Rooms
          </Button>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3">
                  {room.available ? (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <Check className="mr-1 h-3 w-3" />
                      Available
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <X className="mr-1 h-3 w-3" />
                      Occupied
                    </Badge>
                  )}
                </div>
              </div>

              <CardHeader>
                <CardTitle>{room.name}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {room.capacity} {room.capacity === 1 ? "Person" : "People"}
                    </span>
                    <span className="flex items-center">
                      <Maximize className="h-4 w-4 mr-1" />
                      {room.size}m²
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {room.description}
                </p>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-muted-foreground uppercase">Amenities</div>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.slice(0, 4).map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {room.amenities.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{room.amenities.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold text-primary">€{room.price}</p>
                  <p className="text-xs text-muted-foreground">per month</p>
                </div>
                <Button asChild disabled={!room.available}>
                  <Link href={room.available ? `/booking?roomId=${room.id}` : "#"}>
                    {room.available ? "Book Now" : "Not Available"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
