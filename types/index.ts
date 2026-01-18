export interface Room {
  id: string
  name: string
  type: "single" | "double" | "quad"
  price: number
  image: string
  amenities: string[]
  capacity: number
  size: number
  available: boolean
  description: string
}

export interface Booking {
  id: string
  roomId: string
  userId: string
  checkIn: Date
  checkOut: Date
  totalPrice: number
  status: "pending" | "confirmed" | "cancelled"
  createdAt: Date
  guestInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    university: string
    nationality: string
  }
}

export interface FAQ {
  question: string
  answer: string
}
