'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { COACHING_PACKAGES } from '@/lib/data';
import { Check, X } from 'lucide-react';

export function PackageComparison() {
  const features = [
    { name: 'Coaching Sessions', basic: '4 × 30min', standard: '8 × 45min', premium: '12 × 60min' },
    { name: 'Duration', basic: '4 weeks', standard: '8 weeks', premium: '12 weeks' },
    { name: 'Check-Ins', basic: 'Weekly', standard: 'Bi-weekly', premium: 'Weekly' },
    { name: 'Intake Questionnaire', basic: true, standard: true, premium: true },
    { name: 'Mid-Point Review', basic: false, standard: true, premium: true },
    { name: 'Exit Assessment', basic: false, standard: false, premium: true },
    { name: 'Reading Materials', basic: 'Basic', standard: 'Curated', premium: 'Comprehensive' },
    { name: 'Progress Reports', basic: false, standard: true, premium: true },
    { name: 'Priority Support', basic: false, standard: false, premium: true },
    { name: 'Voice Journaling', basic: false, standard: false, premium: true },
  ];

  return (
    <Card className="border-stone-200 dark:border-stone-800">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Package Comparison</CardTitle>
        <CardDescription>Choose the right coaching journey for you</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800">
                <th className="text-left py-3 font-semibold">Feature</th>
                <th className="text-center py-3 font-semibold px-4">
                  <div className="space-y-1">
                    <div>Basic</div>
                    <div className="text-lg">$400</div>
                  </div>
                </th>
                <th className="text-center py-3 font-semibold px-4 bg-stone-50 dark:bg-stone-900">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      Standard
                      <Badge variant="secondary" className="text-xs bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 border-0">
                        Popular
                      </Badge>
                    </div>
                    <div className="text-lg">$750</div>
                  </div>
                </th>
                <th className="text-center py-3 font-semibold px-4">
                  <div className="space-y-1">
                    <div>Premium</div>
                    <div className="text-lg">$1,200</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className="border-b border-stone-200 dark:border-stone-800"
                >
                  <td className="py-3 text-muted-foreground">{feature.name}</td>
                  <td className="text-center py-3 px-4">
                    {typeof feature.basic === 'boolean' ? (
                      feature.basic ? (
                        <Check className="h-4 w-4 mx-auto text-stone-900 dark:text-stone-100" />
                      ) : (
                        <X className="h-4 w-4 mx-auto text-stone-400 dark:text-stone-600" />
                      )
                    ) : (
                      <span className="text-sm">{feature.basic}</span>
                    )}
                  </td>
                  <td className="text-center py-3 px-4 bg-stone-50 dark:bg-stone-900">
                    {typeof feature.standard === 'boolean' ? (
                      feature.standard ? (
                        <Check className="h-4 w-4 mx-auto text-stone-900 dark:text-stone-100" />
                      ) : (
                        <X className="h-4 w-4 mx-auto text-stone-400 dark:text-stone-600" />
                      )
                    ) : (
                      <span className="text-sm font-medium">{feature.standard}</span>
                    )}
                  </td>
                  <td className="text-center py-3 px-4">
                    {typeof feature.premium === 'boolean' ? (
                      feature.premium ? (
                        <Check className="h-4 w-4 mx-auto text-stone-900 dark:text-stone-100" />
                      ) : (
                        <X className="h-4 w-4 mx-auto text-stone-400 dark:text-stone-600" />
                      )
                    ) : (
                      <span className="text-sm">{feature.premium}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

