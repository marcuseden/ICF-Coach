-- Setup Admin User for m_lowegrenmac.com
-- Run this in Supabase SQL Editor after creating the user

-- First, find the user ID
-- Go to Authentication → Users and find m_lowegrenmac.com
-- Copy the ID (it looks like: 12345678-1234-1234-1234-123456789abc)

-- Then run this, replacing YOUR_USER_ID with the actual ID:

-- Create or update profile with full admin access
INSERT INTO public.profiles (id, email, name, role, has_full_access)
VALUES (
  'YOUR_USER_ID', -- Replace with actual user ID from Auth → Users
  'm_lowegrenmac.com',
  'Mac Lowegren',
  'admin',
  true
)
ON CONFLICT (id) 
DO UPDATE SET 
  role = 'admin',
  has_full_access = true,
  name = 'Mac Lowegren';

-- Verify the setup
SELECT id, email, name, role, has_full_access 
FROM public.profiles 
WHERE email = 'm_lowegrenmac.com';

