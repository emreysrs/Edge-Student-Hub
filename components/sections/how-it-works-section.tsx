"use client"

import { FileText, Phone, FileSignature, Home } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Choose Your Stay",
      description: "Send your application through a simple online form to reserve your desired accommodation."
    },
    {
      number: "02",
      icon: Phone,
      title: "Sales Follow-up & Approval",
      description: "Our Sales Team contacts you to finalize the details of your reservation."
    },
    {
      number: "03",
      icon: FileSignature,
      title: "Online Contract Signature",
      description: "You can sign all contracts and agreements fully online through your personal Edge Student Hub profile and set your move-in date."
    },
    {
      number: "04",
      icon: Home,
      title: "Move-in to your Edge Home",
      description: "Once everything is set up, it's time to move-in. You just bring your belongings, we'll take care of the rest."
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">
            HOW IT WORKS
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Edge Student Hub is a flexible housing solution offering private and shared apartments in Zossen, just 30 minutes from Berlin.
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-6xl mx-auto">
          {/* Vertical Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-500 transform -translate-x-1/2"></div>

          {/* Steps Grid */}
          <div className="space-y-24">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Number & Icon Side */}
                <div className={`flex items-center ${
                  index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start lg:col-start-2'
                }`}>
                  <div className="text-9xl font-bold text-gray-900 opacity-10 absolute">
                    {step.number}
                  </div>
                  <div className="relative z-10 bg-white p-8 rounded-2xl border-4 border-blue-500 shadow-xl max-w-md">
                    <div className="flex items-start gap-6">
                      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-xl flex-shrink-0">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="text-7xl font-bold text-gray-900 mb-2">
                          {step.number}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className={`${
                  index % 2 === 0 ? 'lg:col-start-1 lg:row-start-1' : ''
                }`}>
                  <div className="max-w-md">
                    <h3 className="text-3xl font-bold mb-4 text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
