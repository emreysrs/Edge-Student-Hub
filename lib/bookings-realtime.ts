import { supabase } from './supabase'

export function subscribeToBookings(onChange: (payload: any) => void) {
  // "bookings" tablosundaki insert, update, delete olaylarını dinle
  const channel = supabase.channel('bookings-realtime')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'bookings' },
      payload => {
        onChange(payload)
      }
    )
    .subscribe()
  return channel
}
