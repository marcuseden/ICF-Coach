'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from '@/lib/auth';
import { Card, CardContent } from '@/components/ui/card';
import { AppFooter } from '@/components/app-footer';
import { AppHeader } from '@/components/app-header';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
    } else {
      setUser(currentUser);
      setLoading(false);
    }
  }, [router]);

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <p className="text-stone-600">Laddar...</p>
      </div>
    );
  }

  const menuSections = [
    {
      title: 'Konto',
      items: [
        { id: 'profile', label: 'Profil', icon: 'user', path: '/settings/profile' },
        { id: 'plan', label: 'Prenumeration', icon: 'star', path: '/settings/plan' },
        { id: 'devices', label: 'Enheter', icon: 'phone', path: '/settings/devices' }
      ]
    },
    {
      title: 'Support',
      items: [
        { id: 'help', label: 'Hjälp & FAQ', icon: 'help', path: '/help' },
        { id: 'contact', label: 'Kontakta oss', icon: 'mail', path: '/contact' }
      ]
    },
    {
      title: 'Juridiskt',
      items: [
        { id: 'privacy', label: 'Integritetspolicy', icon: 'shield', path: '/privacy' },
        { id: 'terms', label: 'Användarvillkor', icon: 'document', path: '/terms' }
      ]
    }
  ];

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactElement> = {
      user: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
      star: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
      phone: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
      help: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      mail: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
      shield: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      document: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    };
    return icons[iconName] || icons.user;
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <AppHeader title="Inställningar" />

      <div className="max-w-2xl mx-auto px-4 py-6 pb-24 space-y-6">
        
        {/* Profile Card */}
        <Card className="border-stone-200 bg-white">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold text-2xl">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-lg text-stone-900">{user?.name || 'Användare'}</h2>
                <p className="text-sm text-stone-600">{user?.email || 'email@example.com'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Sections */}
        {menuSections.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-sm font-semibold text-stone-600 uppercase tracking-wide mb-3 px-1">
              {section.title}
            </h3>
            <Card className="border-stone-200 bg-white">
              <CardContent className="p-0">
                {section.items.map((item, itemIdx) => (
                  <div key={item.id}>
                    <button
                      onClick={() => router.push(item.path)}
                      className="w-full px-5 py-4 flex items-center justify-between hover:bg-stone-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-stone-600">
                          {getIcon(item.icon)}
                        </div>
                        <span className="text-base text-stone-900">{item.label}</span>
                      </div>
                      <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    {itemIdx < section.items.length - 1 && (
                      <div className="border-b border-stone-100 mx-5" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full px-6 py-4 bg-white border-2 border-red-200 text-red-600 rounded-2xl font-semibold hover:bg-red-50 transition-colors"
        >
          Logga ut
        </button>

        {/* Version Info */}
        <p className="text-center text-xs text-stone-500 pt-4">
          Version 1.0.0
        </p>
      </div>

      <AppFooter />
    </div>
  );
}
