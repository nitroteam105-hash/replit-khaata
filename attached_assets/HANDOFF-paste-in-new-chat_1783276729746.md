# Khaata — Session Handoff Note (paste into new chat)

## Context
Continuing Khaata (placeholder name) — multi-business management app for small Indian business owners. Mr.T writes SQL, no prior coding background. Master strategy doc: `PG-App-Brainstorm.md`. Tech stack: React Native (Expo) + Supabase + SQLite (local-first). Android-first launch, but codebase built cross-platform-safe for future iOS.

## Decisions made this session

### 1. Tier structure (revised)
- **Free**: unlimited businesses, all core features, local-only, single device, no ads
- **Paid Pro**: cloud sync + multi-device + auto-backup/restore + bill themes/branding
- **Paid Premium**: multi-user/staff access + advanced reports/analytics + priority support
- Business count is NOT a gating lever (conflicts with core multi-business positioning). Gating is on sync, multi-user, and feature depth instead.

### 2. Business Settings — Business Profile
- 3 depth presets: **Simple** (name, phone, business type) / **Standard** (+logo, address, GST toggle) / **Detailed** (+GSTIN, registered legal name, state, bank/UPI for invoice footer)
- GST toggle **auto-suggested** based on business type (Mode 2/job-service → default ON; Mode 1/subscription → default OFF), owner can override

### 3. Business Settings — Operational Rules
- **Payment Modes**: fully customizable list per business; multiple UPI IDs per business, each labeled (e.g. "Main collection," "Rent account")
- **Invoice Numbering**: Prefix + Year/Month + auto-increment (e.g. PGA-2026-0001). Owner chooses sequence scope: shared across all businesses / separate per business / separate per business per financial year
- **Tax Rates**: preset GST slabs (0/5/12/18/28%/Exempt) + owner's own saved HSN/SAC code + rate pairs, reusable via dropdown. **No built-in official HSN database** (avoids stale-data compliance liability). Optional post-MVP: reference link to GST portal, not auto-applied
- **Due-Date Defaults**: business-level default (e.g. 7/15/30 days) + optional per-customer-type override (e.g. B2B vs walk-in)

### 4. Business Documents section
- Suggested common types (GST Certificate, Shop License, Rental Agreement, Fire Safety NOC, etc.) + custom labels
- Storage: Google Drive (BYOS)
- Viewer: single clean full-screen mode (no separate "showcase mode" — the default viewer IS clean/full-screen)
- Document card shows friendly label (main) + actual filename + file type as meta
- File types: PDF, Images, Word/Excel, with fallback for unsupported types
- Actions per document: **View, Download, Share** (all three)
- **Secure Showcase lock**: global default toggle ("require unlock to exit document view") + per-business override. Uses device-native biometric (fingerprint/Face), PIN as fallback only if no biometric hardware. Off by default.

### 5. Multi-Business Setup Status page
- After "What do you run?" (business type multi-select), shows a status page: each business as a card with progress %, Done/Pending badge, Edit/Continue button
- **100% complete = required Business Profile fields (per chosen preset) + at least one Payment Mode set.** Optional fields (GSTIN, bank details, custom tax rates) don't block 100%.
- "Go to Dashboard" always available, even with pending businesses
- Pending businesses tracked via a **side drawer (☰ hamburger menu)**: shows avatar/logo, "My Businesses" list with Done/Pending status + Edit icon per business linking directly back into that business's setup — no nagging banner

### 6. Business type selection — info popups
- Each business type tile gets an **ⓘ info icon** — tap opens a bottom-sheet popup with: one-line description, concrete example, and which billing Mode it maps to (Mode 1 subscription vs Mode 2 job/service)
- Descriptions drafted for all ~14 types shown in Replit prototype (PG, Gym, Tiffin, Coaching, Flat, Hostel, Parking, Co-living, Saloon, Hardware, Tailoring, Bakery, Clinic, Dairy) — Saloon/Clinic/Dairy mode assignments are best-guess, worth revisiting

### 7. Coaching / Gym / Yoga — deep-spec (schedule-based businesses)
**Note: Coaching needs its OWN separate setup (see below) — do not merge with Gym/Yoga.**

- **Schedule Module** (Gym + Yoga): Access type = Open-access / Batch-based / Hybrid
  - Open-access: operating hours only (owner can add multiple day/time ranges, e.g. Mon–Sat one range + Sunday a different range, via "+ Add Hours")
  - Batch-based: one+ batches, each with day(s), time slot, capacity, instructor/trainer
  - Hybrid: operating hours + optional special batches (e.g. gym open all day + 6 AM Zumba class)
- **Batch mode (per batch, not per business)**: Offline / Online / Hybrid
  - Studios commonly mix — e.g. a 6 AM hybrid batch + a 7 PM offline-only batch — so mode must be set per batch, not once for the whole business
  - Online/Hybrid batches show an **optional** meeting link field (not required); if filled, can auto-include in student reminders, otherwise owner shares manually
  - Offline batches show physical location / inherit business address
- **Multiple continuous/overlapping sessions**: two view modes
  - **List view** (for setup): grouped by day, sessions in time order — used when adding/editing batches
  - **Calendar/timetable view** (daily glance): sessions laid out on a time grid, parallel sessions shown side by side
- **Rooms/halls**: optional — only relevant if a studio has more than one space
  - Single-space studios: no room field, sessions just run back-to-back
  - Multi-space studios: owner enables rooms, each batch gets a room assignment, room becomes a lane/column in the calendar view (lets two batches run at the same time without clashing)
- **Fee Module (v1, revised — replaces flat toggle list)**:
  1. **Fee Plans** — owner creates named plans (e.g. "Beginner Yoga," "Advanced Yoga," "Kids Yoga," "Personal Training"), each linked to one or more batches. Each plan has multiple billing cycle options (Monthly / Quarterly / Half-Yearly / Yearly / Custom duration), each cycle with its own price (not just monthly×N — allows built-in discount for longer commitment)
  2. **Trial Session** — free or paid, offered before a customer commits to a plan
  3. **Membership Freeze/Pause** — pause billing for a period (e.g. travel), resumes after
  4. **Add-on Charges** — locker, diet consultation, merchandise, etc. — separate line items from the core plan fee
  5. **Discount** — manual field, applied per customer at onboarding time (flat ₹ or %), owner's discretion — no automated bundle/late-fee rule engine in v1

### 8. Customer Intake Template (configured during business setup)
- Owner configures which fields appear when adding a customer later — fast pre-built form instead of ad-hoc entry
- Same **Simple/Standard/Detailed** depth preset pattern as Staff onboarding
- **Name + Mobile always required** (load-bearing for ledger + Vasooli/WhatsApp reminders) — everything else (ID proof, age, address, food preference, emergency contact, batch assignment, etc.) fully customizable/toggleable
- Suggested smart defaults pre-toggled based on business type + chosen preset
- ID proof supports multiple types (Aadhaar, PAN, Driving License, etc.) — same multi-ID pattern as Staff module

## On the horizon / open items
- **Coaching needs a separate Customer Intake + setup spec** — involves additional student-specific details (school, grade, parent/guardian contact, etc.) not shared with Gym/Yoga
- PG/Hostel/Co-living deep-spec still pending: building layout (blocks, floors, rooms per floor), room sharing type, food veg/non-veg, parking availability, deposit structure
- Job/service types (Tailoring, Saloon, Clinic) deep-spec still pending
- Saloon/Clinic/Dairy Mode 1 vs Mode 2 classification needs owner decision, not just assumed default
- Resolve "Khaata" naming/trademark question before launch

## Artifacts generated this session
- `business-setup-status.html` — setup status page mockup
- `business-documents.html` — documents section with Secure Showcase toggle
- `onboarding-flow.html` — full click-through: type selection w/ info popups → setup status → business profile form (3 presets)
- (Next) Gym + Yoga combined setup visualization — Schedule + Fee + Customer Intake

## Working style reminders
- Decide before building — quick multiple-choice questions before generating anything
- Token-lean responses; this chat used for prompts/specs, HTML generated only for visualization checkpoints
- Structured per-screen HTML files, green accent #1f6f54, Plus Jakarta Sans + Inter fonts, parchment background #fbfbf9
