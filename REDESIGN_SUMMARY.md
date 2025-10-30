# ICF Coach App Redesign Summary

## Overview
Complete redesign of the logged-in app to match the clean, modern Swedish therapy app aesthetic with Apple-style design patterns.

## Key Changes

### 1. **Apple System Fonts** ✅
- Removed Google Fonts (Geist, Geist Mono)
- Implemented Apple's San Francisco font stack
- Added proper font smoothing for native iOS feel
- Font stack: `-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display"`

### 2. **Mobile-First Footer Navigation** ✅
Created new `AppFooter` component with 5 menu items:
- **Hem** (Home) - Dashboard
- **Sessioner** (Sessions) - Upcoming sessions
- **Boka** (Book) - Book new sessions (highlighted in purple)
- **Meddelanden** (Messages) - Commitments/messages
- **Meny** (Menu) - Settings

**Features:**
- Active state with purple accent color
- Clean monochrome icons
- Swedish labels
- Fixed bottom position with safe area support
- Smooth transitions

### 3. **App Header Component** ✅
Created reusable `AppHeader` component:
- Back button support
- Title and subtitle
- Clean, minimal design
- Sticky positioning
- Optional action buttons

### 4. **FaceTime-Style Video Call UI** ✅
Created new `FaceTimeCall` component:
- Full-screen coach video feed
- Small self-view in top-right corner
- Live call duration counter
- Clean control buttons (Mute, End Call, Video Toggle)
- Red circular end call button (FaceTime style)
- Gradient overlays for text readability
- Professional coach headshots

### 5. **Coach Data System** ✅
Created `lib/coach-data.ts` with:
- 4 professional coach profiles
- High-quality Unsplash portrait images
- Swedish descriptions
- Specialties and credentials
- Helper functions for coach selection

### 6. **Redesigned Pages** ✅

#### Dashboard (`/dashboard`)
- Swedish language ("Hej [Name]!")
- Clean card-based layout
- Purple accent colors
- Voice session quick action
- Upcoming sessions preview
- Progress stats (3 cards)
- Today's focus card
- Reading material card

#### Sessions Pages
- **Upcoming Sessions** - Calendar-style cards with coach info
- **Book Session** - Coach selection with specialties
- Confirmed status badges
- Date/time displays
- Video session indicators

#### Commitments (`/commitments`)
- Active commitments with progress bars
- Completed commitments section
- Purple progress indicators
- Due date tracking
- Add new commitment button

#### Reading Material (`/reading`)
- Continue reading section
- Recommended materials
- Completed section
- Progress tracking
- Category badges
- Reading time estimates
- Beautiful cover images

#### Settings (`/settings`)
- User profile card
- Organized menu sections (Konto, Support, Juridiskt)
- Clean icon-based navigation
- Logout button
- Version info

## Design System

### Colors
- **Primary Accent**: Purple (`purple-600`, `purple-50`)
- **Background**: Stone-50 (light beige)
- **Cards**: White with stone-200 borders
- **Text**: Stone-900 (headings), Stone-600/700 (body)
- **Success**: Green accents
- **Destructive**: Red-500/600

### Typography
- **Headlines**: Font-semibold, clean (no emojis)
- **Body**: Regular weight
- **System**: Apple San Francisco fonts
- **Sizes**: Base (16px), SM (14px), XS (12px)

### Components
- **Cards**: Rounded corners, subtle shadows on hover
- **Buttons**: Rounded-full for primary actions
- **Progress Bars**: 2px height, purple fill
- **Badges**: Small, rounded-full, subtle colors

### Spacing
- **Page Padding**: 4 (16px)
- **Card Spacing**: 3-4 (12-16px)
- **Bottom Padding**: 24 (96px) for footer clearance

## Mobile-First Approach
- All layouts optimized for mobile (iPhone)
- Safe area support for notch/bottom bar
- Touch-friendly button sizes
- Readable text sizes
- Proper spacing for thumbs

## Swedish Language
All user-facing text converted to Swedish:
- "Hej [Name]!" instead of "Welcome back"
- "Kommande sessioner" instead of "Upcoming sessions"
- "Boka session" instead of "Book session"
- "Åtaganden" instead of "Commitments"
- "Läsmaterial" instead of "Reading materials"

## Technical Implementation

### New Components
```
components/
├── app-footer.tsx          # Mobile navigation footer
├── app-header.tsx          # Page header with back button
└── facetime-call.tsx       # Video call UI
```

### New Library Files
```
lib/
└── coach-data.ts           # Coach profiles and data
```

### Updated Pages
```
app/(authenticated)/
├── dashboard/page.tsx                    # Main dashboard
├── sessions/
│   ├── upcoming/page.tsx                 # Sessions list
│   ├── book/page.tsx                     # Coach selection
│   └── video/[roomId]/page.tsx          # Video call
├── commitments/page.tsx                  # Goals tracking
├── reading/page.tsx                      # Learning materials
└── settings/page.tsx                     # Settings menu
```

## Image Generation

### Coach Face Shots
Script created: `scripts/generate-coach-images.js`
- Generates 4 professional coach headshots using DALL-E 3
- Portrait orientation (1024x1792)
- Natural lighting, clean backgrounds
- Apple commercial photography style
- Currently using Unsplash placeholders (DALL-E requires valid API key)

**To generate real images:**
```bash
node --env-file=.env.local scripts/generate-coach-images.js
```

## Next Steps

1. **Validate OpenAI API Key** - Update `.env.local` with valid key for image generation
2. **Generate Real Coach Images** - Run the DALL-E script
3. **Test on Physical Device** - Verify mobile experience
4. **Add More Pages** - Profile, Devices, Help sections
5. **Implement Real Data** - Connect to Supabase backend
6. **Add Animations** - Smooth transitions between views
7. **Voice Session UI** - Update voice coaching page with new design

## Design Principles Followed

✅ **No modals/dialogs** - All interactions are full-page navigations  
✅ **Mobile-first** - Designed for iPhone screen sizes  
✅ **Clean typography** - No emojis in headlines  
✅ **Monochrome icons** - No color-coded icons  
✅ **Swedish language** - All text in Swedish  
✅ **Apple aesthetics** - San Francisco fonts, clean design  
✅ **Purple accents** - Primary brand color throughout  
✅ **Card-based layout** - Clean, tappable surfaces  

## Files Modified

- `app/layout.tsx` - Removed Google fonts, added Apple font stack
- `app/globals.css` - Updated font definitions and smoothing
- All authenticated page files - Complete redesign
- Created 3 new components (AppFooter, AppHeader, FaceTimeCall)
- Created coach data system

## Result

A clean, professional, mobile-first coaching app that looks and feels like a native iOS application, matching the reference Swedish therapy app aesthetic while maintaining unique coaching-specific features.

