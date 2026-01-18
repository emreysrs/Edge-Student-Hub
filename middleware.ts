import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting store (in-memory - production'da Redis kullanın)
const ratelimit = new Map<string, { count: number; resetTime: number }>()

// Rate limit config
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 dakika
const MAX_REQUESTS_PER_WINDOW = 60 // 60 istek/dakika

// Brute force protection for auth endpoints
const AUTH_RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 dakika
const MAX_AUTH_ATTEMPTS = 5 // 5 deneme/15 dakika

function getRateLimitKey(req: NextRequest, prefix: string = 'general'): string {
  // IP adresini al (Vercel/production için)
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : req.ip || 'unknown'
  return `${prefix}:${ip}`
}

function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const record = ratelimit.get(key)

  if (!record || now > record.resetTime) {
    // Yeni pencere başlat
    ratelimit.set(key, { count: 1, resetTime: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1, resetTime: now + windowMs }
  }

  if (record.count >= maxRequests) {
    // Rate limit aşıldı
    return { allowed: false, remaining: 0, resetTime: record.resetTime }
  }

  // İsteği say
  record.count++
  return { allowed: true, remaining: maxRequests - record.count, resetTime: record.resetTime }
}

// Temizlik fonksiyonu - eski kayıtları sil
setInterval(() => {
  const now = Date.now()
  const entries = Array.from(ratelimit.entries())
  entries.forEach(([key, value]) => {
    if (now > value.resetTime) {
      ratelimit.delete(key)
    }
  })
}, 60 * 1000) // Her dakika temizle

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Auth endpoint'leri için özel rate limiting
  if (pathname.startsWith('/api/auth') || pathname === '/login' || pathname === '/signup') {
    const authKey = getRateLimitKey(req, 'auth')
    const { allowed, remaining, resetTime } = checkRateLimit(
      authKey,
      MAX_AUTH_ATTEMPTS,
      AUTH_RATE_LIMIT_WINDOW
    )

    if (!allowed) {
      const waitTime = Math.ceil((resetTime - Date.now()) / 1000 / 60)
      return NextResponse.json(
        {
          error: 'Too many authentication attempts',
          message: `Çok fazla giriş denemesi. Lütfen ${waitTime} dakika sonra tekrar deneyin.`,
          retryAfter: waitTime
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((resetTime - Date.now()) / 1000)),
            'X-RateLimit-Limit': String(MAX_AUTH_ATTEMPTS),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(resetTime).toISOString()
          }
        }
      )
    }
  }

  // Genel API rate limiting
  if (pathname.startsWith('/api/')) {
    const apiKey = getRateLimitKey(req, 'api')
    const { allowed, remaining, resetTime } = checkRateLimit(
      apiKey,
      MAX_REQUESTS_PER_WINDOW,
      RATE_LIMIT_WINDOW
    )

    if (!allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: 'Çok fazla istek gönderdiniz. Lütfen biraz bekleyin.',
          retryAfter: Math.ceil((resetTime - Date.now()) / 1000)
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((resetTime - Date.now()) / 1000)),
            'X-RateLimit-Limit': String(MAX_REQUESTS_PER_WINDOW),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(resetTime).toISOString()
          }
        }
      )
    }

    // Rate limit header'larını ekle
    const response = NextResponse.next()
    response.headers.set('X-RateLimit-Limit', String(MAX_REQUESTS_PER_WINDOW))
    response.headers.set('X-RateLimit-Remaining', String(remaining))
    response.headers.set('X-RateLimit-Reset', new Date(resetTime).toISOString())
  }

  // Güvenlik header'ları ekle
  const response = NextResponse.next()

  // XSS Protection
  response.headers.set('X-XSS-Protection', '1; mode=block')

  // Clickjacking Protection
  response.headers.set('X-Frame-Options', 'DENY')

  // MIME Type Sniffing Protection
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // Referrer Policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Permissions Policy (Feature Policy)
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  )

  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://accounts.google.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://accounts.google.com",
      "frame-src 'self' https://accounts.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ].join('; ')
  )

  // Strict Transport Security (HTTPS only - production)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
}
