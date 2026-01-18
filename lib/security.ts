// Güvenlik yardımcı fonksiyonları

/**
 * Email validasyonu - SQL injection ve XSS koruması
 */
export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase().replace(/[<>'"]/g, '')
}

/**
 * Metin inputlarını temizle - XSS koruması
 */
export function sanitizeText(text: string): string {
  return text
    .trim()
    .replace(/[<>]/g, '') // HTML tag'lerini engelle
    .replace(/javascript:/gi, '') // Javascript: URL'lerini engelle
    .replace(/on\w+=/gi, '') // Event handler'ları engelle
}

/**
 * Telefon numarası validasyonu
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d\s\-\+\(\)]/g, '').trim()
}

/**
 * SQL Injection koruması için string temizleme
 */
export function escapeSql(input: string): string {
  return input.replace(/'/g, "''").replace(/;/g, '')
}

/**
 * Güçlü şifre kontrolü
 */
export function validatePassword(password: string): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Şifre en az 8 karakter olmalıdır')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Şifre en az bir büyük harf içermelidir')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Şifre en az bir küçük harf içermelidir')
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Şifre en az bir rakam içermelidir')
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Şifre en az bir özel karakter içermelidir')
  }

  // Yaygın şifreleri engelle
  const commonPasswords = [
    'password',
    '12345678',
    'qwerty123',
    'admin123',
    'welcome123',
    'password123'
  ]

  if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
    errors.push('Bu şifre çok yaygın kullanılıyor, daha güvenli bir şifre seçin')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Email format validasyonu
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

/**
 * Telefon numarası validasyonu (Türkiye formatı)
 */
export function validatePhoneNumber(phone: string): boolean {
  // Türk telefon numaraları için: +90 veya 0 ile başlayan 10 haneli
  const phoneRegex = /^(\+90|0)?[1-9]\d{9}$/
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
}

/**
 * Tarih validasyonu - check-in check-out
 */
export function validateBookingDates(checkIn: string, checkOut: string): {
  valid: boolean
  error?: string
} {
  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (checkInDate < today) {
    return { valid: false, error: 'Giriş tarihi bugünden önce olamaz' }
  }

  if (checkOutDate <= checkInDate) {
    return { valid: false, error: 'Çıkış tarihi giriş tarihinden sonra olmalıdır' }
  }

  // Maksimum 12 ay ileri rezervasyon
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 1)

  if (checkInDate > maxDate) {
    return { valid: false, error: 'Rezervasyon en fazla 12 ay önceden yapılabilir' }
  }

  // Minimum 1 ay kalış süresi
  const minStayDays = 30
  const diffTime = checkOutDate.getTime() - checkInDate.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < minStayDays) {
    return { valid: false, error: 'Minimum kalış süresi 1 ay (30 gün) olmalıdır' }
  }

  return { valid: true }
}

/**
 * Fiyat validasyonu
 */
export function validatePrice(price: number): boolean {
  return price > 0 && price <= 10000 && Number.isFinite(price)
}

/**
 * UUID validasyonu
 */
export function validateUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

/**
 * CSRF Token oluştur
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Hassas bilgileri loglardan gizle
 */
export function sanitizeForLogging(data: any): any {
  const sensitiveFields = ['password', 'token', 'apiKey', 'secret', 'creditCard']
  const sanitized = { ...data }

  Object.keys(sanitized).forEach(key => {
    if (sensitiveFields.some(field => key.toLowerCase().includes(field.toLowerCase()))) {
      sanitized[key] = '***REDACTED***'
    }
  })

  return sanitized
}

/**
 * IP adresinden gerçek IP'yi al (proxy arkasında)
 */
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return 'unknown'
}

/**
 * Dosya yükleme güvenliği - MIME type kontrolü
 */
export function validateFileUpload(file: File, allowedTypes: string[], maxSizeMB: number = 5): {
  valid: boolean
  error?: string
} {
  // MIME type kontrolü
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `İzin verilen dosya türleri: ${allowedTypes.join(', ')}`
    }
  }

  // Dosya boyutu kontrolü
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `Dosya boyutu maksimum ${maxSizeMB}MB olabilir`
    }
  }

  // Dosya adı güvenlik kontrolü
  const fileName = file.name
  const dangerousPatterns = [
    /\.\./,  // Directory traversal
    /[<>:"|?*]/,  // Yasak karakterler
    /\.exe$/i,  // Executable dosyalar
    /\.sh$/i,   // Shell script
    /\.bat$/i,  // Batch dosyalar
    /\.cmd$/i   // Command dosyalar
  ]

  if (dangerousPatterns.some(pattern => pattern.test(fileName))) {
    return {
      valid: false,
      error: 'Güvenli olmayan dosya adı'
    }
  }

  return { valid: true }
}

/**
 * HTML içeriğini temizle (basit XSS koruması)
 */
export function sanitizeHTML(html: string): string {
  // Tehlikeli tag'leri kaldır
  const dangerous = /<script|<iframe|<object|<embed|<link|javascript:|on\w+=/gi
  return html.replace(dangerous, '')
}

/**
 * Brute force koruması için exponential backoff hesapla
 */
export function calculateBackoffTime(attempts: number): number {
  // Her denemede bekleme süresini iki katına çıkar
  // 1. deneme: 1 saniye
  // 2. deneme: 2 saniye
  // 3. deneme: 4 saniye
  // 5. deneme: 16 saniye
  // vs...
  return Math.min(Math.pow(2, attempts - 1) * 1000, 60000) // Max 60 saniye
}
