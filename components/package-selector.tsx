'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { COACHING_PACKAGES } from '@/lib/data';
import { PackageType } from '@/lib/types';
import { Check } from 'lucide-react';

interface PackageSelectorProps {
  onSelect: (packageType: PackageType) => void;
  selectedPackage?: PackageType;
}

export function PackageSelector({ onSelect, selectedPackage }: PackageSelectorProps) {
  const [selected, setSelected] = useState<PackageType | undefined>(selectedPackage);

  const handleSelect = (packageType: PackageType) => {
    setSelected(packageType);
    onSelect(packageType);
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Choose Your Journey</h2>
        <p className="text-muted-foreground text-balance">
          Select the coaching package that feels right for you
        </p>
      </div>

      <div className="space-y-3">
        {COACHING_PACKAGES.map((pkg) => (
          <Card
            key={pkg.id}
            className={`cursor-pointer transition-all ${
              selected === pkg.id
                ? 'ring-2 ring-stone-900 dark:ring-stone-100 border-stone-900 dark:border-stone-100'
                : 'hover:border-stone-400 dark:hover:border-stone-600'
            }`}
            onClick={() => handleSelect(pkg.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    {pkg.name}
                    {pkg.id === 'standard' && (
                      <Badge variant="secondary" className="text-xs font-normal bg-stone-100 text-stone-700 border-stone-200">
                        Popular
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {pkg.duration} • {pkg.frequency} sessions
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{pkg.price}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-stone-600 dark:text-stone-400 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              {selected === pkg.id && (
                <Button className="w-full mt-4 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-900">
                  Continue with {pkg.name}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

