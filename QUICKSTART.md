# Quick Start Guide

Get YourCoachAgent running in 2 minutes.

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org))
- A code editor (VS Code recommended)
- Terminal/Command Line

## Installation

```bash
# Navigate to project directory
cd icf-coach

# Install dependencies (already done if you see node_modules/)
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## First Run Experience

When you first open the app, you'll see:

1. **Landing Page** - Overview of packages and ICF standards
2. Click **"Begin Your Journey"** to start onboarding
3. Complete the 4-step onboarding:
   - Enter your name and email
   - Select a coaching package (Basic/Standard/Premium)
   - Complete intake questionnaire (5 questions)
   - See confirmation screen

4. Access your **Dashboard** with:
   - Quick actions (Start Session, Check-In)
   - Progress tracking tab
   - Reading materials tab
   - Insights tab

## Demo Mode

Use the **"Skip to Dashboard (Demo)"** button during onboarding to quickly explore features with sample data.

## Key Features to Try

### 1. Start a Coaching Session
- Click "Start Session" from dashboard
- Follow the 7-step session flow
- Experience ICF-aligned coaching questions
- Complete with an action commitment

### 2. Submit a Check-In
- Available after completing at least one session
- Rate your action progress (1-5)
- Share an insight
- Track between-session accountability

### 3. Browse Reading Materials
- Go to "Reading" tab
- Review curated materials for your package
- Mark items as complete
- See progress visualization

### 4. Track Your Progress
- View session completion grid
- See recent actions
- Review check-in insights
- Monitor your journey

## Project Structure Overview

```
icf-coach/
├── app/
│   ├── page.tsx          # Main app with routing logic
│   ├── layout.tsx        # Root layout with metadata
│   ├── not-found.tsx     # Custom 404 page
│   └── globals.css       # Global styles
│
├── components/
│   ├── landing-page.tsx       # Marketing/info page
│   ├── mobile-layout.tsx      # Main layout wrapper
│   ├── onboarding-flow.tsx    # 4-step onboarding
│   ├── package-selector.tsx   # Package selection UI
│   ├── coaching-session.tsx   # Session interface
│   ├── questionnaire-form.tsx # Dynamic questionnaires
│   ├── check-in-prompt.tsx    # Mid-week check-ins
│   ├── reading-material.tsx   # Reading lists
│   ├── progress-tracker.tsx   # Progress visualization
│   └── ui/                    # shadcn components
│
└── lib/
    ├── types.ts          # TypeScript definitions
    ├── data.ts           # Static data (packages, questions)
    └── utils.ts          # Utility functions
```

## Customization Quick Wins

### Change Package Pricing
Edit `lib/data.ts` → `COACHING_PACKAGES` array

### Add More Questions
Edit `lib/data.ts` → `QUESTIONNAIRES` object

### Modify Session Flow
Edit `lib/data.ts` → `SESSION_FLOW_TEMPLATE`

### Adjust Colors
Edit `app/globals.css` → CSS variables in `:root` and `.dark`

### Add Reading Materials
Edit `lib/data.ts` → Add to `readingMaterials` array in packages

## Development Commands

```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Start production server locally
npm start

# Type checking
npm run type-check

# Lint code
npm run lint
```

## Testing the App

### Manual Testing Flow
1. Complete full onboarding
2. Start and complete a session
3. Submit a check-in
4. Mark a reading as complete
5. Navigate all tabs
6. Test on mobile (Chrome DevTools)
7. Toggle dark mode (system preference)

### Responsive Testing
- Desktop: 1920×1080
- Tablet: 768×1024
- Mobile: 375×667 (iPhone SE)
- Mobile: 390×844 (iPhone 14)

## Common Issues

### Port 3000 already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill

# Or use different port
npm run dev -- -p 3001
```

### Build errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
```bash
# Check types without building
npm run type-check
```

## Next Steps

1. **Read Documentation**
   - [README.md](./README.md) - Full overview
   - [FEATURES.md](./FEATURES.md) - Feature details
   - [DEPLOYMENT.md](./DEPLOYMENT.md) - Deploy guide

2. **Customize Content**
   - Update coaching packages
   - Add your own powerful questions
   - Customize reading materials

3. **Add Backend** (Future)
   - Set up Supabase project
   - Add authentication
   - Persist user data
   - Enable real sessions

4. **Deploy**
   - Push to GitHub
   - Connect to Vercel
   - Add custom domain
   - Enable analytics

## Getting Help

- **Documentation**: Check README.md and FEATURES.md
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **shadcn/ui Docs**: [ui.shadcn.com](https://ui.shadcn.com)
- **ICF Standards**: [coachingfederation.org](https://coachingfederation.org)

## What's Different from Default Next.js?

- ✅ Pre-configured with shadcn/ui components
- ✅ Complete ICF coaching system
- ✅ Mobile-first responsive design
- ✅ Dark mode support
- ✅ Monochrome design system
- ✅ TypeScript types for all data
- ✅ Session management logic
- ✅ Progress tracking system
- ✅ Questionnaire system
- ✅ Reading material tracking

## Quick Feature Tour

### Landing Page
- Package comparison table
- ICF competencies showcase
- How it works section
- Social proof

### Onboarding
- 4-step wizard with progress bar
- Package selection with feature comparison
- Dynamic questionnaire system
- Completion celebration

### Dashboard
- Quick action cards
- 3-tab navigation (Progress/Reading/Insights)
- Session grid visualization
- Check-in history

### Coaching Session
- 7-step guided flow
- Conversational interface
- Powerful questions library
- Action commitment tracking

### Check-In System
- 1-5 rating slider
- Insight capture
- Action reference
- Progress tracking

## Production Deployment Preview

```bash
# Build and preview production version locally
npm run preview

# This runs:
# 1. npm run build (creates optimized production build)
# 2. npm start (serves the production build)
```

Visit [http://localhost:3000](http://localhost:3000) to see production version.

## Environment Check

```bash
# Check Node version (should be 18+)
node --version

# Check npm version
npm --version

# Check if dependencies installed
ls node_modules | wc -l
# Should show 300+ packages
```

## Mobile Testing

### iOS Safari (Simulator)
1. Open in Chrome
2. DevTools → Toggle device toolbar
3. Select iPhone model
4. Test touch interactions

### Android Chrome
1. Same as iOS testing
2. Can also use Android Studio emulator

### Real Device Testing
1. Get your local IP: `ipconfig getifaddr en0` (Mac)
2. Start dev server: `npm run dev`
3. Visit `http://YOUR_IP:3000` on phone
4. Both devices must be on same WiFi

---

**You're all set!** 🚀

The app is running at [http://localhost:3000](http://localhost:3000)

Start exploring the ICF coaching experience.

