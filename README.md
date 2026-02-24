<div align="center">

# 🚀 Sky-Dev Portfolio

**POLAMARASETTI DINESH** — Software Developer · Full-Stack Engineer · AI Enthusiast

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](#license)

A modern, glassmorphism-styled developer portfolio built with **Next.js 14**, featuring animated hero sections, secure social links, JWT authentication, and email-integrated contact forms.

[Live Demo](#) · [Report Bug](https://github.com/dineshp0103/Portfolio/issues) · [Request Feature](https://github.com/dineshp0103/Portfolio/issues)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **Glassmorphism Dark Theme** | Premium black & white palette with frosted glass cards, smooth gradients, and particle canvas background |
| 🖼️ **Hero Carousel** | Direction-aware slide animations with ← → keyboard navigation and hover arrow controls |
| ⌨️ **Typewriter Effect** | Animated role switcher cycling through developer titles |
| 🔐 **Auth System** | Manual Sign In/Sign Up with JWT + Google OAuth via Supabase |
| 📬 **Email Notifications** | Contact form submissions trigger styled HTML emails via Resend API |
| 🔒 **Masked Social Links** | All social URLs are Base64-encoded server-side; never exposed in client source |
| 💳 **UPI QR Code** | Dynamically generated from encrypted env var for freelance payments |
| 📱 **Fully Responsive** | Optimized for desktop, tablet, and mobile with touch-friendly interactions |
| ⚡ **Scroll Animations** | IntersectionObserver-powered reveal effects with staggered delays |
| 🚀 **CI/CD Ready** | GitHub Actions workflow for auto-deploy to Vercel on every push |

---

## 🛠️ Tech Stack

```
Frontend     → Next.js 14 · TypeScript · React 18 · CSS Modules
Backend      → Next.js API Routes (serverless)
Auth         → Supabase Auth · JWT (jose) · Google OAuth
Database     → Supabase (PostgreSQL)
Email        → Resend API
Hosting      → Supabase Storage (images) · Vercel (deployment)
CI/CD        → GitHub Actions
```

---

## 📂 Project Structure

```
Portfolio/
├── .github/workflows/     # CI/CD pipeline
│   └── deploy.yml
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/      # Login & Register endpoints
│   │   │   ├── contact/   # Contact form + email
│   │   │   ├── qr/        # UPI QR code generator
│   │   │   └── social/    # Masked social link redirects
│   │   ├── auth/           # Auth page (Sign In / Sign Up)
│   │   ├── globals.css     # Design system & tokens
│   │   ├── layout.tsx      # Root layout + metadata
│   │   └── page.tsx        # Home page
│   ├── components/
│   │   ├── sections/       # Hero, About, Skills, Experience,
│   │   │                   # Projects, Pricing, Contact
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── AuthButton.tsx
│   └── lib/
│       └── supabase.ts     # Supabase client
├── .env.local              # Environment variables (gitignored)
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A [Supabase](https://supabase.com) project (free tier)
- A [Resend](https://resend.com) account (free, 100 emails/day)

### Installation

```bash
# Clone the repository
git clone https://github.com/dineshp0103/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your keys (see Environment Variables section below)

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# UPI (Base64 encoded)
UPI_ID_ENCODED=your_base64_encoded_upi_id

# JWT
JWT_SECRET=your_256_bit_hex_secret

# Email (Resend)
RESEND_API_KEY=re_your_resend_key
CONTACT_EMAIL=your_email@gmail.com

# Social Links (Base64 encoded URLs)
SOCIAL_LINKEDIN=base64_encoded_url
SOCIAL_GITHUB=base64_encoded_url
SOCIAL_GCLOUD=base64_encoded_url
SOCIAL_LEETCODE=base64_encoded_url
SOCIAL_INSTAGRAM=base64_encoded_url
SOCIAL_TWITTER=base64_encoded_url
```

> 💡 **Why Base64?** Social URLs and UPI ID are encoded so they never appear in plain text in your source code or client-side JavaScript bundles. They're decoded only server-side.

---

## 📦 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `node scripts/upload-images.js` | Upload hero images to Supabase Storage |
| `node scripts/setup-contact.js` | Test Supabase table + Resend email |

---

## 🗄️ Database Setup

Create the `contacts` table in your Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS contacts (
  id         BIGSERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🌐 Deployment

### Vercel (Recommended)

1. Import your repo at [vercel.com/new](https://vercel.com/new)
2. Add all environment variables from `.env.local`
3. Deploy — Vercel auto-detects Next.js

Every push to `main` triggers auto-deployment via the included GitHub Actions workflow.

### Environment Variables in Vercel

Go to **Project Settings → Environment Variables** and add all keys listed in the [Environment Variables](#-environment-variables) section.

---

## 🤝 Connect

| Platform | Link |
|---|---|
| 💼 LinkedIn | [polamarasetti-dinesh](https://www.linkedin.com/in/polamarasetti-dinesh-a64520351/) |
| 🐙 GitHub | [dineshp0103](https://github.com/dineshp0103) |
| ☁️ Google Skills | [Cloud Badges](https://www.skills.google/public_profiles/729902ba-2055-4239-be48-25e53e32adc0) |
| 💻 LeetCode | [dyk_dinesh](https://leetcode.com/u/dyk_dinesh/) |
| 📸 Instagram | [doyouknow.dinesh](https://www.instagram.com/doyouknow.dinesh/) |
| 🐦 X / Twitter | [idk__dinesh](https://x.com/idk__dinesh) |
| 📧 Email | dineshpolamarasetti0103@gmail.com |

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [POLAMARASETTI DINESH](https://github.com/dineshp0103)**

*Passionate about building efficient, scalable systems and exploring how AI transforms real-world engineering — on Earth and beyond. 🚀*

</div>
