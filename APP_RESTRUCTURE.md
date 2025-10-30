# 🏗️ App Restructure - Public & Authenticated Routes

**Date**: October 30, 2025  
**Status**: Complete

---

## 📋 What Changed

The app has been restructured to separate public pages from authenticated pages, with a comprehensive settings section.

---

## 🗂️ New File Structure

```
app/
├── (public)/                          ← Public pages (no auth required)
│   ├── page.tsx                       ← Landing page with packages
│   └── login/
│       └── page.tsx                   ← Login page
│
├── (authenticated)/                   ← Protected pages (auth required)
│   ├── dashboard/
│   │   └── page.tsx                   ← User dashboard
│   │
│   └── settings/
│       ├── page.tsx                   ← Settings overview
│       ├── profile/
│       │   └── page.tsx               ← Profile settings
│       ├── plan/
│       │   └── page.tsx               ← Plan & billing
│       └── devices/
│           └── page.tsx               ← Wearables & devices
│
components/
└── user-menu.tsx                      ← NEW: User icon dropdown menu
```

---

## 🌐 URL Structure

### Public Routes (No Auth Required)
- `/` - Landing page with packages
- `/login` - Login page

### Authenticated Routes (Auth Required)
- `/dashboard` - User's home dashboard
- `/settings` - Settings overview
- `/settings/profile` - Profile settings
- `/settings/plan` - Plan & billing
- `/settings/devices` - Wearables & devices
- `/voice-session` - Voice coaching (existing)
- `/sessions/book` - Book human coach (planned)

---

## 🎯 User Flow

```
1. User visits localhost:3000
   ↓
2. Sees landing page with packages
   ↓
3. Clicks "Get Started"
   ↓
4. Goes to /login
   ↓
5. Logs in
   ↓
6. Redirected to /dashboard
   ↓
7. Can access:
   - Quick actions (AI coach, book human)
   - Settings (top-right user icon)
   - Today's focus
   - Reading materials
   - Stats
```

---

## 👤 User Menu Component

New `UserMenu` component in top-right corner shows:

### Menu Items:
- ✅ Profile
- ✅ Plan & Billing
- ✅ Wearables & Devices
- ✅ Settings
- ✅ Help & Support
- ✅ Log out

### Features:
- User initials in avatar
- Dropdown menu with all options
- Clean monochrome design
- Mobile-optimized

---

## ⚙️ Settings Pages

### 1. Settings Overview (`/settings`)
Main settings hub with cards for:
- Profile
- Plan & Billing
- Wearables & Devices  
- Notifications
- Privacy & Security
- Language & Region
- Appearance

### 2. Profile Settings (`/settings/profile`)
- Profile picture upload
- Full name, email, phone
- Company and job title
- Save/cancel buttons

### 3. Plan & Billing (`/settings/plan`)
- Current plan details (Premium)
- Session progress (4/12 used)
- Renewal date
- Payment methods
- Billing history with invoices
- Download receipts

### 4. Wearables & Devices (`/settings/devices`)
- Connected devices list
  - Apple Watch
  - iPhone
  - Last sync time
  - Toggle on/off
- Add new devices
  - Fitbit, Garmin, WHOOP, Oura, Google Fit
- Data permissions
  - Heart rate, activity, sleep, mindfulness
  - Individual toggles

---

## 🎨 Design Standards

All pages follow strict design system:
- ✅ Monochrome (stone palette only)
- ✅ NO BLUE colors
- ✅ Clean typography
- ✅ Mobile-first responsive
- ✅ Consistent card layouts
- ✅ Proper spacing and hierarchy

---

## 🔧 Integration

### Add User Menu to Existing Layouts

Update `components/mobile-layout.tsx` to include UserMenu:

```tsx
import { UserMenu } from './user-menu';

// Replace the Avatar in header with:
<UserMenu 
  userName={clientName}
  userEmail={currentUser?.email}
/>
```

### Protect Routes

All routes in `(authenticated)` folder should check auth:

```tsx
useEffect(() => {
  const user = getCurrentUser();
  if (!user) {
    router.push('/login');
  }
}, [router]);
```

---

## 📦 New Components Added

### UI Components (via shadcn)
- ✅ `Switch` - Toggle switches for devices
- ✅ `Label` - Form labels
- ✅ `DropdownMenu` - User menu dropdown

### Custom Components
- ✅ `UserMenu` - User avatar with dropdown
  - Includes all settings links
  - Logout functionality
  - User initials display

---

## 🚀 Next Steps

### Immediate
1. ✅ Landing page on `/`
2. ✅ Dashboard on `/dashboard`
3. ✅ Settings section complete
4. ✅ User menu component

### To Build
1. Update old `app/page.tsx` to redirect properly
2. Create booking system for human coaches
3. Connect settings to database (currently mock data)
4. Implement actual device connections
5. Add notifications settings page
6. Add privacy & security settings
7. Add language settings
8. Add appearance/theme settings

---

## 💡 Usage Examples

### Navigate to Settings
```tsx
import { useRouter } from 'next/navigation';

const router = useRouter();
router.push('/settings/profile');
```

### Use User Menu
```tsx
import { UserMenu } from '@/components/user-menu';

<UserMenu 
  userName="John Doe"
  userEmail="john@example.com"
/>
```

### Check Auth
```tsx
import { getCurrentUser } from '@/lib/auth';

const user = getCurrentUser();
if (!user) {
  // Redirect to login
}
```

---

## 🎯 Key Features

### Dashboard (`/dashboard`)
- Welcome message
- Quick actions (AI coach, book human)
- Today's focus card
- Continue reading card
- Stats (sessions, goals, confidence)

### Settings Overview
- Clean card-based layout
- Icon for each section
- Descriptions for clarity
- Chevron indicators

### Profile Settings
- Avatar with upload
- Personal information form
- Professional information
- Save/cancel actions

### Plan & Billing
- Current plan display with badge
- Progress bar for sessions
- Payment method card
- Billing history table
- Download invoices

### Wearables & Devices
- Connected devices list
- Toggle to enable/disable
- Add new device buttons
- Data permissions with switches
- Info card explaining benefits

---

## 🔒 Authentication Flow

```
Public Routes (/)
  ↓
Login (/login)
  ↓
Auth Check
  ↓
Dashboard (/dashboard)
  ↓
Settings (/settings/*)
```

All authenticated routes check for user:
- If user exists → show content
- If no user → redirect to `/login`

---

## 📱 Mobile Optimization

All pages are mobile-first:
- Full-width on mobile
- Max-width 2xl container on desktop
- Touch-friendly buttons
- Proper spacing for fingers
- Bottom navigation (existing)

---

## ✅ Testing Checklist

- [ ] Landing page loads at `/`
- [ ] Login redirects to `/dashboard`
- [ ] Dashboard shows user data
- [ ] User menu opens and closes
- [ ] Settings pages load correctly
- [ ] Profile form saves data
- [ ] Plan page shows correct info
- [ ] Devices page toggles work
- [ ] Logout returns to landing
- [ ] Auth protection works on all routes

---

## 📝 Notes

### Old `app/page.tsx`
The original `app/page.tsx` with all the auth logic should be replaced or updated to use the new structure.

### Route Groups
- `(public)` - Pages accessible without login
- `(authenticated)` - Pages requiring authentication
- Route groups don't affect URLs (no `/public/` in URL)

### Mock Data
Settings pages currently use mock data. Connect to Supabase database:
- Profile data → `profiles` table
- Plan data → `clients` table + `packages` table
- Devices → new `wearable_devices` table (to be created)

---

## 🎉 Summary

**Created**:
- 7 new pages (landing, login, dashboard, 4 settings)
- 1 new component (UserMenu)
- 3 new UI components (switch, label, dropdown)

**Restructured**:
- Public vs. authenticated routes
- Settings section with proper hierarchy
- User profile management

**Ready for**:
- Database integration
- Device API connections
- Payment processing
- Booking system

---

**The app is now properly structured with public landing, authentication, dashboard, and complete settings section!** 🚀

