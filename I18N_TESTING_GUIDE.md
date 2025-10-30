# i18n Testing Guide

## Quick Test

To quickly verify the Swedish/English translation system works:

### 1. Start the Development Server

```bash
npm run dev
```

### 2. Open the Application

Navigate to `http://localhost:3000`

### 3. Test Language Switcher

**Location:** Top right of the header (Globe icon with "SV" or "EN")

**Test Steps:**
1. Page should load in Swedish by default
2. Click the language switcher (shows "EN" when Swedish is active)
3. Page content should immediately switch to English
4. Click again to switch back to Swedish
5. Refresh the page - language preference should persist

### 4. Test Translated Sections

#### Home Page (`/`)

**Swedish Content to Verify:**
- ✅ Hero title: "Din coach. / Alltid där. / Alltid lyssnar."
- ✅ Hero subtitle: "Professionell coaching som passar ditt liv."
- ✅ CTA button: "Kom igång"
- ✅ Feature 1: "Din AI-coach. Tillgänglig när som helst."
- ✅ Feature 2: "Riktiga coacher. Riktig transformation."
- ✅ Feature 3: "Se dig själv växa. Vecka för vecka."
- ✅ Packages heading: "Välj din resa"
- ✅ Package names: "Bas", "Standard", "Premium"
- ✅ Package label: "Mest populär" (on Standard)
- ✅ CTA section: "Redo att bli ledaren du är menad att vara?"
- ✅ Footer: "© 2025 YourCoachAgent. Alla rättigheter förbehållna."

**English Content to Verify:**
- ✅ Hero title: "Your coach. / Always there. / Always listening."
- ✅ Hero subtitle: "Professional coaching that fits your life."
- ✅ CTA button: "Get Started"
- ✅ Feature 1: "Your AI coach. Available anytime."
- ✅ Feature 2: "Real coaches. Real transformation."
- ✅ Feature 3: "See yourself grow. Week by week."
- ✅ Packages heading: "Choose your journey"
- ✅ Package names: "Basic", "Standard", "Premium"
- ✅ Package label: "Most Popular" (on Standard)
- ✅ CTA section: "Ready to become the leader you're meant to be?"
- ✅ Footer: "© 2025 YourCoachAgent. All rights reserved."

#### Header Navigation

**Swedish:**
- ✅ "Logga in" (Login)
- ✅ "Kom igång" (Get Started button)

**English:**
- ✅ "Login"
- ✅ "Get Started"

#### Dashboard (`/dashboard`)

**Note:** Dashboard is currently in Swedish only (hardcoded)
- "Hej [name]!"
- "Välkommen tillbaka"
- "Prata med din coach"
- "Kommande sessioner"
- "Din progress"
- "Dagens fokus"
- "Fortsätt läsa"

### 5. Test Mobile Responsiveness

**Mobile View Test:**
1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. Select iPhone 12 Pro or similar
4. Verify:
   - Language switcher visible and functional
   - All text displays correctly
   - No text overflow
   - Swedish characters (å, ä, ö) render properly
   - Footer navigation shows Swedish labels

### 6. Test Language Persistence

**Browser Storage Test:**
1. Switch to English
2. Refresh the page → Should stay in English
3. Close the tab
4. Open `http://localhost:3000` again → Should remember English
5. Switch to Swedish
6. Clear localStorage: `localStorage.clear()` in console
7. Refresh → Should default to Swedish

### 7. Test in Different Browsers

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Manual Testing Checklist

### ✅ Completed

- [x] Translation infrastructure created
- [x] Language context and provider working
- [x] Language switcher component functional
- [x] Home page fully translated
- [x] Header navigation translated
- [x] Package cards translated
- [x] Footer translated
- [x] Swedish reading materials created
- [x] Swedish coach profiles created
- [x] Database schema updated for i18n

### 🔄 In Progress

- [ ] Dashboard page translation (currently hardcoded Swedish)
- [ ] Sessions pages translation
- [ ] Reading pages translation
- [ ] Settings pages translation

### ❌ Not Started

- [ ] Login page translation
- [ ] Signup page translation
- [ ] Onboarding flow translation
- [ ] Coaching session interface translation
- [ ] Voice session UI translation
- [ ] Check-in prompts translation
- [ ] Email notifications translation

## Known Issues

### Issue 1: Dashboard Hardcoded in Swedish
**Impact:** Dashboard doesn't respond to language switcher  
**Status:** Known limitation  
**Fix:** Update dashboard to use `useLanguage()` hook  
**Priority:** Medium

### Issue 2: AppFooter Hardcoded in Swedish
**Impact:** Bottom navigation doesn't translate  
**Status:** Known limitation  
**Fix:** Add footer translations to translation file  
**Priority:** Low (mobile-first app is primarily for Swedish users)

### Issue 3: Auth Pages Not Translated
**Impact:** Login/signup pages show English only  
**Status:** Not implemented  
**Fix:** Add auth translations and update auth components  
**Priority:** High

## Database Testing

### Test Database Content

```sql
-- Check Swedish packages
SELECT id, name, name_sv FROM public.packages;

-- Check Swedish reading materials
SELECT id, title, language FROM public.reading_materials WHERE language = 'sv';

-- Check Swedish coaches
SELECT id, name, language FROM public.coaches WHERE language = 'sv';

-- Check user language preferences
SELECT id, name, preferred_language FROM public.profiles;
```

### Expected Results

**Packages:**
```
id      | name     | name_sv
--------|----------|----------
basic   | Basic    | Bas
standard| Standard | Standard
premium | Premium  | Premium
```

**Reading Materials:**
- 6 Swedish articles (id: '1' to '6')
- Language: 'sv'

**Coaches:**
- 4 coaches with Swedish bios
- Language: 'sv'

## Performance Testing

### Metrics to Check

1. **Initial Load Time**
   - With Swedish (default): < 2s
   - With English: < 2s

2. **Language Switch Speed**
   - Should be instant (< 100ms)
   - No page flicker
   - No network requests

3. **Bundle Size**
   - Translation file adds ~15KB
   - Acceptable overhead

### Testing Commands

```bash
# Check bundle size
npm run build
npm run analyze # if you have bundle analyzer

# Test load performance
# Use Chrome DevTools Network tab
# Use Lighthouse for full audit
```

## Accessibility Testing

### Screen Reader Testing

**Swedish:**
- All text should be read correctly in Swedish
- Swedish characters (å, ä, ö) pronounced correctly
- Navigation labels clear

**English:**
- All text readable in English
- No Swedish artifacts

### Keyboard Navigation

- [ ] Tab through language switcher
- [ ] Press Enter to toggle language
- [ ] All interactive elements accessible
- [ ] Focus visible and clear

## Browser Console Tests

### Quick Console Tests

```javascript
// Test 1: Check current language
console.log(localStorage.getItem('language')); // Should be 'sv' or 'en'

// Test 2: Force language change
localStorage.setItem('language', 'en');
location.reload();

// Test 3: Clear and reset
localStorage.removeItem('language');
location.reload(); // Should default to 'sv'

// Test 4: Check if translations loaded
// (In React DevTools)
// Find LanguageProvider component
// Check 't' prop has all translation keys
```

## Automated Testing (Future)

### Unit Tests Needed

```typescript
// Example tests to implement
describe('Language System', () => {
  test('defaults to Swedish', () => {});
  test('switches to English', () => {});
  test('persists language preference', () => {});
  test('loads correct translations', () => {});
  test('handles missing translation keys', () => {});
});
```

### E2E Tests Needed

```typescript
// Example Playwright/Cypress tests
test('user can switch languages', async () => {
  // Click language switcher
  // Verify content changed
  // Refresh page
  // Verify language persisted
});
```

## Reporting Issues

If you find translation issues, report:

1. **What page/component?**
2. **What language?**
3. **What's wrong?** (missing, incorrect, formatting)
4. **Screenshot?**
5. **Browser/device?**

Example:
```
Page: Home page
Language: Swedish
Issue: Package price shown as "$750" should be "7 500 kr"
Browser: Chrome 120 / macOS
```

## Success Criteria

✅ System is working if:
- Language switcher visible and functional
- Home page displays in both languages correctly
- Language preference persists across sessions
- No console errors related to translations
- No missing translation keys (undefined text)
- Swedish characters render correctly
- Mobile view works properly

---

**Last Updated:** October 30, 2025  
**Testing Status:** Basic implementation complete, full translation in progress

