# 🚀 Quick Start: Fix Vercel Login (5 Minutes)

## The Problem
Login at https://icf-coach-jvuoknh18-marcus-eden.vercel.app/login not working

## The Solution
Add 3 environment variables to Vercel

---

## Step 1: Go to Vercel
https://vercel.com/dashboard → Select Project → Settings → Environment Variables

## Step 2: Add These 3 Variables

For each variable, select **ALL environments** (Production, Preview, Development):

### Variable 1
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://kzjjceewlalnguszevza.supabase.co
```

### Variable 2
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6ampjZWV3bGFsbmd1c3pldnphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MzI1NjMsImV4cCI6MjA3NzQwODU2M30.Sl4Ww7DcYPzqmULYkun9q2IMZJlDpQfxmawakeKIY8g
```

### Variable 3
```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6ampjZWV3bGFsbmd1c3pldnphIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTgzMjU2MywiZXhwIjoyMDc3NDA4NTYzfQ.d08DSvssDYl3mRey4sleJ1aCM1yuogEnjb7JQw0BQ2g
```

## Step 3: Redeploy
Go to: Deployments → Latest → Click ⋯ → Redeploy

## Step 4: Test (Wait 2 minutes for deploy)
URL: https://icf-coach-jvuoknh18-marcus-eden.vercel.app/login

Login with:
- Email: `m_lowegren@mac.com`
- Password: `coach2024`

## ✅ Done!
Should redirect to dashboard after login.

---

**More Help?** See `LOGIN_FIX_SUMMARY.md` or `VERCEL_DEPLOYMENT_FIX.md`

