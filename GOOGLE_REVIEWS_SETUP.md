# Google Reviews API Setup Guide

## 🎯 Avantajları

### Gerçek Google Reviews Kullanmanın Faydaları:
- ✅ **Güvenilirlik** - Gerçek müşteri yorumları
- ✅ **SEO Boost** - Google Rich Snippets
- ✅ **Otomatik Güncelleme** - Yeni yorumlar otomatik gelir
- ✅ **Rating Gösterimi** - Yıldız puanı otomatik
- ✅ **Profesyonellik** - "Powered by Google" badge
- ✅ **Doğrulanabilir** - Kullanıcılar Google'da teyit edebilir

## 📋 Kurulum Adımları

### 1. Google Cloud Console'a Git
```
https://console.cloud.google.com/
```

### 2. Yeni Proje Oluştur (veya mevcut projeyi seç)
- "Select a project" → "New Project"
- Proje adı: "Edge Student Hub Website"
- Create

### 3. Places API'yi Etkinleştir
- Menü → "APIs & Services" → "Library"
- "Places API" ara
- "Enable" butonuna tıkla

### 4. API Key Oluştur
- "APIs & Services" → "Credentials"
- "Create Credentials" → "API Key"
- API Key'i kopyala

### 5. API Key'i Güvenli Hale Getir (Önemli!)
- Oluşturulan API Key'e tıkla
- "API restrictions" → "Restrict key"
- "Places API" seç
- "Application restrictions" → "HTTP referrers"
- Allowed domains ekle:
  ```
  localhost:3000
  *.vercel.app
  edgestudenthub.de (eğer domain varsa)
  ```
- Save

### 6. .env.local Dosyası Oluştur
```bash
# Workspace root'ta
touch .env.local
```

İçeriği:
```env
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 7. Place ID'yi Doğrula
Edge Student Hub'ın Place ID'si:
```
ChIJO58fk5NrqEcR1N8C0C1SpRY
```

Doğrulamak için:
```
https://developers.google.com/maps/documentation/places/web-service/place-id
```

## 🔧 Kod Yapısı

### Mevcut İmplementasyon:

1. **lib/google-reviews.ts** - API çağrısı ve mock data
2. **components/sections/testimonials-section.tsx** - UI component
3. **Otomatik Fallback** - API key yoksa mock data kullanır

### Nasıl Çalışır:

```typescript
// 1. API key varsa gerçek yorumları çek
const reviews = await fetchGoogleReviews()

// 2. Yoksa veya hata varsa mock data kullan
if (!reviews || reviews.length === 0) {
  reviews = mockGoogleReviews
}

// 3. UI'da "Live from Google" badge göster (eğer gerçek veriyse)
```

## 💰 Fiyatlandırma

### Google Places API Pricing:

- **İlk 25,000 istek/ay** - ÜCRETSIZ ✅
- Sonraki istekler: $0.017 per request
- Cache ile 1 saatte bir güncelleme = Ayda ~720 istek
- **Tamamiyle ücretsiz kalırsınız** 🎉

### Optimizasyon:
```typescript
{
  next: { revalidate: 3600 } // 1 saatte bir güncelle
}
```

## 🚀 Deployment

### Vercel'de Environment Variables Ekle:

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Key: `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`
3. Value: API key'iniz
4. Tüm environments için seç (Production, Preview, Development)
5. Save

### Deploy Sonrası:
- Site otomatik olarak gerçek Google yorumlarını gösterecek
- "Live from Google" badge görünür olacak
- Yorumlar her saat başı güncellenecek

## 🧪 Test Etme

### Localhost'ta Test:

1. `.env.local` dosyasını oluştur
2. API key'i ekle
3. `npm run dev` ile çalıştır
4. Testimonials section'da "Live from Google" badge'i gör
5. Browser console'da hata olup olmadığını kontrol et

### API Test:
```bash
curl "https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJO58fk5NrqEcR1N8C0C1SpRY&fields=name,rating,reviews&key=YOUR_API_KEY"
```

## 📊 Monitoring

### API Kullanımı İzleme:
- Google Cloud Console → "APIs & Services" → "Dashboard"
- Places API metrics
- Daily request count

### Quota Limits:
- Default: 1,000 requests/day
- İhtiyaca göre artırılabilir

## 🔒 Güvenlik

### Best Practices:
- ✅ API key'i ASLA Git'e commit etme
- ✅ `.env.local` dosyasını `.gitignore`'a ekle
- ✅ API restrictions kullan (HTTP referrers)
- ✅ API key'i sadece Places API ile sınırla
- ✅ Rate limiting uygula (Next.js cache kullan)

## 🆘 Troubleshooting

### "API key not found" hatası:
- `.env.local` dosyası var mı kontrol et
- Dosya adı doğru mu? (`.env.local` exact)
- Server'ı restart et: `npm run dev`

### "REQUEST_DENIED" hatası:
- API key doğru mu?
- Places API enabled mi?
- API restrictions doğru mu?

### Yorumlar görünmüyor:
- Browser console'a bak
- Network tab'da API çağrısını kontrol et
- Place ID doğru mu?

## 🎨 Özelleştirme

### Gösterilecek Yorum Sayısı:
```typescript
setReviews(googleReviews.slice(0, 4)) // İlk 4 yorum
```

### Cache Süresi:
```typescript
next: { revalidate: 3600 } // 1 saat = 3600 saniye
```

### Yorum Filtreleme (sadece 4-5 yıldız):
```typescript
const filteredReviews = googleReviews.filter(r => r.rating >= 4)
```

## 📈 Gelecek Geliştirmeler

- [ ] Review widget (sidebar)
- [ ] Average rating display
- [ ] Review response system
- [ ] Review pagination
- [ ] Language filtering
- [ ] Review sorting (newest, highest rated)

## 🔗 Yararlı Linkler

- [Places API Documentation](https://developers.google.com/maps/documentation/places/web-service/overview)
- [Place Details API](https://developers.google.com/maps/documentation/places/web-service/details)
- [API Key Best Practices](https://developers.google.com/maps/api-security-best-practices)
- [Pricing Calculator](https://cloud.google.com/maps-platform/pricing)

---

**Not:** Şu anda API key olmadan çalışıyor (mock data ile). API key eklendiğinde otomatik olarak gerçek Google yorumlarına geçecek! 🎉
