# Bihar Museum Guide — Workspace Context

> Quick-reference doc so we don't re-iterate context across conversations.
> Last updated: 2026-08-04

---

## 1. Tech Stack

| Layer       | Technology                     | Version  |
|-------------|--------------------------------|----------|
| Framework   | Next.js (App Router)           | 16.2.12  |
| React       | React + ReactDOM               | 19.2.4   |
| Styling     | Tailwind CSS v4 (via PostCSS)  | ^4       |
| Language    | TypeScript                     | ^5       |
| Lint        | ESLint 9 + eslint-config-next  | ^9       |
| Font        | Geist + Geist Mono (next/font) | — (to be replaced with Inter) |

> [!IMPORTANT]
> **Tailwind v4** uses the new `@theme inline {}` block inside CSS (no `tailwind.config.js`).
> PostCSS plugin is `@tailwindcss/postcss`.

> [!IMPORTANT]
> **Next.js 16** may have breaking changes vs training data. Always check
> `node_modules/next/dist/docs/` before using unfamiliar APIs.

---

## 2. Stitch Project

- **Title**: Bihar Museum Digital Guide PWA
- **ID**: `16864258248339910955`
- **Design System**: "Monochrome Gallery" — strictly monochromatic, WCAG AAA
- **Device Target**: Mobile (390px viewport), with one desktop screen (Admin Dashboard)

### Design System Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#000000` | Headings, primary buttons, active states |
| Secondary | `#717171` | Metadata, secondary labels, inactive icons |
| Tertiary / Surface | `#F5F5F5` | Background layering |
| Neutral / Canvas | `#FFFFFF` | Base canvas |
| Border subtle | `#E5E5E5` | Card borders, separators |
| Border emphasis | `#000000` | Active/focus borders |
| Font | Inter | Display 700, Headline 600, Body 400, Label 500/600 |
| Spacing base | `8px` | All dimensions on 8px grid |
| Container padding | `20px` | Mobile side margins |
| Roundness | `8px` default, `16px` large, `9999px` pill |

### Typography Scale

| Role | Family | Size | Weight | Line Height | Letter Spacing |
|------|--------|------|--------|-------------|----------------|
| Display | Inter | 40px | 700 | 48px | -0.02em |
| Headline LG | Inter | 32px | 600 | 40px | -0.01em |
| Headline LG Mobile | Inter | 24px | 600 | 32px | — |
| Headline MD | Inter | 20px | 600 | 28px | — |
| Body LG | Inter | 18px | 400 | 28px | — |
| Body MD | Inter | 16px | 400 | 24px | — |
| Label MD | Inter | 14px | 500 | 20px | 0.01em |
| Label SM | Inter | 12px | 600 | 16px | 0.05em |

---

## 3. Screen Architecture (Stitch → Routes)

| # | Screen Title | Stitch ID | Route | Notes |
|---|-------------|-----------|-------|-------|
| 1 | Splash / Landing | *(user reference image)* | `/` | Dark hero, sculpture bg, gold CTA |
| 2 | PWA Home | `b999e18d10dd4ce4b8bea625bacc3bae` | `/home` | Main dashboard |
| 3 | PWA Home + Curator's Picks | `78b4871dc61045129f04a66d6d331e5a` | `/home` | Variant with carousel |
| 4 | PWA Home + Audio Player | `21838f47284e4b04aba277fd75e35fb9` | `/home` | Variant with audio bar |
| 5 | Active Scanner | `0b6876ed1eeb4afe97ea523d98b2407a` | `/scan` | Camera viewfinder |
| 6 | Recognition & Level-Up | `fdf107bbd6584ed9adc4cb6387dc0d74` | `/scan/result` | Post-scan results |
| 7 | Artifact Detail | `56115eaedc42493eb82a12c8b61c6fe7` | `/artifact/[id]` | Full artifact page |
| 8 | Interactive Floor Map | `1104a9ea31e44ee99be4ac8a65e879e6` | `/map` | SVG floor plan |
| 9 | My Museum Passport | `3c6e14b9fb0b4c7092f92106e0af6fcf` | `/passport` | Gamification profile |
| 10 | Grievance & Feedback | `d2dfa5c527a549938a141102f2b2d325` | `/feedback` | Issue report form |
| 11 | Digital Souvenir Email | `450604ca3b5649d4b8e96bb99af8553e` | *(template)* | Email template |
| 12 | Admin Dashboard | `7aa0bcd620ff49fabe55a55e8fad1221` | `/admin` | Desktop only |

### Shared UI Components

- **BottomNav** — 5 tabs: Explore, Scanner, Map, Tours, Menu
- **TopHeader** — "Bihar Museum" centered, optional back/actions
- **App Layout** — `app/(main)/layout.tsx` wrapping all inner pages (not splash)

### Stitch Screen Screenshots

Downloaded to: `<artifactDir>/stitch-screens/`
- `pwa-home.png`, `artifact-detail.png`, `scanner.png`, `floor-map.png`
- `ambient-audio.png`, `passport.png`, `recognition.png`, `feedback.png`
- `souvenir-email.png`, `curators-picks.png`, `admin-dashboard.png`

---

## 4. Current File Map

```
bihar-museum-guide/
├── app/
│   ├── globals.css          ← Tailwind import + @theme tokens + global resets
│   ├── layout.tsx           ← RootLayout: font vars, metadata, viewport
│   ├── page.tsx             ← ROOT SPLASH PAGE (dark hero)
│   └── favicon.ico
├── public/
│   ├── bihar-museum-logo.png   ← AI-generated logo (has dark bg — SVG used instead)
│   ├── museum-sculpture-bg.png ← AI-generated sculpture photo (tight crop)
│   └── (default scaffolding SVGs)
├── .agents/
│   └── WORKSPACE_CONTEXT.md ← THIS FILE
├── next.config.ts           ← Empty config
├── postcss.config.mjs       ← @tailwindcss/postcss
├── tsconfig.json            ← Path alias: @/* → ./*
├── eslint.config.mjs        ← Flat ESLint config
├── AGENTS.md                ← "Read next/dist/docs before writing code"
└── package.json
```

---

## 5. Dev Commands

| Action | Command |
|--------|---------|
| Dev server | `npm run dev` |
| Production build | `npm run build` |
| Start prod | `npm run start` |
| Lint | `npm run lint` |

Dev server: `http://localhost:3000`

---

## 6. Conventions

- **Server Components by default** — App Router. Use `"use client"` only for interactivity.
- **Tailwind v4** — `@theme inline {}` in `globals.css` for custom tokens.
- **Image component** — `next/image`. Local images: `src="/filename.png"` + `width`/`height` or `fill`.
- **Metadata** — `export const metadata: Metadata` from layout/page. `Viewport` exported separately.
- **Path alias** — `@/*` maps to project root (`./`).
