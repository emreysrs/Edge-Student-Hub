"use client"

import { Button } from "@/components/ui/button"
import { Calendar, MessageCircle, Phone } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/90 to-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Move In?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join our international student community today! Limited rooms available for the upcoming semester.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/booking">
              <Button size="lg" variant="secondary" className="gap-2 text-lg px-8 py-6">
                <Calendar className="h-5 w-5" />
                Book Your Room Now
              </Button>
            </Link>
            <Link href="#contact">
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6 bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary">
                <MessageCircle className="h-5 w-5" />
                Contact Us
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-primary-foreground/80">
            <Phone className="h-4 w-4" />
            <span className="text-sm">Call us: +49 123 456 789</span>
          </div>
        </div>
      </div>
    </section>
  )
}
