"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Wifi, Utensils, Shirt, BookOpen, Home, Shield, Users, Zap } from "lucide-react"

export function AmenitiesSection() {
  const amenities = [
    {
      icon: Wifi,
      title: "High-Speed WiFi",
      description: "Free unlimited high-speed internet throughout the building"
    },
    {
      icon: Utensils,
      title: "Shared Kitchen",
      description: "Fully equipped modern kitchen with appliances and dining area"
    },
    {
      icon: BookOpen,
      title: "Study Rooms",
      description: "Quiet study spaces with desks and comfortable seating"
    },
    {
      icon: Users,
      title: "Common Areas",
      description: "Lounge and social spaces to meet other students"
    },
    {
      icon: Shield,
      title: "24/7 Security",
      description: "Secure entry system and CCTV monitoring for your safety"
    },
    {
      icon: Shirt,
      title: "Laundry Facilities",
      description: "Washing machines and dryers available for residents"
    },
    {
      icon: Zap,
      title: "All Utilities Included",
      description: "Water, electricity, heating included in rent"
    },
    {
      icon: Home,
      title: "Fully Furnished",
      description: "All rooms come with bed, desk, wardrobe, and storage"
    }
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Facilities & Amenities</h2>
          <div className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for comfortable student living
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/50"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <amenity.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{amenity.title}</h3>
                <p className="text-sm text-muted-foreground">{amenity.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
