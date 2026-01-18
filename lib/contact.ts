import { supabase } from './supabase'
import { 
  sanitizeEmail, 
  sanitizeText, 
  sanitizePhone, 
  validateEmail,
  validatePhoneNumber 
} from './security'

// Create contact message
export async function createContactMessage(messageData: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  try {
    // Input sanitizasyonu
    const sanitizedName = sanitizeText(messageData.name)
    const sanitizedEmail = sanitizeEmail(messageData.email)
    const sanitizedPhone = messageData.phone ? sanitizePhone(messageData.phone) : undefined
    const sanitizedSubject = sanitizeText(messageData.subject)
    const sanitizedMessage = sanitizeText(messageData.message)

    // Validasyon
    if (sanitizedName.length < 2) {
      return { data: null, error: 'İsim en az 2 karakter olmalıdır' }
    }

    if (!validateEmail(sanitizedEmail)) {
      return { data: null, error: 'Geçersiz email adresi' }
    }

    if (sanitizedPhone && !validatePhoneNumber(sanitizedPhone)) {
      return { data: null, error: 'Geçersiz telefon numarası' }
    }

    if (sanitizedSubject.length < 3 || sanitizedSubject.length > 200) {
      return { data: null, error: 'Konu 3-200 karakter arasında olmalıdır' }
    }

    if (sanitizedMessage.length < 10 || sanitizedMessage.length > 2000) {
      return { data: null, error: 'Mesaj 10-2000 karakter arasında olmalıdır' }
    }

    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{ 
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        subject: sanitizedSubject,
        message: sanitizedMessage,
        status: 'new' 
      }])
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
