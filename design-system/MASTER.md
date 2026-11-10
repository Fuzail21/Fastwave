# Fast Wave Internet & Services — Design System (MASTER)

> **Source of truth for all pages.** Page-specific overrides live in `design-system/pages/<page>.md` and win over this file.
> Generated with the **UI UX Pro Max** skill (`--design-system`, query: *"telecom internet service provider broadband comparison lead generation trust premium corporate"*, dials: variance 4 · motion 4 · density 3), then adapted to the locked Fast Wave brand.
> Stack: **HTML5 + Tailwind CSS (CDN) + vanilla JS**. Status: **APPROVED (2026-11-09) — CTA option A (AA-safe orange gradient `#E85A0C → #C84A06`).**

---

## 1. Direction

| | |
|---|---|
| **Pattern (skill)** | *Trust & Authority + Conversion*. Hero (credibility) → Proof (provider logos, ratings, stats) → Solution (plans/services) → clear CTA path (ZIP check) |
| **Style (skill)** | *Accessible & Ethical* as the base layer (high contrast, 16px+ body, visible focus, keyboard, reduced motion) + *Glassmorphism* used **sparingly** on dark hero surfaces only |
| **Feel** | Premium corporate telecom. Spacious, calm, trustworthy, with fine micro-interactions. Think Stripe/Linear polish with a warm orange conversion accent |
| **Dials** | Variance 4 (balanced, modern grid) · Motion 4 (standard reveal + stagger) · Density 3 (spacious marketing) |
| **Color strategy (skill)** | "Navy corporate, trust blue, accent for CTA only". This already matches the brand: navy and blue carry trust, **orange is reserved for actions and highlights** |

**Anti-patterns (skill + brand):** playful/cartoon styling · hidden credentials or fine print · purple/pink "AI" gradients · emoji as icons · glass on light backgrounds · auto-rotating carousels without pause · layout-shifting hovers · orange used as body-text color.

---

## 2. Color tokens

### 2.1 Brand palette (LOCKED)

| Token | Hex | Use |
|---|---|---|
| `navy-900` | `#0A1A3F` | Utility bar, footer, stats band, hero base, theme-color |
| `navy-700` | `#0F2A6B` | Hero gradient mid, dark cards |
| `electric-500` | `#1E5BFF` | Wave lines, glows, links, info accents |
| `orange-500` | `#FF6B1A` | Brand orange: CTA fill, icons, badges, highlights on dark |
| `orange-600` | `#E85A0C` | Hover/deep orange, large orange headline text on light |
| `orange-50` | `#FFF1E8` | Tinted icon tiles, "Most Popular" backgrounds |
| `surface` | `#F5F8FC` | Alternate section background |
| `line` | `#E4EAF3` | Borders, dividers, input borders |
| `ink` | `#0B1530` | Headings |
| `body` | `#4A5875` → **`#3A4766`** | Body copy. Darkened 2026-11-09 per design review ("page looks washed out"); 9.24:1 on white. `muted-safe` also darkened to `#556179` (6.23:1) and small text raised to 14–15px |
| `muted` | `#8391AB` | Decorative/large muted text **only** (see 2.3) |
| `white` | `#FFFFFF` | Cards, header |
| `success-500` | `#16A34A` | Check icons |

**Gradients**
- Hero: `linear-gradient(135deg, #0A1A3F 0%, #0F2A6B 55%, #1E5BFF 120%)`
- CTA (brand): `linear-gradient(135deg, #FF7A2E 0%, #FF5A00 100%)`. See the accessibility note in 2.3
- Wave streaks: `#1E5BFF` → transparent strokes at 20–45% opacity, plus a faint `#FF6B1A` streak

### 2.2 Derived shades (skill-derived, contrast-verified)

| Token | Hex | Why it exists | Contrast |
|---|---|---|---|
| `orange-700` | `#C84A06` | AA-safe CTA fill end / pressed state | white on it **4.73** |
| `orange-text` | `#C2410C` | Small orange text (eyebrows, links, prices labels) on white/surface/orange-50 | 5.18 / 4.86 / 4.69 |
| `muted-safe` | `#5F6B87` | Small muted text (captions, helper text, "/mo") | 5.33 on white, 5.00 on surface |
| `electric-300` | `#6E9BFF` | Blue text/icons on navy | 6.33 on navy-900, 4.98 on navy-700 |
| `on-dark-muted` | `#A9B6D3` | Secondary text on navy | 8.37 on navy-900 |
| `on-dark-soft` | `#C7D2E8` | Body text on navy | 11.21 on navy-900 |
| `electric-50` | `#EEF3FF` | Blue tinted tiles/badges | `#1D4ED8` text on it 6.03 |
| `success-text` | `#15803D` | Green text ("Available", success messages) | 5.02 |
| `error` | `#B91C1C` | Form errors (text + border) | 6.47 |
| `error-50` | `#FEF2F2` | Error field background | |
| `warning` | `#B45309` on `#FFF7ED` | Notices ("Pricing varies by location" callouts) | 4.73 |

### 2.3 Accessibility notes on the locked palette (important)

Measured with WCAG 2.x luminance:

| Pair | Ratio | Verdict |
|---|---|---|
| `#E85A0C` text on white | 3.56 | ❌ fails AA for small text. **The brief suggests this for small orange text, but it only passes for large text (≥24px, or ≥18.66px bold).** Use `orange-text #C2410C` for small text |
| White on `#FF6B1A` | 2.85 | ❌ fails even large-text 3:1 |
| White on CTA gradient `#FF7A2E→#FF5A00` | 2.60 → 3.13 | ❌ fails |
| `#8391AB` on white / surface | 3.18 / 2.99 | ❌ for small text. Use `muted-safe` |
| `#1E5BFF` on navy | 3.24 | large text/icons only. Use `electric-300` for small text |
| `#16A34A` on white | 3.30 | ✅ as icon (non-text 3:1); use `success-text` for text |
| `#FF6B1A` on navy-900 | 5.98 | ✅ orange highlights on dark heroes are fine |
| `#4A5875` body on white | 7.13 | ✅ |

**Proposed CTA treatment (needs your OK):**
- **Primary button fill:** `linear-gradient(135deg, #E85A0C 0%, #C84A06 100%)` with **bold 17–18px white label** → 3.56–4.73, so it passes AA for large text everywhere and still reads as clearly the brand orange. Hover: shift to `#D9500A → #B84304` + orange glow.
- The original `#FF7A2E → #FF5A00` gradient and `#FF6B1A` stay for **non-text** brand surfaces: glows, the "Most Popular" ribbon border, icon tiles, the chat button ring, and decorative wave strokes.
- Headline highlight words: `#E85A0C` on light backgrounds (large text, 3.56 ✅) and `#FF6B1A` on navy (5.98 ✅).

> If you'd rather keep the exact bright `#FF7A2E→#FF5A00` CTA, I'll do it, but the white button labels will fail WCAG AA. Your call.

---

## 3. Typography

| Role | Font | Size (mobile → desktop) | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| H1 | Plus Jakarta Sans | 38px → 60px (`clamp(2.375rem, 1.6rem + 3.2vw, 3.75rem)`) | 800 | 1.1 | -0.02em |
| H2 | Plus Jakarta Sans | 30px → 42px | 700 | 1.15 | -0.015em |
| H3 | Plus Jakarta Sans | 20px → 23px | 700 | 1.3 | -0.01em |
| Lead | Inter | 18px → 19px | 400 | 1.7 | 0 |
| Body | Inter | 16px → 17px | 400 | 1.7 | 0 |
| Small / caption | Inter | 14px | 500 | 1.5 | 0 |
| Eyebrow | Inter | 12.5px, uppercase, in a pill | 600 | 1 | 0.14em |
| Price | Plus Jakarta Sans | 44px → 52px, cents as `<sup>` at 45% | 800 | 1 | -0.02em |
| Button | Plus Jakarta Sans | 17px | 700 | 1 | 0 |

Google Fonts: `Plus+Jakarta+Sans:wght@500;600;700;800` + `Inter:wght@400;500;600` with `display=swap` and `preconnect`.

**Skill recommendation vs. decision.** The skill's top pairing for this query was **Lexend + Source Sans 3** ("Corporate Trust": built for readability and accessibility), with Poppins + Open Sans and DM Sans as runners-up. **I'm keeping Plus Jakarta Sans + Inter**, because:
- Lexend is very legible but wide and soft. It reads "public-sector / education", not "premium 2026 brand". Plus Jakarta Sans has the tighter, crisper geometric look the Stripe/Linear reference implies and looks better at 800 weight with negative tracking.
- Inter matches Source Sans 3 on screen readability (tall x-height, built for UI) and is one of the most widely cached fonts.
- Poppins and DM Sans are overused in telecom/agency templates. They would make the site look generic.
- The skill's accessibility intent is still met through size (16px+ body), 1.7 line-height and contrast, not the typeface.

---

## 4. Spacing, layout, radius, elevation

**Spacing scale** (density 3 = spacious): 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 120px.
- Section padding: `py-16` (64px) mobile → `lg:py-28` (112px) desktop
- Container: `max-w-[1240px] mx-auto px-4 sm:px-6` (16px → 24px)
- Grid gap: 24px cards, 32px on desktop feature grids
- Breakpoints: 640 / 768 / 1024 / 1280 (Tailwind defaults `sm md lg xl`)

**Radius:** cards `rounded-[22px]` · large media `rounded-[28px]` · buttons `rounded-xl` (12px) or pill · inputs `rounded-xl` · chips/eyebrows pill.

**Shadows (navy-tinted, low opacity):**
| Token | Value | Use |
|---|---|---|
| `shadow-soft` | `0 1px 2px rgba(10,26,63,.04), 0 8px 24px -12px rgba(10,26,63,.12)` | Resting cards |
| `shadow-lift` | `0 2px 4px rgba(10,26,63,.04), 0 20px 40px -16px rgba(10,26,63,.22)` | Hovered cards, header on scroll |
| `shadow-glow` | `0 10px 30px -10px rgba(255,107,26,.55)` | Primary CTA, "Most Popular" card |
| `shadow-glow-blue` | `0 0 0 1px rgba(30,91,255,.15), 0 20px 50px -20px rgba(30,91,255,.45)` | Hero glass cards |

**Glass (dark surfaces only), from skill spec:** `bg-white/10 backdrop-blur-[16px] border border-white/20`, inner highlight `inset 0 1px 0 rgba(255,255,255,.15)`. Text on glass must sit over navy and use white / `on-dark-soft`. Provide a solid `rgba(15,42,107,.85)` fallback when `backdrop-filter` is unsupported.

---

## 5. Components

### Buttons (all: min-height 50px, `cursor-pointer`, 200ms ease-out, `focus-visible` ring)
| Variant | Rest | Hover | Active | Focus |
|---|---|---|---|---|
| Primary | AA orange gradient (2.3), white bold label, `shadow-glow`, arrow icon | `-translate-y-0.5`, deeper glow, arrow `translate-x-1` | `translate-y-0`, `orange-700` | 3px ring `#1E5BFF` + 2px white offset |
| Secondary | white bg, 1.5px `orange-600` border, `orange-text` label | fills `orange-600`, white label | darker fill | same ring |
| Ghost (on dark) | `bg-white/10 border-white/20` white label | `bg-white/15` | `bg-white/20` | white ring + navy offset |

Arrow nudges use `transform` only, so there is no layout shift.

### Cards
White, `rounded-[22px]`, 1px `line` border, `shadow-soft`. Hover: `-translate-y-1.5` + `shadow-lift` (transform/shadow only). Icon tile: 52px `rounded-2xl`, `orange-50` or `electric-50` tint, 24px Lucide icon.

### Pricing card
Icon tile → title → description → 3–4 checks (`success-500` icon + `ink` text) → "From" + price (`$29` + `<sup>.99</sup>` + `/mo` in `muted-safe`) → full-width CTA → `*Pricing varies by location` (13px, `muted-safe`). Featured card: 2px `orange-500` border, `shadow-glow`, `lg:-translate-y-3`, "Most Popular" pill.

### Inputs (ZIP, forms)
Height 52px, `rounded-xl`, 1.5px `line` border, 16px text (prevents iOS zoom). Focus: border `electric-500` + 4px `electric-500/15` ring. Error: border + text `error`, `error-50` bg, icon + message **below the field**, `aria-invalid="true"`, `aria-describedby`. Floating labels always stay visible and never act as a placeholder-only label (skill: *Form Labels, High*).

### Eyebrow pill
`inline-flex` pill, 12.5px uppercase 600, tracking 0.14em. Light bg: `orange-50` bg + `orange-text`. Dark bg: `white/10` bg + `#FF8A47`/`electric-300` text.

### Icons
**Lucide** (CDN, pinned version), stroke 1.75, sizes 16/20/24. Decorative icons get `aria-hidden="true"`. Icon-only buttons get an `aria-label`. No emoji anywhere.

---

## 6. Motion (skill: "Standard" tier, adapted to vanilla JS)

| Interaction | Duration | Easing |
|---|---|---|
| Hover / color / shadow | 200ms | `cubic-bezier(.2,.8,.2,1)` |
| Card lift | 250ms | same |
| Dropdown / accordion / drawer | 280–320ms (exit 200ms, faster than enter) | `cubic-bezier(.16,1,.3,1)` |
| Scroll reveal | 500ms fade + 16px rise, **70ms stagger** | ease-out |
| Hero wave streaks | 14–22s linear loop | — |
| Floating cards bob | 7s ease-in-out infinite, ±8px | — |
| Counters | 1.6s ease-out, once | — |

- The skill attached a GSAP stagger snippet. **Overridden:** the brief requires vanilla JS, so the same timing is done with `IntersectionObserver` + CSS transitions. The skill's `back.out` overshoot is also dropped because it "reads as sloppy on informational UI".
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables streaks, bobbing, marquee, auto-play and reveals (content shows in its final state), and counters jump to the final value.
- **Carousels/marquee (skill rule):** testimonials auto-play pauses on hover **and focus**, have prev/next + pause buttons, `aria-live="polite"` slide announcement, and stop when offscreen. The logo marquee pauses on hover/focus and is static under reduced motion.

---

## 7. Page skeleton & conversion flow

- **Header:** utility bar (navy) → sticky white header (transparent over hero, then `bg-white/85 backdrop-blur shadow-lift` on scroll). Active link: 2px orange underline. Mega-menu: `aria-expanded`, opens on click + hover, closes with Esc / outside click. Mobile drawer: focus-trapped, Esc closes, body scroll locked.
- **Primary conversion:** ZIP widget. Validate `^\d{5}$` on submit plus on blur after the first error, inline error in `aria-live`, then a success modal/toast with the ZIP echoed back.
- **Every page ends with a CTA band** (ZIP + phone). Phone links use `tel:+18885553278`.
- **Section rhythm:** alternate `white` / `surface` backgrounds, with one navy band (stats) for contrast punctuation.

---

## 8. Tailwind config (shared, identical in every page)

```js
tailwind.config = {
  theme: {
    extend: {
      colors: {
        navy:   { 900: '#0A1A3F', 700: '#0F2A6B' },
        electric: { 50: '#EEF3FF', 300: '#6E9BFF', 500: '#1E5BFF', 700: '#1D4ED8' },
        brand:  { 50: '#FFF1E8', 500: '#FF6B1A', 600: '#E85A0C', 700: '#C84A06', text: '#C2410C' },
        surface: '#F5F8FC', line: '#E4EAF3',
        ink: '#0B1530', body: '#4A5875', muted: '#8391AB', 'muted-safe': '#5F6B87',
        'on-dark': { soft: '#C7D2E8', muted: '#A9B6D3' },
        success: { 500: '#16A34A', text: '#15803D' },
        error: { DEFAULT: '#B91C1C', 50: '#FEF2F2' },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: { container: '1240px' },
      borderRadius: { card: '22px', media: '28px' },
      boxShadow: {
        soft: '0 1px 2px rgba(10,26,63,.04), 0 8px 24px -12px rgba(10,26,63,.12)',
        lift: '0 2px 4px rgba(10,26,63,.04), 0 20px 40px -16px rgba(10,26,63,.22)',
        glow: '0 10px 30px -10px rgba(255,107,26,.55)',
        'glow-blue': '0 0 0 1px rgba(30,91,255,.15), 0 20px 50px -20px rgba(30,91,255,.45)',
      },
      transitionTimingFunction: { out: 'cubic-bezier(.2,.8,.2,1)', expo: 'cubic-bezier(.16,1,.3,1)' },
      keyframes: {
        bob: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        marquee: { to: { transform: 'translateX(-50%)' } },
        pulseRing: { '0%': { transform: 'scale(1)', opacity: '.6' }, '100%': { transform: 'scale(1.6)', opacity: '0' } },
      },
      animation: { bob: 'bob 7s ease-in-out infinite', marquee: 'marquee 30s linear infinite', 'pulse-ring': 'pulseRing 2s ease-out infinite' },
    },
  },
};
```

---

## 9. Pre-delivery checklist (skill + brand)

- [ ] Colors match locked palette + derived tokens only (no stray hex in markup)
- [ ] No emojis as icons. Lucide SVG only, consistent 1.75 stroke
- [ ] `cursor-pointer` on every clickable element
- [ ] Hover + focus-visible + active states, 150–300ms transitions
- [ ] No layout-shifting hovers (transform/shadow/color only)
- [ ] Text contrast ≥ 4.5:1 (≥ 3:1 for large text), checked against tables in §2
- [ ] Visible keyboard focus, skip link, one H1, logical headings, landmarks
- [ ] `prefers-reduced-motion` respected; carousels pausable
- [ ] Touch targets ≥ 44px; inputs 16px+
- [ ] Responsive 375 / 768 / 1024 / 1440, no horizontal scroll
- [ ] Forms: visible labels, inline errors below field, `aria-live`, loading → success state
- [ ] Images: alt, `width`/`height`, `loading="lazy"` below the fold
- [ ] No console errors

---

## 10. Skill recommendations: applied vs. overridden

| Skill output | Decision |
|---|---|
| Pattern *Trust & Authority + Conversion* (logos, stats, transparent pricing, low-friction form) | ✅ Applied as the section logic on every page |
| Style *Accessible & Ethical* (focus rings, skip links, 44px targets, reduced motion) | ✅ Applied as the baseline |
| Glassmorphism spec (blur 10–20px, white 10–30%, 1px white/20 border, contrast check) | ✅ Applied, dark hero surfaces only |
| Carousel/marquee accessibility (pause, focus-stop, reduced-motion static) | ✅ Applied |
| Form guidance (visible labels, submit feedback loading → success) | ✅ Applied |
| Tailwind stack guidance (`focus-visible:ring-2`, mobile-first) | ✅ Applied |
| Palette (slate `#0F172A` + `#0369A1` CTA) | ❌ Overridden by the locked brand palette; only its *strategy* (navy trust + single CTA accent) and token roles were used |
| Fonts Lexend + Source Sans 3 | ❌ Overridden: kept Plus Jakarta Sans + Inter (see §3) |
| GSAP stagger with `back.out(1.4)` | ❌ Overridden: vanilla IntersectionObserver, ease-out, same timing |
| Tailwind `dark:` mode support | ⏸ Not included: a single light theme with navy bands is part of the brand; can be added later |
| CTA orange from brief (`#FF7A2E→#FF5A00`, `#E85A0C` small text) | ⚠ Adjusted for WCAG AA (see §2.3), **pending your approval** |
