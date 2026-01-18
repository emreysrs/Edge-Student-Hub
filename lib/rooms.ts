import { supabase } from './supabase'
import { Room } from '@/types'

// Get all rooms
export async function getAllRooms(): Promise<Room[]> {
  try {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .order('price', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error: any) {
    console.error('Error fetching rooms:', error)
    return []
  }
}

// Get available rooms
export async function getAvailableRooms(): Promise<Room[]> {
  try {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('available', true)
      .order('price', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error: any) {
    console.error('Error fetching available rooms:', error)
    return []
  }
}

// Get room by ID
export async function getRoomById(roomId: string): Promise<Room | null> {
  try {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('id', roomId)
      .single()

    if (error) throw error
    return data
  } catch (error: any) {
    console.error('Error fetching room:', error)
    return null
  }
}

// Update room availability
export async function updateRoomAvailability(roomId: string, available: boolean): Promise<Room | null> {
  try {
    const { data, error } = await supabase
      .from('rooms')
      .update({ available, updated_at: new Date().toISOString() })
      .eq('id', roomId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error: any) {
    console.error('Error updating room availability:', error)
    return null
  }
}
