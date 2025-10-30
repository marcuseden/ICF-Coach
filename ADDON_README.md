# 🎯 ICF Coaching Add-On

**Structured AI + Human Coaching Sessions for YourCoachAgent**

---

## 🚀 Quick Start (3 Steps)

### 1. Run Database Schema (1 minute)
```bash
# Open Supabase Dashboard → SQL Editor
# Copy/paste: supabase/addon-schema.sql
# Click "Run"
```

### 2. Add to Your App (1 minute)
```tsx
import { CoachingAddonDashboard } from '@/components/coaching-addon-dashboard';

<TabsTrigger value="coach">Coach</TabsTrigger>
<TabsContent value="coach">
  <CoachingAddonDashboard />
</TabsContent>
```

### 3. Deploy (1 minute)
```bash
git add . && git commit -m "Add coaching add-on" && git push
```

**Done!** 🎉

---

## 📦 What You Get

### Dashboard
- Session statistics (AI, Human, Completed)
- Active commitments with confidence tracking
- Recent activity feed
- One-click session start

### Session Management
- 3-step ICF-aligned flow
- Focus area setting
- Session notes
- Commitment creation with confidence scores

### API
- Start/end session endpoints
- Dashboard data endpoint
- Commitment status updates

---

## 📚 Documentation

- **Quick Start**: `ADDON_QUICKSTART.md` (5 min read)
- **Full Guide**: `ADDON_INTEGRATION_GUIDE.md` (complete reference)
- **Summary**: `ADDON_SUMMARY.md` (implementation overview)
- **Files Created**: `.addon-files-created.md` (file list)

---

## 🏗️ Architecture

```
Components → API Routes → Supabase Database

CoachingAddonDashboard ──→ /api/coach/dashboard ──→ coaching_sessions
EnhancedCoachingSession ─→ /api/coach/start-session  coaching_commitments
                           /api/coach/end-session     org_trends
```

---

## ✅ Features

- ✅ Track AI and Human coaching sessions
- ✅ Manage commitments with confidence scores (1-10)
- ✅ View session history and statistics
- ✅ ICF-compliant session structure
- ✅ Full RLS security
- ✅ Mobile-optimized UI
- ✅ ElevenLabs integration ready
- ✅ Zero breaking changes

---

## 🎨 Design

Follows your strict design system:
- Monochrome (stone palette)
- NO BLUE colors
- Mobile-first
- Clean typography
- No icons in headlines

---

## 🔒 Security

- Row Level Security (RLS) enabled
- Users only see their own data
- Authentication required on all routes
- Input validation throughout

---

## 📊 Database Schema

```sql
coaching_sessions
  - id, user_id, mode (ai/human)
  - focus_area, summary, commitment
  - created_at, ended_at

coaching_commitments
  - id, user_id, session_id
  - text, confidence (1-10)
  - due_date, status (active/done/dropped)
  - created_at, updated_at

org_trends
  - id, org_id
  - period_start, period_end
  - metric, value, sample_size
```

---

## 🔌 ElevenLabs Integration

```tsx
// In voice-coaching-session.tsx
const context = await fetch('/api/coach/start-session', {
  method: 'POST'
}).then(r => r.json());

const systemPrompt = `
You are an ICF Management Coach.
Session context: ${JSON.stringify(context)}
`;

// Pass to ElevenLabs agent
```

---

## 🧪 Testing

```bash
# Test API
curl -X POST http://localhost:3000/api/coach/start-session

# Test components
npm run dev
# Visit /dashboard and click "Start Session"
```

---

## 📈 Stats

- **10 files created**
- **3 database tables**
- **4 API endpoints**
- **2 React components**
- **15,000+ words of documentation**
- **0 breaking changes**

---

## 💡 Example Usage

### Simple Integration
```tsx
import { CoachingAddonDashboard } from '@/components/coaching-addon-dashboard';

export default function CoachPage() {
  return <CoachingAddonDashboard />;
}
```

### With Navigation
```tsx
<CoachingAddonDashboard 
  onStartSession={(mode) => {
    router.push(`/session/${mode}`);
  }}
/>
```

### Session Page
```tsx
import { EnhancedCoachingSession } from '@/components/enhanced-coaching-session';

export default function SessionPage() {
  return (
    <EnhancedCoachingSession 
      mode="ai"
      onSessionEnd={() => router.push('/dashboard')}
    />
  );
}
```

---

## 🆘 Help

### Issue: "Unauthorized"
→ User not logged in. Check auth status.

### Issue: "Table not found"
→ Run `addon-schema.sql` in Supabase.

### Issue: TypeScript errors
→ Restart TS server or run `npm install`.

---

## 🎯 Next Steps

1. **Run SQL schema** in Supabase
2. **Add tab** to your main layout
3. **Test locally** with `npm run dev`
4. **Deploy** to Vercel

---

## 🌟 Why This Add-On?

- **ICF Compliant**: Built on certified coaching principles
- **Production Ready**: Full error handling and security
- **Well Documented**: Complete guides and examples
- **Type Safe**: Full TypeScript coverage
- **Mobile First**: Optimized for phones
- **Non-Breaking**: Doesn't modify existing code

---

## 📞 Support

See detailed docs:
- `ADDON_QUICKSTART.md` - 5-minute setup
- `ADDON_INTEGRATION_GUIDE.md` - Complete reference
- `ADDON_SUMMARY.md` - Implementation details

---

**Ready to integrate? Start with the Quick Start section above! 🚀**

*Built for YourCoachAgent with ❤️*

