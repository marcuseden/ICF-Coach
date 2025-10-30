'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, Download } from 'lucide-react';

export default function PlanSettingsPage() {
  const router = useRouter();

  const currentPlan = {
    name: 'Premium',
    price: '$1,200',
    period: 'for 12 weeks',
    features: [
      '12 coaching sessions (60 min each)',
      'Weekly check-ins',
      'All questionnaires',
      '4 reading materials',
      'Priority support',
      'Detailed progress reports',
      'Voice journaling',
      'Unlimited AI coaching'
    ],
    renewsOn: 'January 15, 2026',
    sessionsUsed: 4,
    sessionsTotal: 12
  };

  const paymentMethod = {
    type: 'Visa',
    last4: '4242',
    expiry: '12/25'
  };

  const invoices = [
    { id: '1', date: '2025-10-30', amount: '$1,200.00', status: 'Paid' },
    { id: '2', date: '2025-07-30', amount: '$1,200.00', status: 'Paid' },
    { id: '3', date: '2025-04-30', amount: '$750.00', status: 'Paid' }
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
          <h1 className="text-2xl font-bold text-stone-900">Plan & Billing</h1>
          <p className="text-stone-600 mt-1">
            Manage your subscription and payment methods
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        
        {/* Current Plan */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your active subscription</CardDescription>
              </div>
              <Badge className="bg-stone-100 text-stone-900 border-stone-200">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-stone-900">{currentPlan.name}</h3>
              <p className="text-stone-600">
                {currentPlan.price} <span className="text-sm">{currentPlan.period}</span>
              </p>
            </div>

            <div className="space-y-2">
              {currentPlan.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-stone-900 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-stone-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-200">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-stone-600">Sessions Used</span>
                <span className="text-stone-900 font-medium">
                  {currentPlan.sessionsUsed} / {currentPlan.sessionsTotal}
                </span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-2">
                <div 
                  className="bg-stone-900 h-2 rounded-full transition-all"
                  style={{ width: `${(currentPlan.sessionsUsed / currentPlan.sessionsTotal) * 100}%` }}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200">
              <p className="text-sm text-stone-600">
                Renews on <span className="font-medium text-stone-900">{currentPlan.renewsOn}</span>
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                Change Plan
              </Button>
              <Button variant="outline" className="flex-1">
                Cancel Subscription
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Manage your payment information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-stone-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-stone-900" />
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-900">
                    {paymentMethod.type} •••• {paymentMethod.last4}
                  </p>
                  <p className="text-xs text-stone-600">
                    Expires {paymentMethod.expiry}
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Edit
              </Button>
            </div>

            <Button variant="outline" className="w-full">
              Add Payment Method
            </Button>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>Your payment history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invoices.map((invoice, index) => (
                <div key={invoice.id}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-stone-900">
                        {invoice.amount}
                      </p>
                      <p className="text-xs text-stone-600">
                        {invoice.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-stone-100 text-stone-900 border-stone-200">
                        {invoice.status}
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {index < invoices.length - 1 && (
                    <div className="border-b border-stone-200 mt-3" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

