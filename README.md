# Zippy ICICI Loan Connector

> **Tagline:** Your Loan. Your Choice. Our Guidance.  
> **Initial Target Market:** Hyderabad, Secunderabad & Telangana  
> **Primary Purpose:** Public-facing fintech loan referral and customer assistance portal.

---

## 🏛️ Executive Summary

**Zippy ICICI Loan Connector** is a modern, high-performance fintech referral and customer guidance website designed to assist retail and commercial borrowers across Hyderabad, Secunderabad, and Telangana in exploring suitable loan options.

### Key Business Architecture:
- **Lead Generation & Requirement Capture:** Clean, confidential 2-minute enquiry forms without sensitive credential collection.
- **Preliminary Feasibility & EMI Simulation:** Interactive calculation tools to calculate debt-to-income (FOIR) ratios, monthly EMIs, and borrowing eligibility.
- **Authorized Referral Facilitation:** Introduces qualified applicants to authorized institutional lending channels and banking correspondent desks.
- **Configurable Identity:** Built around a centralized configuration layer (`src/config/brandConfig.ts`) allowing rapid adjustments of brand names, phone numbers, WhatsApp details, and legal notices if requested by partner institutions or banking regulators.
- **Strict Compliance:** Explicit disclaimers on every page clarifying that the entity is an **independent referral facilitator** and not ICICI Bank itself.

---

## 🚀 Technology Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8 (Ultra-fast HMR and optimized production bundling)
- **Styling:** Tailwind CSS 3.4 (Deep Navy `#0A192F`, Royal Blue `#1E40AF` / `#2563EB`, White, Light Grey, and subtle Warm Orange `#F97316` accents)
- **Icons:** Lucide React
- **Routing:** React Router DOM 7
- **Deployment Platform:** Optimized for Hostinger (Shared Hosting, Cloud Hosting, or VPS via Apache/LiteSpeed `.htaccess` SPA rules)

---

## 📁 Project Directory Structure

```
Zippy ICIC banks Loans/
├── dist/                          # Production-ready build artifacts (ready to deploy)
│   ├── assets/                    # Minified & compressed JS/CSS bundles
│   ├── .htaccess                  # Apache/LiteSpeed SPA rewrite & caching rules
│   ├── favicon.svg                # Modern fintech monogram favicon
│   ├── index.html                 # Semantic HTML5 with JSON-LD Schema
│   ├── robots.txt                 # Search crawler rules
│   └── sitemap.xml                # XML sitemap covering all 10 core routes
├── public/                        # Static assets (favicons, sitemap, robots, .htaccess)
├── src/
│   ├── components/
│   │   ├── calculator/
│   │   │   └── EmiCalculator.tsx  # Dynamic slider EMI calculator with ratio visualization
│   │   ├── common/
│   │   │   ├── LoanIcon.tsx       # Type-safe Lucide icon resolver for loan categories
│   │   │   ├── SEOHead.tsx        # Dynamic page title, meta description & canonical updater
│   │   │   └── WhatsAppButton.tsx # Floating WhatsApp trigger with configurable number
│   │   ├── forms/
│   │   │   └── LoanEnquiryForm.tsx # Comprehensive validated enquiry form with Indian mobile check
│   │   ├── home/
│   │   │   ├── HowItWorksSection.tsx # 4-step visual journey
│   │   │   └── WhyChooseUsSection.tsx # 6 core trust pillars
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # Responsive sticky header with top disclaimer ticker & mobile drawer
│   │   │   └── Footer.tsx         # Comprehensive fintech footer with disclaimers & links
│   │   └── loans/
│   │       └── LoanCard.tsx       # Standardized category card with Learn More & Apply actions
│   ├── config/
│   │   └── brandConfig.ts         # CENTRAL CONFIGURATION for all branding, phone, email & legal copy
│   ├── data/
│   │   └── loansData.ts           # Comprehensive database of all 12 verified loan categories
│   ├── pages/
│   │   ├── Home.tsx               # Home landing page with Hero, 12 cards, calculator & form
│   │   ├── AboutUs.tsx            # Corporate mission, referral business model & Telangana focus
│   │   ├── LoanServices.tsx       # Filterable catalog with search bar
│   │   ├── IndividualLoanDetails.tsx # Deep-dive dynamic route for each loan product
│   │   ├── CheckEligibility.tsx   # Interactive FOIR & borrowing capacity diagnostic tool
│   │   ├── ApplyForLoan.tsx       # Dedicated secure application page with reassurance
│   │   ├── ContactUs.tsx          # Localized contact desk (Hyderabad, phone, email, WhatsApp)
│   │   ├── FAQs.tsx               # Searchable, categorized accordion repository
│   │   ├── PrivacyPolicy.tsx      # DPDP Act 2023 & IT Act compliant data policy
│   │   └── TermsConditions.tsx    # Independent referral disclosures & terms of service
│   ├── App.tsx                    # Root routing and layout assembly
│   ├── index.css                  # Tailwind directives and custom scrollbars
│   └── main.tsx                   # React 19 entrypoint
├── package.json
├── tailwind.config.js             # Fintech custom palette and shadow definitions
├── tsconfig.json
└── vite.config.ts
```

---

## 📋 The 12 Verified Loan Categories

1. **Personal Loans:** Unsecured multi-purpose financing up to ₹50 Lakhs (from 10.75% p.a.).
2. **Home Loans:** New flat, villa, and resale funding in Hyderabad/Telangana (from 8.50% p.a.).
3. **Business Loans:** Collateral-free working capital for MSMEs & trading firms (from 12.00% p.a.).
4. **Loan Against Property (LAP):** High-ticket mortgage against residential/commercial property up to ₹15 Crores (from 9.25% p.a.).
5. **Vehicle Loans:** New and pre-owned four-wheeler financing with up to 100% on-road funding (from 8.75% p.a.).
6. **Construction Loans:** Stage-wise disbursements on freehold residential plots (from 8.65% p.a.).
7. **Home Renovation Loans:** Lower-rate secured funding for modern interiors, modular kitchen, and civil repairs (from 8.85% p.a.).
8. **Education Loans:** Overseas (USA, UK, Canada, Australia) and domestic university degree funding with post-course moratorium (from 9.50% p.a.).
9. **Consumer Loans:** Flexible subvented EMIs for appliances, computers, and smart electronics (from 11.50% p.a.).
10. **Balance Transfer:** Interest-saving balance takeover on existing high-rate loans + optional Top-Up.
11. **Top-Up Loans:** Additional capital on existing active home loans with minimal paperwork (from 9.00% p.a.).
12. **Medical Loans:** Express priority routing (12–24 hrs) for hospital surgeries and critical emergency care (from 10.99% p.a.).

---

## ⚙️ Centralized Configuration (`src/config/brandConfig.ts`)

To change the public-facing brand name, phone number, WhatsApp number, or legal disclaimers, simply edit **`src/config/brandConfig.ts`**:

```typescript
export const BRAND_CONFIG = {
  brandName: "Zippy ICICI Loan Connector", // Easily adjust if requested by bank
  tagline: "Your Loan. Your Choice. Our Guidance.",
  contact: {
    phoneDisplay: "+91 (040) 6828-LOAN / +91 90000 00000",
    phoneRaw: "+919000000000",
    whatsappNumber: "919000000000",
    whatsappPrefilledMessage: "Hello Zippy ICICI Loan Connector, I would like to know about suitable loan options.",
    email: "support@zippyloans.in",
    officeLocation: "Hyderabad, Telangana, India"
  },
  ...
}
```

---

## 🌐 Hostinger Deployment Instructions

The site has been built and tested into the `dist/` directory. Deploying to **Hostinger** (Shared Hosting, Cloud Hosting, or WordPress Hosting) takes less than 3 minutes.

### Method 1: Hostinger hPanel File Manager (Easiest & Fastest)

1. **Log in to Hostinger hPanel:**
   - Go to [hostinger.com](https://hostinger.com) and access your **hPanel**.
2. **Open File Manager:**
   - Under your domain (e.g. `zippyloans.in`), click **File Manager** -> **Access files of [your domain]**.
3. **Navigate to `public_html`:**
   - Open the `public_html` directory.
   - Delete default placeholder files (e.g., `default.php`).
4. **Prepare the Upload:**
   - In your local project folder, open the `dist` folder.
   - Zip all contents inside `dist` into a file named `dist.zip` (Ensure `.htaccess`, `index.html`, `assets/`, `sitemap.xml`, `robots.txt` are at the zip root).
5. **Upload & Extract:**
   - Click **Upload** in Hostinger File Manager and select `dist.zip`.
   - Right-click `dist.zip` inside `public_html` and choose **Extract**.
   - Ensure the extracted files sit directly inside `public_html/` (not inside a subfolder).
   - Delete `dist.zip`.
6. **Verify SSL & HTTPS:**
   - Go to **Security** -> **SSL** in hPanel and ensure **Force HTTPS** is toggled ON.
7. **Test Your Site:**
   - Visit `https://yourdomain.com/`
   - Test navigating to `/services/personal-loans` and press browser Refresh to confirm `.htaccess` routing works smoothly.

---

### Method 2: Deployment via Hostinger Git Repository Integration

1. Push this project to your GitHub/GitLab repository.
2. In Hostinger hPanel, go to **Advanced** -> **Git**.
3. Link your repository URL and set the branch to `main`.
4. Set install directory to `/public_html`.
5. Trigger automated webhook or click **Deploy**.

---

## 🔒 Security & Data Compliance Standards

- **Zero Sensitive Data Collection:** We do not request, store, or transmit Aadhaar numbers, PAN scans, passwords, or OTPs.
- **Client Consent:** Active checkbox requirement before submitting any phone number or loan enquiry.
- **DPDP Act (2023) Alignment:** Transparent purpose specification, explicit consent recording, and dedicated grievance email contact.
- **Regulatory Integrity:** No misleading claims of being ICICI Bank or guaranteeing 100% approval.

---

## 💻 Local Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript type-checking and build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

*Zippy ICICI Loan Connector — Independent Loan Referral & Guidance Services in Hyderabad, Secunderabad, and Telangana.*
