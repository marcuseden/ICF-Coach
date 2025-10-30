'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, Video, Calendar, TrendingUp, Target, Shield } from 'lucide-react';
import { PublicHeader } from '@/components/public-header';
import { useLanguage } from '@/lib/i18n/language-context';

export default function HomePage() {
  const router = useRouter();
  const { t } = useLanguage();

  const packages = [
    {
      name: t.packages.basic.name,
      price: '$400',
      duration: t.packages.basic.duration,
      sessions: t.packages.basic.sessions,
      features: t.packages.basic.features
    },
    {
      name: t.packages.standard.name,
      price: '$750',
      duration: t.packages.standard.duration,
      sessions: t.packages.standard.sessions,
      features: t.packages.standard.features,
      popular: true
    },
    {
      name: t.packages.premium.name,
      price: '$1,200',
      duration: t.packages.premium.duration,
      sessions: t.packages.premium.sessions,
      features: t.packages.premium.features
    }
  ];

  return (
    <>
      <PublicHeader />
      <div className="min-h-screen bg-stone-50">
        {/* Hero Section - Full Width Background Image */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/hero/coaching-hero.jpg"
              alt="Professional coaching environment"
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/60 to-stone-900/70 z-10" />
          </div>
          
          {/* Hero Content */}
          <div className="relative z-20 w-full max-w-5xl mx-auto px-6 py-20 md:py-32 text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 md:mb-8 leading-[1.1] tracking-tight">
              {t.hero.title[0]}<br />
              <span className="text-white/90">{t.hero.title[1]}</span><br />
              <span className="text-white/80">{t.hero.title[2]}</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 mb-10 md:mb-16 max-w-3xl mx-auto font-light leading-relaxed px-4">
              {t.hero.subtitle[0]}
              <span className="block mt-2">{t.hero.subtitle[1]}</span>
            </p>
            <div className="flex justify-center px-4">
              <button
                onClick={() => router.push('/signup')}
                className="px-10 py-3.5 bg-white text-stone-900 rounded-full text-base font-medium hover:bg-stone-100 transition-colors shadow-lg"
              >
                {t.hero.cta}
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
                  src="/images/features/voice-coach.jpg"
                  alt="AI Voice Coach"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-4 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-bold text-stone-900 leading-tight whitespace-pre-line">
                {t.features.voiceCoach.title}
              </h2>
              <p className="text-xl md:text-2xl text-stone-600 leading-relaxed">
                {t.features.voiceCoach.subtitle}
              </p>
              <p className="text-base md:text-lg text-stone-600">
                {t.features.voiceCoach.description}
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
              <h2 className="text-4xl md:text-6xl font-bold text-stone-900 leading-tight whitespace-pre-line">
                {t.features.humanCoaching.title}
              </h2>
              <p className="text-xl md:text-2xl text-stone-600 leading-relaxed">
                {t.features.humanCoaching.subtitle}
              </p>
              <p className="text-base md:text-lg text-stone-600">
                {t.features.humanCoaching.description}
              </p>
            </div>
            <div>
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-stone-100">
                <img 
                  src="/images/features/video-session.jpg"
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
                  src="/images/features/progress-tracking.jpg"
                  alt="Progress Tracking"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-4 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-bold text-stone-900 leading-tight whitespace-pre-line">
                {t.features.progressTracking.title}
              </h2>
              <p className="text-xl md:text-2xl text-stone-600 leading-relaxed">
                {t.features.progressTracking.subtitle}
              </p>
              <p className="text-base md:text-lg text-stone-600">
                {t.features.progressTracking.description}
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
              {t.packages.heading}
            </h2>
            <p className="text-lg md:text-xl text-stone-600">
              {t.packages.subtitle}
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
                      {t.packages.mostPopular}
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
                        {t.common.getStarted}
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
            {t.cta.main}
          </h2>
          <p className="text-xl text-stone-300 mb-12">
            {t.cta.description}
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-white text-stone-900 hover:bg-stone-100"
            onClick={() => router.push('/signup')}
          >
            {t.cta.button}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-white border-t border-stone-200">
        <div className="max-w-6xl mx-auto text-center text-stone-600">
          <p className="mb-4">{t.footer.copyright}</p>
          <div className="flex justify-center gap-6 text-sm">
            <button 
              onClick={() => router.push('/privacy')}
              className="hover:text-stone-900 transition-colors"
            >
              {t.footer.privacy}
            </button>
            <button 
              onClick={() => router.push('/terms')}
              className="hover:text-stone-900 transition-colors"
            >
              {t.footer.terms}
            </button>
            <button 
              onClick={() => router.push('/contact')}
              className="hover:text-stone-900 transition-colors"
            >
              {t.footer.contact}
            </button>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}

