-- Update password and give admin access for m_lowegren@mac.com
-- Run this in Supabase SQL Editor

-- First, let's see if the user exists
SELECT id, email, created_at 
FROM auth.users 
WHERE email = 'm_lowegren@mac.com';

-- If user exists, update password (uncomment and run after seeing user ID above)
-- Replace 'YOUR_USER_ID' with the actual ID from the query above
-- Replace 'your-new-password' with your desired password

/*
UPDATE auth.users
SET 
  encrypted_password = crypt('coach2024', gen_salt('bf')),
  email_confirmed_at = NOW(),
  confirmed_at = NOW()
WHERE email = 'm_lowegren@mac.com';

-- Get the user ID
SELECT id, email FROM auth.users WHERE email = 'm_lowegren@mac.com';

-- Now create/update the profile with admin access
-- Replace YOUR_USER_ID with the ID from above
INSERT INTO public.profiles (id, email, name, role, has_full_access)
VALUES (
  'YOUR_USER_ID',  -- Replace with actual user ID
  'm_lowegren@mac.com',
  'Mac Lowegren',
  'admin',
  true
)
ON CONFLICT (id) 
DO UPDATE SET 
  role = 'admin',
  has_full_access = true,
  name = 'Mac Lowegren',
  updated_at = NOW();

-- Verify everything
SELECT 
  u.id,
  u.email,
  u.email_confirmed_at,
  p.name,
  p.role,
  p.has_full_access
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE u.email = 'm_lowegren@mac.com';
*/

