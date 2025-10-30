'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, User, CreditCard, Watch, Bell, Lock, Globe, Moon } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();

  const settingsSections = [
    {
      icon: User,
      title: 'Profile',
      description: 'Manage your personal information',
      href: '/settings/profile'
    },
    {
      icon: CreditCard,
      title: 'Plan & Billing',
      description: 'Manage subscription and payment methods',
      href: '/settings/plan'
    },
    {
      icon: Watch,
      title: 'Wearables & Devices',
      description: 'Connect smartwatches and fitness trackers',
      href: '/settings/devices'
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Configure alerts and reminders',
      href: '/settings/notifications'
    },
    {
      icon: Lock,
      title: 'Privacy & Security',
      description: 'Password, 2FA, and data preferences',
      href: '/settings/privacy'
    },
    {
      icon: Globe,
      title: 'Language & Region',
      description: 'Set language and timezone',
      href: '/settings/language'
    },
    {
      icon: Moon,
      title: 'Appearance',
      description: 'Theme and display preferences',
      href: '/settings/appearance'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.back()}
            className="mb-2"
          >
            ← Back
          </Button>
          <h1 className="text-2xl font-bold text-stone-900">Settings</h1>
          <p className="text-stone-600 mt-1">
            Manage your account and preferences
          </p>
        </div>
      </div>

      {/* Settings List */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="space-y-2">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <Card 
                key={section.href}
                className="cursor-pointer hover:border-stone-400 transition-colors"
                onClick={() => router.push(section.href)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-stone-900" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-stone-900">
                        {section.title}
                      </h3>
                      <p className="text-xs text-stone-600 mt-0.5">
                        {section.description}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-stone-400" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

