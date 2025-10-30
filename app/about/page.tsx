'use client';

import { useRouter } from 'next/navigation';
import { PublicHeader } from '@/components/public-header';
import { PublicFooter } from '@/components/public-footer';
import { Shield, Heart, Users, Award, Globe, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const router = useRouter();

  const values = [
    {
      icon: Shield,
      title: 'ICF Certified',
      description: 'Every conversation follows International Coaching Federation standards. Professional, ethical, effective.'
    },
    {
      icon: Heart,
      title: 'Human-Centered',
      description: 'Technology serves the relationship, not the other way around. Real connection drives real change.'
    },
    {
      icon: Users,
      title: 'Accessible',
      description: 'Professional coaching should not require executive budgets or complicated scheduling. We make it simple.'
    },
    {
      icon: Award,
      title: 'Results-Focused',
      description: 'We measure what matters: commitment completion, confidence growth, and leadership transformation.'
    }
  ];

  const icfCompetencies = [
    'Demonstrates Ethical Practice',
    'Embodies a Coaching Mindset',
    'Establishes and Maintains Agreements',
    'Cultivates Trust and Safety',
    'Maintains Presence',
    'Listens Actively',
    'Evokes Awareness',
    'Facilitates Client Growth'
  ];

  return (
    <>
      <PublicHeader />
      <div className="min-h-screen bg-white pt-14">
        
        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-b from-stone-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-stone-900 mb-6 leading-tight">
              Coaching that works.<br />
              For leaders who do.
            </h1>
            <p className="text-xl md:text-2xl text-stone-600 max-w-2xl mx-auto">
              We combine AI technology with human wisdom to make professional coaching accessible, effective, and sustainable.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-stone-50 rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6">
                Our mission
              </h2>
              <p className="text-lg md:text-xl text-stone-700 leading-relaxed mb-6">
                Too many leaders struggle alone. They know they need support but can't find time for traditional coaching. Sessions are expensive, scheduling is rigid, and the commitment feels overwhelming.
              </p>
              <p className="text-lg md:text-xl text-stone-700 leading-relaxed mb-6">
                We built YourCoachAgent to solve this. AI gives you a coach in your pocket for those critical moments between sessions. Human coaches provide the deep work that transforms careers. Together, they create sustainable change.
              </p>
              <p className="text-lg md:text-xl text-stone-900 font-semibold">
                Professional coaching. On your schedule. At a price that makes sense.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24 px-4 bg-stone-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-stone-900 text-center mb-16">
              What we believe
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.title} className="bg-white rounded-2xl p-8">
                    <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-stone-900" />
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-stone-700 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ICF Standards */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-4">
                ICF Core Competencies
              </h2>
              <p className="text-lg text-stone-600">
                Every session embodies these eight professional standards
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {icfCompetencies.map((competency, index) => (
                <div 
                  key={competency}
                  className="bg-stone-50 rounded-xl p-4 border border-stone-200"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-stone-900 font-medium">
                      {competency}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-stone-600 mb-4">
                Learn more about ICF standards at{' '}
                <a 
                  href="https://coachingfederation.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-stone-900 hover:underline font-medium"
                >
                  coachingfederation.org
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Team (Optional - can add later) */}
        <section className="py-16 md:py-24 px-4 bg-stone-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6">
              Built by coaches.<br />
              For coaches and leaders.
            </h2>
            <p className="text-lg md:text-xl text-stone-700 leading-relaxed max-w-2xl mx-auto">
              Our team includes ICF-certified coaches, leadership development experts, and technology professionals who've experienced firsthand how coaching transforms careers and lives.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-stone-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Experience coaching that works
            </h2>
            <p className="text-xl text-stone-300 mb-12">
              Join hundreds of leaders who've transformed their teams
            </p>
            <button
              onClick={() => router.push('/signup')}
              className="px-10 py-4 bg-white text-stone-900 rounded-full text-base font-medium hover:bg-stone-100 transition-colors shadow-lg"
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

