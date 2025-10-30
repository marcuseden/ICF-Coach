'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, Video, Calendar, TrendingUp, Target, Shield } from 'lucide-react';
import { PublicHeader } from '@/components/public-header';

export default function HomePage() {
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
    <>
      <PublicHeader />
      <div className="min-h-screen bg-stone-50">
        {/* Hero Section - Full Width Background Image */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900/85 via-stone-900/75 to-stone-900/85 z-10" />
            <img 
              src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-lIuHnO3GFdidLwvUVHIPXYeg.png?st=2025-10-30T15%3A38%3A44Z&se=2025-10-30T17%3A38%3A44Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=8b33a531-2df9-46a3-bc02-d4b1430a422c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-30T16%3A38%3A44Z&ske=2025-10-31T16%3A38%3A44Z&sks=b&skv=2024-08-04&sig=3tHx34jZCPXNCAzJ%2BS93tHnnkFPyEV5lqwWcS6ANyTo%3D"
              alt="Professional coaching"
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          {/* Hero Content */}
          <div className="relative z-20 w-full max-w-5xl mx-auto px-6 py-20 md:py-32 text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 md:mb-8 leading-[1.1] tracking-tight">
              Your coach.<br />
              <span className="text-white/90">Always there.</span><br />
              <span className="text-white/80">Always listening.</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 mb-10 md:mb-16 max-w-3xl mx-auto font-light leading-relaxed px-4">
              Professional coaching that fits your life.
              <span className="block mt-2">AI-powered sessions, human wisdom, real results.</span>
            </p>
            <div className="flex justify-center px-4">
              <button
                onClick={() => router.push('/signup')}
                className="px-10 py-3.5 bg-white text-stone-900 rounded-full text-base font-medium hover:bg-stone-100 transition-colors shadow-lg"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Scroll Indicator - Hidden on mobile */}
          <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </section>

      {/* Feature Section 1: AI Voice Coach */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-stone-100">
                <img 
                  src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-qeSLgTlhErhkdZPJL82dEczO.png?st=2025-10-30T15%3A45%3A23Z&se=2025-10-30T17%3A45%3A23Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=ed3ea2f9-5e38-44be-9a1b-7c1e65e4d54f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-29T22%3A36%3A34Z&ske=2025-10-30T22%3A36%3A34Z&sks=b&skv=2024-08-04&sig=uYKRT/%2BGpe6i2Zu4YHBf%2BcIGkqZAga54CLmsxqkb9O4%3D"
                  alt="AI Voice Coach"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-4 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-bold text-stone-900 leading-tight">
                Your AI coach.<br />
                Available anytime.
              </h2>
              <p className="text-xl md:text-2xl text-stone-600 leading-relaxed">
                Hold to speak. Get instant guidance. Build momentum between sessions with a coach that never sleeps.
              </p>
              <p className="text-base md:text-lg text-stone-600">
                Our AI voice coach understands your goals, remembers your commitments, and asks the powerful questions that unlock new perspectives. It's like having an ICF-certified coach in your pocket, ready whenever inspiration strikes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2: Human Coaching */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-bold text-stone-900 leading-tight">
                Real coaches.<br />
                Real transformation.
              </h2>
              <p className="text-xl md:text-2xl text-stone-600 leading-relaxed">
                Connect with ICF-certified professionals who've guided thousands through their toughest leadership challenges.
              </p>
              <p className="text-base md:text-lg text-stone-600">
                Video or phone. Your choice. Book sessions that fit your schedule and connect with coaches who understand the unique pressures of modern leadership. Every session follows proven ICF frameworks designed to create lasting change.
              </p>
            </div>
            <div>
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-stone-100">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1024&auto=format&fit=crop"
                  alt="Human Coaching"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 3: Progress Tracking */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-stone-100">
                <img 
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1024&auto=format&fit=crop"
                  alt="Progress Tracking"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-4 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-bold text-stone-900 leading-tight">
                See yourself grow.<br />
                Week by week.
              </h2>
              <p className="text-xl md:text-2xl text-stone-600 leading-relaxed">
                Track commitments. Measure confidence. Watch patterns emerge as small actions compound into major breakthroughs.
              </p>
              <p className="text-base md:text-lg text-stone-600">
                Our progress system shows you what's working. Visual dashboards reveal your growth trajectory, while weekly check-ins keep you accountable. See your confidence scores rise as you build the habits that make great leaders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages - Apple Style */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-stone-900 mb-4 leading-tight">
              Choose your journey
            </h2>
            <p className="text-lg md:text-xl text-stone-600">
              All packages include AI voice coaching and ICF-certified human support
            </p>
          </div>
          
          <div className="space-y-4">
            {packages.map((pkg) => (
              <div 
                key={pkg.name}
                className={`relative bg-white rounded-3xl p-6 md:p-8 ${
                  pkg.popular 
                    ? 'border-2 border-stone-900 shadow-xl' 
                    : 'border border-stone-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-6">
                    <span className="bg-stone-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Left: Package Info */}
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">
                      {pkg.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-3xl md:text-4xl font-bold text-stone-900">{pkg.price}</span>
                      <span className="text-stone-600 text-sm">/ {pkg.duration}</span>
                    </div>
                    <p className="text-stone-700 font-medium mb-4">{pkg.sessions}</p>
                    
                    {/* Features - Compact */}
                    <div className="flex flex-wrap gap-2">
                      {pkg.features.map((feature, idx) => (
                        <span 
                          key={idx}
                          className="text-xs px-3 py-1 bg-stone-100 text-stone-700 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Right: CTA */}
                  <div className="md:flex-shrink-0">
                    <button
                      onClick={() => router.push('/signup')}
                      className={`w-full md:w-auto px-8 py-3 rounded-full text-base font-medium transition-colors ${
                        pkg.popular
                          ? 'bg-stone-900 text-white hover:bg-stone-800'
                          : 'bg-stone-100 text-stone-900 hover:bg-stone-200'
                      }`}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
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
            <button 
              onClick={() => router.push('/privacy')}
              className="hover:text-stone-900 transition-colors"
            >
              Privacy
            </button>
            <button 
              onClick={() => router.push('/terms')}
              className="hover:text-stone-900 transition-colors"
            >
              Terms
            </button>
            <button 
              onClick={() => router.push('/contact')}
              className="hover:text-stone-900 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}

