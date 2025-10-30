# 🚀 Quick Deploy Steps

Follow these steps in order to get your ICF Coach platform live!

---

## Step 1: Push to GitHub ✅ (Do this first)

### 1.1 Create GitHub Repository
1. Go to: https://github.com/new
2. **Repository name**: `icf-coach`
3. **Description**: `ICF Professional Coaching Platform with Voice AI`
4. **Visibility**: Private (recommended)
5. ⚠️ **DO NOT** check "Initialize with README" (we already have one)
6. Click **"Create repository"**

### 1.2 Push Your Code
After creating the repository, GitHub will show you commands. Use these:

```bash
cd /Users/marlow/Documents/Cursor-projects/icf-coach

# Add your GitHub repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/icf-coach.git

# Push to GitHub
git push -u origin main
```

✅ **Done!** Your code is now on GitHub.

---

## Step 2: Create Supabase Database

### 2.1 Sign Up & Create Project
1. Go to: https://supabase.com
2. Click **"Start your project"** → Sign in with GitHub
3. Click **"New Project"**
4. Fill in:
   - **Name**: `icf-coach`
   - **Database Password**: Create strong password (save it!)
   - **Region**: Choose closest to you
5. Click **"Create new project"**
6. ⏱️ Wait 2-3 minutes for setup

### 2.2 Run Database Schema
1. In Supabase, click **"SQL Editor"** (left sidebar)
2. Click **"New query"**
3. Open your local file: `/supabase/schema.sql`
4. Copy ALL the SQL code
5. Paste into Supabase SQL editor
6. Click **"Run"** (bottom right)
7. ✅ Should see "Success. No rows returned"

### 2.3 Get Your API Keys
1. Click **"Project Settings"** (gear icon, bottom left)
2. Click **"API"** in left menu
3. **SAVE THESE** (you'll need them for Vercel):

```
Project URL: https://xxxxx.supabase.co
anon public: eyJhbGc...
service_role: eyJhbGc... (keep secret!)
```

### 2.4 Create Your Admin User
1. Go to **"Authentication"** → **"Users"** (left sidebar)
2. Click **"Add user"** → **"Create new user"**
3. Fill in:
   - **Email**: `m_lowegrenmac.com`
   - **Password**: `coach2024` (or your preferred password)
   - **Auto Confirm User**: Toggle ON ✅
4. Click **"Create user"**

### 2.5 Give Admin Access
1. Go back to **"SQL Editor"**
2. Click **"New query"**
3. Paste this:
```sql
UPDATE public.profiles 
SET role = 'admin', has_full_access = true 
WHERE email = 'm_lowegrenmac.com';
```
4. Click **"Run"**
5. ✅ Now m_lowegrenmac.com has full access!

---

## Step 3: Deploy to Vercel

### 3.1 Import from GitHub
1. Go to: https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. If needed, **"Adjust GitHub App Permissions"** → Allow access to `icf-coach`
5. Find `icf-coach` in list → Click **"Import"**

### 3.2 Configure Environment Variables
In the **"Configure Project"** screen:

1. Scroll to **"Environment Variables"**
2. Add these ONE BY ONE:

**From Supabase (Step 2.3):**
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://xxxxx.supabase.co

Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGc... (your anon key)

Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGc... (your service role key)
```

**ElevenLabs (already configured):**
```
Name: ELEVENLABS_API_KEY
Value: sk_df90556ebec37bbcd61e3f2c06fb058bbcb625f2b54c9ed0

Name: ELEVENLABS_AGENT_ID  
Value: agent_8401k8tmvpwpfak9f6c3x6g4zgzv
```

**App URL (leave blank for now):**
```
Name: NEXT_PUBLIC_APP_URL
Value: (will fill after deploy)
```

### 3.3 Deploy!
1. Click **"Deploy"**
2. ⏱️ Wait 2-3 minutes
3. 🎉 You'll get a URL like: `https://icf-coach-xxx.vercel.app`

---

## Step 4: Final Configuration

### 4.1 Update Supabase URLs
1. Copy your Vercel URL: `https://icf-coach-xxx.vercel.app`
2. Go back to **Supabase** → **"Authentication"** → **"URL Configuration"**
3. Update:
   - **Site URL**: `https://icf-coach-xxx.vercel.app`
   - **Redirect URLs**: Add these:
     ```
     https://icf-coach-xxx.vercel.app/**
     https://icf-coach-xxx.vercel.app/auth/callback
     ```

### 4.2 Update Vercel Environment Variable
1. In Vercel, go to **"Settings"** → **"Environment Variables"**
2. Find `NEXT_PUBLIC_APP_URL`
3. Edit it to: `https://icf-coach-xxx.vercel.app`
4. Click **"Save"**
5. Redeploy: Go to **"Deployments"** → Click **"..."** on latest → **"Redeploy"**

---

## Step 5: Test Your Live App! 🎉

1. Visit your Vercel URL: `https://icf-coach-xxx.vercel.app`
2. You should see login screen
3. **Login credentials**:
   - Email: `m_lowegrenmac.com`
   - Password: `coach2024` (or what you set)
4. Test features:
   - ✅ Complete onboarding
   - ✅ Start text session
   - ✅ Start voice session (needs HTTPS ✅)
   - ✅ Submit check-in
   - ✅ View reading materials
   - ✅ Track progress

---

## Optional: Custom Domain

### Add Your Domain (e.g., coach.m-lowegrenmac.com)

**In Vercel:**
1. Go to **"Settings"** → **"Domains"**
2. Add domain: `coach.m-lowegrenmac.com`
3. Follow DNS instructions (add CNAME record)

**In Supabase:**
1. Update **Site URL** and **Redirect URLs** to your custom domain

**In Vercel Environment:**
1. Update `NEXT_PUBLIC_APP_URL` to your custom domain

---

## Troubleshooting

### "Can't push to GitHub"
```bash
# If remote already exists, remove it first
git remote remove origin

# Then add new one
git remote add origin https://github.com/YOUR_USERNAME/icf-coach.git
git push -u origin main
```

### "Supabase query failed"
- Make sure you copied ALL the SQL from `schema.sql`
- Check for any error messages in red
- Try running sections one at a time

### "Vercel build failed"
- Check environment variables are all set
- Look at build logs for specific error
- Make sure all variables have correct values (no extra spaces)

### "Login doesn't work"
- Check Supabase redirect URLs include your Vercel domain
- Verify user exists in Supabase Auth → Users
- Check browser console for errors

---

## Summary Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Supabase project created
- [ ] Database schema deployed
- [ ] Admin user created (m_lowegrenmac.com)
- [ ] Vercel project created
- [ ] Environment variables added
- [ ] App deployed successfully
- [ ] Supabase URLs updated
- [ ] Login tested successfully
- [ ] Voice session works
- [ ] All features tested

---

## What You'll Have

✅ **Live URL**: `https://icf-coach-xxx.vercel.app`  
✅ **Admin Login**: `m_lowegrenmac.com` / `coach2024`  
✅ **Database**: Supabase PostgreSQL  
✅ **Voice AI**: ElevenLabs integration  
✅ **Features**: Text & voice coaching, progress tracking, check-ins  
✅ **Mobile**: Fully responsive  
✅ **Secure**: HTTPS, authentication, RLS policies

---

**🎉 You're ready to go!**

Start with Step 1 (GitHub) → Then Step 2 (Supabase) → Then Step 3 (Vercel)

Each step takes about 5 minutes. Total setup: ~15 minutes.

