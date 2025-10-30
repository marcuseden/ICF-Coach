-- Setup Premium Package Owner: m_lowegrenmac.com
-- Run this in Supabase SQL Editor after creating the auth user

-- STEP 1: First, create the user in Supabase Dashboard
-- Go to Authentication → Users → Add User
-- Email: m_lowegrenmac.com
-- Password: premium2024 (or your preferred password)
-- Confirm Email: Yes
-- Copy the generated User ID

-- STEP 2: Replace YOUR_USER_ID below with the actual ID from Step 1
-- Then run this SQL to complete the setup

-- Create user profile with full access
INSERT INTO public.profiles (id, email, name, role, has_full_access)
VALUES (
  'YOUR_USER_ID', -- Replace with actual user ID from Authentication → Users
  'm_lowegrenmac.com',
  'Mac Lowegren',
  'client', -- Client role, not admin
  true -- Full access to all features
)
ON CONFLICT (id) 
DO UPDATE SET 
  email = 'm_lowegrenmac.com',
  name = 'Mac Lowegren',
  role = 'client',
  has_full_access = true,
  updated_at = NOW();

-- Create client record with Premium package
INSERT INTO public.clients (user_id, name, email, package_id, start_date, current_session)
VALUES (
  'YOUR_USER_ID', -- Same user ID as above
  'Mac Lowegren',
  'm_lowegrenmac.com',
  'premium', -- Premium package (12 weeks, 12 sessions, $1,200)
  NOW(),
  1 -- Starting at session 1
)
ON CONFLICT (user_id) 
DO UPDATE SET 
  package_id = 'premium',
  updated_at = NOW();

-- Verify the complete setup
SELECT 
  p.id,
  p.email,
  p.name,
  p.role,
  p.has_full_access,
  c.package_id,
  c.current_session,
  c.start_date,
  pkg.name as package_name,
  pkg.duration,
  pkg.sessions,
  pkg.price
FROM public.profiles p
LEFT JOIN public.clients c ON c.user_id = p.id
LEFT JOIN public.packages pkg ON pkg.id = c.package_id
WHERE p.email = 'm_lowegrenmac.com';

-- Expected result:
-- ✅ Email: m_lowegrenmac.com
-- ✅ Role: client
-- ✅ Full Access: true
-- ✅ Package: Premium
-- ✅ Duration: 12 weeks
-- ✅ Sessions: 12
-- ✅ Price: $1,200

-- PREMIUM PACKAGE FEATURES:
-- ✅ 12 coaching sessions (60 min each)
-- ✅ Weekly mobile check-ins
-- ✅ All questionnaires (intake, midpoint, exit)
-- ✅ Comprehensive reading library (4 materials)
-- ✅ Priority support
-- ✅ Detailed progress reports
-- ✅ Voice coaching with ElevenLabs
-- ✅ Full access to all features

-- Login at: http://localhost:3000
-- Email: m_lowegrenmac.com
-- Password: (the one you set in Step 1)

