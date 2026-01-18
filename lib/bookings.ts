import { supabase } from './supabase'
import { Booking } from '@/types/database'
import { 
  validateBookingDates, 
  validatePrice, 
  validateUUID 
} from './security'

// Create new booking
export async function createBooking(bookingData: Partial<Booking>) {
  try {
    // Validasyonlar
    if (!bookingData.user_id || !validateUUID(bookingData.user_id)) {
      return { data: null, error: 'Geçersiz kullanıcı ID' }
    }

    if (!bookingData.room_id || !validateUUID(bookingData.room_id)) {
      return { data: null, error: 'Geçersiz oda ID' }
    }

    if (!bookingData.check_in_date || !bookingData.check_out_date) {
      return { data: null, error: 'Giriş ve çıkış tarihleri gereklidir' }
    }

    // Tarih validasyonu
    const dateValidation = validateBookingDates(
      bookingData.check_in_date,
      bookingData.check_out_date
    )

    if (!dateValidation.valid) {
      return { data: null, error: dateValidation.error || 'Geçersiz tarihler' }
    }

    // Fiyat validasyonu
    if (!bookingData.total_amount || !validatePrice(bookingData.total_amount)) {
      return { data: null, error: 'Geçersiz fiyat' }
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

// Get all bookings (admin)
export async function getAllBookings() {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        users:user_id (
          email,
          full_name,
          phone
        ),
        rooms:room_id (
          name,
          type,
          price
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

// Get user bookings
export async function getUserBookings(userId: string) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        rooms:room_id (
          name,
          type,
          price,
          image_url
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

// Alias for getUserBookings
export async function getBookingsByUser(userId: string): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        rooms:room_id (
          name,
          type,
          price
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error: any) {
    console.error('Error fetching user bookings:', error)
    return []
  }
}

// Update booking status
export async function updateBookingStatus(bookingId: string, status: 'pending' | 'confirmed' | 'cancelled') {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', bookingId)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

// Delete booking
export async function deleteBooking(bookingId: string) {
  try {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', bookingId)

    if (error) throw error
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

// Get booking by ID
export async function getBookingById(bookingId: string) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        users:user_id (
          email,
          full_name,
          phone
        ),
        rooms:room_id (
          name,
          type,
          price,
          image_url,
          amenities
        )
      `)
      .eq('id', bookingId)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}
