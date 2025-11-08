Project: “Zalia” — A Private, Mobile-First Love Page

1. Objectives (What “done” looks like)

Create a private, delightful, mobile-first webpage to celebrate Zalia.

Zero-friction sharing: a single secret link (no accounts).

Fast, smooth, and reliable: Lighthouse ≥ 95 (PWA installable, offline basic).

Feels special: tasteful animations, soft gradients, micro-interactions; prefers-reduced-motion respected.

Safe and private: content visible only to those with the secret link; no public indexing.

Easy to maintain: single-repo, simple deploy (GitHub Pages or Vercel), env-free local mode + optional cloud sync mode.

2. User Roles

Owner (me): can seed content, toggle features, moderate submissions.

Recipient (Zalia): can view, react, add wishes/memories (when enabled).

Visitors with link: view-only unless Owner enables contributions.

3. Core Features (MVP)

Home / Greeting

Short, elegant intro with subtle motion.

Time-of-day dynamic greeting + date-based surprises (e.g., birthday/anniversary).

Acceptance criteria: loads < 1.0s on mid-tier phone; CLS < 0.02.

Wish List (Shared)

Add/edit wishes (title, description, optional photo, price/link, priority).

Mark as “planned,” “gifted,” or “surprise.”

Reorder via drag-handle; reactions (❤️ 🥹 ✨).

Acceptance: CRUD works in local mode (localStorage/IndexedDB) and cloud sync (if enabled).

Secret Share Link (Bucket ID)

Create random 16-char bucketId; all shared data stored under that bucket.

“Copy link” button with tooltip + QR code.

Acceptance: Visiting /?b=<bucketId> loads the same content on any device.

Memories Gallery

Responsive grid of photos, short notes, and dates.

Lightbox; optional captions; per-item visibility (“just us,” “everyone with link”).

Bulk add (drag/drop) in dev mode.

Messages & Notes

Owner-to-recipient notes; scheduled unlock (e.g., unlock next month).

Optional voice notes (browser MediaRecorder) with waveform preview.

Countdowns / Milestones

Next date (anniversary, birthdays) with confetti reveal.

Auto-rollover after event passes; supports multiple events.

Personalization

Theme switcher (Light / Dusk / Midnight).

Accent color picker (pastel palette).

Backgrounds: soft gradients or subtle animated shader.

Access Control & Safety

“Owner mode” pin (per-device, never stored in cloud) to show admin toggles.

Link shielding: robots.txt + <meta name="robots" content="noindex">.

Optional read-only mode for share-outs.

PWA + Offline (basic)

Installable; cache shell + last-viewed content.

Graceful sync when online returns.

Settings Panel (Owner)

Toggle public contributions, enable cloud sync, export/import data (JSON).

Rotate bucketId (generates new link; marks old as archived).

4. “100× Better” Improvements (Post-MVP power-ups)

Love Quests: mini scavenger-hunt (clues, tasks, reveal a message/gift).

Time Capsule: schedule messages/photos to unlock on future dates.

Mood-adaptive UI: detects time/weather to adapt theme subtleties.

Handoff Cards: printable QR cards that deep-link to a specific memory/wish.

Smart Recs: simple client-side heuristics suggest gift ideas from wish tags.

AR Postcard (optional): marker launches floating message via WebXR (fallback if unsupported).

“Today I’m grateful for…” micro-journal; animates month summary.

Custom Fonts Pack: graceful fallbacks + memory-friendly subsetting.

In-page Audio Scene: short ambient loop with play/pause, starts muted, never auto-plays with sound.

Edge Cache (if using Vercel) for public assets; stale-while-revalidate strategy for snappy loads.

5. Architecture & Persistence

Frontend: React + Vite + Tailwind + Framer Motion (motion guarded by prefers-reduced-motion).

Local-first storage: IndexedDB or localStorage for offline/MVP.

Cloud sync (optional, toggle):

Supabase (Postgres+RLS) with anon key scoped to bucket; or Firebase (RTDB/Firestore) if preferred.

Each record includes bucketId and RLS rules = current_setting('request.jwt.claims').bucketId.

Deployment: GitHub Pages (static) or Vercel (recommended for previews + edge).

6. Data Model (JSON Schemas)
   // Bucket
   { "bucketId": "string", "createdAt": "iso-datetime", "theme": "midnight", "accent": "#A1C4FD" }

// Wish
{ "id":"uuid","bucketId":"string","title":"string","description":"string","url":"string|null","price":"number|null","priority":1,"status":"planned|gifted|surprise","image":"string|null","reactions":{"heart":3,"sparkle":1},"createdAt":"iso","updatedAt":"iso" }

// Memory
{ "id":"uuid","bucketId":"string","title":"string","caption":"string|null","date":"iso-date","image":"string|null","visibility":"private|link","createdAt":"iso" }

// Message
{ "id":"uuid","bucketId":"string","text":"string","voiceUrl":"string|null","unlockAt":"iso-datetime|null","createdAt":"iso" }

// Milestone
{ "id":"uuid","bucketId":"string","title":"string","date":"iso-date","emoji":"string","createdAt":"iso" }

7. API (if Supabase mode)

Tables: buckets, wishes, memories, messages, milestones.

RLS (row-level security):

Policy: bucketId = auth.jwt()->>'bucketId'

Anon token minted client-side by embedding bucketId in JWT (via edge function) or use Supabase anon key + bucketId column filters and PostgREST policies.

Endpoints (PostgREST): use filters ?bucketId=eq.<id>; client caches aggressively.

8. UX & Motion System

Micro-interactions: tap ripple, hover float (2–4px), springy buttons.

Page transitions: fade+slide up 12–16px, 180–240ms, eased.

Confetti: on milestone hit or wish marked “gifted” (respect motion settings).

Haptics: mobile light haptics on key actions (if supported).

9. Accessibility & Performance Targets

A11y: keyboard navigable; focus ring visible; color contrast WCAG AA.

Motion: full content usable with prefers-reduced-motion: reduce.

Perf: LCP < 2.0s on 4G; TBT < 100ms; JS < 220KB gzipped for MVP.

Images: responsive <img> with srcset, lazy-load, AVIF/WebP.

10. Security/Privacy

No indices: robots.txt + meta noindex.

Secret by unlisted link only. Support rotating bucketId and exporting/importing data.

Client-side pin for Owner controls (not true auth—good enough for this context).

Content sanitization (DOMPurify) for notes; file type validation for uploads.

11. Analytics (private)

Simple, self-hosted or privacy-friendly (e.g., Plausible) OR local only: log counts in localStorage for fun stats (“memories added,” “days since first visit”).

12. Folder Structure (mono-repo)
    zalia/
    ├─ public/ # static assets, icons, manifest.json
    ├─ src/
    │ ├─ components/ # UI atoms/molecules (Button, Card, Modal, Lightbox)
    │ ├─ features/
    │ │ ├─ wishes/
    │ │ ├─ memories/
    │ │ ├─ messages/
    │ │ └─ milestones/
    │ ├─ hooks/ # useBucket, useLocalStore, useReducedMotion
    │ ├─ lib/ # storage adapters (local | supabase), validators
    │ ├─ pages/ # Home, Wishes, Memories, Settings
    │ ├─ styles/ # Tailwind config, theme tokens
    │ └─ app.tsx
    ├─ tests/ # vitest + react-testing-library
    ├─ supabase/ # (optional) SQL policies & migrations
    └─ package.json

13. Task Breakdown (Give these to Gemini as work items)

T1: Bootstrap app (Vite+React+TS, Tailwind, routing, theme tokens, manifest/PWA).

T2: Bucket + secret link (generate/store bucketId; parse ?b=; copy+QR).

T3: Local store (IndexedDB/localStorage adapter with schema above).

T4: Wishes CRUD (list/grid, add/edit, reorder, reactions, status chips).

T5: Memories (upload/select image, captions, lightbox, visibility).

T6: Messages (text + optional voice note; schedule unlock).

T7: Milestones (countdown component + confetti).

T8: Settings (owner pin, read-only toggle, export/import JSON).

T9: PWA & Offline (service worker, cache shell + last bucket snapshot).

T10: A11y & Perf pass (axe checks; Lighthouse ≥95; image optimization).

T11: Cloud sync adapter (optional) (Supabase schema + RLS; swap storage via interface).

T12: Polish (animations, reduced-motion branch, micro-copy).

14. Acceptance Criteria (sample)

Given /?b=ABC123…, when I open on phone A and add a wish, then open same link on phone B, local mode shows nothing (by design), cloud mode shows synced wish within 1–2s.

When I toggle read-only, add buttons hide for non-Owner.

When prefers-reduced-motion is true, all major animations reduce to fades and no parallax.

Export file (zalia-<bucketId>-YYYYMMDD.json) can be re-imported to reconstruct full state.

15. Stretch “Delight” Ideas

Letter builder: guided prompts to craft notes with animated reveal.

Mini-games: “tap to reveal stars,” “connect the dots” to show a message.

Seasonal skins: toggle snowflakes/hearts/fireflies shaders (reduced for motion).

Ambient glow: accent-colored subtle pulse on call-to-action moments.

If you want, I can also generate a starter repo (React + Tailwind + the data schemas + local storage adapter + minimal pages) so Gemini can immediately begin filling in components.
