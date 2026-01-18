import { Room, FAQ } from "@/types"

export const rooms: Room[] = [
  {
    id: "1",
    name: "Quad Room (4-Person)",
    type: "quad",
    price: 399,
    image: "/images/building-exterior.jpg",
    amenities: ["4 Single Beds", "Shared Bathroom", "Study Desks", "Free WiFi", "Heating", "Wardrobe Space"],
    capacity: 4,
    size: 25,
    available: true,
    description: "Spacious shared room for 4 students with individual study areas and shared bathroom. Perfect for making friends!",
  },
  {
    id: "2",
    name: "Double Shared Room",
    type: "double",
    price: 599,
    image: "/images/building-exterior.jpg",
    amenities: ["2 Single Beds", "Shared Bathroom", "Study Desks", "Free WiFi", "Heating", "Storage"],
    capacity: 2,
    size: 18,
    available: true,
    description: "Comfortable shared room for 2 students with modern furnishings and shared facilities.",
  },
  {
    id: "3",
    name: "Private Room",
    type: "single",
    price: 899,
    image: "/images/building-exterior.jpg",
    amenities: ["Single Bed", "Private Bathroom", "Study Desk", "Free WiFi", "Heating", "Wardrobe", "Mini Fridge"],
    capacity: 1,
    size: 15,
    available: true,
    description: "Your own private space with ensuite bathroom. Perfect for focused studying and privacy.",
  },
]

export const faqs: FAQ[] = [
  {
    question: "What is included in the rent?",
    answer: "All rooms include Wi-Fi, heating, electricity, water, and basic furniture (bed, desk, wardrobe). Premium studios also include a kitchenette or full kitchen.",
  },
  {
    question: "How close is Edge Student Hub to Berlin?",
    answer: "We are located in Zossen, just 30 minutes from Berlin city center by train. The train station is a 5-minute walk from the dormitory.",
  },
  {
    question: "What is the minimum rental period?",
    answer: "The minimum rental period is one semester (6 months). We also offer annual contracts with discounted rates.",
  },
  {
    question: "Is there a security deposit?",
    answer: "Yes, a refundable security deposit of one month's rent is required. It will be returned within 30 days after move-out, subject to room inspection.",
  },
  {
    question: "Are pets allowed?",
    answer: "Unfortunately, pets are not allowed in the dormitory to maintain a clean and allergy-free environment for all residents.",
  },
  {
    question: "What facilities are available in the building?",
    answer: "We have a shared lounge, study room, laundry facilities, bike storage, 24/7 security, and regular cleaning services for common areas.",
  },
  {
    question: "How do I apply for a room?",
    answer: "You can apply directly through our online booking system. Select your preferred dates and room type, fill in your details, and submit. We'll confirm availability within 24 hours.",
  },
  {
    question: "Can I visit the property before booking?",
    answer: "Absolutely! We offer virtual tours via video call and in-person visits by appointment. Contact us to schedule a viewing.",
  },
]
