"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, ExternalLink } from "lucide-react"
import { fetchGoogleReviews, mockGoogleReviews, type GoogleReview } from "@/lib/google-reviews"

export function TestimonialsSection() {
  const [reviews, setReviews] = useState<GoogleReview[]>(mockGoogleReviews)
  const [isLoading, setIsLoading] = useState(true)
  const [useRealReviews, setUseRealReviews] = useState(false)

  useEffect(() => {
    async function loadReviews() {
      try {
        const googleReviews = await fetchGoogleReviews()
        if (googleReviews && googleReviews.length > 0) {
          setReviews(googleReviews.slice(0, 4)) // İlk 4 yorumu göster
          setUseRealReviews(true)
        }
      } catch (error) {
        console.error("Failed to load Google reviews:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadReviews()
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ))
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-4xl font-bold">What Students Say</h2>
            {useRealReviews && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Live from Google
              </span>
            )}
          </div>
          <div className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from our international student community
          </div>
          <a
            href="https://www.google.de/maps/place/Edge+Student+Hub+GmbH/@52.2199738,13.4402714,17z/data=!4m8!3m7!1s0x47a86b937f249f3b:0x162aa52d002ddfd4!8m2!3d52.2199738!4d13.4402714!9m1!1b1!16s%2Fg%2F11w7dvxr2k"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium mt-2"
          >
            <ExternalLink className="h-4 w-4" />
            View all reviews on Google Maps
          </a>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading reviews...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-muted">
                      {review.profile_photo_url ? (
                        <Image
                          src={review.profile_photo_url}
                          alt={review.author_name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground font-bold text-lg">
                          {review.author_name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{review.author_name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {review.relative_time_description}
                      </p>
                      <div className="flex gap-1 mt-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <Quote className="h-8 w-8 text-muted-foreground/20 flex-shrink-0" />
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{review.text}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium">Powered by</span>
            <Image
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
              alt="Google"
              width={92}
              height={30}
              className="opacity-70"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
