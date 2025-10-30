# YourCoachAgent - Feature Documentation

## Core Features

### 1. Landing Page
**Purpose**: First impression and information architecture  
**Components**: 
- Hero section with value proposition
- Three value props (Presence, Awareness, Action)
- Package comparison table
- ICF Core Competencies showcase
- How It Works step-by-step
- Social proof / testimonials
- Multiple CTAs for conversion

**Design Notes**:
- Mobile-first responsive layout
- Grok-inspired clean aesthetic
- Monochrome stone/gray color palette
- Smooth transitions and animations

---

### 2. Onboarding Flow
**Purpose**: Client intake and package selection  
**Steps**:
1. Welcome & Name Collection
2. Package Selection (Basic/Standard/Premium)
3. Intake Questionnaire
4. Completion Confirmation

**Components Used**:
- `OnboardingFlow` - Main orchestrator
- `PackageSelector` - Interactive package cards
- `QuestionnaireForm` - Dynamic form with progress

**Data Collected**:
- Name, email
- Selected package
- Intake questionnaire responses (5 questions)
- Readiness rating (1-10 scale)

**Progress Indicators**:
- Step counter (1 of 4, 2 of 4, etc.)
- Progress bar (25%, 50%, 75%, 100%)

---

### 3. Coaching Sessions
**Purpose**: Facilitate ICF-aligned coaching conversations  
**Session Structure** (7 Steps):
1. **Welcome & Check-in**: "How have you been?"
2. **Action Reflection**: Review previous commitment
3. **Focus**: "What would you like to focus on today?"
4. **Explore**: Deep dive with powerful questions
5. **Awareness**: "What might this mean for you?"
6. **Action Design**: Create new commitment
7. **Outro**: Schedule next check-in

**Features**:
- Conversational interface with coach/client bubbles
- Real-time response tracking
- Powerful questions suggestions
- Session progress indicator
- ICF principles reminder panel

**Components**:
- `CoachingSession` - Main session interface
- Session state management
- Conversation history

---

### 4. Check-In System
**Purpose**: Mid-week accountability and reflection  
**Format**:
- Reference to previous action commitment
- 1-5 rating scale (Challenging → Excellent)
- Free-text insight reflection

**Timing**: 
- Triggered mid-week between sessions
- Mobile-optimized prompt
- Quick 2-3 minute completion

**Data Captured**:
- Action rating (1-5)
- Insight text
- Timestamp
- Session reference

---

### 5. Reading Materials
**Purpose**: Curated learning between sessions  
**Features**:
- Package-specific reading lists
- Progress tracking (completed/total)
- Reading guides with prompts
- Estimated reading time (~3 min per item)
- Mark as complete functionality

**Content Structure**:
- Title & Description
- Page range
- Guided reading prompt
- Completion badge

**Package Differences**:
- Basic: 2 readings
- Standard: 3 readings
- Premium: 4 readings

---

### 6. Progress Tracking
**Purpose**: Visualize coaching journey and growth  
**Metrics Tracked**:
- Sessions completed / total
- Current session number
- Visual session grid (4×3 for 12 sessions)
- Recent actions list
- Check-in insights history
- Ratings visualization

**Visual Elements**:
- Progress bar with percentage
- Color-coded session status:
  - Completed: Dark stone
  - In Progress: Medium stone
  - Scheduled: Light stone
- Recent actions cards
- Check-in ratings (5-dot display)

---

### 7. Dashboard
**Purpose**: Central hub for client experience  
**Sections**:

**Quick Actions (2×2 Grid)**:
- Start Session
- Check-In
- (Future: Reading, Profile)

**Tabbed Interface**:
1. **Progress Tab**:
   - Session progress
   - Recent actions
   - Check-in insights
   
2. **Reading Tab**:
   - Reading materials list
   - Completion progress
   - Completion celebration

3. **Insights Tab**:
   - Session insights archive
   - Searchable learnings
   - Growth timeline

---

## ICF Core Competencies Integration

### How Each Competency is Implemented:

1. **Demonstrates Ethical Practice**
   - Clear agreements during onboarding
   - Consent-based data collection
   - Transparent process

2. **Embodies a Coaching Mindset**
   - Questions not advice
   - Client-centered focus
   - Curiosity over judgment

3. **Establishes and Maintains Agreements**
   - Package selection process
   - Session structure explanation
   - Clear expectations set

4. **Cultivates Trust and Safety**
   - Warm, grounded tone
   - Confidential reflections
   - Non-judgmental space

5. **Maintains Presence**
   - "Thanks for being here" language
   - Pause prompts ("Take a breath")
   - Present-focused questions

6. **Listens Actively**
   - Reflection prompts
   - Building on client responses
   - Acknowledging insights

7. **Evokes Awareness**
   - Powerful questions library
   - "What might this mean?" prompts
   - Insight capture system

8. **Facilitates Client Growth**
   - Action design process
   - Progress tracking
   - Accountability system

---

## Session Flow Template

```
STEP 1: WELCOME
→ "Thanks for being here, [Name]"
→ Check-in question

STEP 2: ACTION REFLECTION
→ Review previous commitment
→ "What happened? What did you notice?"

STEP 3: FOCUS
→ "What would you like to focus on today?"
→ Client sets agenda

STEP 4: EXPLORE
→ Powerful questions
→ Deep dive exploration
→ Suggestion: Random powerful question

STEP 5: AWARENESS
→ "Take a breath…"
→ "What might this mean for you?"

STEP 6: ACTION DESIGN
→ "What step feels most alive?"
→ "When will you do it?"
→ "How will you know you've done it?"

STEP 7: OUTRO
→ Acknowledge progress
→ Set next check-in
→ Close with warmth
```

---

## Powerful Questions Library

Pre-loaded questions for coaches to reference:
- What matters most to you about this?
- What would become possible if you moved forward?
- What's holding you back?
- What would you do if you knew you couldn't fail?
- What does your intuition tell you?
- What's the smallest step you could take?
- What would support look like?
- What are you not saying?
- What do you need to let go of?
- What will you do? By when?

---

## Questionnaire System

### Intake Questionnaire (5 Questions)
1. What brings you to coaching? (text)
2. What would you like different? (text)
3. Readiness to act (1-10 scale)
4. Support needed (multiple choice)
5. Success definition (text)

### Mid-Point Questionnaire (5 Questions)
1. What has shifted? (text)
2. Most valuable insights (text)
3. Progress satisfaction (1-10 scale)
4. Focus for remaining sessions (text)
5. Challenges faced (text)

### Exit Questionnaire (5 Questions)
1. What are you proud of? (text)
2. Key insights to carry forward (text)
3. Confidence in sustaining (1-10 scale)
4. Systems/practices for ongoing growth (text)
5. Advice for future clients (text)

---

## Design System

### Color Palette (Monochrome)
- **Primary**: Stone-900 / Stone-100 (dark mode)
- **Backgrounds**: Stone-50, Stone-100
- **Borders**: Stone-200, Stone-300
- **Text**: Stone-600 (muted), Stone-900 (primary)
- **Accents**: Stone-700, Stone-800

### Typography
- **Headings**: Geist Sans, Bold, Tight tracking
- **Body**: Geist Sans, Regular
- **Code/Mono**: Geist Mono

### Spacing
- Mobile container: max-w-2xl, px-4
- Vertical rhythm: space-y-6 for major sections
- Component padding: p-4 to p-6

### Components
- **Cards**: Rounded-lg, subtle border
- **Buttons**: Rounded-lg, bold text
- **Inputs**: Rounded-lg, text-base for mobile
- **Badges**: Small, monochrome

---

## Mobile-First Principles

1. **Touch Targets**: Minimum 44×44px
2. **Font Sizes**: Base 16px, never smaller than 14px
3. **Input Fields**: text-base (16px) to prevent zoom
4. **Navigation**: Fixed bottom navigation
5. **Scrolling**: Long-form content in ScrollArea
6. **Loading**: Minimal, fast transitions
7. **Offline**: Graceful degradation (future)

---

## Future Enhancements Roadmap

### Phase 1: Core Backend
- [ ] User authentication (email/password)
- [ ] Database persistence (Supabase/Firebase)
- [ ] Session data saving
- [ ] User profile management

### Phase 2: Enhanced Features
- [ ] Calendar integration
- [ ] Email/SMS reminders
- [ ] Voice recording for sessions
- [ ] Export session notes
- [ ] Goal tracking system

### Phase 3: Coach Features
- [ ] Coach admin dashboard
- [ ] Multi-client management
- [ ] Session scheduling
- [ ] Payment processing
- [ ] Analytics & reporting

### Phase 4: Advanced
- [ ] AI-assisted coaching suggestions
- [ ] Video session support
- [ ] Mobile native apps (iOS/Android)
- [ ] Collaborative goal boards
- [ ] Community features

---

## Technical Architecture

**Frontend**: Next.js 16 App Router  
**Styling**: Tailwind CSS v4  
**Components**: shadcn/ui  
**Type Safety**: TypeScript  
**State**: React useState/Context  
**Forms**: Controlled components  
**Routing**: File-based (Next.js)

**Future Backend**:
- Supabase for database & auth
- Edge functions for API
- Storage for voice/files
- Real-time subscriptions

---

## Testing Strategy

### Manual Testing Checklist
- [ ] Complete onboarding flow
- [ ] Start and complete a session
- [ ] Submit a check-in
- [ ] Mark reading as complete
- [ ] Navigate all tabs
- [ ] Test mobile responsiveness
- [ ] Verify dark mode
- [ ] Test back/forward navigation

### Automated Testing (Future)
- Unit tests for utilities
- Component tests with React Testing Library
- E2E tests with Playwright
- Accessibility tests with axe-core

---

## Performance Metrics

**Target Metrics**:
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Lighthouse Score: 90+

**Current Optimizations**:
- Next.js automatic code splitting
- Optimized fonts (Geist)
- Minimal JavaScript
- Tailwind CSS purging
- Static components where possible

