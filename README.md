# Spiritual Journey — Landing Page

A professional, warm, and highly accessible single-page landing page built for **Nathalie Bose-Silver, Certified Catholic Spiritual Director** based in Orlando, Florida. 

This website explains the concept of spiritual direction, details the companion approach, guides seekers through expectations, and facilitates booking a free 30-minute consultation.

---

## 🌟 Key Features

*   **Bilingual Support:** Full content translation for English (`/`) and Spanish (`/es/`).
*   **Modern & Serene Aesthetic:** Clean warm-colored design system (cream, terracotta, forest green, and sand) inspired by nature and spiritual growth.
*   **Fully Responsive:** Mobile-first responsive layout tailored for all device sizes (mobile, tablet, and desktop).
*   **Accessible Components:** Smooth-scrolling navigation, keyboard navigation support, tabbed panels for meeting options, and optimized tap targets.
*   **SEO & Metadata Optimized:** Custom title tags, meta descriptions, Open Graph data, canonical URLs, and automated XML sitemap generation.
*   **Structured JSON-LD Data:** Schema markup representing Nathalie as a professional `Person` offering services in Orlando (Oviedo & Winter Park, FL).

---

## 🛠️ Technology Stack

*   **Framework:** [Astro v7.0](https://astro.build/) (Static Site Generator)
*   **Styling:** Vanilla CSS (CSS variables, modern properties like `clamp()`, and custom keyframe animations)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Icons:** Custom dynamic SVG Icon component
*   **Sitemap:** `@astrojs/sitemap`

---

## 📂 Project Structure

```text
spiritual-journey/
├── public/                     # Static assets
│   ├── images/
│   │   └── spiritual-journey/  # Site logos, profile photos, and visual assets
│   ├── robots.txt              # Search engine instructions
│   └── sitemap-index.xml       # Auto-generated sitemap index
├── src/
│   ├── components/             # Reusable Astro components
│   │   ├── Header.astro        # Navigation bar (language-aware, sticky, responsive)
│   │   └── Icon.astro          # Unified SVG icon wrapper
│   ├── data/                   # Site data and localized texts
│   │   └── site.ts             # Contact details, expectations, and approach configs
│   ├── pages/                  # Page routes
│   │   ├── es/
│   │   │   └── index.astro     # Spanish home page
│   │   └── index.astro         # English home page
│   ├── styles/                 # Styling rules
│   │   └── global.css          # Main stylesheet with layout grid and animations
│   └── tsconfig.json           # TypeScript configuration
├── DESIGN.md                   # Visual identity, layout, and architecture spec
├── package.json                # Dependencies and dev scripts
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18.x or later recommended).

### 1. Install Dependencies

In the project root directory, run:

```bash
npm install
```

### 2. Start the Development Server

Start a local development server with hot-module reloading:

```bash
npm run dev
```

The site and its Cloudflare Worker API will be available at `http://localhost:4321/`.

Before testing the contact form locally, copy `.dev.vars.example` to `.dev.vars` and replace the placeholder with your Resend API key. Wrangler loads this file locally; it is ignored by Git and must never be committed.

Localhost automatically sends from Resend's `onboarding@resend.dev` test address. Resend only allows that test sender to deliver to the email address that owns the Resend account. Production sends from `website@sacred-guides.com` and therefore requires `sacred-guides.com` to be verified in Resend.

Use `npm run dev:astro` only when you need Astro's frontend-only development server. The contact endpoint is not available in that mode.

### 3. Build for Production

To build a fully optimized, static production site in the `dist/` directory:

```bash
npm run build
```

### 4. Preview the Production Build

To preview the locally built production files before deploying:

```bash
npm run preview
```

### 5. Type and Code Quality Check

To run Astro's build-time checks and type validation:

```bash
npm run check
```

---

## ⚙️ Configuration & Content Updates

Most of the content blocks, contact details, and links can be managed directly in `src/data/site.ts`:

-   **Email Address:** Update the `email` variable to change the recipient of all consultation requests.
-   **Expectations & Approach:** Edit the `expectations`, `expectationsEs`, `approach`, or `approachEs` arrays to modify the grid contents without touching the HTML/Astro structures.
-   **Consultation Inquiries:** The form posts to `/api/contact`, handled by `worker/contact.js` in the `spiritual-journey` Cloudflare Worker. The Worker sends through Resend to `SacredGuideNBS@gmail.com`; `RESEND_API_KEY` must be stored as a Cloudflare secret.
-   **Submission limit:** A Cloudflare Durable Object allows one successful contact submission per email address every 24 hours. Failed Resend deliveries release the reservation so the visitor can retry.

---

## 📄 Legal & Compliance

-   **Medical Disclaimer:** The website footer includes a strict legal disclaimer stating that spiritual direction is not a substitute for counseling, psychotherapy, medical care, or emergency services.
-   **Privacy Policy:** Verify the domain-specific privacy policy details before deploying to production.
