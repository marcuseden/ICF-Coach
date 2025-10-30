'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PackageComparison } from './package-comparison';
import { ICFPrinciples } from './icf-principles';
import { Sparkles, Heart, Target, TrendingUp } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen coach-gradient">
      <div className="mobile-container py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 pt-12 pb-8">
          <div className="inline-block">
            <div className="w-20 h-20 rounded-full bg-stone-900 dark:bg-stone-100 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-10 w-10 text-stone-50 dark:text-stone-900" />
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              YourCoachAgent
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto text-balance">
              Professional ICF coaching in your pocket. Mobile-first. Human-centered.
            </p>
          </div>
          <div className="pt-4">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-900 px-8"
            >
              Begin Your Journey
            </Button>
          </div>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-stone-200 dark:border-stone-800 text-center">
            <CardContent className="pt-6 pb-6">
              <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-900 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-stone-900 dark:text-stone-100" />
              </div>
              <h3 className="font-semibold mb-2">Presence</h3>
              <p className="text-sm text-muted-foreground">
                Fully present coaching that creates trust and safety
              </p>
            </CardContent>
          </Card>

          <Card className="border-stone-200 dark:border-stone-800 text-center">
            <CardContent className="pt-6 pb-6">
              <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-900 flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-stone-900 dark:text-stone-100" />
              </div>
              <h3 className="font-semibold mb-2">Awareness</h3>
              <p className="text-sm text-muted-foreground">
                Powerful questions that evoke your own insights
              </p>
            </CardContent>
          </Card>

          <Card className="border-stone-200 dark:border-stone-800 text-center">
            <CardContent className="pt-6 pb-6">
              <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-900 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-stone-900 dark:text-stone-100" />
              </div>
              <h3 className="font-semibold mb-2">Action</h3>
              <p className="text-sm text-muted-foreground">
                Self-generated steps that create lasting change
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Packages and ICF Info */}
        <Tabs defaultValue="packages" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-stone-100 dark:bg-stone-900">
            <TabsTrigger
              value="packages"
              className="data-[state=active]:bg-stone-900 data-[state=active]:text-stone-50 dark:data-[state=active]:bg-stone-100 dark:data-[state=active]:text-stone-900"
            >
              Packages
            </TabsTrigger>
            <TabsTrigger
              value="icf"
              className="data-[state=active]:bg-stone-900 data-[state=active]:text-stone-50 dark:data-[state=active]:bg-stone-100 dark:data-[state=active]:text-stone-900"
            >
              ICF Standards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="packages" className="space-y-4 mt-6">
            <PackageComparison />
            <div className="text-center pt-4">
              <Button
                size="lg"
                onClick={onGetStarted}
                className="bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-900"
              >
                Get Started
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="icf" className="space-y-4 mt-6">
            <ICFPrinciples />
          </TabsContent>
        </Tabs>

        {/* How It Works */}
        <Card className="border-stone-200 dark:border-stone-800">
          <CardContent className="pt-6 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-center">How It Works</h2>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 dark:bg-stone-100 flex items-center justify-center flex-shrink-0 text-stone-50 dark:text-stone-900 font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Choose Your Package</h3>
                  <p className="text-sm text-muted-foreground">
                    Select the coaching journey that fits your needs and timeline
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 dark:bg-stone-100 flex items-center justify-center flex-shrink-0 text-stone-50 dark:text-stone-900 font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Complete Intake</h3>
                  <p className="text-sm text-muted-foreground">
                    Share where you are and where you want to go
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 dark:bg-stone-100 flex items-center justify-center flex-shrink-0 text-stone-50 dark:text-stone-900 font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Engage in Sessions</h3>
                  <p className="text-sm text-muted-foreground">
                    Weekly coaching sessions with powerful questions and reflection
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 dark:bg-stone-100 flex items-center justify-center flex-shrink-0 text-stone-50 dark:text-stone-900 font-bold text-sm">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Take Action & Reflect</h3>
                  <p className="text-sm text-muted-foreground">
                    Mobile check-ins between sessions to track your progress
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 dark:bg-stone-100 flex items-center justify-center flex-shrink-0 text-stone-50 dark:text-stone-900 font-bold text-sm">
                  5
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Grow & Sustain</h3>
                  <p className="text-sm text-muted-foreground">
                    Build lasting habits and systems for ongoing development
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonial / Social Proof */}
        <Card className="border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-stone-900 dark:text-stone-100"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-sm text-muted-foreground italic max-w-lg mx-auto">
                "YourCoachAgent helped me discover clarity I didn't know I needed. The mobile
                check-ins kept me accountable between sessions. Truly transformative."
              </blockquote>
              <p className="text-sm font-medium">— Sarah M., Standard Package</p>
            </div>
          </CardContent>
        </Card>

        {/* Final CTA */}
        <div className="text-center space-y-4 pt-4 pb-8">
          <h2 className="text-2xl font-bold tracking-tight">Ready to Begin?</h2>
          <p className="text-muted-foreground">
            Your journey of growth and discovery starts today
          </p>
          <Button
            size="lg"
            onClick={onGetStarted}
            className="bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-900 px-12"
          >
            Start Your Coaching Journey
          </Button>
        </div>
      </div>
    </div>
  );
}

