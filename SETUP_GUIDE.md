# 🚀 Setup Guide - Supabase + Vercel Deployment

Complete guide to deploy your ICF Coach app with Supabase database and Vercel hosting.

---

## Part 1: Create Supabase Project

### Step 1: Sign Up for Supabase
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub (recommended)

### Step 2: Create New Project
1. Click "New Project"
2. **Organization**: Choose or create one
3. **Name**: `icf-coach` (or your preferred name)
4. **Database Password**: Create a strong password (save this!)
5. **Region**: Choose closest to your users
6. Click "Create new project"

⏱️ *Wait 2-3 minutes for project to initialize*

### Step 3: Run Database Schema
1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click "New query"
3. Copy entire contents of `/supabase/schema.sql`
4. Paste into SQL editor
5. Click "Run" (bottom right)
6. ✅ Should see "Success" message

### Step 4: Get API Keys
1. Go to **Project Settings** (gear icon, bottom left)
2. Click **API** in left menu
3. Copy these values:

```
Project URL: https://xxxxx.supabase.co
anon public key: eyJhbGc...
service_role key: eyJhbGc... (⚠️ Keep secret!)
```

### Step 5: Configure Authentication
1. Go to **Authentication** > **Providers**
2. Enable **Email** provider
3. **Optional**: Enable Google, GitHub, etc.
4. Go to **URL Configuration**
5. Add site URL: `http://localhost:3000` (for now)
6. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://your-domain.vercel.app/auth/callback` (add after Vercel deploy)

### Step 6: Create Admin User
1. Go to **Authentication** > **Users**
2. Click "Add user" > "Create new user"
3. Email: `m_lowegrenmac.com`
4. Password: `coach2024` (or your preferred password)
5. **Confirm email**: Toggle ON
6. Click "Create user"

### Step 7: Set Admin Permissions
1. Go to **SQL Editor**
2. Run this query:
```sql
-- Make m_lowegrenmac.com an admin with full access
UPDATE public.profiles 
SET role = 'admin', has_full_access = true 
WHERE email = 'm_lowegrenmac.com';
```

---

## Part 2: Configure Local Environment

### Step 1: Create Environment File
```bash
cd /Users/marlow/Documents/Cursor-projects/icf-coach
cp .env.example .env.local
```

### Step 2: Add Your Supabase Keys
Edit `.env.local`:
```env
# Supabase (from Step 4 above)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# ElevenLabs (already configured)
ELEVENLABS_API_KEY=sk_df90556ebec37bbcd61e3f2c06fb058bbcb625f2b54c9ed0
ELEVENLABS_AGENT_ID=agent_8401k8tmvpwpfak9f6c3x6g4zgzv

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 3: Test Locally
```bash
npm run dev
```
Visit `http://localhost:3000` and test authentication!

---

## Part 3: Deploy to Vercel

### Step 1: Create GitHub Repository

**Option A: Using GitHub Web Interface**
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `icf-coach`
3. Description: "ICF Professional Coaching Platform"
4. **Private** (recommended) or Public
5. Click "Create repository"
6. Follow instructions to push existing code

**Option B: Using Terminal** (I'll help you with this)
```bash
# Initialize git (if not already)
cd /Users/marlow/Documents/Cursor-projects/icf-coach
git init
git add .
git commit -m "Initial commit: ICF Coach with voice integration"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/icf-coach.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." > "Project"
3. **Import Git Repository**:
   - Connect GitHub account
   - Select `icf-coach` repository
   - Click "Import"

4. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)

5. **Environment Variables** - Add these:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
   ELEVENLABS_API_KEY=sk_df90556ebec37bbcd61e3f2c06fb058bbcb625f2b54c9ed0
   ELEVENLABS_AGENT_ID=agent_8401k8tmvpwpfak9f6c3x6g4zgzv
   NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
   ```

6. Click **"Deploy"**

⏱️ *Deployment takes 2-3 minutes*

### Step 3: Update Supabase URLs

After Vercel gives you a URL (e.g., `https://icf-coach-xxx.vercel.app`):

1. Go back to **Supabase** > **Authentication** > **URL Configuration**
2. Update **Site URL**: `https://icf-coach-xxx.vercel.app`
3. Add to **Redirect URLs**:
   - `https://icf-coach-xxx.vercel.app/auth/callback`
   - `https://icf-coach-xxx.vercel.app/**`

### Step 4: Add Custom Domain (Optional)

In Vercel:
1. Go to **Settings** > **Domains**
2. Add `coachplatform.m-lowegrenmac.com` (or your domain)
3. Follow DNS configuration instructions
4. Update Supabase URLs accordingly

---

## Part 4: Post-Deployment

### Test Your Live App

1. Visit your Vercel URL
2. Test login: `m_lowegrenmac.com` / `coach2024`
3. Complete onboarding flow
4. Test text session
5. Test voice session (requires HTTPS)
6. Test check-ins
7. Test reading materials

### Security Checklist

- [ ] Changed default admin password
- [ ] Environment variables set in Vercel
- [ ] `.env.local` added to `.gitignore`
- [ ] Supabase Row Level Security (RLS) enabled
- [ ] API keys not in source code
- [ ] HTTPS enabled (automatic on Vercel)

---

## Troubleshooting

### "Supabase client not initialized"
- Check environment variables in Vercel
- Redeploy after adding variables

### "Authentication failed"
- Verify Supabase redirect URLs include your domain
- Check user exists in Supabase Auth

### Voice session not working
- HTTPS required for microphone access
- Check ElevenLabs API key is valid
- Verify agent ID is correct

### Database errors
- Check RLS policies are set correctly
- Verify user has permissions in profiles table
- Review SQL logs in Supabase

---

## Next Steps

1. **Invite Users**: Add more coaches/clients in Supabase Auth
2. **Custom Domain**: Set up your branded domain
3. **Analytics**: Add Vercel Analytics or Google Analytics
4. **Monitoring**: Set up error tracking (Sentry)
5. **Backups**: Enable Supabase automatic backups

---

## Support Resources

- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

---

**🎉 You're all set!** Your ICF Coach platform is now live with:
- ✅ Supabase database
- ✅ User authentication
- ✅ Voice coaching (ElevenLabs)
- ✅ Vercel hosting
- ✅ Full admin access for m_lowegrenmac.com

