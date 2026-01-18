import { supabase } from './supabase'

export function subscribeToRooms(onChange: (payload: any) => void) {
  const channel = supabase.channel('rooms-realtime')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'rooms' },
      payload => {
        onChange(payload)
      }
    )
    .subscribe()
  return channel
}
