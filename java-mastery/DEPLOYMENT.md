# Deployment Guide

## Current production deployment

- Platform: Vercel
- Project: `devgupta4526s-projects/java-mastery`
- Production URL: <https://java-mastery-iota.vercel.app>
- Framework: Next.js 16 (Node.js deployment)

The repository is linked locally to the Vercel project. `.vercel/` and `.env.local` are intentionally ignored by Git.

## Required Supabase configuration

The application expects these public Supabase values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

Use the project's public publishable/anon key only. Never expose the Supabase service-role key as a `NEXT_PUBLIC_` variable.

Add both values in **Vercel → java-mastery → Settings → Environment Variables** for Production, Preview, and Development. They can also be added from this directory with:

```powershell
npx vercel env add NEXT_PUBLIC_SUPABASE_URL
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

After adding or changing either variable, create a new deployment because Next.js embeds `NEXT_PUBLIC_` values into the browser bundle at build time:

```powershell
npx vercel deploy --prod
```

## Supabase Auth URLs

In **Supabase Dashboard → Authentication → URL Configuration**, set:

- Site URL: `https://java-mastery-iota.vercel.app`
- Redirect URL: `https://java-mastery-iota.vercel.app/auth/callback`

For local sign-up testing, also allow:

```text
http://localhost:3000/auth/callback
```

If preview deployments must support email-confirmation callbacks, add the appropriate Vercel preview URL pattern in Supabase as well.

## Database setup

Run [`src/lib/supabase/schema.sql`](src/lib/supabase/schema.sql) in the Supabase SQL editor for a new Supabase project. Review the SQL before running it against an existing database.

## Deploying updates

Verify the app locally, then deploy from the repository root:

```powershell
npm ci
npm run build
npx vercel deploy --prod
```

Vercel prints an immutable deployment URL and updates the production alias after the build succeeds.

## Verification checklist

1. Open the home page and several lesson pages.
2. Create a user at `/login` and follow the confirmation email.
3. Confirm the callback returns to `/dashboard`.
4. Confirm progress/enrollment records appear in Supabase.
5. Confirm logged-out requests to `/dashboard` redirect to `/login`.

## Production limitation

`/api/upload` currently writes videos to `public/uploads/videos` on the server filesystem. Vercel Functions do not provide durable application storage, so uploads will not persist reliably in production. Move this endpoint to Supabase Storage (or another object store) before relying on production video uploads.

## Troubleshooting

- **"Supabase is not configured yet"**: add both Vercel variables and redeploy.
- **Confirmation link returns an auth error**: verify the Supabase Site URL and redirect allow-list.
- **Database permission errors**: confirm the schema and Row Level Security policies from `schema.sql` were applied.
- **Deployment build failure**: reproduce it with `npm ci` followed by `npm run build` before redeploying.
