// Google Places API ile yorumları çekmek için
// API Key gerekiyor: https://console.cloud.google.com/apis/credentials

export interface GoogleReview {
  author_name: string
  author_url?: string
  language: string
  profile_photo_url?: string
  rating: number
  relative_time_description: string
  text: string
  time: number
}

export interface GooglePlaceDetails {
  name: string
  rating: number
  user_ratings_total: number
  reviews: GoogleReview[]
}

const PLACE_ID = "ChIJO58fk5NrqEcR1N8C0C1SpRY" // Edge Student Hub GmbH Place ID
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || ""

export async function fetchGoogleReviews(): Promise<GoogleReview[]> {
  if (!API_KEY) {
    console.warn("Google Places API key not found. Using mock data.")
    return []
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total&key=${API_KEY}&language=en`,
      {
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    )

    if (!response.ok) {
      throw new Error("Failed to fetch Google reviews")
    }

    const data = await response.json()

    if (data.status !== "OK") {
      throw new Error(`Google API error: ${data.status}`)
    }

    return data.result?.reviews || []
  } catch (error) {
    console.error("Error fetching Google reviews:", error)
    return []
  }
}

// Mock data fallback (API key yoksa veya limit doluysa)
export const mockGoogleReviews: GoogleReview[] = [
  {
    author_name: "Sarah Johnson",
    rating: 5,
    relative_time_description: "2 months ago",
    text: "Edge Student Hub is the perfect place for international students! The location is convenient, rooms are clean, and the community is amazing. I've made friends from all over the world. The train connection to Berlin is super easy.",
    time: 1699920000,
    language: "en",
    profile_photo_url: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=4F46E5&color=fff"
  },
  {
    author_name: "Ahmed Hassan",
    rating: 5,
    relative_time_description: "3 months ago",
    text: "Great value for money! The facilities are modern and well-maintained. The staff is very helpful and responsive. Having utilities included makes budgeting simple. Highly recommend for students studying in Berlin!",
    time: 1697328000,
    language: "en",
    profile_photo_url: "https://ui-avatars.com/api/?name=Ahmed+Hassan&background=10B981&color=fff"
  },
  {
    author_name: "Maria Garcia",
    rating: 5,
    relative_time_description: "1 month ago",
    text: "I love the quiet environment perfect for studying, but also the social spaces where we can hang out. The kitchen is well-equipped and always clean. Security is excellent. Perfect student accommodation!",
    time: 1702512000,
    language: "en",
    profile_photo_url: "https://ui-avatars.com/api/?name=Maria+Garcia&background=F59E0B&color=fff"
  },
  {
    author_name: "Wei Zhang",
    rating: 5,
    relative_time_description: "2 weeks ago",
    text: "Safe, affordable, and comfortable. The high-speed internet is perfect for online classes. Great choice for international students. The location in Zossen is peaceful but well-connected to Berlin.",
    time: 1704499200,
    language: "en",
    profile_photo_url: "https://ui-avatars.com/api/?name=Wei+Zhang&background=EF4444&color=fff"
  }
]
