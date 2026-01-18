export interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  role: 'student' | 'admin'
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  user_id: string
  room_id: string
  check_in_date: string
  check_out_date: string
  status: 'pending' | 'confirmed' | 'cancelled'
  total_amount: number
  payment_status: 'pending' | 'paid' | 'refunded'
  created_at: string
  updated_at: string
}

export interface RoomType {
  id: string
  name: string
  type: 'quad' | 'double' | 'single'
  description: string
  price: number
  capacity: number
  size: number
  amenities: string[]
  image_url: string
  available: boolean
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied'
  created_at: string
}
