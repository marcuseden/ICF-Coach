# Swedish Version - Quick Start Guide

## 🚀 Immediate Next Steps

### 1. Test the Implementation

```bash
# Start the development server
npm run dev

# Open in browser
open http://localhost:3000
```

**What to check:**
- ✅ Page loads in Swedish (default)
- ✅ Language switcher in header (Globe icon + "SV"/"EN")
- ✅ Click to toggle between Swedish and English
- ✅ All homepage content translates
- ✅ Refresh page - language persists

### 2. Deploy Database Changes (If Using Supabase)

```bash
# Option A: Through Supabase Dashboard
1. Go to your Supabase project
2. Navigate to SQL Editor
3. Copy contents of supabase/schema-i18n.sql
4. Execute the script

# Option B: Using psql
psql <your-connection-string> < supabase/schema-i18n.sql
```

**What this does:**
- Adds language support to packages table
- Creates reading_materials table with 6 Swedish articles
- Creates coaches table with 4 Swedish coach profiles
- Adds preferred_language to user profiles
- Sets up all necessary indexes and policies

### 3. Verify Everything Works

Open your browser console (F12) and run:

```javascript
// Check default language
console.log(localStorage.getItem('language')); // Should be 'sv' or null (defaults to 'sv')

// Force English
localStorage.setItem('language', 'en');
location.reload();

// Force Swedish
localStorage.setItem('language', 'sv');
location.reload();
```

## 📁 Key Files to Know

### Core Translation System
- `lib/i18n/translations.ts` - All UI text in Swedish and English
- `lib/i18n/language-context.tsx` - Language state management
- `components/language-switcher.tsx` - Toggle button

### Translated Components
- `app/page.tsx` - Home page (fully translated)
- `components/public-header.tsx` - Header navigation (translated)

### Swedish Content
- `lib/i18n/reading-content-sv.ts` - 6 coaching articles in Swedish
- `lib/i18n/coach-data-sv.ts` - 4 coach profiles in Swedish

### Database
- `supabase/schema-i18n.sql` - Database migration script

## 🎯 Current Status

### ✅ What's Done

**Infrastructure:**
- ✅ Complete translation system with Swedish & English
- ✅ Language switcher in header
- ✅ LocalStorage persistence
- ✅ TypeScript types for all translations

**Translated Pages:**
- ✅ Home page (100% complete)
  - Hero section
  - All 3 feature sections
  - Package comparison
  - CTA section
  - Footer

**Swedish Content:**
- ✅ 6 coaching articles (Leadership, Coaching, Team Development, Communication)
- ✅ 4 coach profiles with Swedish bios
- ✅ 3 coaching packages with Swedish descriptions

### 🔄 What's Next (Optional)

**High Priority:**
- Login page translation
- Signup page translation
- Onboarding flow translation

**Medium Priority:**
- Dashboard translation (currently hardcoded Swedish)
- Sessions pages translation
- Reading pages translation
- Settings pages translation

**Low Priority:**
- Voice session prompts in Swedish
- Email notifications in both languages

## 📖 Documentation

**Full Details:**
- `I18N_IMPLEMENTATION.md` - Complete technical documentation
- `I18N_TESTING_GUIDE.md` - Comprehensive testing instructions
- `SWEDISH_VERSION_SUMMARY.md` - Full implementation summary

## 💡 Usage Examples

### In a React Component

```typescript
'use client';

import { useLanguage } from '@/lib/i18n/language-context';

export default function MyComponent() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div>
      {/* Use translation */}
      <h1>{t.hero.title[0]}</h1>
      <p>{t.common.getStarted}</p>
      
      {/* Show current language */}
      <p>Current: {language}</p>
      
      {/* Toggle language */}
      <button onClick={() => setLanguage(language === 'sv' ? 'en' : 'sv')}>
        Switch
      </button>
    </div>
  );
}
```

### Adding New Translations

1. **Edit** `lib/i18n/translations.ts`
2. **Add to interface:**
```typescript
export interface Translations {
  // ... existing
  mySection: {
    title: string;
    description: string;
  };
}
```
3. **Add translations:**
```typescript
sv: {
  mySection: {
    title: 'Min Titel',
    description: 'Min beskrivning'
  }
},
en: {
  mySection: {
    title: 'My Title',
    description: 'My description'
  }
}
```
4. **Use in component:**
```typescript
const { t } = useLanguage();
return <h1>{t.mySection.title}</h1>;
```

## 🐛 Troubleshooting

### Issue: Language doesn't switch
**Solution:** Check that component is wrapped in `LanguageProvider`
```typescript
// In app/layout.tsx
<LanguageProvider>
  {children}
</LanguageProvider>
```

### Issue: Translations show as undefined
**Solution:** Check the translation key exists in `lib/i18n/translations.ts`
```typescript
// ❌ Wrong
t.doesNotExist.title

// ✅ Correct
t.hero.title[0]
```

### Issue: Language doesn't persist
**Solution:** Check localStorage is enabled in browser
```javascript
// Test in console
localStorage.setItem('test', 'value');
console.log(localStorage.getItem('test')); // Should show 'value'
```

### Issue: Swedish characters (å, ä, ö) look broken
**Solution:** Ensure UTF-8 encoding
```html
<!-- In app/layout.tsx <head> -->
<meta charSet="UTF-8" />
```

## 📱 Mobile Testing

```bash
# Test on local network device
# 1. Find your local IP
ipconfig getifaddr en0  # macOS
ipconfig               # Windows

# 2. Start dev server
npm run dev

# 3. Open on mobile device
http://<your-ip>:3000
```

## 🎉 Success!

You now have:
- ✅ Swedish as default language
- ✅ English available via switcher
- ✅ Fully translated home page
- ✅ 6 Swedish coaching articles
- ✅ 4 Swedish coach profiles
- ✅ Database ready for multilingual content
- ✅ Easy system to add more translations

## 🤝 Need Help?

1. Check documentation in project root:
   - `I18N_IMPLEMENTATION.md`
   - `I18N_TESTING_GUIDE.md`
   - `SWEDISH_VERSION_SUMMARY.md`

2. Check translation file:
   - `lib/i18n/translations.ts`

3. Verify all files created:
   ```bash
   ls lib/i18n/
   # Should show:
   # - translations.ts
   # - language-context.tsx
   # - reading-content-sv.ts
   # - coach-data-sv.ts
   ```

---

**Ready to use!** 🇸🇪🇬🇧

**Default:** Swedish  
**Toggle:** Globe icon in header  
**Persistence:** Automatic via localStorage

