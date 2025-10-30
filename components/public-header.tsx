'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';
import { useLanguage } from '@/lib/i18n/language-context';

export function PublicHeader() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navigation = [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About', href: '/about' }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            
            {/* Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/')}
                className="text-lg font-semibold text-white hover:text-white/80 transition-colors"
              >
                YourCoachAgent
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => router.push(item.href)}
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="mr-2">
                <LanguageSwitcher />
              </div>
              <button
                onClick={() => router.push('/login')}
                className="px-4 py-1.5 text-sm text-white hover:text-white/80 transition-colors"
              >
                {t.nav.login}
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="px-4 py-1.5 bg-white text-stone-900 rounded-full text-sm font-medium hover:bg-stone-100 transition-colors"
              >
                {t.common.getStarted}
              </button>
            </div>

            {/* Mobile Auth & Menu */}
            <div className="md:hidden flex items-center gap-3">
              <LanguageSwitcher />
              <button
                onClick={() => router.push('/login')}
                className="text-sm text-white/90 hover:text-white font-medium"
              >
                {t.nav.login}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10 bg-black/40 backdrop-blur-xl">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      router.push(item.href);
                    }}
                    className="w-full text-left block px-4 py-2 text-base text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 px-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    router.push('/signup');
                  }}
                  className="w-full px-4 py-2.5 bg-white text-stone-900 rounded-full text-sm font-medium hover:bg-stone-100 transition-colors"
                >
                  {t.common.getStarted}
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}

