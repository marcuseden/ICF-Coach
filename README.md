# YourCoachAgent - ICF Professional Coaching App

A modern, mobile-first coaching application aligned with International Coaching Federation (ICF) standards. Built with Next.js, TypeScript, shadcn/ui, and inspired by the Grok app design.

## Features

### Core Functionality
- **ICF-Aligned Coaching**: Professional coaching framework following ICF core competencies
- **Mobile-First Design**: Optimized for mobile with Grok-inspired clean interface
- **Three Coaching Packages**: Basic (4 weeks), Standard (8 weeks), Premium (12 weeks)
- **Structured Sessions**: 7-step coaching session flow with powerful questions
- **Progress Tracking**: Visual progress indicators and session history
- **Check-Ins**: Mid-week mobile check-in prompts with action ratings
- **Reading Materials**: Curated reading lists with completion tracking
- **Questionnaires**: Intake, mid-point, and exit assessments

### ICF Core Competencies Integrated
1. **Demonstrates Ethical Practice**
2. **Embodies a Coaching Mindset**
3. **Establishes and Maintains Agreements**
4. **Cultivates Trust and Safety**
5. **Maintains Presence**
6. **Listens Actively**
7. **Evokes Awareness**
8. **Facilitates Client Growth**

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Design System**: Monochrome stone/gray palette

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
icf-coach/
├── app/
│   ├── page.tsx              # Main dashboard and routing
│   └── globals.css           # Global styles with Grok-inspired design
├── components/
│   ├── mobile-layout.tsx     # Main mobile-first layout wrapper
│   ├── onboarding-flow.tsx   # Client onboarding experience
│   ├── package-selector.tsx  # Coaching package selection
│   ├── coaching-session.tsx  # Interactive coaching session
│   ├── questionnaire-form.tsx # Dynamic questionnaire forms
│   ├── check-in-prompt.tsx   # Mid-week check-in component
│   ├── reading-material.tsx  # Reading list and progress
│   ├── progress-tracker.tsx  # Session and progress visualization
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── types.ts              # TypeScript type definitions
│   ├── data.ts               # Static data (packages, questionnaires)
│   └── utils.ts              # Utility functions
└── README.md
```

## Coaching Session Flow

Each session follows this 7-step structure:

1. **Welcome & Check-in**: "How have you been since our last session?"
2. **Action Reflection**: Review commitment from previous session
3. **Focus**: "What would you like to focus on today?"
4. **Explore**: Deep dive with powerful questions
5. **Awareness**: "What might this mean for you?"
6. **Action Design**: "What step feels most alive? When will you do it?"
7. **Outro**: Schedule next check-in

## Coaching Packages

### Basic Package ($400)
- 4 weeks, 4 sessions (30 min each)
- Weekly check-ins
- Intake questionnaire
- Basic reading materials

### Standard Package ($750) - Most Popular
- 8 weeks, 8 sessions (45 min each)
- Bi-weekly check-ins
- Intake & mid-point questionnaires
- Curated reading materials
- Progress report

### Premium Package ($1,200)
- 12 weeks, 12 sessions (60 min each)
- Weekly check-ins
- Intake, mid-point & exit questionnaires
- Comprehensive reading library
- Priority support
- Detailed progress reports
- Optional voice journaling

## Design Philosophy

### Visual Design
- **Monochrome Palette**: Stone/gray colors only (stone-50 to stone-900)
- **No Blue Colors**: Exclusively beige and stone tones
- **No Icons in Headlines**: Clean typography for all headings
- **Mobile-First**: Optimized for mobile with responsive desktop support
- **Grok-Inspired**: Clean, simple, minimalist interface

### Coaching Approach
- **No Advice**: Facilitates self-discovery, doesn't provide solutions
- **Powerful Questions**: Uses open-ended questions (What, How, When)
- **Presence**: Short sentences, pauses for reflection
- **Warm & Grounded**: Calm, curious, direct tone
- **Action-Oriented**: Every session ends with clear, self-generated actions

## Development

### Build for Production

```bash
npm run build
npm start
```

### Type Checking

```bash
npx tsc --noEmit
```

### Code Quality
- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for consistent styling
- shadcn/ui for accessible components

## Future Enhancements

- [ ] Voice recording for sessions
- [ ] Backend with authentication (Supabase/Firebase)
- [ ] Email/SMS reminders for check-ins
- [ ] Calendar integration for session scheduling
- [ ] Payment processing for packages
- [ ] Coach admin dashboard
- [ ] Multi-client support
- [ ] Session recording and transcription
- [ ] Goal tracking and milestone celebrations
- [ ] Export session notes and insights

## License

MIT

## Acknowledgments

- International Coaching Federation (ICF) for coaching standards
- shadcn for the beautiful UI component library
- Grok app for design inspiration
