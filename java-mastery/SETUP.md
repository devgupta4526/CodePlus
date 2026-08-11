# CodePulse — Production Setup Guide

## Prerequisites
- Node.js 18+
- A Supabase account (free tier is fine)
- A RapidAPI account (free tier for Judge0)

---

## Step 1: Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Note your **Project URL** and **anon/public key** from:
   `Project Settings → API → Project URL / anon key`
3. In your Supabase dashboard, go to **SQL Editor** and run the contents of:
   `src/lib/supabase/schema.sql`
   This creates all tables, RLS policies, and triggers.

---

## Step 2: Configure `.env.local`

Copy `.env.local.example` to `.env.local` and fill in:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
RAPIDAPI_KEY=your_rapidapi_key  # optional, for code execution
```

---

## Step 3: Enable Google OAuth in Supabase

1. In Supabase dashboard: **Authentication → Providers → Google**
2. Enable Google provider.
3. Create a Google OAuth app at [console.cloud.google.com](https://console.cloud.google.com):
   - Go to **APIs & Services → Credentials → Create Credentials → OAuth Client ID**
   - Application type: **Web application**
   - Authorized redirect URIs: `https://xxxx.supabase.co/auth/v1/callback`
4. Copy the **Client ID** and **Client Secret** back into the Supabase Google provider settings.
5. Add your site URL to Supabase: **Authentication → URL Configuration → Site URL**:
   - Dev: `http://localhost:3000`
   - Prod: `https://your-domain.com`

---

## Step 4: Enable Code Execution (Judge0)

1. Go to [RapidAPI — Judge0 CE](https://rapidapi.com/judge0-official/api/judge0-ce)
2. Sign up / log in and subscribe to the **Basic (free)** plan.
3. Copy your **X-RapidAPI-Key** from the dashboard.
4. Add it to `.env.local`:
   ```env
   RAPIDAPI_KEY=your_key_here
   ```

Without this key, the "Run Code" button still works — it shows a friendly message instead of executing. You can add the key later.

---

## Step 5: Deploy to Vercel

```bash
vercel --prod
```

Set the same environment variables in your Vercel dashboard:
`Project → Settings → Environment Variables`

---

## Step 6: Test

| Feature | How to test |
|---|---|
| Sign In / Sign Up | Go to `/login`, create an account |
| Google OAuth | Click "Continue with Google" on `/login` |
| Progress sync | Complete a lesson, sign out, sign back in — progress should persist |
| Code execution | Open any Java/Spring Boot lesson, scroll to Practice section, write code, click Run |
| Enrollment | Visit `/dashboard`, click "Enroll Free" on a course |

---

## Troubleshooting

### Auth redirect loop
- Ensure your `Site URL` in Supabase matches your actual domain.
- Ensure `NEXT_PUBLIC_SUPABASE_URL` does not have a trailing slash.

### Google OAuth fails
- Double-check the redirect URI: it must be `https://xxxx.supabase.co/auth/v1/callback` (Supabase URL, not your app URL).

### Code runner shows "Not Configured"
- Add `RAPIDAPI_KEY` to `.env.local` and restart the dev server.

### Progress not syncing
- Supabase credentials must be correct and the schema must be applied.
- Check the browser console for Supabase errors.
