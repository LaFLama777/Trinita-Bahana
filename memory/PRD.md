# PRD — CV Trinita Bahana Persada Website

## Original Problem Statement
Company website for CV Trinita Bahana Persada (Indonesian maritime company since 2014): Marine Supply, Ship Chandler, Working Gear Supply, Crew Documentation Services, Visa & Embassy Services. Single-page, conversion-focused, bilingual (ID/EN), navy #002B5B / gold #C89B3C / white palette, premium maritime corporate character. Logo provided by user. Contact: admin@trinitabp.com, WhatsApp +62 812 6114 7333, www.trinitabp.com.

## User Personas
- Shipping company / ship management procurement staff requesting quotations
- Manning agencies needing crew documentation & visa services
- Offshore companies sourcing working gear

## Architecture
- Frontend: React 19 + Tailwind + framer-motion + lenis (smooth scroll) + react-fast-marquee + sonner; bilingual via LanguageContext (localStorage-persisted); QuoteContext controls quotation modal globally
- Backend: FastAPI + MongoDB (motor), BaseDocument/PyObjectId pattern
- API: `GET /api/`, `POST /api/quotations`, `GET /api/quotations`
- Email: Resend via Emergent managed proxy (httpx, guardrail gate `_assert_safe_email`, from_name = CV Trinita Bahana Persada, reply-to admin@trinitabp.com). Notification sent to `ADMIN_EMAIL` on every new quotation; failure never blocks the form.
- Logo stored at `/app/frontend/public/assets/logo.jpeg`

## Core Requirements (static)
- Hero shows logo, tagline, headline, description, "Request Quotation" + "Hubungi Kami" CTAs
- Sections: About, Visi & Misi, Services (5), Why Us (6 points), CTA, Contact/Footer
- ID/EN language switcher in navbar
- Quotation form saved to DB; Hubungi Kami opens WhatsApp
- data-testid on all interactive elements

## Implemented (2026-08-18, update)
- Email alerts: every new quotation triggers an instant HTML notification email to ADMIN_EMAIL (admin@trinitabp.com). Verified end-to-end with the Resend test inbox (send accepted, email id returned). NOTE: the proxy currently rejects admin@trinitabp.com as undeliverable — the trinitabp.com mailbox/MX likely isn't set up yet; feature activates automatically once the mailbox exists or ADMIN_EMAIL is changed.
- All 5 service cards now use fitting real photography (Jakarta container yard, dockworkers securing cargo, maritime worker in PPE, crew on deck in Indonesian waters, passport with stamps) with icon chips + hover-reveal descriptions.
- About image replaced with port crane & cargo ships at sunset; "Since 2014" badge no longer overlaps the image.
- Office address added to footer: Jalan Raya Bekasi Barat No. 14, RT 4/RW 2, Kel. Rawabunga, Kec. Jatinegara, Jakarta Timur 13350.

## Implemented (2026-08-18)
- Kinetic hero: masked line-by-line headline reveal, parallax background, logo badge, dual CTAs
- Editorial marquee (services + "Since 2014"), navy/gold
- About with clip-path image reveal + stats (2014 / 10+ / 5 / 24/7)
- Visi & Misi dark navy chapter, numbered mission list
- Services bento grid (5 cards, 3 with photography, hover reveals)
- Why Choose Us (6 items), CTA band, dark footer with contacts
- Quotation modal -> POST /api/quotations (verified stored in MongoDB)
- WhatsApp floating button + all WA links to wa.me/6281261147333
- Full ID/EN translations with instant switch + persistence

## Backlog
- P0: —
- P1: Admin inbox page to view quotation submissions (with auth)
- P1: Email notification to admin@trinitabp.com on new quotation (Resend)
- P2: Company address/map section once address is provided
- P2: Real project/client gallery, certifications/badges
- P2: SEO (OG tags, sitemap), deploy to www.trinitabp.com

## Next Tasks
- Ask user for office address to add a location section
- Offer Resend email notifications for new quotation requests
- Offer admin dashboard for incoming quotations
