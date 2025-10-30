# ✅ Vercel Login Fix - Quick Checklist

## 🎯 Problem
Login not working at: https://icf-coach-jvuoknh18-marcus-eden.vercel.app/login

## 🔍 Diagnosis
- ✅ Login works locally
- ✅ Code is correct
- ❓ Environment variables in Vercel?

---

## 📋 Fix Checklist

### Step 1: Add Environment Variables to Vercel ⏳

Go to: **https://vercel.com/dashboard** → **Your Project** → **Settings** → **Environment Variables**

Add these variables (check **ALL** environments: Production, Preview, Development):

#### Required for Login/Auth:
```
NEXT_PUBLIC_SUPABASE_URL
https://kzjjceewlalnguszevza.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6ampjZWV3bGFsbmd1c3pldnphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MzI1NjMsImV4cCI6MjA3NzQwODU2M30.Sl4Ww7DcYPzqmULYkun9q2IMZJlDpQfxmawakeKIY8g

SUPABASE_SERVICE_ROLE_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6ampjZWV3bGFsbmd1c3pldnphIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTgzMjU2MywiZXhwIjoyMDc3NDA4NTYzfQ.d08DSvssDYl3mRey4sleJ1aCM1yuogEnjb7JQw0BQ2g
```

#### Optional (for voice features):
```
NEXT_PUBLIC_ELEVENLABS_API_KEY
sk_df90556ebec37bbcd61e3f2c06fb058bbcb625f2b54c9ed0

NEXT_PUBLIC_ELEVENLABS_AGENT_ID
agent_8401k8tmvpwpfak9f6c3x6g4zgzv

ELEVENLABS_API_KEY
sk_df90556ebec37bbcd61e3f2c06fb058bbcb625f2b54c9ed0

ELEVENLABS_AGENT_ID
agent_8401k8tmvpwpfak9f6c3x6g4zgzv
```

#### Optional (for image generation):
```
OPENAI_API_KEY
your_openai_api_key_here
```

---

### Step 2: Deploy Code to Vercel ⏳

```bash
# Commit all changes
git add .
git commit -m "Fix: Login with Supabase authentication for Vercel"

# Push to trigger auto-deploy
git push origin main
```

**Or manually redeploy:**
1. Go to Vercel Dashboard → Deployments
2. Find latest deployment
3. Click **⋯** menu → **Redeploy**

---

### Step 3: Wait for Deployment ⏳

Watch the deployment at: https://vercel.com/dashboard

- ⏳ Building...
- ⏳ Deploying...
- ✅ Ready

---

### Step 4: Test Login ⏳

Visit: https://icf-coach-jvuoknh18-marcus-eden.vercel.app/login

**Test Credentials:**
```
📧 Email: m_lowegren@mac.com
🔑 Password: coach2024
```

**Open DevTools (F12) and check:**
1. Console logs show authentication flow
2. No red errors in console
3. Network tab shows successful Supabase requests
4. Redirect to `/dashboard` happens
5. Dashboard loads with user data

---

## 🐛 Troubleshooting

### Still not working?

1. **Check if env vars are set:**
   - Open browser console on Vercel site
   - Type: `console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)`
   - Should show: `https://kzjjceewlalnguszevza.supabase.co`
   - If `undefined`, vars not configured correctly

2. **Check Vercel logs:**
   - Dashboard → Your Project → Logs
   - Look for runtime errors

3. **Check Network tab:**
   - DevTools → Network
   - Try login
   - Look for requests to `supabase.co`
   - If 401/403: Keys are wrong
   - If no requests: Vars not loading

4. **Clear cache:**
   - In Vercel Dashboard → Settings
   - Enable "Clear cache on deploy"
   - Redeploy

---

## ✅ Success Criteria

After deployment, you should see:

- ✅ Login page loads
- ✅ Can enter credentials
- ✅ "Sign In" button works
- ✅ Shows loading state
- ✅ Redirects to dashboard
- ✅ Dashboard shows: "Welcome, Mac Lowegren"
- ✅ No errors in console
- ✅ Can navigate app
- ✅ Session persists on refresh

---

## 📞 Quick Reference

**Vercel Dashboard:** https://vercel.com/dashboard

**Test Login:** https://icf-coach-jvuoknh18-marcus-eden.vercel.app/login

**Credentials:**
- Email: `m_lowegren@mac.com`
- Password: `coach2024`

**Environment Variables Needed:** 3 required (Supabase), 6 optional (voice + images)

**Estimated Time:** 5-10 minutes

---

## 🚀 Quick Deploy Command

```bash
# One command to deploy everything
git add . && \
git commit -m "Fix: Vercel login with environment variables" && \
git push origin main

# Then add env vars in Vercel Dashboard (Step 1)
# Then test login (Step 4)
```

---

**Status:** Ready to deploy! Follow the checklist above. ✨

