'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { User, Settings, CreditCard, Watch, LogOut, HelpCircle } from 'lucide-react';
import { signOut } from '@/lib/auth';

interface UserMenuProps {
  userName?: string;
  userEmail?: string;
}

export function UserMenu({ userName, userEmail }: UserMenuProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    router.push('/');
  };

  const initials = userName
    ? userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-2 border-stone-200">
            <AvatarFallback className="bg-stone-100 text-stone-900 font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-stone-900">
              {userName || 'User'}
            </p>
            {userEmail && (
              <p className="text-xs text-stone-600">
                {userEmail}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => {
          setIsOpen(false);
          router.push('/settings/profile');
        }}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => {
          setIsOpen(false);
          router.push('/settings/plan');
        }}>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Plan & Billing</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => {
          setIsOpen(false);
          router.push('/settings/devices');
        }}>
          <Watch className="mr-2 h-4 w-4" />
          <span>Wearables & Devices</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => {
          setIsOpen(false);
          router.push('/settings');
        }}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => {
          setIsOpen(false);
          router.push('/help');
        }}>
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Help & Support</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleLogout} className="text-stone-900">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

