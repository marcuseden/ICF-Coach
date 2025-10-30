# Internationalization (i18n) Implementation Guide

## Overview

YourCoachAgent now supports both **Swedish (sv)** and **English (en)** languages. Swedish is the default language, with English available via a language switcher in the header.

## 📁 File Structure

```
lib/i18n/
├── translations.ts           # Main translation file with all UI strings
├── language-context.tsx      # React context for language management
├── reading-content-sv.ts     # Swedish reading materials
└── coach-data-sv.ts          # Swedish coach profiles

components/
└── language-switcher.tsx     # Language toggle component

supabase/
└── schema-i18n.sql          # Database migration for multilingual support
```

## 🌐 Translation System

### 1. Translation Structure

All translations are defined in `lib/i18n/translations.ts` with the following structure:

```typescript
export interface Translations {
  common: { ... }      // Common UI strings (buttons, etc.)
  nav: { ... }         // Navigation items
  hero: { ... }        // Hero section content
  features: { ... }    // Feature descriptions
  packages: { ... }    // Package information
  valueProps: { ... }  // Value propositions
  howItWorks: { ... }  // How it works section
  dashboard: { ... }   // Dashboard specific strings
  sessions: { ... }    // Sessions page strings
  auth: { ... }        // Authentication pages
  footer: { ... }      // Footer content
  cta: { ... }         // Call-to-action messages
}
```

### 2. Using Translations in Components

```typescript
'use client';

import { useLanguage } from '@/lib/i18n/language-context';

export default function MyComponent() {
  const { t, language } = useLanguage();

  return (
    <div>
      <h1>{t.hero.title[0]}</h1>
      <p>{t.hero.subtitle[0]}</p>
      <button>{t.common.getStarted}</button>
    </div>
  );
}
```

### 3. Language Switcher

The language switcher is included in the `PublicHeader` component and allows users to toggle between Swedish and English. The selected language is persisted in localStorage.

```tsx
<LanguageSwitcher />
```

## 🗄️ Database Support

### Tables with Language Support

1. **packages** - Coaching packages
   - `language` - Current language (default: 'en')
   - `name_sv` - Swedish package name
   - `features_sv` - Swedish features array

2. **reading_materials** (new table)
   - All reading content with language field
   - Full Swedish translations

3. **coaches** (new table)
   - Coach profiles with Swedish bios
   - Swedish specialties

4. **profiles**
   - `preferred_language` - User's preferred language (default: 'sv')

### Running the Migration

To add i18n support to your database:

```bash
# Connect to your Supabase project
psql <your-supabase-connection-string>

# Run the migration
\i supabase/schema-i18n.sql
```

Or through Supabase Dashboard:
1. Go to SQL Editor
2. Copy contents of `supabase/schema-i18n.sql`
3. Execute the script

## 📋 Translation Coverage

### ✅ Fully Translated Pages

- **Home Page** (`app/page.tsx`)
  - Hero section
  - Feature sections (3 sections)
  - Package comparison
  - CTA section
  - Footer

- **Public Header** (`components/public-header.tsx`)
  - Navigation items
  - Auth buttons
  - Mobile menu

### 🔄 Partially Translated

- **Landing Page** (`components/landing-page.tsx`) - Needs update
- **Dashboard** - Needs translation implementation
- **Sessions Pages** - Needs translation implementation
- **Reading Pages** - Needs translation implementation
- **Settings Pages** - Needs translation implementation

### ❌ Not Yet Translated

- Authentication pages (login/signup)
- Onboarding flow
- Coaching session interface
- Check-in prompts
- Progress tracker
- Commitment tracking
- Voice session UI

## 🔧 How to Add New Translations

### 1. Add to Translation File

Edit `lib/i18n/translations.ts`:

```typescript
export const translations: Record<Language, Translations> = {
  sv: {
    // Add Swedish translation
    myNewSection: {
      title: 'Min Titel',
      description: 'Min beskrivning'
    }
  },
  en: {
    // Add English translation
    myNewSection: {
      title: 'My Title',
      description: 'My description'
    }
  }
};
```

### 2. Update the Interface

```typescript
export interface Translations {
  // ... existing translations
  myNewSection: {
    title: string;
    description: string;
  };
}
```

### 3. Use in Component

```typescript
const { t } = useLanguage();
return <h1>{t.myNewSection.title}</h1>;
```

## 📝 Swedish Content

### Reading Materials

6 Swedish coaching articles covering:
1. Hantera fjärrteam effektivt (Managing remote teams)
2. Kraftfulla coachingfrågor (Powerful coaching questions)
3. Bygga psykologisk trygghet (Building psychological safety)
4. Feedback som förändrar (Transformative feedback)
5. Delegering som utvecklar (Developmental delegation)
6. Aktiv lyssning i praktiken (Active listening in practice)

### Coach Profiles

4 Swedish coach profiles with:
- Swedish bios
- Swedish specialty areas
- Professional credentials

### Packages

3 package tiers with Swedish translations:
- **Bas** (Basic) - 4 veckor, 4 sessioner
- **Standard** - 8 veckor, 8 sessioner (Mest populär)
- **Premium** - 12 veckor, 12 sessioner

## 🎨 Design Considerations

- Language switcher uses Globe icon with language code (SV/EN)
- White text on dark header background
- Smooth transitions when switching languages
- No page reload required - instant switching
- Language preference persists across sessions

## 🧪 Testing

### Manual Testing Checklist

- [ ] Language switcher toggles between SV and EN
- [ ] All homepage sections display correctly in both languages
- [ ] Header navigation translates properly
- [ ] Package cards show correct Swedish text
- [ ] Footer links translate correctly
- [ ] Language preference persists on page reload
- [ ] Mobile view displays translations properly
- [ ] No broken translations or missing keys

### Testing Different Languages

```typescript
// In browser console
localStorage.setItem('language', 'sv'); // Switch to Swedish
localStorage.setItem('language', 'en'); // Switch to English
location.reload(); // Reload to see changes
```

## 🚀 Deployment Notes

1. **Environment Variables** - No additional env vars needed
2. **Build** - All translations are bundled at build time
3. **SEO** - Update meta tags for both languages
4. **Analytics** - Track language usage via `language` context

## 📈 Future Enhancements

1. **URL-based language routing** (`/sv/`, `/en/`)
2. **Auto-detect browser language**
3. **More languages** (Norwegian, Danish, Finnish)
4. **Translation management system**
5. **Crowdin or similar integration**
6. **Professional translation review**
7. **Language-specific content (blog posts, etc.)**

## 🐛 Known Issues

- Some pages (dashboard, sessions) not yet translated
- Landing page needs translation update
- Authentication flows need translation
- Voice session prompts hardcoded in English
- ElevenLabs integration uses English only

## 📚 Resources

- [Next.js i18n docs](https://nextjs.org/docs/advanced-features/i18n-routing)
- [React i18n best practices](https://react.i18next.com/)
- [Swedish style guide](https://spraakbanken.gu.se/resurser/sprakhjalpen)

## 🤝 Contributing Translations

To contribute or improve translations:

1. Fork the repository
2. Edit `lib/i18n/translations.ts`
3. Test locally with both languages
4. Submit a PR with description of changes
5. Include screenshots if UI changes

---

**Default Language:** Swedish (sv)  
**Supported Languages:** Swedish (sv), English (en)  
**Last Updated:** October 30, 2025

