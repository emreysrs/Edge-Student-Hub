import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Shield, Users, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-16">
      {/* Background Image - Real Edge Student Hub Building */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/building-front.jpg"
          alt="Edge Student Hub Building - Zossen, Germany"
          fill
          className="object-cover opacity-30 mix-blend-overlay"
          priority
        />
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-500/20 animate-pulse" 
             style={{ animationDuration: '8s' }} />
      </div>

      {/* Geometric Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 right-20 w-64 h-64 border-4 border-blue-500 transform rotate-45"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 border-4 border-cyan-500"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 border-4 border-sky-400 transform -rotate-12"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white py-32">
        {/* Logo - Hidden, can be removed or replaced with a better version */}
        {/* <div className="mb-12 flex justify-center animate-in fade-in duration-1000">
          <Image
            src="/images/ggg-logo.png"
            alt="GGG Germany GmbH - Edge Student Hub"
            width={200}
            height={66}
            className="h-20 w-auto drop-shadow-2xl filter brightness-0 invert"
            priority
          />
        </div> */}

        {/* Main Heading */}
        <h1 className="text-6xl md:text-8xl font-black mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 leading-tight">
          Your Perfect
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-500 to-sky-400 animate-gradient">
            Student Home
          </span>
        </h1>

        {/* Subtitle */}
        <div className="text-xl md:text-3xl mb-12 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150 font-light leading-relaxed">
          Premium student accommodation in <span className="font-bold text-blue-400">Zossen, Germany</span>
          <br />
          Just 30 minutes from Berlin's vibrant center
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <Link href="/booking">
            <Button 
              size="lg" 
              className="text-lg px-10 py-7 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold shadow-2xl hover:scale-105 transition-all duration-300 rounded-xl group"
            >
              Book Your Room Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="#rooms">
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-10 py-7 bg-transparent backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-xl rounded-xl font-semibold"
            >
              Explore Rooms
            </Button>
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <div className="group bg-white/5 backdrop-blur-md p-8 rounded-2xl hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 border border-white/10 hover:border-blue-500/50">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">Prime Location</h3>
            <p className="text-sm text-gray-300">30 min to Berlin center</p>
          </div>
          <div className="group bg-white/5 backdrop-blur-md p-8 rounded-2xl hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 border border-white/10 hover:border-blue-500/50">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">Safe & Secure</h3>
            <p className="text-sm text-gray-300">24/7 Security</p>
          </div>
          <div className="group bg-white/5 backdrop-blur-md p-8 rounded-2xl hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 border border-white/10 hover:border-blue-500/50">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Users className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">Student Community</h3>
            <p className="text-sm text-gray-300">Connect & thrive</p>
          </div>
          <div className="group bg-white/5 backdrop-blur-md p-8 rounded-2xl hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 border border-white/10 hover:border-blue-500/50">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Calendar className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">Easy Booking</h3>
            <p className="text-sm text-gray-300">100% online process</p>
          </div>
        </div>
      </div>
    </section>
  )
}
