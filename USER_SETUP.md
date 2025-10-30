# 👥 User Setup Guide - ICF Coach

Quick reference for setting up users with different roles and packages.

---

## 🎯 Current Users

### Premium Owner
- **Email**: `m_lowegrenmac.com`
- **Password**: `premium2024`
- **Role**: Client (with full access)
- **Package**: Premium (12 weeks, 12 sessions, $1,200)
- **Features**: All premium features unlocked

### Admin User
- **Email**: `m_lowegren@mac.com`
- **Password**: `coach2024`
- **Role**: Admin
- **Access**: Full admin privileges

---

## 💎 Premium Package Details

The biggest subscription includes:

### Session Details
- ✅ **12 coaching sessions** (60 minutes each)
- ✅ **Weekly frequency** for 12 weeks
- ✅ **Text-based sessions** with 7-step ICF flow
- ✅ **Voice coaching sessions** with ElevenLabs AI

### Check-Ins & Accountability
- ✅ **Weekly mobile check-ins**
- ✅ Mid-week action tracking
- ✅ 1-5 rating system
- ✅ Insight reflections

### Questionnaires
- ✅ **Intake questionnaire** (5 questions)
- ✅ **Mid-point questionnaire** (5 questions)
- ✅ **Exit questionnaire** (5 questions)

### Reading Materials
- ✅ **4 curated reading materials**
- ✅ Progress tracking
- ✅ Completion badges
- ✅ ~3 min read time each

### Premium-Only Features
- ✅ **Priority support**
- ✅ **Detailed progress reports**
- ✅ **Voice journaling**
- ✅ **Full access** to all features
- ✅ **Extended session times** (60 min vs 30/45 min)

### Value
- **Price**: $1,200
- **Duration**: 12 weeks
- **Total session time**: 12 hours
- **Check-ins**: 12 weekly prompts

---

## 🚀 Setup Methods

### Method 1: Using Node.js Script (Automated)

```bash
# Run the premium owner setup script
node scripts/setup-premium-owner.js
```

This will:
1. ✅ Create the auth user in Supabase
2. ✅ Create the profile with full access
3. ✅ Assign the Premium package
4. ✅ Verify complete setup
5. ✅ Display login credentials

### Method 2: Using SQL (Manual)

1. **Create Auth User** in Supabase Dashboard:
   - Go to Authentication → Users
   - Click "Add User"
   - Email: `m_lowegrenmac.com`
   - Password: `premium2024`
   - Confirm Email: ✅ Yes
   - Copy the User ID

2. **Run SQL Script**:
   - Open Supabase SQL Editor
   - Open `supabase/setup-premium-owner.sql`
   - Replace `YOUR_USER_ID` with copied ID
   - Execute the script

3. **Verify Setup**:
   - Check the results table
   - Confirm Premium package assigned

---

## 📦 Package Comparison

| Feature | Basic | Standard | **Premium** |
|---------|-------|----------|---------|
| **Duration** | 4 weeks | 8 weeks | **12 weeks** |
| **Sessions** | 4 × 30min | 8 × 45min | **12 × 60min** |
| **Check-ins** | Weekly | Bi-weekly | **Weekly** |
| **Questionnaires** | Intake | Intake + Mid | **All 3** |
| **Reading Materials** | 2 items | 3 items | **4 items** |
| **Voice Coaching** | ✅ | ✅ | **✅** |
| **Progress Reports** | Basic | Standard | **Detailed** |
| **Priority Support** | ❌ | ❌ | **✅** |
| **Voice Journaling** | ❌ | ❌ | **✅** |
| **Full Access** | ❌ | ❌ | **✅** |
| **Price** | $400 | $750 | **$1,200** |

---

## 🔐 User Roles Explained

### Client (Premium Owner)
- **Access**: All client-facing features
- **Can**:
  - Complete onboarding
  - Book and attend sessions
  - Submit check-ins
  - Read materials
  - Track progress
  - Use voice coaching
  - Complete questionnaires
- **Cannot**:
  - Access admin dashboard (future)
  - Manage other users
  - View analytics (future)

### Coach
- **Access**: Coach interface (future)
- **Can**:
  - View assigned clients
  - Manage sessions
  - Review progress
  - Send messages (future)

### Admin
- **Access**: Full system access
- **Can**:
  - Manage all users
  - Access analytics
  - Configure system
  - Override settings

---

## ✅ Verification Checklist

After setup, verify:

- [ ] User can login at `http://localhost:3000`
- [ ] Email: `m_lowegrenmac.com`
- [ ] Password: `premium2024`
- [ ] Profile shows "Premium" package
- [ ] Dashboard shows 12 sessions available
- [ ] All features are unlocked
- [ ] Check-in frequency is weekly
- [ ] 4 reading materials visible
- [ ] Voice coaching button available
- [ ] All 3 questionnaires accessible

---

## 🐛 Troubleshooting

### "User already exists"
```bash
# Update existing user instead
# The script handles this automatically
node scripts/setup-premium-owner.js
```

### "Cannot login"
1. Check email is confirmed in Supabase Auth
2. Verify password is correct: `premium2024`
3. Check RLS policies are enabled
4. Verify profile exists in `profiles` table

### "No package showing"
1. Check `clients` table has record
2. Verify `package_id` is set to `'premium'`
3. Run verification query in SQL editor

### "Features not unlocked"
1. Verify `has_full_access` is `true` in profiles
2. Check `role` is set to `'client'`
3. Confirm `package_id` is `'premium'` in clients table

---

## 📊 Database Records

### After successful setup, you should see:

**profiles table**:
```sql
id: <user-uuid>
email: m_lowegrenmac.com
name: Mac Lowegren
role: client
has_full_access: true
```

**clients table**:
```sql
user_id: <user-uuid>
name: Mac Lowegren
email: m_lowegrenmac.com
package_id: premium
current_session: 1
```

**packages table** (pre-populated):
```sql
id: premium
name: Premium
duration: 12 weeks
sessions: 12
price: $1,200
```

---

## 🎯 Next Steps After Setup

1. **Login** at `http://localhost:3000`
2. **Complete Onboarding** (will be auto-skipped if profile exists)
3. **Explore Dashboard** with all 3 tabs
4. **Start a Session** (text or voice)
5. **Test Check-In** system
6. **Mark Reading** as complete
7. **View Progress** tracker
8. **Try Voice Coaching** with ElevenLabs

---

## 📞 Quick Commands

```bash
# Setup premium owner
node scripts/setup-premium-owner.js

# Setup admin user
node scripts/setup-admin.js

# Verify database tables
node scripts/verify-tables.js

# Update password (in Supabase dashboard)
# Authentication → Users → Select user → Reset Password
```

---

**💎 Premium owner `m_lowegrenmac.com` has the biggest subscription with all features unlocked!**

