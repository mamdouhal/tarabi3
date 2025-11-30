# Tarabi3

> Digital solutions that multiply your success.

**Tarabi3** is a premier tech and marketing agency. This repository contains our flagship website built with Next.js, Hono, and Cloudflare.

## 🔲 Brand Identity

- **Name:** Tarabi3 (related to Squaring/Cubes)
- **Design Language:** Geometric, Grid-based, and Blocky
- **Key Visual:** "Squares in Motion" - stability of squares mixed with creativity of fluid motion

## Tech Stack

### Frontend (`apps/web`)
- **Framework:** Next.js 14+ with App Router
- **Styling:** Bootstrap 5.3 CSS (Grid system)
- **Animations:** Framer Motion for "Square" animations

### Backend (`apps/api`)
- **Framework:** Hono (running on Cloudflare Workers)
- **Database:** Cloudflare D1 (SQLite)

## Project Structure

```
tarabi3/
├── apps/
│   ├── web/                    # Next.js 14+ App
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── Hero.tsx           # Hero with animated square grid
│   │   │   ├── Navbar.tsx         # Fixed navbar
│   │   │   ├── ServicesBento.tsx  # Bento box services grid
│   │   │   ├── SquareButton.tsx   # Button with square fill hover
│   │   │   ├── SquareReveal.tsx   # Square mask reveal animation
│   │   │   ├── AnimatedGrid.tsx   # Background pulsing squares
│   │   │   └── Footer.tsx         # Grid-aligned footer
│   │   ├── next.config.js
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── api/                    # Hono on Cloudflare Workers
│       ├── src/index.ts
│       ├── wrangler.toml
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   └── shared/                 # Shared TypeScript types
│       ├── types.ts
│       └── package.json
│
├── package.json
└── README.md
```

## Setup

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mamdouhal/tarabi3.git
cd tarabi3
```

2. Install dependencies:
```bash
npm install
```

### Development

#### Run the Frontend

```bash
npm run dev
```

This starts the Next.js development server at [http://localhost:3000](http://localhost:3000).

#### Run the API (Optional)

```bash
npm run dev:api
```

This starts the Hono API using Wrangler's local dev server.

### Build

```bash
npm run build
```

## Design System

### Color Palette

```css
:root {
  --tarabi3-primary: #0a0a0a;
  --tarabi3-secondary: #1a1a2e;
  --tarabi3-accent: #e94560;
  --tarabi3-accent-alt: #533483;
  --tarabi3-light: #f5f5f5;
  --tarabi3-grid: rgba(255,255,255,0.03);
}
```

### Key Components

| Component | Description |
|-----------|-------------|
| `Hero.tsx` | Full viewport hero with AnimatedGrid background |
| `AnimatedGrid.tsx` | Grid of motion.div squares that pulse |
| `SquareReveal.tsx` | Sliding square mask reveal animation |
| `SquareButton.tsx` | Sharp button, color fills from bottom on hover |
| `ServicesBento.tsx` | Bento grid layout for services |
| `Navbar.tsx` | Fixed navbar, transparent → solid on scroll |
| `Footer.tsx` | Grid-aligned footer |

### Animation Features

- ✅ Grid squares pulse based on scroll
- ✅ Sliding square mask reveals
- ✅ Button hover fill animation (bottom to top)
- ✅ Respects `prefers-reduced-motion`

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check |
| `/projects` | GET | Get featured projects |
| `/projects/:id` | GET | Get project by ID |
| `/services` | GET | Get all services |
| `/contact` | POST | Submit contact form |

## Deployment

### Frontend (Vercel)

```bash
cd apps/web
vercel
```

### API (Cloudflare Workers)

1. Configure your D1 database in `wrangler.toml`
2. Deploy:
```bash
cd apps/api
npm run deploy
```

## License

© 2024 Tarabi3. All rights reserved.

---

*Squares in Motion* 🔲