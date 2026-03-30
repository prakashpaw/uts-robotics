# 🔦 UTS Robotics — Smart Street Lighting Website

> Official website for **UTS Robotics**, a Pune-based IoT startup powering smart street lighting across Maharashtra.

[![CI/CD](https://github.com/uts-robotics/website/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/uts-robotics/website/actions)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://uts-robotics.vercel.app)

---

## 📋 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, features, stats, testimonials, CTA |
| About | `/about` | Story, team, values, milestone timeline |
| Product | `/product` | Device specs, features, pricing plans |
| Customers | `/customers` | Active deployments, case study, pilots |
| Gallery | `/gallery` | Filterable photo grid with lightbox |
| Contact | `/contact` | Inquiry form, contact info, map |

---

## 🛠 Tech Stack

- **Frontend**: React 18 + Vite 5
- **Routing**: React Router v6
- **Styling**: Pure CSS with custom design system (CSS variables)
- **Fonts**: Syne (display) + DM Sans (body) via Google Fonts
- **DevOps**: Git → GitHub → GitHub Actions → Vercel

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Install & Run Locally

```bash
# Clone the repository
git clone https://github.com/YOUR_ORG/uts-robotics.git
cd uts-robotics

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

```bash
npm run dev        # Start dev server with HMR
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
npm run lint       # Run ESLint checks
npm run format     # Auto-format with Prettier
```

---

## 📦 Deployment

### Vercel (Recommended)

The site is configured for zero-config Vercel deployment.

#### Option 1: Vercel Dashboard (Easiest)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Vercel auto-detects Vite — click **Deploy**
5. Done! Your site is live.

#### Option 2: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### GitHub Actions (CI/CD)

The workflow at `.github/workflows/ci-cd.yml` handles:

| Trigger | Action |
|---------|--------|
| Push to `main` | Lint → Build → Deploy to Production |
| Push to `develop` | Lint → Build only |
| Pull Request to `main` | Lint → Build → Preview Deploy + PR comment |

#### Required GitHub Secrets

Go to **Settings → Secrets and Variables → Actions** and add:

| Secret | Where to get it |
|--------|----------------|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Run `vercel link` locally, check `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | Same as above |

---

## 📁 Project Structure

```
uts-robotics/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx / Navbar.css
│   │   └── Footer.jsx / Footer.css
│   ├── pages/
│   │   ├── Home.jsx / Home.css
│   │   ├── About.jsx / About.css
│   │   ├── Product.jsx / Product.css
│   │   ├── Customers.jsx / Customers.css
│   │   ├── Gallery.jsx / Gallery.css
│   │   └── Contact.jsx / Contact.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css          ← Design system (CSS variables, global styles)
├── .github/
│   └── workflows/
│       └── ci-cd.yml      ← GitHub Actions pipeline
├── .eslintrc.cjs
├── .gitignore
├── .prettierrc
├── index.html
├── package.json
├── vercel.json            ← Vercel config (SPA rewrites, caching)
└── vite.config.js
```

---

## 🎨 Design System

All design tokens are defined as CSS variables in `src/index.css`:

```css
--bg-dark: #04080f          /* Primary background */
--accent-gold: #f5c518      /* Brand accent */
--accent-blue: #1a9fff      /* Secondary accent */
--font-display: 'Syne'      /* Headings */
--font-body: 'DM Sans'      /* Body text */
```

---

## 🔧 Customisation Guide

### Update Company Info
- **Contact details**: `src/pages/Contact.jsx`
- **Team members**: `src/pages/About.jsx`
- **Customer list**: `src/pages/Customers.jsx`
- **Pricing**: `src/pages/Product.jsx`
- **Stats/testimonials**: `src/pages/Home.jsx`

### Add Real Photos
Replace `<PhotoPlaceholder>` components in `Gallery.jsx` with actual `<img>` tags:
```jsx
// Before (placeholder)
<PhotoPlaceholder photo={photo} />

// After (real image)
<img src={photo.src} alt={photo.title} />
```

### Change Brand Colors
Edit the CSS variables in `src/index.css`:
```css
:root {
  --accent-gold: #YOUR_COLOR;
}
```

---

## 📄 License

© 2025 UTS Robotics. All rights reserved.

---

*Built with ❤️ in Pune, India*
