# Test Login Credentials

## Available Test Users

### 1. Admin User (Primary Test Account)
```
Email: m_lowegren@mac.com
Password: coach2024
Role: Admin
Access: Full access to all features
```

### 2. Premium Owner (Alternative Account)
```
Email: m_lowegrenmac.com
Password: premium2024
Role: Client
Package: Premium (biggest subscription)
Access: Full access to all features
```

### 3. Henrik Dannert (Example Client)
```
Email: henrik.dannert@heartpace.com
Password: coach2024
Role: Client
Package: Premium
Access: Full access to all features
```

---

## How to Test Login

### Option 1: Use the Login Form
1. Go to: http://localhost:3000/login
2. Enter email: `m_lowegren@mac.com`
3. Enter password: `coach2024`
4. Click "Sign In"

### Option 2: Use Demo Credentials on Page
The login form shows demo credentials at the bottom:
- Email: `m_lowegren@mac.com`
- Password: `coach2024`

---

## What Happens After Login

1. **Authentication**: Uses Supabase auth.signInWithPassword()
2. **Profile Fetch**: Gets user profile from `profiles` table
3. **LocalStorage**: Stores user data in browser
4. **Redirect**: Sends you to `/dashboard`

---

## Troubleshooting

### "Invalid email or password" Error

**Possible Causes:**
1. User doesn't exist in Supabase auth.users
2. Password is incorrect
3. Environment variables not set
4. Supabase connection issue

**Solution:**
Run the setup script to ensure user exists:

```bash
node scripts/add-or-reset-user.js m_lowegren@mac.com coach2024 admin
```

---

## Verify User in Database

To check if user exists and get details, you can query Supabase:

```sql
-- Check auth user
SELECT id, email, created_at 
FROM auth.users 
WHERE email = 'm_lowegren@mac.com';

-- Check profile
SELECT * 
FROM profiles 
WHERE email = 'm_lowegren@mac.com';
```

---

## Create/Reset User

If you need to create or reset the user, use this script:

```bash
# Create/reset m_lowegren@mac.com as admin
node scripts/add-or-reset-user.js m_lowegren@mac.com coach2024 admin "Mac Lowegren"

# Or use the interactive script
node scripts/add-or-reset-user.js
```

---

## Test Authentication Flow

Here's what should happen during login:

1. ✅ Form submission → `handleEmailLogin()`
2. ✅ Call → `signIn(email, password)` from `lib/auth.ts`
3. ✅ Call → `signInWithEmail()` from `lib/supabase.ts`
4. ✅ Supabase → `auth.signInWithPassword()`
5. ✅ Get user profile from `profiles` table
6. ✅ Store user in localStorage
7. ✅ Redirect to `/dashboard`

---

## Debug Mode

To see detailed login errors, open browser DevTools Console (Cmd+Option+I) and watch for:
- `Login error:` messages
- Supabase auth errors
- Network requests to Supabase

---

## Expected Dashboard After Login

After successful login with `m_lowegren@mac.com`, you should see:
- ✅ Welcome message with your name
- ✅ Coaching session stats
- ✅ Upcoming sessions
- ✅ Reading materials
- ✅ User menu with profile/settings

---

## Quick Test Command

Want to test login programmatically? Open browser console on login page:

```javascript
// Test login function
async function testLogin() {
  const { signIn } = await import('/lib/auth.js');
  const user = await signIn('m_lowegren@mac.com', 'coach2024');
  console.log('Login result:', user);
}
testLogin();
```

