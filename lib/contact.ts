import { supabase } from './supabase'

// Create contact message
export async function createContactMessage(messageData: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{ ...messageData, status: 'new' }])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

// Get all contact messages (admin)
export async function getAllContactMessages() {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

// Update message status
export async function updateMessageStatus(messageId: string, status: 'new' | 'read' | 'replied') {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ status })
      .eq('id', messageId)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}
