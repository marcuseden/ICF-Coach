'use client';

import { useRouter } from 'next/navigation';
import { PublicHeader } from '@/components/public-header';
import { PublicFooter } from '@/components/public-footer';
import { Button } from '@/components/ui/button';
import { Mic, Video, Calendar, Target, TrendingUp, Shield, Clock, Zap, Heart } from 'lucide-react';

export default function FeaturesPage() {
  const router = useRouter();

  const features = [
    {
      icon: Mic,
      title: 'AI Voice Coach',
      subtitle: 'Your pocket coach',
      description: 'Natural voice conversations powered by advanced AI. Hold to speak, get instant guidance, and build momentum between your scheduled sessions.',
      details: [
        'Real-time voice responses',
        'Remembers your goals and commitments',
        'ICF-compliant coaching questions',
        'Available 24/7'
      ],
      image: '/images/features/voice-coach.jpg'
    },
    {
      icon: Video,
      title: 'Video Sessions',
      subtitle: 'Face-to-face connection',
      description: 'Connect with certified ICF coaches through HD video calls. See and be seen. Build trust through genuine human connection.',
      details: [
        'Jitsi Meet integration (secure, private)',
        'Screen sharing for collaborative work',
        'No app downloads required',
        'Works on any device'
      ],
      image: '/images/features/video-session.jpg'
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      subtitle: 'Book on your terms',
      description: 'Choose video or phone. Pick times that work for you. Add focus areas before each session so your coach comes prepared.',
      details: [
        'View coach availability in real-time',
        'Automatic calendar invites',
        'Reschedule with one tap',
        'SMS and email reminders'
      ],
      image: '/images/features/calendar.jpg'
    },
    {
      icon: Target,
      title: 'Commitment Tracking',
      subtitle: 'Turn talk into action',
      description: 'Every session ends with a commitment. Track your confidence, set deadlines, and watch your follow-through improve over time.',
      details: [
        '1-10 confidence scoring',
        'Due date reminders',
        'Progress visualization',
        'Completion analytics'
      ],
      image: '/images/features/progress-tracking.jpg'
    },
    {
      icon: TrendingUp,
      title: 'Growth Insights',
      subtitle: 'See patterns emerge',
      description: 'Visual dashboards show how you are evolving as a leader. Track session themes, commitment completion, and confidence trends.',
      details: [
        'Session history and themes',
        'Confidence trend analysis',
        'Completion rate tracking',
        'Personal growth metrics'
      ],
      image: '/images/features/growth-insights.jpg'
    },
    {
      icon: Shield,
      title: 'ICF Certified',
      subtitle: 'Professional standards',
      description: 'Our approach follows International Coaching Federation core competencies. Questions, not advice. Your agenda, not ours.',
      details: [
        'Ethical practice guaranteed',
        'Evidence-based methods',
        'Confidential and secure',
        'Coach accountability'
      ],
      image: '/images/features/icf-certified.jpg'
    }
  ];

  return (
    <>
      <PublicHeader />
      <div className="min-h-screen bg-white pt-14">
        
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-stone-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-stone-900 mb-6 leading-tight">
              Everything you need.<br />
              Nothing you don't.
            </h1>
            <p className="text-xl md:text-2xl text-stone-600 mb-12 max-w-2xl mx-auto">
              Professional coaching tools designed for busy leaders who want real results.
            </p>
          </div>
        </section>

        {/* Feature Sections */}
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const isEven = index % 2 === 0;
          
          return (
            <section 
              key={feature.title}
              className={`py-16 md:py-24 ${isEven ? 'bg-white' : 'bg-stone-50'}`}
            >
              <div className="max-w-7xl mx-auto px-4">
                <div className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
                  <div className={`space-y-6 text-center md:text-left ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-stone-100 mx-auto md:mx-0">
                      <Icon className="h-8 w-8 text-stone-900" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-600 uppercase tracking-wide mb-2">
                        {feature.subtitle}
                      </p>
                      <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-4 leading-tight">
                        {feature.title}
                      </h2>
                      <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-6">
                        {feature.description}
                      </p>
                    </div>
                    <div className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-3 justify-center md:justify-start">
                          <svg className="w-5 h-5 text-stone-900 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-stone-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className={`${isEven ? 'md:order-1' : 'md:order-2'}`}>
                    <div className="relative aspect-square rounded-3xl overflow-hidden bg-stone-100 shadow-lg">
                      {feature.image ? (
                        <img 
                          src={feature.image}
                          alt={feature.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Icon className="h-32 w-32 text-stone-300" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* Wearables Integration Section */}
        <section className="py-16 md:py-24 px-4 bg-stone-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Your data.<br />
                Your insights.
              </h2>
              <p className="text-xl md:text-2xl text-stone-300 max-w-3xl mx-auto">
                Connect your wearables to unlock deeper coaching insights based on your sleep, stress, and recovery patterns.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Apple Watch */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all">
                <div className="aspect-square bg-stone-100">
                  <img 
                    src="/images/wearables/apple-watch.jpg"
                    alt="Apple Watch"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3">Apple Watch</h3>
                <p className="text-stone-300 mb-4">
                  Heart rate variability, activity rings, and mindfulness minutes inform your coaching sessions.
                </p>
                <ul className="space-y-2 text-sm text-stone-400">
                  <li>• Heart rate & HRV tracking</li>
                  <li>• Daily activity data</li>
                  <li>• Sleep analysis</li>
                  <li>• Stress patterns</li>
                </ul>
              </div>
            </div>

              {/* Oura Ring */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all">
                <div className="aspect-square bg-stone-100">
                  <img 
                    src="/images/wearables/oura-ring.jpg"
                    alt="Oura Ring"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3">Oura Ring</h3>
                <p className="text-stone-300 mb-4">
                  Deep sleep metrics and readiness scores help your coach understand your energy levels.
                </p>
                <ul className="space-y-2 text-sm text-stone-400">
                  <li>• Sleep stages & quality</li>
                  <li>• Readiness scores</li>
                  <li>• Body temperature trends</li>
                  <li>• Recovery metrics</li>
                </ul>
              </div>
            </div>

              {/* WHOOP */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all">
                <div className="aspect-square bg-stone-100">
                  <img 
                    src="/images/wearables/whoop-band.jpg"
                    alt="WHOOP"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3">WHOOP</h3>
                <p className="text-stone-300 mb-4">
                  Strain and recovery data reveals how stress impacts your performance and decision-making.
                </p>
                <ul className="space-y-2 text-sm text-stone-400">
                  <li>• Strain & recovery scores</li>
                  <li>• Sleep performance</li>
                  <li>• Respiratory rate</li>
                  <li>• Training optimization</li>
                </ul>
              </div>
            </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-stone-400 mb-6">
                Connect your devices in Settings to enable personalized coaching insights
              </p>
              <button
                onClick={() => router.push('/signup')}
                className="px-8 py-3 bg-white text-stone-900 rounded-full font-medium hover:bg-stone-100 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6">
              Ready to experience the difference?
            </h2>
            <p className="text-xl text-stone-600 mb-12">
              Join leaders who are transforming their teams with YourCoachAgent
            </p>
            <button
              onClick={() => router.push('/signup')}
              className="px-10 py-4 bg-stone-900 text-white rounded-full text-base font-medium hover:bg-stone-800 transition-colors shadow-lg"
            >
              Get Started
            </button>
          </div>
        </section>
      </div>
      <PublicFooter />
    </>
  );
}

