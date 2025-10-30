# 🔧 Environment Setup Instructions

## Current Status

Your `.env.local` file is missing required Supabase and ElevenLabs configuration.

---

## ✅ Quick Fix - Add These Variables

Open your `.env.local` file and add the following variables. You already have `OPENAI_API_KEY` configured, so just add these:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ElevenLabs Voice Configuration
ELEVENLABS_API_KEY=sk_...
ELEVENLABS_AGENT_ID=agent_...

# App URL (optional but recommended)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📝 Where to Get These Keys

### Supabase Keys (Required)

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project** (or create one if you haven't)
3. **Go to Settings** (gear icon) → **API**
4. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key (⚠️ Keep secret!) → `SUPABASE_SERVICE_ROLE_KEY`

### ElevenLabs Keys (Required for Voice Sessions)

You already have these in the `SETUP_GUIDE.md`:
```env
ELEVENLABS_API_KEY=sk_df90556ebec37bbcd61e3f2c06fb058bbcb625f2b54c9ed0
ELEVENLABS_AGENT_ID=agent_8401k8tmvpwpfak9f6c3x6g4zgzv
```

---

## 🚀 Quick Start Commands

### Option 1: If you already have Supabase set up

Add the keys manually to `.env.local`, then:

```bash
# Verify configuration
node scripts/verify-env.js

# If all checks pass, restart dev server
npm run dev
```

### Option 2: If you need to set up Supabase

Follow the complete setup guide:

```bash
# Read the full setup guide
cat SETUP_GUIDE.md

# Or follow these quick steps:
# 1. Create Supabase project at supabase.com
# 2. Run database schema from /supabase/schema.sql
# 3. Get API keys and add to .env.local
# 4. Verify and start
node scripts/verify-env.js
npm run dev
```

---

## 🔍 Verify Your Setup

Run this command to check if all environment variables are properly set:

```bash
node scripts/verify-env.js
```

You should see:
```
✅ All environment variables are properly configured!
```

---

## 🐛 Troubleshooting

### Error: "Missing Supabase environment variables"

**Cause**: `.env.local` doesn't have the Supabase keys

**Fix**: Add the three Supabase variables shown above

### Error: "ENOENT: no such file or directory, open '.env.local'"

**Cause**: `.env.local` file doesn't exist

**Fix**: 
```bash
cp .env.example .env.local
# Then edit .env.local with your actual keys
```

### Dev server shows old error after adding keys

**Cause**: Next.js needs to be restarted to load new environment variables

**Fix**:
```bash
# Stop the dev server (Ctrl+C)
# Start it again
npm run dev
```

### Environment variables still not loading

**Cause**: Turbopack caching issue

**Fix**:
```bash
# Clear Next.js cache and restart
rm -rf .next
npm run dev
```

---

## 📋 Complete .env.local Template

Here's what your complete `.env.local` should look like:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAwMDAwMDAsImV4cCI6MTk5NTU3NjAwMH0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDAwMDAwMCwiZXhwIjoxOTk1NTc2MDAwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ElevenLabs Voice AI
ELEVENLABS_API_KEY=sk_df90556ebec37bbcd61e3f2c06fb058bbcb625f2b54c9ed0
ELEVENLABS_AGENT_ID=agent_8401k8tmvpwpfak9f6c3x6g4zgzv

# OpenAI (for DALL-E image generation)
OPENAI_API_KEY=sk-proj-14NdLOd5Et4A... (you already have this)

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## ✅ Next Steps After Setup

1. **Verify environment**: `node scripts/verify-env.js`
2. **Start dev server**: `npm run dev`
3. **Test login**: Go to http://localhost:3000 and try logging in
4. **Check dashboard**: Navigate to `/dashboard` after login

---

## 📚 Additional Resources

- **Full Setup Guide**: See `SETUP_GUIDE.md` for complete deployment instructions
- **Supabase Docs**: https://supabase.com/docs
- **ElevenLabs Docs**: https://elevenlabs.io/docs

---

**Need help?** Check the troubleshooting section above or review `SETUP_GUIDE.md` for detailed instructions.

