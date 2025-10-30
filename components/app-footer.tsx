'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, Calendar, Plus, MessageSquare, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n/language-context';

export function AppFooter() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();

  const navItems = [
    { 
      id: 'home', 
      label: t.nav.home, 
      icon: Home, 
      path: '/dashboard',
      color: 'text-stone-700'
    },
    { 
      id: 'sessions', 
      label: t.nav.sessions, 
      icon: Calendar, 
      path: '/sessions/upcoming',
      color: 'text-stone-700'
    },
    { 
      id: 'book', 
      label: t.nav.book, 
      icon: Plus, 
      path: '/sessions/book',
      color: 'text-stone-700',
      highlight: true
    },
    { 
      id: 'messages', 
      label: t.nav.commitments, 
      icon: MessageSquare, 
      path: '/commitments',
      color: 'text-stone-700'
    },
    { 
      id: 'menu', 
      label: t.nav.menu, 
      icon: Menu, 
      path: '/settings',
      color: 'text-stone-700'
    },
  ];

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 safe-area-bottom">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-lg hover:bg-stone-50 transition-colors ${
                  active ? 'text-purple-600' : 'text-stone-600'
                } ${item.highlight ? 'bg-purple-50 hover:bg-purple-100' : ''}`}
                onClick={() => router.push(item.path)}
              >
                <Icon className={`h-5 w-5 ${active ? 'text-purple-600' : item.color}`} />
                <span className={`text-xs font-medium ${active ? 'text-purple-600' : 'text-stone-700'}`}>
                  {item.label}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

