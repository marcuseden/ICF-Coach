# 🛠️ Setup Scripts

Scripts for configuring users and database in ICF Coach.

---

## 📜 Available Scripts

### 1. `setup-premium-owner.js`
**Purpose**: Set up `m_lowegrenmac.com` as Premium package owner

**Creates**:
- Auth user with email `m_lowegrenmac.com`
- Profile with `client` role and full access
- Client record with Premium package (12 weeks, 12 sessions, $1,200)

**Run**:
```bash
node scripts/setup-premium-owner.js
```

**Credentials**:
- Email: `m_lowegrenmac.com`
- Password: `premium2024`

---

### 2. `setup-admin.js`
**Purpose**: Set up `m_lowegren@mac.com` as Admin user

**Creates**:
- Auth user with email `m_lowegren@mac.com`
- Profile with `admin` role and full access

**Run**:
```bash
node scripts/setup-admin.js
```

**Credentials**:
- Email: `m_lowegren@mac.com`
- Password: `coach2024`

---

### 3. `verify-tables.js`
**Purpose**: Verify all database tables exist and are properly configured

**Checks**:
- All 7 tables exist
- RLS policies are enabled
- Row counts
- Sample data

**Run**:
```bash
node scripts/verify-tables.js
```

---

## 🚀 Quick Setup Guide

### First Time Setup

1. **Create Supabase Project**
   ```bash
   # Go to https://supabase.com
   # Create new project
   # Copy URL and keys
   ```

2. **Run Database Schema**
   ```bash
   # In Supabase SQL Editor, run:
   # supabase/schema.sql
   ```

3. **Setup Admin User**
   ```bash
   node scripts/setup-admin.js
   ```

4. **Setup Premium Owner**
   ```bash
   node scripts/setup-premium-owner.js
   ```

5. **Verify Everything**
   ```bash
   node scripts/verify-tables.js
   ```

---

## 📋 Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js
```

### "Invalid Supabase credentials"
Check that your Supabase URL and service key are correct in the script files.

### "User already exists"
The scripts handle this automatically and will update the existing user.

### "Table does not exist"
Run the database schema first:
```bash
# In Supabase SQL Editor:
# supabase/schema.sql
```

---

## ⚙️ Configuration

Each script uses these Supabase credentials:
- **URL**: `https://kzjjceewlalnguszevza.supabase.co`
- **Service Key**: (embedded in scripts)

**⚠️ Note**: Service keys should be moved to environment variables in production.

---

## 📊 What Each Script Does

### Premium Owner Setup
```
1. Create/Update auth user
   ├─ Email: m_lowegrenmac.com
   ├─ Password: premium2024
   └─ Email confirmed: true

2. Create profile
   ├─ Role: client
   ├─ Full access: true
   └─ Name: Mac Lowegren

3. Create client record
   ├─ Package: Premium
   ├─ Sessions: 12
   ├─ Current session: 1
   └─ Start date: Now

4. Verify setup ✅
```

### Admin Setup
```
1. Update auth user password
   └─ Password: coach2024

2. Create/Update profile
   ├─ Role: admin
   ├─ Full access: true
   └─ Name: Mac Lowegren

3. Verify setup ✅
```

---

## 🎯 Expected Output

### Premium Owner Setup (Success)
```
🎯 Setting up Premium Package Owner
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Creating user account...
✅ User created successfully!
🆔 User ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

📝 Creating user profile...
✅ Profile created!

💎 Assigning Premium package...
✅ Premium package assigned!

✅ PREMIUM OWNER SETUP COMPLETE!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 USER DETAILS:
   📧 Email: m_lowegrenmac.com
   🏷️  Name: Mac Lowegren
   🎭 Role: client
   🔓 Full Access: true

💎 PREMIUM PACKAGE DETAILS:
   📦 Package: Premium
   ⏱️  Duration: 12 weeks
   📊 Sessions: 12
   💰 Value: $1,200
```

---

## 🔄 Update Scripts

To modify user details, edit the constants at the top of each script:

```javascript
const email = 'm_lowegrenmac.com';
const password = 'premium2024';
const name = 'Mac Lowegren';
```

---

**Need help? Check `USER_SETUP.md` for detailed user setup documentation.**

