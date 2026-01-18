import { supabase } from './supabase'

export function subscribeToAuthUsers(onChange: (payload: any) => void) {
  const channel = supabase.channel('auth-users-realtime')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'users' },
      payload => {
        onChange(payload)
      }
    )
    .subscribe()
  return channel
}
