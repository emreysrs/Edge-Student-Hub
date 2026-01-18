"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"

export function GallerySection() {
  const images = [
    {
      src: "/images/building-exterior.jpg",
      alt: "Edge Student Hub Building Main Entrance",
      title: "Modern Building Entrance"
    },
    {
      src: "/images/building-front.jpg",
      alt: "Edge Student Hub Exterior View",
      title: "Building Exterior"
    },
    {
      src: "/images/facility-1.jpg",
      alt: "Edge Student Hub Facilities",
      title: "Student Facilities"
    },
    {
      src: "/images/facility-2.jpg",
      alt: "Edge Student Hub Interior",
      title: "Common Areas"
    },
    {
      src: "/images/room-1.jpg",
      alt: "Student Room Example",
      title: "Sample Room"
    },
    {
      src: "/images/exterior-view.jpg",
      alt: "Street View of Edge Student Hub",
      title: "Location View"
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Photo Gallery</h2>
          <div className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take a virtual tour of our modern student accommodation in Zossen
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <Card key={index} className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg drop-shadow-lg">{image.title}</h3>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Google Maps Link */}
        <div className="text-center mt-10">
          <a
            href="https://www.google.de/maps/place/Edge+Student+Hub+GmbH/@52.2199379,13.4400202,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipNYB_RfurqKhZOOOrxPhgswzAL276GX7At6goEj!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipNYB_RfurqKhZOOOrxPhgswzAL276GX7At6goEj%3Dw129-h86-k-no!7i4286!8i2857!4m18!1m8!3m7!1s0x47a86b937f249f3b:0x162aa52d002ddfd4!2sEdge+Student+Hub+GmbH!8m2!3d52.2199738!4d13.4402714!10e5!16s%2Fg%2F11w7dvxr2k!3m8!1s0x47a86b937f249f3b:0x162aa52d002ddfd4!8m2!3d52.2199738!4d13.4402714!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11w7dvxr2k"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-lg group"
          >
            <MapPin className="h-5 w-5 group-hover:scale-110 transition-transform" />
            View More Photos on Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}
