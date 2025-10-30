# 🎤 ElevenLabs Voice Integration

Your ICF Coach app now includes **real-time voice coaching** powered by your ElevenLabs Conversational AI agent!

## ✅ What's Integrated

### Your ElevenLabs Agent
- **Agent ID**: `agent_8401k8tmvpwpfak9f6c3x6g4zgzv`
- **API Key**: Configured and ready
- **Package**: `elevenlabs-js` installed

### New Features Added

1. **Voice Coaching Session Component** (`components/voice-coaching-session.tsx`)
   - Real-time voice conversation with AI coach
   - Hold-to-speak microphone control
   - Live transcription display
   - Session history tracking
   - WebSocket connection for low-latency

2. **ElevenLabs Agent Integration** (`lib/elevenlabs-agent.ts`)
   - Full WebSocket API integration
   - Audio streaming (bidirectional)
   - Session management
   - Error handling

3. **Dashboard Integration**
   - New "Voice Session" button on dashboard
   - Separate from text-based sessions
   - Both modes available to clients

## 🚀 How to Use

### For Clients:

1. **Complete Onboarding** (as usual)
2. **Go to Dashboard**
3. **Click "Voice Session"** (microphone icon)
4. **Click "Start Voice Session"**
5. **Hold button to speak**, release to send
6. **Listen to AI coach** respond with voice
7. **End session** when complete

### How It Works:

```
Client Dashboard
     ↓
Voice Session Button
     ↓
Connect to ElevenLabs Agent (WebSocket)
     ↓
Client speaks (hold microphone)
     ↓
Audio sent to agent
     ↓
Agent responds (voice + text)
     ↓
Conversation continues...
     ↓
End session & save to history
```

## 🎯 Features

### Real-Time Voice Conversation
- Low-latency WebSocket connection
- Bidirectional audio streaming
- Natural conversation flow
- ICF-aligned coaching questions

### Interactive UI
- **Hold to Speak**: Press and hold microphone button
- **Live Status**: Green badge when connected
- **Message History**: See conversation transcript
- **Session Info**: Track session ID and timing

### Mobile-Optimized
- Touch-friendly controls
- Works on iOS and Android
- Microphone permission handling
- Responsive design

## 📱 User Interface

```
┌─────────────────────────────────┐
│  Voice Coaching Session         │
│  Session 1 with Alex            │
│  🟢 Live                         │
├─────────────────────────────────┤
│                                 │
│  🔊 Coach: Welcome, Alex...     │
│                                 │
│      🎤 You: [Voice message]    │
│                                 │
│  🔊 Coach: What would you...    │
│                                 │
├─────────────────────────────────┤
│   [🎤 Hold to Speak]  [📞 End] │
└─────────────────────────────────┘
```

## 🔧 Technical Details

### WebSocket Connection
- Endpoint: `wss://api.elevenlabs.io/v1/convai/conversation`
- Protocol: Binary for audio, JSON for control
- Auto-reconnect: Not implemented yet (add if needed)

### Audio Format
- **Input**: WebM from browser MediaRecorder
- **Output**: MP3 from ElevenLabs
- **Sample Rate**: Browser default (usually 48kHz)

### Microphone Access
```typescript
// Requests permission on first use
const stream = await navigator.mediaDevices.getUserMedia({ 
  audio: true 
});
```

## 🎨 Customization

### Change Voice/Agent
Edit `lib/elevenlabs-agent.ts`:
```typescript
export const AGENT_ID = 'your_new_agent_id';
```

### Adjust Voice Settings
Currently using your configured agent's voice settings.

### Add Features
Possible enhancements:
- [ ] Auto-transcript download
- [ ] Session recording save
- [ ] Voice activity detection
- [ ] Background noise cancellation
- [ ] Multi-language support

## ⚠️ Important Notes

### Browser Compatibility
- ✅ Chrome/Edge (desktop & mobile)
- ✅ Firefox (desktop & mobile)  
- ✅ Safari 14.1+ (iOS/macOS)
- ⚠️ Requires HTTPS in production

### Microphone Permissions
Users must grant microphone permission:
- First use: Browser will prompt
- Denied: Show helpful error message
- Blocked: User must manually enable in settings

### API Usage
- Each voice session uses ElevenLabs API credits
- Monitor usage in ElevenLabs dashboard
- Consider adding usage limits per client

## 🔐 Security

### API Key Handling
- ⚠️ Currently stored in code (temporary)
- 🔒 **TODO**: Move to environment variables
- 🔒 **TODO**: Use backend proxy for API calls

### Recommended Setup (Production):
```env
# .env.local (not committed to git)
ELEVENLABS_API_KEY=sk_...
```

Then proxy through Next.js API route:
```typescript
// app/api/voice/route.ts
export async function POST(req: Request) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  // Forward to ElevenLabs...
}
```

## 📊 Testing

### Test Checklist
- [ ] Start voice session from dashboard
- [ ] Grant microphone permission
- [ ] Hold button and speak clearly
- [ ] Verify AI responds with voice
- [ ] Check message history updates
- [ ] End session successfully
- [ ] Verify session saved to progress

### Test Scenarios
1. **Happy Path**: Complete conversation
2. **Permission Denied**: Handle gracefully
3. **Connection Lost**: Show error, allow retry
4. **Long Message**: Test with extended speech
5. **Quick Messages**: Rapid back-and-forth

## 🐛 Troubleshooting

### "WebSocket connection failed"
- Check internet connection
- Verify API key is valid
- Check ElevenLabs service status

### "Microphone access denied"
- Browser blocked permission
- User needs to allow in browser settings
- Try different browser

### No audio playback
- Check device volume
- Verify audio output device
- Check browser audio permissions

### Agent not responding
- Verify agent ID is correct
- Check ElevenLabs agent is active
- Review agent configuration

## 📈 Next Steps

### Recommended Enhancements
1. **Session Recording**
   - Save audio files
   - Transcript archive
   - Playback feature

2. **Analytics**
   - Track session duration
   - Measure response times
   - User engagement metrics

3. **Advanced Features**
   - Voice activity detection
   - Noise cancellation
   - Multi-speaker support
   - Real-time sentiment analysis

4. **Integration**
   - Link voice sessions to progress tracker
   - Generate insights from conversations
   - Export session summaries

## 🎉 Ready to Test!

Your voice coaching feature is live at:
**http://localhost:3000**

1. Skip onboarding (or complete it)
2. Go to dashboard
3. Click "Voice Session" 🎤
4. Start talking with your AI coach!

---

**Questions or issues?** The voice integration uses:
- `/lib/elevenlabs-agent.ts` - Core WebSocket logic
- `/components/voice-coaching-session.tsx` - UI component
- `/app/page.tsx` - Dashboard integration

