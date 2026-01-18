"use client"

import { MessageCircle, Heart, TrendingUp } from "lucide-react"

export function CommitmentsSection() {
  const commitments = [
    {
      icon: MessageCircle,
      title: "We tell it like it is",
      description: "We strive to set a new standard in student housing, keeping every communication you have with us straight, clear, and as informative as possible.",
      color: "bg-blue-500"
    },
    {
      icon: Heart,
      title: "We are here at every turn",
      description: "We know things may not always turn out as expected. Tell us what you need: we'll listen and help find a solution for your stay.",
      color: "bg-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "We break barriers",
      description: "Securing the right stay should be easy. That's why we're committed to eliminating all the unnecessary steps to housing, keeping it as simple as possible.",
      color: "bg-sky-500"
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            These are our
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
              commitments to you
            </span>
          </h2>
        </div>

        {/* Commitments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {commitments.map((commitment, index) => (
            <div 
              key={index} 
              className="group relative"
            >
              {/* Icon Container */}
              <div className={`w-16 h-16 ${commitment.color} rounded-2xl mb-6 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                <commitment.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {commitment.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {commitment.description}
              </p>
              
              {/* Decorative Line */}
              <div className={`absolute -bottom-6 left-0 w-24 h-1 ${commitment.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
