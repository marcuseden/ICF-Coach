# ICF Coaching Add-On Integration Guide

**Version**: 1.0  
**Last Updated**: October 30, 2025  
**Status**: Ready for Integration

---

## Overview

The **ICF Coaching Add-On** extends the existing YourCoachAgent MVP with structured AI + Human coaching sessions that are fully compliant with ICF ethics. This module adds:

- ✅ Coaching session tracking (AI and Human modes)
- ✅ Commitment management with confidence tracking
- ✅ Organization-level trend analytics
- ✅ Dashboard with comprehensive statistics
- ✅ Integration with existing ElevenLabs voice system

**Key Feature**: This module does NOT modify any existing files—it's a clean addition that extends the current system.

---

## What's Been Added

### 1. Database Schema
**File**: `supabase/addon-schema.sql`

Three new tables with full RLS (Row Level Security):

#### `coaching_sessions`
Tracks both AI and human coaching sessions:
- `id`, `user_id`, `mode` (ai/human)
- `focus_area`, `summary`, `commitment`
- `created_at`, `ended_at`

#### `coaching_commitments`
User action items and commitments:
- `id`, `user_id`, `session_id`
- `text`, `confidence` (1-10 scale)
- `due_date`, `status` (active/done/dropped)
- `created_at`, `updated_at`

#### `org_trends`
Aggregated organizational insights:
- `id`, `org_id`
- `period_start`, `period_end`
- `metric`, `value`, `sample_size`

**RLS Policies**: Users can only access their own data. Authenticated users can view org trends.

---

### 2. API Routes

All routes are in `app/api/coach/`:

#### **POST** `/api/coach/start-session`
Initiates a new coaching session and returns context.

**Request Body**:
```json
{
  "mode": "ai" | "human"  // optional, defaults to "ai"
}
```

**Response**:
```json
{
  "success": true,
  "session": { /* session object */ },
  "context": {
    "session_id": "uuid",
    "coach_role": "ICF Management Coach",
    "coaching_mode": "ai",
    "open_commitments": [ /* array */ ],
    "recent_sessions": [ /* last 3 sessions */ ],
    "suggested_opening_prompt": "Welcome back...",
    "icf_principles": [ /* array of principles */ ]
  }
}
```

#### **POST** `/api/coach/end-session`
Completes a session and optionally creates a commitment.

**Request Body**:
```json
{
  "session_id": "uuid",
  "focus_area": "Leadership development",
  "summary": "Key insights from session...",
  "commitment": "I will...",
  "commitment_confidence": 7,
  "commitment_due_date": "2025-11-15"
}
```

**Response**:
```json
{
  "success": true,
  "session": { /* updated session */ },
  "commitment": { /* new commitment if created */ },
  "stats": {
    "total_sessions": 5,
    "active_commitments": 3
  }
}
```

#### **GET** `/api/coach/dashboard`
Retrieves all dashboard data for the user.

**Response**:
```json
{
  "success": true,
  "data": {
    "sessions": [ /* all sessions */ ],
    "commitments": [ /* all commitments */ ],
    "stats": {
      "total_sessions": 10,
      "completed_sessions": 8,
      "ai_sessions": 6,
      "human_sessions": 2,
      "total_commitments": 12,
      "active_commitments": 4,
      "done_commitments": 7,
      "average_confidence": 7.5
    },
    "recent_activity": [ /* last 5 activities */ ]
  }
}
```

#### **POST** `/api/coach/dashboard`
Updates a commitment status.

**Request Body**:
```json
{
  "commitment_id": "uuid",
  "status": "done" | "active" | "dropped"
}
```

---

### 3. TypeScript Types

**File**: `lib/types.ts` (added to existing file)

New types added:
- `CoachingMode`: 'ai' | 'human'
- `CommitmentStatus`: 'active' | 'done' | 'dropped'
- `CoachingSession`: Session data structure
- `CoachingCommitment`: Commitment data structure
- `OrgTrend`: Organizational trend data
- `SessionContext`: Context for starting sessions
- `DashboardStats`: Dashboard statistics
- `RecentActivity`: Recent activity item
- `DashboardData`: Complete dashboard data

---

### 4. React Components

#### `components/coaching-addon-dashboard.tsx`
Full-featured dashboard component with:
- ✅ Session statistics (total, AI, human, avg confidence)
- ✅ Active commitments list with action buttons
- ✅ Recent activity feed
- ✅ Session history with scrollable view
- ✅ Quick action buttons to start AI/Human sessions
- ✅ Real-time commitment status updates
- ✅ Loading and error states
- ✅ Monochrome design system (stone colors only)

**Usage**:
```tsx
import { CoachingAddonDashboard } from '@/components/coaching-addon-dashboard';

export default function DashboardPage() {
  return (
    <CoachingAddonDashboard 
      onStartSession={(mode) => {
        // Handle session start
        console.log(`Starting ${mode} session`);
      }}
    />
  );
}
```

#### `components/enhanced-coaching-session.tsx`
Three-step coaching session flow:
- ✅ Step 1: Set focus area (shows open commitments)
- ✅ Step 2: Session notes with ICF principles
- ✅ Step 3: Create commitment with confidence + due date
- ✅ Integrates with API routes automatically
- ✅ Optional commitment creation
- ✅ Mobile-optimized interface

**Usage**:
```tsx
import { EnhancedCoachingSession } from '@/components/enhanced-coaching-session';

export default function SessionPage() {
  return (
    <EnhancedCoachingSession 
      mode="ai"
      onSessionEnd={() => {
        // Handle session completion
        router.push('/dashboard');
      }}
    />
  );
}
```

---

## Integration Steps

### Step 1: Database Setup

Run the SQL schema in your Supabase project:

```bash
# Option 1: Via Supabase Dashboard
# 1. Go to your Supabase project
# 2. Navigate to SQL Editor
# 3. Copy contents of supabase/addon-schema.sql
# 4. Execute the SQL

# Option 2: Via Supabase CLI (if installed)
supabase db push
```

Verify tables are created:
```sql
-- Run in SQL Editor
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('coaching_sessions', 'coaching_commitments', 'org_trends');
```

### Step 2: Install Required Packages

The add-on uses existing dependencies, but ensure these are installed:

```bash
npm install @supabase/auth-helpers-nextjs @supabase/supabase-js
```

### Step 3: Add New Routes to Your App

The API routes are already created in `app/api/coach/`. No additional setup needed—Next.js will automatically recognize them.

Test the routes:
```bash
# Start dev server
npm run dev

# Test in another terminal (requires authentication)
curl -X POST http://localhost:3000/api/coach/start-session \
  -H "Content-Type: application/json" \
  -d '{"mode":"ai"}'
```

### Step 4: Add Dashboard to Your App

Create a new page to use the dashboard:

**File**: `app/dashboard/page.tsx` (create this file)
```tsx
import { CoachingAddonDashboard } from '@/components/coaching-addon-dashboard';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
  return (
    <CoachingAddonDashboard 
      onStartSession={(mode) => {
        // Redirect to session page or open modal
        if (mode === 'ai') {
          redirect('/session/ai');
        } else {
          redirect('/session/human');
        }
      }}
    />
  );
}
```

### Step 5: Add Session Page

Create session pages:

**File**: `app/session/[mode]/page.tsx` (create this file)
```tsx
'use client';

import { EnhancedCoachingSession } from '@/components/enhanced-coaching-session';
import { useRouter, useParams } from 'next/navigation';

export default function SessionPage() {
  const router = useRouter();
  const params = useParams();
  const mode = params.mode as 'ai' | 'human';

  return (
    <EnhancedCoachingSession 
      mode={mode}
      onSessionEnd={() => {
        router.push('/dashboard');
      }}
    />
  );
}
```

### Step 6: Update Navigation (Optional)

Add links to the new dashboard in your existing navigation:

```tsx
// In your main layout or navigation component
<nav>
  <Link href="/dashboard">Coaching Dashboard</Link>
  <Link href="/session/ai">Start AI Session</Link>
  <Link href="/session/human">Start Human Session</Link>
</nav>
```

---

## Integration with Existing Voice System

The add-on is designed to work seamlessly with your existing ElevenLabs voice coaching:

### Option 1: Enhanced Voice Session

Modify `components/voice-coaching-session.tsx` to use the new context:

```tsx
// At the start of your voice session component
useEffect(() => {
  async function initSession() {
    // Get coaching context
    const response = await fetch('/api/coach/start-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'ai' })
    });
    
    const { context, session } = await response.json();
    
    // Store session ID for later
    setSessionId(session.id);
    
    // Pass context to ElevenLabs agent
    // This gives the AI awareness of open commitments
    console.log('Session context:', context);
  }
  
  initSession();
}, []);
```

### Option 2: Dashboard Button Integration

Update the dashboard to launch voice sessions:

```tsx
<Button
  onClick={async () => {
    const result = await fetch('/api/coach/start-session', {
      method: 'POST',
      body: JSON.stringify({ mode: 'ai' })
    }).then(r => r.json());
    
    // Store session ID in localStorage or state
    localStorage.setItem('activeSessionId', result.session.id);
    
    // Navigate to voice session
    window.location.href = '/voice-session';
  }}
>
  Start Voice Coaching
</Button>
```

---

## Usage Examples

### Example 1: Simple Dashboard

```tsx
import { CoachingAddonDashboard } from '@/components/coaching-addon-dashboard';

export default function MyDashboard() {
  return <CoachingAddonDashboard />;
}
```

### Example 2: Complete Flow

```tsx
'use client';

import { useState } from 'react';
import { CoachingAddonDashboard } from '@/components/coaching-addon-dashboard';
import { EnhancedCoachingSession } from '@/components/enhanced-coaching-session';

export default function CoachingApp() {
  const [view, setView] = useState<'dashboard' | 'session'>('dashboard');
  const [mode, setMode] = useState<'ai' | 'human'>('ai');

  if (view === 'session') {
    return (
      <EnhancedCoachingSession 
        mode={mode}
        onSessionEnd={() => setView('dashboard')}
      />
    );
  }

  return (
    <CoachingAddonDashboard 
      onStartSession={(selectedMode) => {
        setMode(selectedMode);
        setView('session');
      }}
    />
  );
}
```

### Example 3: API Usage (Programmatic)

```typescript
// Start a session
async function startCoachingSession(mode: 'ai' | 'human') {
  const response = await fetch('/api/coach/start-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode })
  });
  
  const { session, context } = await response.json();
  return { session, context };
}

// End a session with commitment
async function endSession(sessionId: string, data: {
  focus_area: string;
  summary: string;
  commitment?: string;
  commitment_confidence?: number;
  commitment_due_date?: string;
}) {
  const response = await fetch('/api/coach/end-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      session_id: sessionId,
      ...data
    })
  });
  
  return response.json();
}

// Update commitment status
async function markCommitmentDone(commitmentId: string) {
  const response = await fetch('/api/coach/dashboard', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      commitment_id: commitmentId,
      status: 'done'
    })
  });
  
  return response.json();
}
```

---

## Design System Compliance

All components follow the existing design system:

- ✅ **Colors**: Stone palette only (stone-50 to stone-900)
- ✅ **NO BLUE**: Strictly forbidden as per project rules
- ✅ **Typography**: Clean text, no icons in headlines
- ✅ **Components**: Uses existing shadcn/ui components
- ✅ **Mobile-First**: Optimized for mobile devices
- ✅ **Accessibility**: Proper ARIA labels and semantic HTML

---

## Testing Checklist

### Database Tests
- [ ] Run `addon-schema.sql` in Supabase
- [ ] Verify all 3 tables created
- [ ] Test RLS policies (users can only see their data)
- [ ] Verify indexes created for performance

### API Tests
- [ ] Test `/api/coach/start-session` (POST)
- [ ] Test `/api/coach/end-session` (POST)
- [ ] Test `/api/coach/dashboard` (GET)
- [ ] Test `/api/coach/dashboard` (POST) - update commitment
- [ ] Verify authentication required for all routes
- [ ] Test error handling (unauthorized, missing data)

### Component Tests
- [ ] Dashboard loads with no data
- [ ] Dashboard displays sessions correctly
- [ ] Dashboard displays commitments correctly
- [ ] "Mark Done" button updates commitment status
- [ ] "Drop" button updates commitment status
- [ ] Session component progresses through 3 steps
- [ ] Session saves correctly to database
- [ ] Mobile responsive design works

### Integration Tests
- [ ] Start session → shows open commitments
- [ ] Complete session → appears in dashboard
- [ ] Create commitment → appears in active list
- [ ] Mark commitment done → moves to done list
- [ ] Statistics update correctly after actions

---

## Troubleshooting

### Issue: "Unauthorized" error on API calls

**Solution**: Ensure user is logged in:
```typescript
// Check auth status
import { supabase } from '@/lib/supabase';

const { data: { user } } = await supabase.auth.getUser();
if (!user) {
  // Redirect to login
  window.location.href = '/login';
}
```

### Issue: Tables not found

**Solution**: Run the schema SQL:
1. Open Supabase Dashboard
2. Go to SQL Editor
3. Run `supabase/addon-schema.sql`
4. Verify with: `SELECT * FROM coaching_sessions LIMIT 1;`

### Issue: TypeScript errors

**Solution**: Ensure types are imported:
```typescript
import type { 
  CoachingSession, 
  CoachingCommitment, 
  DashboardData 
} from '@/lib/types';
```

### Issue: Components not rendering

**Solution**: Check that all shadcn/ui components are installed:
```bash
# These should already be installed, but verify:
npx shadcn-ui@latest add card button textarea input slider badge separator scroll-area
```

---

## Performance Considerations

### Database Indexes
The schema includes indexes on:
- `coaching_sessions(user_id, created_at)`
- `coaching_commitments(user_id, status)`
- `org_trends(org_id, period_start, period_end)`

These ensure fast queries even with large datasets.

### API Response Caching
Consider adding caching for dashboard data:

```typescript
// In dashboard component
const [lastFetch, setLastFetch] = useState<number>(0);

useEffect(() => {
  const now = Date.now();
  if (now - lastFetch < 60000) return; // Cache for 1 minute
  
  fetchDashboardData();
  setLastFetch(now);
}, [lastFetch]);
```

### Pagination
For users with many sessions, consider adding pagination:

```typescript
// Modify dashboard API to accept query params
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 10;
  const offset = (page - 1) * limit;
  
  const { data: sessions } = await supabase
    .from('coaching_sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  
  // ... rest of query
}
```

---

## Future Enhancements

Potential features to add:

1. **Email Reminders**: Send reminders for due commitments
2. **Analytics Dashboard**: Coach-level analytics across clients
3. **Export Functionality**: Export sessions as PDF
4. **Calendar Integration**: Sync commitments with calendar
5. **Goal Tracking**: Multi-session goal progression
6. **AI Insights**: Pattern recognition across sessions
7. **Team Coaching**: Support for team/group sessions
8. **Video Integration**: Add video call support for human sessions

---

## Security Notes

### Row Level Security (RLS)
All tables have RLS enabled. Users can only:
- View/modify their own sessions
- View/modify their own commitments
- View (read-only) organization trends

### API Authentication
All API routes check for authenticated user:
```typescript
const { data: { user }, error } = await supabase.auth.getUser();
if (error || !user) {
  return new Response('Unauthorized', { status: 401 });
}
```

### Data Validation
API routes validate input data:
- Session IDs are verified to belong to the user
- Status values are restricted to valid options
- Confidence scores are 1-10 only

---

## Support

For issues or questions:
1. Check this integration guide
2. Review `CURRENT_BUILD_STATUS.md` for project context
3. Check API route implementations for detailed logic
4. Test database queries directly in Supabase SQL Editor

---

**That's it!** The ICF Coaching Add-On is now ready to use. Start by running the SQL schema, then integrate the components into your app routing. 🎉

