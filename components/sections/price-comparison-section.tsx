"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star } from "lucide-react"
import Link from "next/link"

export function PriceComparisonSection() {
  const plans = [
    {
      name: "Quad Room",
      price: 399,
      capacity: "4 Students",
      features: [
        "4 Single Beds",
        "Shared Bathroom",
        "Study Desks for All",
        "Free WiFi",
        "Heating Included",
        "Wardrobe Space",
        "Common Kitchen Access",
        "Utilities Included"
      ],
      popular: false
    },
    {
      name: "Double Shared",
      price: 599,
      capacity: "2 Students",
      features: [
        "2 Single Beds",
        "Shared Bathroom",
        "Individual Study Desks",
        "Free WiFi",
        "Heating Included",
        "Storage Space",
        "Common Kitchen Access",
        "Utilities Included",
        "More Privacy"
      ],
      popular: true
    },
    {
      name: "Private Room",
      price: 899,
      capacity: "1 Student",
      features: [
        "Single Bed",
        "Private Bathroom",
        "Personal Study Desk",
        "Free WiFi",
        "Heating Included",
        "Wardrobe & Storage",
        "Mini Fridge",
        "Utilities Included",
        "Maximum Privacy",
        "Best for Focus"
      ],
      popular: false
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Compare Our Rooms</h2>
          <div className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect accommodation that fits your budget and lifestyle
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-primary shadow-2xl scale-105' : 'hover:shadow-xl'} transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <div className="text-sm text-muted-foreground mb-4">{plan.capacity}</div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold">€{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={`/booking?roomType=${plan.name.toLowerCase().replace(' ', '-')}`} className="block">
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    Book Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>All prices include utilities (water, electricity, heating) and WiFi</p>
          <p className="mt-2">No hidden fees • Flexible contract terms • Deposit required</p>
        </div>
      </div>
    </section>
  )
}
