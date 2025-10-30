'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ICF_CORE_COMPETENCIES } from '@/lib/types';

export function ICFPrinciples() {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">ICF Core Competencies</h2>
        <p className="text-muted-foreground text-balance">
          Professional coaching aligned with International Coaching Federation standards
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {ICF_CORE_COMPETENCIES.map((competency, index) => (
          <Card
            key={index}
            className="border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 transition-colors"
          >
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-900 flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-medium">{competency}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
        <CardContent className="pt-4">
          <div className="space-y-2 text-sm">
            <p className="font-semibold text-stone-900 dark:text-stone-100">
              What makes ICF coaching different?
            </p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Facilitates your own discovery—doesn't give advice</li>
              <li>• Asks powerful questions that evoke awareness</li>
              <li>• Creates a safe, trusting partnership</li>
              <li>• Focuses on your agenda, not the coach's</li>
              <li>• Supports sustainable, self-generated action</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

