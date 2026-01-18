"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-500">
      {/* Geometric Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left Shapes */}
        <div className="absolute top-1/4 left-0 w-32 h-32 border-4 border-black/10 transform -translate-x-16 rotate-45"></div>
        <div className="absolute bottom-1/3 left-20 w-48 h-48 border-4 border-black/10 transform rotate-12"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 border-4 border-black/10 transform -translate-x-32 translate-y-32 -rotate-12">
          <div className="absolute bottom-0 right-0 w-full h-24 bg-black/5"></div>
        </div>
        
        {/* Right Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 border-4 border-black/10 transform translate-x-48 -translate-y-48"></div>
        <div className="absolute top-1/3 right-20 w-32 h-32 border-4 border-black/10"></div>
        
        {/* Diagonal Lines */}
        <div className="absolute top-0 left-1/3 w-px h-full bg-black/10 transform -rotate-12"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-black/10 transform rotate-12"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-black">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Boundless stays, built for every move.
            </h2>
            
            {/* Decorative Box */}
            <div className="w-64 h-48 border-4 border-black/20 mb-8 hidden md:block">
              <div className="w-full h-32 border-b-4 border-black/20"></div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <div className="bg-black/5 p-8 rounded-2xl backdrop-blur-sm">
              <p className="text-lg text-black/90 leading-relaxed mb-6">
                The student housing experience was broken. From complicated paperwork to uncertain living conditions — finding your perfect home was never straightforward.
              </p>
              <p className="text-lg text-black/90 leading-relaxed mb-6">
                So we decided to turn hassle into opportunity. We've standardized the housing process for students with a digital-first approach that provides solutions, not stress.
              </p>
              <Link href="#contact">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-transparent border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 font-semibold"
                >
                  Learn more about us →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
