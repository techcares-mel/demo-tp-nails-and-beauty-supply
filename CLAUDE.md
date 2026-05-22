# CLAUDE.md — TP Nails and Beauty Supply

## Business Details
- **Name**: TP Nails and Beauty Supply
- **Type**: Nail supply store (professional nail & beauty supplies retailer)
- **Address**: 46A Berkshire Rd, Sunshine North VIC 3020
- **Phone**: 0451 228 899
- **Email**: (not available)
- **Website**: (no existing website)
- **Delivery**: Serves Melbourne western suburbs; demo cart only (no real orders)

## Language
- ALL site text in English only. Brand name and product names as standard industry proper nouns.

## Design System
- **Theme**: Dark
- **Template**: C (Default/Generic) — built as premium e-commerce
- **Accent color**: #ac873e (warm gold — from colors.json)
- **Accent hover**: #b8995b
- **Accent glow**: rgba(172, 135, 62, 0.25)
- **Background**: #0a0a0a
- **Surface**: #111111 (overridden from colors.json #4a3623 for readability)
- **Card**: #1a1a1a
- **Text**: #ffffff
- **Text muted**: #999999
- **Heading font**: 'Playfair Display', serif (700)
- **Body font**: 'Inter', sans-serif (300/400/500/600)
- **Inspiration**: Premium luxury beauty supply meets modern dark e-commerce — warm gold accents on near-black backgrounds, elegant serif headings, clean product cards with hover interactions.

## Assets
- **Logo**: `images/LOgo.png` — referenced as `<img src="images/LOgo.png">` in nav (height: 52px) and footer (height: 60px)
- **images/image1.webp** — used in: hero right column, product card #9 (Nail Tips)
- **images/images2.webp** — used in: product card #5 (Builder Gel), about section right column
- **images/pexels-cottonbro-3997359.jpg** — used in: product cards #1, #8, #12 (gel polish / nail art); gallery item #1 (first/hero span)
- **images/pexels-cottonbro-3997377.jpg** — used in: product cards #4, #10 (nail art, accessories); gallery item #2
- **images/pexels-kosyginl-20826840.jpg** — used in: product cards #3, #7, #11 (acrylic); gallery item #3
- **images/pexels-rdne-7755681.jpg** — used in: product cards #2, #6 (tools); gallery item #4
- No Font Awesome (all social_links are empty)
- No testimonials section (array is empty in research.json)

## E-Commerce Features
- **Demo cart sidebar** — slides in from right; add/remove items, running total, checkout alert
- **Cart badge** — live count on cart icon in nav; hidden when empty
- **Category filter bar** — 6 categories: All / Gel Polish / Acrylic / Tools & Equipment / Nail Art / Accessories
- **12 demo product cards** — with Quick Add (hover reveal) and Add to Cart buttons
- **No real backend** — checkout triggers an alert with the store phone number

## Page Sections
1. **Top bar** — accent-colored strip with address and phone
2. **Nav** — fixed, transparent → blurred dark on scroll; cart icon with badge; mobile hamburger
3. **Hero** (#home) — split 2-col layout; left: eyebrow pill + h1 + description + CTA buttons + trust badges; right: image1.webp
4. **Shop** (#shop) — category filter + 4-col product grid (12 products)
5. **Cart sidebar** — slide-in panel from right, overlay background
6. **Why Choose Us** (#why) — 4-col icon cards on #111111 surface
7. **Gallery** (#gallery) — 3-col CSS grid, first item spans 2 cols × 2 rows, hover caption overlay
8. **About** (#about) — 2-col: left text + feature list, right images2.webp with location badge
9. **Contact** (#contact) — 2-col: left contact rows + Google Maps embed, right contact form
10. **Footer** — 4-col grid: brand + quick links + categories + contact; bottom bar with demo note
11. **DEMO watermark** — fixed right side, 90deg rotated, pulsing gold glow
12. **Back to top button** — fixed bottom-right, visible after scrollY > 300
13. **Scroll progress bar** — fixed top, 3px accent-colored bar

## Rules
- Mobile-first, breakpoints: 480/768/1024/1280px
- Scroll-reveal on all cards and headings (80ms stagger with d1–d4 delay classes)
- Back-to-top button (fixed bottom-right, scrollY > 300)
- DEMO watermark (fixed right side, rotated 90deg, pulsing animation)
- No Lorem Ipsum — real business data only
- Pure HTML5/CSS3/vanilla JS — no frameworks, no build step
- No Font Awesome (no social links exist)
- No testimonials section (no testimonials data)

## Redeployment
After making changes, commit and redeploy from inside this folder:
```bash
git add -A
git commit -m "describe your changes"
git push
vercel --prod --yes
```
The Vercel project is already linked (`.vercel/project.json`) — no token or scope flags needed.
