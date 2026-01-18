# Edge Student Hub - Official Website

A modern, high-end student accommodation booking platform built with Next.js 14, TypeScript, and Tailwind CSS.

## 🏢 Project Overview

Edge Student Hub by **GGG Germany GmbH** is a premium student dormitory located in Zossen, Germany, just 30 minutes from Berlin. This website allows international and local university students to browse available rooms and book accommodations directly online.

## 🏠 Available Rooms

- **Quad Room (4-Person)** - €399/month - Spacious shared accommodation perfect for making friends
- **Double Shared Room** - €599/month - Comfortable room for 2 students with modern furnishings  
- **Private Room** - €899/month - Your own private space with ensuite bathroom and study area

## ✨ Features

### Implemented Features (Frontend)
- ✅ **Stunning Hero Section** - Full-screen landing with GGG Germany GmbH logo and high-quality imagery
- ✅ **Room Showcase** - Interactive grid layout with filtering (Quad, Double, Private)
- ✅ **Price Comparison Table** - Detailed side-by-side room comparison with features
- ✅ **Photo Gallery** - 6 real photos from Google Maps showcasing our facility
- ✅ **Amenities Showcase** - 8 facilities with icons (WiFi, Kitchen, Study Rooms, Security, etc.)
- ✅ **Multi-Step Booking System**:
  - Date selection with calendar interface (react-day-picker)
  - Room selection with availability status
  - Personal details form with validation
  - Booking summary and confirmation
- ✅ **Location Page** - Embedded Google Maps with exact Edge Student Hub location
- ✅ **Student Testimonials** - 4 reviews from international students with ratings
- ✅ **FAQ Section** - Accordion-style frequently asked questions
- ✅ **Call-to-Action Section** - Prominent booking and contact CTAs
- ✅ **Contact Form** - With toast notifications
- ✅ **Admin Dashboard** - Mock booking management interface
- ✅ **Fully Responsive** - Mobile-first design optimized for all devices
- ✅ **Smooth Scroll** - Enhanced UX with smooth page navigation
- ✅ **Hover Animations** - Professional transitions and effects throughout
- ✅ **Contact Form** - Professional contact section with office hours
- ✅ **Fully Responsive** - Mobile-first design optimized for all devices
- ✅ **Premium UI** - Built with Shadcn/UI components for a polished look

### Backend (To Be Implemented)
- ⏳ Supabase integration for real-time availability
- ⏳ User authentication
- ⏳ Admin dashboard for booking management
- ⏳ Email notifications via Resend
- ⏳ Payment integration

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Icons**: Lucide React
- **Form Management**: React Hook Form + Zod
- **Date Picker**: react-day-picker
- **Database (planned)**: Supabase (PostgreSQL)
- **Email (planned)**: Resend

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd "Edge Student Hub Website"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Build for Production

```bash
npm run build
npm start
```

## 📂 Project Structure

```
Edge Student Hub Website/
├── app/
│   ├── booking/
│   │   └── page.tsx          # Multi-step booking flow
│   ├── layout.tsx             # Root layout with navigation
│   ├── page.tsx               # Homepage
│   └── globals.css            # Global styles
├── components/
│   ├── booking/               # Booking flow components
│   │   ├── booking-calendar.tsx
│   │   ├── room-selector.tsx
│   │   ├── personal-details.tsx
│   │   └── booking-summary.tsx
│   ├── sections/              # Page sections
│   │   ├── hero-section.tsx
│   │   ├── rooms-section.tsx
│   │   ├── location-section.tsx
│   │   ├── faq-section.tsx
│   │   └── contact-section.tsx
│   ├── ui/                    # Shadcn/UI components
│   ├── navigation.tsx
│   └── footer.tsx
├── lib/
│   ├── data.ts                # Mock data (rooms, FAQs)
│   └── utils.ts               # Utility functions
├── types/
│   └── index.ts               # TypeScript types
├── public/                    # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

## 🎨 Design Philosophy

- **Student-Focused**: Clean, modern design that appeals to young adults
- **Trust & Security**: Professional appearance with clear information
- **Mobile-First**: Optimized for mobile devices (primary student usage)
- **Accessibility**: WCAG compliant with keyboard navigation support
- **Performance**: Optimized images and code splitting

## 📱 Pages & Routes

- `/` - Homepage (Hero, Rooms, Location, FAQ, Contact)
- `/booking` - Multi-step booking flow
- `/booking?roomId=X` - Pre-selected room booking

## 🔮 Upcoming Features

1. **Backend Integration**
   - Connect to Supabase for real data
   - Implement real-time availability checking
   - User authentication system

2. **Admin Dashboard**
   - View and manage bookings
   - Approve/reject applications
   - Room availability management

3. **Payment System**
   - Stripe/PayPal integration
   - Secure payment processing
   - Deposit handling

4. **Email System**
   - Booking confirmations
   - Reminders and notifications
   - Welcome emails

## 📄 License

© 2026 Edge Student Hub GmbH. All rights reserved.

## 🤝 Contributing

This is a proprietary project. For questions or support, contact info@edgestudenthub.de

## 📞 Contact

- **Email**: info@edgestudenthub.de
- **Phone**: +49 123 456 789
- **Address**: Zossen, Brandenburg, Germany
