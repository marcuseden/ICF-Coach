# YourCoachAgent - Application Flow

Visual guide to the app's user journey and navigation structure.

---

## 🗺️ Main Navigation Flow

```
┌─────────────┐
│   Landing   │ ← Entry point
│    Page     │
└──────┬──────┘
       │ Click "Begin Your Journey"
       ↓
┌─────────────────────────────────────────┐
│         ONBOARDING FLOW (4 Steps)       │
├─────────────────────────────────────────┤
│                                         │
│  Step 1: Welcome & Name Collection     │
│  ┌─────────────────────────────────┐  │
│  │ • Enter name                    │  │
│  │ • Enter email                   │  │
│  │ • "Begin Your Journey" button   │  │
│  └─────────────┬───────────────────┘  │
│                ↓                       │
│  Step 2: Package Selection             │
│  ┌─────────────────────────────────┐  │
│  │ [ ] Basic - $400                │  │
│  │ [✓] Standard - $750 (Popular)   │  │
│  │ [ ] Premium - $1,200            │  │
│  │ "Continue" button               │  │
│  └─────────────┬───────────────────┘  │
│                ↓                       │
│  Step 3: Intake Questionnaire          │
│  ┌─────────────────────────────────┐  │
│  │ Q1: What brings you to coaching?│  │
│  │ Q2: What would you like diff?   │  │
│  │ Q3: Readiness scale (1-10)      │  │
│  │ Q4: Support needed (multiple)   │  │
│  │ Q5: Success definition          │  │
│  │ Progress: 3/5 → 4/5 → 5/5       │  │
│  └─────────────┬───────────────────┘  │
│                ↓                       │
│  Step 4: Confirmation                  │
│  ┌─────────────────────────────────┐  │
│  │ ✓ You're All Set!               │  │
│  │ • Package summary               │  │
│  │ • What happens next             │  │
│  │ "Go to Dashboard" button        │  │
│  └─────────────┬───────────────────┘  │
└────────────────┼───────────────────────┘
                 ↓
       ┌─────────────────┐
       │   DASHBOARD     │ ← Main Hub
       │   (3 Tabs)      │
       └────────┬────────┘
                │
       ┌────────┴────────┬───────────────┬──────────────┐
       ↓                 ↓               ↓              ↓
┌──────────────┐  ┌──────────────┐ ┌─────────┐  ┌──────────┐
│ Start Session│  │   Check-In   │ │Progress │  │ Reading  │
│   Button     │  │    Button    │ │   Tab   │  │   Tab    │
└──────┬───────┘  └──────┬───────┘ └────┬────┘  └────┬─────┘
       │                 │               │            │
       ↓                 ↓               └─> Session  └─> Material
  [Session Flow]   [Check-In Flow]          Grid        List
```

---

## 🎯 Session Flow (7 Steps)

```
COACHING SESSION INTERFACE
════════════════════════════════════════

Step 1: Welcome
┌────────────────────────────────────┐
│ Coach: "Thanks for being here,     │
│         How have you been?"        │
├────────────────────────────────────┤
│ [Your response...]                 │
│                                    │
│        [Continue →]                │
└────────────────────────────────────┘
        ↓

Step 2: Action Reflection
┌────────────────────────────────────┐
│ Coach: "You committed to:          │
│         [Previous Action]          │
│         What happened?"            │
├────────────────────────────────────┤
│ [Your reflection...]               │
│        [Continue →]                │
└────────────────────────────────────┘
        ↓

Step 3: Focus
┌────────────────────────────────────┐
│ Coach: "What would you like to     │
│         focus on today?"           │
├────────────────────────────────────┤
│ [Today's focus...]                 │
│        [Continue →]                │
└────────────────────────────────────┘
        ↓

Step 4: Explore
┌────────────────────────────────────┐
│ Coach: "Tell me more about that... │
│         What makes this important?"│
├────────────────────────────────────┤
│ 💡 Consider: "What's holding you   │
│    back?"                          │
├────────────────────────────────────┤
│ [Your exploration...]              │
│        [Continue →]                │
└────────────────────────────────────┘
        ↓

Step 5: Awareness
┌────────────────────────────────────┐
│ Coach: "Take a breath...           │
│         What might this mean?"     │
├────────────────────────────────────┤
│ [Your insight...]                  │
│        [Continue →]                │
└────────────────────────────────────┘
        ↓

Step 6: Action Design
┌────────────────────────────────────┐
│ Coach: "What step feels most alive?│
│         When will you do it?"      │
├────────────────────────────────────┤
│ [Your commitment...]               │
│        [Continue →]                │
└────────────────────────────────────┘
        ↓

Step 7: Outro
┌────────────────────────────────────┐
│ Coach: "Wonderful. I'll check in   │
│         mid-week. Great work!"     │
├────────────────────────────────────┤
│     [Complete Session ✓]           │
└────────────────────────────────────┘
        ↓
    Dashboard (Updated with new session data)
```

---

## 📋 Check-In Flow

```
CHECK-IN PROMPT
════════════════════════════════════════

┌──────────────────────────────────────┐
│   Mid-Week Check-In                  │
├──────────────────────────────────────┤
│ Your commitment:                     │
│ "[Previous Action from Session]"     │
├──────────────────────────────────────┤
│ How did it go?                       │
│                                      │
│ ●━━━━━━━━━○━━━━━━━━━━●              │
│ 1     Good (3/5)            5        │
├──────────────────────────────────────┤
│ Share one insight:                   │
│ ┌──────────────────────────────────┐ │
│ │ [Type your insight here...]      │ │
│ │                                  │ │
│ └──────────────────────────────────┘ │
├──────────────────────────────────────┤
│        [Submit Check-In]             │
└──────────────────────────────────────┘
        ↓
    Dashboard (Updated with check-in data)
```

---

## 📚 Dashboard Tab Structure

```
DASHBOARD
════════════════════════════════════════

┌────────────────────────────────────────┐
│  Welcome Back, [Name]                  │
│  Ready to continue your journey?       │
└────────────────────────────────────────┘

Quick Actions (2×2 Grid)
┌──────────────────┬──────────────────┐
│   💬 Sessions    │   🎯 Check-In    │
│  Start Session   │  Mid-week review │
└──────────────────┴──────────────────┘

Tabs: [Progress] [Reading] [Insights]
════════════════════════════════════════

─── PROGRESS TAB ───
┌────────────────────────────────────────┐
│ Your Journey                           │
│ Standard Package • 8 weeks             │
│ ■■■■□□□□ 4/8 sessions                 │
├────────────────────────────────────────┤
│ Sessions Grid:                         │
│ ┌──┬──┬──┬──┐                         │
│ │✓ │✓ │✓ │✓ │ Completed              │
│ ├──┼──┼──┼──┤                         │
│ │○ │○ │○ │○ │ Pending                │
│ └──┴──┴──┴──┘                         │
├────────────────────────────────────────┤
│ Recent Actions:                        │
│ • Session 4: [Action committed]        │
│ • Session 3: [Action committed]        │
├────────────────────────────────────────┤
│ Check-In Insights:                     │
│ • [Date] ●●●●○ "Insight text..."       │
│ • [Date] ●●●●● "Insight text..."       │
└────────────────────────────────────────┘

─── READING TAB ───
┌────────────────────────────────────────┐
│ Reading Materials                      │
│ ■■■□ 2/3 completed                    │
├────────────────────────────────────────┤
│ ┌────────────────────────────────────┐ │
│ │ 📖 Deep Dive: Self-Awareness    ✓  │ │
│ │ Exploring values and patterns      │ │
│ │ Pages 1-40 • ~3 min read          │ │
│ └────────────────────────────────────┘ │
│ ┌────────────────────────────────────┐ │
│ │ 📖 Creating Sustainable Change  ✓  │ │
│ │ Behavior change and habits         │ │
│ │ Pages 41-75 • ~3 min read         │ │
│ └────────────────────────────────────┘ │
│ ┌────────────────────────────────────┐ │
│ │ 📖 Overcoming Obstacles            │ │
│ │ Working through resistance         │ │
│ │ [Mark as Complete]                │ │
│ └────────────────────────────────────┘ │
└────────────────────────────────────────┘

─── INSIGHTS TAB ───
┌────────────────────────────────────────┐
│ Your Insights                          │
│ Reflections from your journey          │
├────────────────────────────────────────┤
│ Session 4 • Oct 30, 2025              │
│ "[Insight text from session...]"       │
├────────────────────────────────────────┤
│ Session 3 • Oct 23, 2025              │
│ "[Insight text from session...]"       │
├────────────────────────────────────────┤
│ Session 2 • Oct 16, 2025              │
│ "[Insight text from session...]"       │
└────────────────────────────────────────┘
```

---

## 🎨 Component Hierarchy

```
App (page.tsx)
│
├─ Landing Page
│  ├─ Hero Section
│  ├─ Value Props (3 cards)
│  ├─ Package Comparison Table
│  ├─ ICF Principles Grid
│  ├─ How It Works (5 steps)
│  └─ Testimonial
│
├─ Onboarding Flow
│  ├─ Step 1: Welcome Form
│  ├─ Step 2: Package Selector
│  │  └─ Package Cards (3)
│  ├─ Step 3: Questionnaire Form
│  │  └─ Question Components
│  └─ Step 4: Confirmation
│
├─ Dashboard (Mobile Layout)
│  ├─ Header
│  │  ├─ Title
│  │  └─ Avatar
│  ├─ Quick Actions Grid
│  │  ├─ Session Button
│  │  └─ Check-In Button
│  ├─ Tabs
│  │  ├─ Progress Tab
│  │  │  └─ Progress Tracker
│  │  │     ├─ Session Grid
│  │  │     ├─ Recent Actions
│  │  │     └─ Check-Ins
│  │  ├─ Reading Tab
│  │  │  └─ Reading List
│  │  │     └─ Material Cards
│  │  └─ Insights Tab
│  │     └─ Insights List
│  └─ Bottom Navigation
│
├─ Coaching Session
│  ├─ Progress Indicator
│  ├─ Conversation History
│  │  ├─ Coach Bubble
│  │  └─ Client Bubble
│  ├─ Current Prompt
│  ├─ Response Input
│  └─ ICF Principles Panel
│
└─ Check-In Prompt
   ├─ Action Reference
   ├─ Rating Slider
   ├─ Insight Input
   └─ Submit Button
```

---

## 🔄 State Management

```
Client State
└─ view: 'landing' | 'onboarding' | 'dashboard' | 'session' | 'checkin'
└─ client: Client | null
   ├─ name: string
   ├─ email: string
   ├─ package: 'basic' | 'standard' | 'premium'
   ├─ currentSession: number
   ├─ sessions: Session[]
   │  ├─ sessionNumber
   │  ├─ focus
   │  ├─ insights
   │  ├─ commitedAction
   │  └─ status
   ├─ checkIns: CheckIn[]
   │  ├─ actionRating (1-5)
   │  ├─ insight
   │  └─ date
   └─ questionnaires: QuestionnaireResponse[]
└─ completedReadings: string[]
```

---

## 📱 Mobile Layout Structure

```
┌────────────────────────────────┐
│  ┌──────────────────────────┐  │ ← Sticky Header
│  │ ☰  YourCoachAgent    👤  │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │                          │  │
│  │   MAIN CONTENT AREA      │  │ ← Scrollable
│  │   (Dashboard, Session,   │  │
│  │    Check-In, etc.)       │  │
│  │                          │  │
│  │                          │  │
│  │                          │  │
│  │                          │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │ ← Fixed Bottom Nav
│  │ 💬    📋    📖    👤     │  │
│  │ Sess  Act   Read  Prof   │  │
│  └──────────────────────────┘  │
└────────────────────────────────┘

Max Width: 672px (2xl)
Padding: 16px (px-4)
```

---

## 🎯 User Journeys

### Journey 1: New Client Complete Flow
```
Landing → Onboarding → Dashboard → Session → Check-In → Dashboard
   2min      3min        1min       15min      2min       ongoing
```

### Journey 2: Returning Client
```
Dashboard → Session → Complete → Dashboard
   start      15min    record      updated
```

### Journey 3: Mid-Week Check-In
```
Dashboard → Check-In → Submit → Dashboard
   start      2min      save      updated
```

### Journey 4: Reading Material
```
Dashboard → Reading Tab → Mark Complete → View Progress
   start      browse       action          updated
```

---

## 💾 Data Flow (Future Backend)

```
Frontend (React State)
        ↕
   API Routes (Next.js)
        ↕
   Database (Supabase)
        ↕
   Storage (S3/Supabase Storage)

Current: All state in memory (frontend only)
Future: Persist to database on actions
```

---

## 🔐 Authentication Flow (Future)

```
Landing Page
     ↓
Sign Up / Sign In
     ↓
Email Verification
     ↓
Package Selection (if new)
     ↓
Dashboard (authenticated)
     ↓
All features accessible
```

---

## 📊 Analytics Events (Future)

```
• landing_page_view
• get_started_click
• package_selected: {package_type}
• onboarding_completed
• session_started: {session_number}
• session_completed: {session_number, duration}
• checkin_submitted: {rating}
• reading_completed: {material_id}
• dashboard_tab_changed: {tab_name}
```

---

**Visual guide complete!** Use this as reference for understanding the app's structure and flow.

