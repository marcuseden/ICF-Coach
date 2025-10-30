'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, Video, Calendar, TrendingUp, Target, Shield } from 'lucide-react';

export default function PublicHomePage() {
  const router = useRouter();

  const features = [
    {
      icon: Mic,
      title: 'AI Voice Coach',
      description: 'Natural conversations with AI that understands your goals'
    },
    {
      icon: Video,
      title: 'Video Sessions',
      description: 'Connect with certified ICF coaches face-to-face'
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Book sessions that fit your life, not the other way around'
    },
    {
      icon: Target,
      title: 'Track Progress',
      description: 'Watch your commitments turn into achievements'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Growth',
      description: 'Build momentum with weekly check-ins and insights'
    },
    {
      icon: Shield,
      title: 'ICF Certified',
      description: 'Coaching that follows international standards'
    }
  ];

  const packages = [
    {
      name: 'Basic',
      price: '$400',
      duration: '4 weeks',
      sessions: '4 sessions',
      features: ['30-min sessions', 'Weekly check-ins', 'AI voice coach', '2 reading materials']
    },
    {
      name: 'Standard',
      price: '$750',
      duration: '8 weeks',
      sessions: '8 sessions',
      features: ['45-min sessions', 'Bi-weekly check-ins', 'AI + human coach', '3 reading materials', 'Progress reports'],
      popular: true
    },
    {
      name: 'Premium',
      price: '$1,200',
      duration: '12 weeks',
      sessions: '12 sessions',
      features: ['60-min sessions', 'Weekly check-ins', 'Priority support', '4 reading materials', 'Detailed reports', 'Video sessions']
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 bg-gradient-to-b from-white to-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-stone-900 mb-6 leading-tight">
            Your coach.<br />Always there.<br />Always listening.
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 mb-12 max-w-2xl mx-auto">
            Professional coaching that fits your life. AI-powered sessions, human wisdom, real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => router.push('/signup')}
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6"
              onClick={() => router.push('/login')}
            >
              Log In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 text-center mb-16">
            Everything you need to grow
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="border-stone-200 hover:border-stone-400 transition-colors">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-stone-900" />
                    </div>
                    <h3 className="text-xl font-semibold text-stone-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-stone-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 text-center mb-4">
            Choose your journey
          </h2>
          <p className="text-xl text-stone-600 text-center mb-16">
            All packages include AI voice coaching and ICF-certified human support
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card 
                key={pkg.name}
                className={`relative ${pkg.popular ? 'border-stone-900 shadow-lg' : 'border-stone-200'}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-stone-900 text-white text-xs font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold text-stone-900 mb-2">{pkg.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-stone-900">{pkg.price}</span>
                    <span className="text-stone-600"> / {pkg.duration}</span>
                  </div>
                  <p className="text-stone-700 font-medium mb-6">{pkg.sessions}</p>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-stone-700">
                        <svg className="w-5 h-5 text-stone-900 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full"
                    variant={pkg.popular ? 'default' : 'outline'}
                    onClick={() => router.push('/signup')}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to become the leader you're meant to be?
          </h2>
          <p className="text-xl text-stone-300 mb-12">
            Join hundreds of managers who've transformed their teams and careers
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-white text-stone-900 hover:bg-stone-100"
            onClick={() => router.push('/signup')}
          >
            Start Your Journey
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-white border-t border-stone-200">
        <div className="max-w-6xl mx-auto text-center text-stone-600">
          <p className="mb-4">© 2025 YourCoachAgent. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-sm">
            <button className="hover:text-stone-900">Privacy</button>
            <button className="hover:text-stone-900">Terms</button>
            <button className="hover:text-stone-900">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

