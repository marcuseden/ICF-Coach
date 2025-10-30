'use client';

import { useLanguage } from '@/lib/i18n/language-context';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'sv' ? 'en' : 'sv');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-2 py-1 text-white/80 hover:text-white transition-colors rounded-md hover:bg-white/10"
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">{language === 'sv' ? 'EN' : 'SV'}</span>
    </button>
  );
}

