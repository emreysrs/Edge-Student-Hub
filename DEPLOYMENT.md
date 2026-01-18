# 🚀 Deployment Guide - Edge Student Hub

## ✅ Updated & Ready for Deployment

### Latest Changes:
- ✅ **Next.js 16.1.3** - Latest stable version
- ✅ **React 19.2.3** - Latest React version
- ✅ **No Security Vulnerabilities** - All dependencies updated
- ✅ **Build Successful** - Tested and ready
- ✅ **Vercel Optimized** - vercel.json configured

## Production Deployment to Vercel

### Prerequisites Checklist:
- [x] GitHub repository created and pushed
- [x] Supabase project set up
- [x] Environment variables ready
- [x] Build tested locally
- [x] Security features enabled

### Steps:

#### 1. **Supabase Configuration** (If not done yet):
   - Go to [supabase.com](https://supabase.com/dashboard)
   - Create project: `edge-student-hub`
   - Region: Europe (Frankfurt)
   - Run SQL schema from `SUPABASE_SETUP.md`
   - Get API keys from Settings → API

#### 2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import: `emreysrs/Edge-Student-Hub`
   - Framework: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

#### 3. **Environment Variables in Vercel**:
   
   In Vercel dashboard → Settings → Environment Variables, add:
   
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://iqilbfuxtsqoohnvdssn.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   
   # Site Configuration
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   NODE_ENV=production
   
   # Security (Optional - defaults in code)
   RATE_LIMIT_WINDOW=60000
   MAX_REQUESTS_PER_WINDOW=60
   AUTH_RATE_LIMIT_WINDOW=900000
   MAX_AUTH_ATTEMPTS=5
   ```
   
   **Important**: 
   - Environment: Select "Production", "Preview", and "Development"
   - Get your Supabase anon key from Supabase Dashboard → Settings → API

#### 4. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes
   - ✅ Your site is live!

#### 5. **Post-Deployment**:
   - Test login/signup functionality
   - Create admin user (see `SUPABASE_SETUP.md` step 5)
   - Update `NEXT_PUBLIC_SITE_URL` with your actual Vercel URL
   - Test rate limiting (try 6+ requests quickly)

### 🔒 Security Headers

Already configured in `middleware.ts` and `vercel.json`:
- ✅ X-XSS-Protection
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ Content-Security-Policy
- ✅ Strict-Transport-Security
- ✅ Permissions-Policy
- ✅ Analytics built-in
- ✅ Preview deployments for branches
- ✅ Free tier (100GB bandwidth)

---

### Alternative: Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `.next`
3. Deploy via GitHub integration

---

### Alternative: Self-Hosted (VPS/DigitalOcean)

#### Requirements:
- Ubuntu 20.04+ server
- Node.js 18+
- PM2 for process management
- Nginx for reverse proxy

#### Setup:

```bash
# On your server
sudo apt update
sudo apt install nginx nodejs npm

# Install PM2
sudo npm install -g pm2

# Clone your repo
git clone https://github.com/yourusername/edge-student-hub.git
cd edge-student-hub

# Install dependencies
npm install

# Build for production
npm run build

# Start with PM2
pm2 start npm --name "edge-student-hub" -- start
pm2 save
pm2 startup
```

#### Nginx Configuration:
Create `/etc/nginx/sites-available/edge-student-hub`:

```nginx
server {
    listen 80;
    server_name edgestudenthub.de www.edgestudenthub.de;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/edge-student-hub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### SSL with Let's Encrypt:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d edgestudenthub.de -d www.edgestudenthub.de
```

---

## Pre-Deployment Checklist

### ✅ Before Going Live:

1. **Replace Mock Data**:
   - Update room images with real photos
   - Add actual room descriptions
   - Replace Unsplash URLs with your images

2. **Update Contact Info**:
   - Real email: `info@edgestudenthub.de`
   - Real phone number
   - Exact address in Zossen

3. **Google Maps**:
   - Get exact coordinates
   - Update iframe URL in `location-section.tsx`

4. **Legal Pages** (Create these):
   - Terms of Service
   - Privacy Policy
   - Cancellation Policy
   - Cookie Policy

5. **SEO Optimization**:
   - Update metadata in `app/layout.tsx`
   - Add `robots.txt`
   - Add `sitemap.xml`
   - Set up Google Search Console

6. **Analytics**:
   - Add Google Analytics
   - Or use Vercel Analytics
   - Track conversions (bookings)

7. **Performance**:
   - Compress images
   - Enable caching
   - Test on PageSpeed Insights

8. **Security**:
   - Enable CORS properly
   - Rate limiting for forms
   - HTTPS only

---

## Environment Variables

Create `.env.local` for production:

```env
# Site
NEXT_PUBLIC_SITE_URL=https://edgestudenthub.de

# Supabase (when ready)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# Resend (email)
RESEND_API_KEY=re_your_api_key

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Domain Setup

### Buying a Domain:

1. **Namecheap** (Recommended):
   - Buy `edgestudenthub.de`
   - ~€10-15/year

2. **DNS Configuration**:
   For Vercel:
   ```
   A Record:     @     →  76.76.21.21
   CNAME Record: www   →  cname.vercel-dns.com
   ```

### Email Setup:

Use **Google Workspace** or **ProtonMail**:
- `info@edgestudenthub.de`
- `bookings@edgestudenthub.de`
- `admin@edgestudenthub.de`

---

## Performance Optimization

### Image Optimization:

1. **Compress images**:
   - Use TinyPNG or Squoosh
   - Convert to WebP format
   - Keep under 200KB each

2. **Use Next.js Image**:
   Already implemented with `next/image`

### Caching:

Add `next.config.mjs`:
```javascript
const nextConfig = {
  images: {
    domains: ['your-image-cdn.com'],
    formats: ['image/webp'],
  },
  headers: async () => [
    {
      source: '/:all*(svg|jpg|png)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};
```

---

## Monitoring & Maintenance

### Analytics to Track:

- Page views
- Booking funnel conversion rate
- Popular room types
- Traffic sources
- Mobile vs desktop usage

### Error Monitoring:

Use **Sentry**:
```bash
npm install @sentry/nextjs
```

### Uptime Monitoring:

- **UptimeRobot** (free)
- Pingdom
- Better Uptime

---

## Cost Estimate

### Monthly Running Costs:

| Service | Free Tier | Paid |
|---------|-----------|------|
| Vercel Hosting | ✅ Free (hobby) | €20/month (pro) |
| Domain | - | €10/year |
| Supabase | ✅ Free (500MB) | €25/month |
| Resend Email | ✅ Free (3k/month) | €20/month |
| Images (Cloudinary) | ✅ Free (25GB) | €0-10/month |
| **Total** | **€0.83/month** | **€75/month** |

**Start with free tier**, upgrade when needed!

---

## Testing Before Launch

### Test Checklist:

- [ ] Homepage loads fast (<2s)
- [ ] All images display correctly
- [ ] Booking flow works end-to-end
- [ ] Forms validate properly
- [ ] Mobile menu works
- [ ] Contact form sends messages
- [ ] Calendar selects dates correctly
- [ ] Room filtering works
- [ ] Footer links work
- [ ] Test on multiple devices
- [ ] Test on different browsers
- [ ] Check console for errors

---

## Launch Sequence

### Day 1: Soft Launch
1. Deploy to Vercel
2. Test everything thoroughly
3. Share with friends for feedback

### Week 1: Beta Testing
1. Send to first 10 students
2. Collect feedback
3. Fix any bugs

### Week 2: Full Launch
1. Announce on social media
2. Register with Google Search Console
3. Submit to student housing directories
4. Set up Google Business Profile

---

## Support & Maintenance

### Regular Tasks:

**Daily**:
- Check for new bookings
- Respond to contact forms
- Monitor uptime

**Weekly**:
- Review analytics
- Update room availability
- Check for errors

**Monthly**:
- Update content
- Backup database
- Review security

---

## Emergency Contacts

**Vercel Support**: support@vercel.com  
**Supabase Support**: support@supabase.io  
**Domain Issues**: Your registrar support

---

## 🎉 You're Ready to Deploy!

Vercel deployment takes **literally 2 minutes**. The site is production-ready!

**Questions?** Review the README.md and QUICKSTART.md files.

**Good luck with your launch! 🚀**
