import { supabase } from './supabase'
import { User, Session } from '@supabase/supabase-js'
import { 
  sanitizeEmail, 
  sanitizeText, 
  sanitizePhone, 
  validatePassword, 
  validateEmail,
  validatePhoneNumber 
} from './security'

export interface SignUpData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

// Sign up new user
export async function signUp(data: SignUpData): Promise<{ user: User | null; error: string | null }> {
  try {
    // Input validasyonu ve sanitizasyon
    const sanitizedEmail = sanitizeEmail(data.email)
    const sanitizedFirstName = sanitizeText(data.firstName)
    const sanitizedLastName = sanitizeText(data.lastName)
    const sanitizedPhone = data.phone ? sanitizePhone(data.phone) : undefined

    // Email validasyonu
    if (!validateEmail(sanitizedEmail)) {
      return { user: null, error: 'Geçersiz email adresi' }
    }

    // İsim validasyonu
    if (sanitizedFirstName.length < 2 || sanitizedLastName.length < 2) {
      return { user: null, error: 'İsim ve soyisim en az 2 karakter olmalıdır' }
    }

    // Şifre güvenlik kontrolü
    const passwordValidation = validatePassword(data.password)
    if (!passwordValidation.valid) {
      return { user: null, error: passwordValidation.errors[0] }
    }

    // Telefon numarası validasyonu (opsiyonel)
    if (sanitizedPhone && !validatePhoneNumber(sanitizedPhone)) {
      return { user: null, error: 'Geçersiz telefon numarası formatı' }
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: sanitizedEmail,
      password: data.password,
      options: {
        data: {
          full_name: `${sanitizedFirstName} ${sanitizedLastName}`,
          phone: sanitizedPhone,
          role: 'student'
        }
      }
    })

    if (authError) throw authError

    return { user: authData.user, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

// Sign in existing user
export async function signIn(email: string, password: string): Promise<{ user: User | null; session: Session | null; error: string | null }> {
  try {
    // Input sanitizasyonu
    const sanitizedEmail = sanitizeEmail(email)

    // Email validasyonu
    if (!validateEmail(sanitizedEmail)) {
      return { user: null, session: null, error: 'Geçersiz email adresi' }
    }

    // Şifre minimum uzunluk kontrolü
    if (password.length < 8) {
      return { user: null, session: null, error: 'Geçersiz şifre' }
    }

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: sanitizedEmail,
      password,
    })

    if (authError) throw authError

    return { user: authData.user, session: authData.session, error: null }
  } catch (error: any) {
    return { user: null, session: null, error: error.message }
  }
}

// Sign out
export async function signOut(): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

// Get current user
export async function getCurrentUser(): Promise<{ user: User | null; error: string | null }> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return { user, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

// Get user session
export async function getSession(): Promise<{ session: Session | null; error: string | null }> {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return { session, error: null }
  } catch (error: any) {
    return { session: null, error: error.message }
  }
}

// Reset password
export async function resetPassword(email: string): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) throw error
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

// Update password
export async function updatePassword(newPassword: string): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })
    if (error) throw error
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

// Get user role from database
export async function getUserRole(userId: string): Promise<{ role: 'student' | 'admin' | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single()

    if (error) throw error
    return { role: data?.role || null, error: null }
  } catch (error: any) {
    return { role: null, error: error.message }
  }
}

// Check if user is admin
export async function isAdmin(): Promise<boolean> {
  try {
    const { user } = await getCurrentUser()
    if (!user) return false

    const { role } = await getUserRole(user.id)
    return role === 'admin'
  } catch (error) {
    return false
  }
}
