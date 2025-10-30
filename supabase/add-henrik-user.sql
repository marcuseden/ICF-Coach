-- Add Henrik Dannert as a user with Premium subscription
-- Run this in Supabase SQL Editor

-- First, create the auth user (you may need to do this through Supabase Dashboard)
-- Email: henrik.dannert@heartpace.com
-- Password: coach2024

-- Assuming the user has been created through auth, we'll use a placeholder UUID
-- Replace this with the actual UUID from auth.users after creating the user

-- Step 1: Insert profile
INSERT INTO public.profiles (id, email, name, role, has_full_access, created_at, updated_at)
VALUES (
  'REPLACE_WITH_ACTUAL_UUID_FROM_AUTH_USERS', -- Get this from auth.users after creating the account
  'henrik.dannert@heartpace.com',
  'Henrik Dannert',
  'client',
  true,  -- Full access to all features
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  has_full_access = EXCLUDED.has_full_access,
  updated_at = NOW();

-- Step 2: Create client record with Premium package
INSERT INTO public.clients (id, user_id, name, email, package_id, start_date, current_session, created_at, updated_at)
VALUES (
  uuid_generate_v4(),
  'REPLACE_WITH_ACTUAL_UUID_FROM_AUTH_USERS', -- Same UUID as above
  'Henrik Dannert',
  'henrik.dannert@heartpace.com',
  'premium',  -- Premium package
  NOW(),
  1,
  NOW(),
  NOW()
)
ON CONFLICT DO NOTHING;

-- Alternative: If you want to create the user directly in the database
-- (Note: This creates a user without proper auth, use Supabase Dashboard instead)

-- Create a function to add the complete user
CREATE OR REPLACE FUNCTION add_henrik_user()
RETURNS void AS $$
DECLARE
  user_uuid UUID;
BEGIN
  -- Insert into auth.users (this is simplified, normally done through Supabase Auth API)
  -- You should create the user through Supabase Dashboard: Authentication > Users > Add User
  
  -- For now, let's assume user is created and we just need to add profile and client
  -- Get the user ID (replace with actual ID after creating user)
  SELECT id INTO user_uuid FROM auth.users WHERE email = 'henrik.dannert@heartpace.com';
  
  IF user_uuid IS NULL THEN
    RAISE EXCEPTION 'User not found. Please create user through Supabase Dashboard first.';
  END IF;
  
  -- Insert profile
  INSERT INTO public.profiles (id, email, name, role, has_full_access)
  VALUES (user_uuid, 'henrik.dannert@heartpace.com', 'Henrik Dannert', 'client', true)
  ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    has_full_access = EXCLUDED.has_full_access,
    updated_at = NOW();
  
  -- Insert client with premium package
  INSERT INTO public.clients (user_id, name, email, package_id, start_date, current_session)
  VALUES (user_uuid, 'Henrik Dannert', 'henrik.dannert@heartpace.com', 'premium', NOW(), 1)
  ON CONFLICT DO NOTHING;
  
  RAISE NOTICE 'Henrik Dannert added successfully with Premium subscription';
END;
$$ LANGUAGE plpgsql;

-- Note: Before running this function, create the user in Supabase Dashboard:
-- 1. Go to Authentication > Users
-- 2. Click "Add User"
-- 3. Email: henrik.dannert@heartpace.com
-- 4. Password: coach2024
-- 5. Then run: SELECT add_henrik_user();

