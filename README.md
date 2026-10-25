# School Trip Interest — MB Learning practical round

A small Next.js (App Router) + Supabase app.

- Public page (`/`): three sample trips — Singapore STEM, Jaipur Heritage,
  London Universities — each with a "View trip details" section showing a
  sample day-by-day itinerary, who the trip suits, and what is included
  (labelled as sample only; no prices or dates are shown) — and a form
  where a teacher registers interest:
  name, school, email, phone, trip, number of students. Submissions are
  saved to Supabase with validation (all fields required, valid email,
  positive whole-number student count, trip must be one of the three).
- Admin page (`/admin`): behind Supabase email login. Shows a table of all
  submissions, a filter by trip, and total students per trip.

## How to run it

```bash
npm install
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

## Supabase setup (one time, free tier)

1. Create a free Supabase project.
2. In the SQL editor, run `supabase/schema.sql` (creates the
   `trip_interests` table with row-level security: public insert,
   signed-in users only for reads).
3. In Authentication, confirm the Email provider is enabled, then create
   one admin user (email + password). That user signs in at `/admin`.
   Do not commit real keys: `.env*.local` is git-ignored.

## Deploy to Vercel (free tier)

1. Import this GitHub repo in Vercel.
2. Set the same two environment variables in Vercel:
   `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Deploy. No other configuration is needed.

## What I would add next

- Confirmation email to the teacher after registering interest.
- An export (CSV) button on the admin page.
- Trip dates and capacity limits, with a "full" state when a trip fills up.
- Rate limiting on the public form to reduce spam submissions.

## Which AI tools were used, and for what

This build was done with Muse agent assistance: the agent wrote the
Next.js pages, the Supabase schema and policies, the validation, and
this README, and ran the production build check. No other AI tools were
used, and no part of the code is claimed to be hand-written-only.
