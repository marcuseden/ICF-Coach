# 🚀 Quick Fix - Environment Variables

## The Problem
```
Error: Missing Supabase environment variables
```

## The Solution (3 Steps)

### Step 1: Add Missing Variables to `.env.local`

Open `.env.local` and add these lines:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ElevenLabs (from SETUP_GUIDE.md)
ELEVENLABS_API_KEY=sk_df90556ebec37bbcd61e3f2c06fb058bbcb625f2b54c9ed0
ELEVENLABS_AGENT_ID=agent_8401k8tmvpwpfak9f6c3x6g4zgzv

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 2: Verify Configuration

```bash
npm run verify-env
```

Should show all ✅

### Step 3: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

## Done! 🎉

Your app should now work. Test by logging in at http://localhost:3000

---

## Need Supabase Keys?

1. Go to: https://supabase.com/dashboard
2. Select project (or create new)
3. Settings → API
4. Copy the three keys

See `SETUP_GUIDE.md` for detailed instructions.

---

## Still Not Working?

1. Clear cache: `rm -rf .next`
2. Restart: `npm run dev`
3. Check file is named `.env.local` (not `.env.local.txt`)
4. Read `FIX_SUMMARY.md` for troubleshooting

