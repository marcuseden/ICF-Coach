'use client';

import { ReactNode } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Menu, MessageCircle, User } from 'lucide-react';

interface MobileLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  title?: string;
  clientName?: string;
}

export function MobileLayout({
  children,
  showHeader = true,
  title = 'YourCoachAgent',
  clientName,
}: MobileLayoutProps) {
  return (
    <div className="min-h-screen coach-gradient">
      {showHeader && (
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
          <div className="mobile-container py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
                {clientName && (
                  <p className="text-xs text-muted-foreground">
                    Welcome, {clientName}
                  </p>
                )}
              </div>
            </div>
            <Avatar className="h-9 w-9 border-2 border-stone-200 dark:border-stone-800">
              <AvatarFallback className="bg-stone-100 dark:bg-stone-900">
                {clientName ? clientName.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
      )}

      <main className="mobile-container py-6 pb-24">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border backdrop-blur-lg">
        <div className="mobile-container py-3">
          <div className="flex items-center justify-around">
            <Button variant="ghost" size="icon" className="flex-col h-auto py-2 px-4">
              <MessageCircle className="h-5 w-5 mb-1" />
              <span className="text-xs">Sessions</span>
            </Button>
            <Button variant="ghost" size="icon" className="flex-col h-auto py-2 px-4">
              <svg
                className="h-5 w-5 mb-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span className="text-xs">Actions</span>
            </Button>
            <Button variant="ghost" size="icon" className="flex-col h-auto py-2 px-4">
              <svg
                className="h-5 w-5 mb-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span className="text-xs">Reading</span>
            </Button>
            <Button variant="ghost" size="icon" className="flex-col h-auto py-2 px-4">
              <User className="h-5 w-5 mb-1" />
              <span className="text-xs">Profile</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}

