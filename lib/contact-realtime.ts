import { supabase } from './supabase'

export function subscribeToContacts(onChange: (payload: any) => void) {
  const channel = supabase.channel('contacts-realtime')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'contact' },
      payload => {
        onChange(payload)
      }
    )
    .subscribe()
  return channel
}
