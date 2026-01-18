import { HeroSection } from "@/components/sections/hero-section"
import { CommitmentsSection } from "@/components/sections/commitments-section"
import { AboutSection } from "@/components/sections/about-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { RoomsSection } from "@/components/sections/rooms-section"
import { PriceComparisonSection } from "@/components/sections/price-comparison-section"
import { GallerySection } from "@/components/sections/gallery-section"
import { AmenitiesSection } from "@/components/sections/amenities-section"
import { LocationSection } from "@/components/sections/location-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { FAQSection } from "@/components/sections/faq-section"
import { CTASection } from "@/components/sections/cta-section"
import { ContactSection } from "@/components/sections/contact-section"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col -mt-16">
      <HeroSection />
      <CommitmentsSection />
      <AboutSection />
      <HowItWorksSection />
      <RoomsSection />
      <PriceComparisonSection />
      <GallerySection />
      <AmenitiesSection />
      <LocationSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
    </main>
  )
}
