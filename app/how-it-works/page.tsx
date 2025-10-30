'use client';

import { useRouter } from 'next/navigation';
import { PublicHeader } from '@/components/public-header';
import { PublicFooter } from '@/components/public-footer';

export default function HowItWorksPage() {
  const router = useRouter();

  const steps = [
    {
      number: '1',
      title: 'Choose your package',
      description: 'Select the coaching package that fits your timeline and goals. Basic, Standard, or Premium.',
      details: 'Takes 2 minutes. No commitment required to browse.'
    },
    {
      number: '2',
      title: 'Complete your intake',
      description: 'Answer a few questions about your leadership challenges and goals. This helps us personalize your experience.',
      details: 'Takes 5 minutes. Your responses guide your coaching journey.'
    },
    {
      number: '3',
      title: 'Start coaching immediately',
      description: 'Talk to your AI coach right away. Book your first human session for deeper exploration.',
      details: 'AI available 24/7. Human sessions scheduled within 48 hours.'
    },
    {
      number: '4',
      title: 'Weekly rhythm',
      description: 'Attend your scheduled sessions, practice your commitments, and check in mid-week on your progress.',
      details: 'Build momentum through consistent action and reflection.'
    },
    {
      number: '5',
      title: 'Track your growth',
      description: 'Watch your confidence rise, commitments completed, and leadership skills evolve through visual dashboards.',
      details: 'Data-driven insights show what is working and where to focus next.'
    },
    {
      number: '6',
      title: 'Sustain the change',
      description: 'Finish with clear strategies, proven habits, and the tools to keep growing long after your program ends.',
      details: 'Premium members get 3 months of extended AI coach access.'
    }
  ];

  const sessionFlow = [
    {
      phase: 'Welcome & Check-in',
      duration: '5 min',
      description: 'How have you been? Review your previous commitment and celebrate progress.'
    },
    {
      phase: 'Focus Setting',
      duration: '5 min',
      description: 'What matters most today? Set the agenda based on what feels alive for you right now.'
    },
    {
      phase: 'Deep Exploration',
      duration: '20-40 min',
      description: 'Powerful questions unlock new perspectives. Your coach listens deeply and reflects what they hear.'
    },
    {
      phase: 'Awareness & Insights',
      duration: '5-10 min',
      description: 'What are you noticing? Patterns emerge as you articulate your discoveries.'
    },
    {
      phase: 'Action Design',
      duration: '5-10 min',
      description: 'What will you do? Create a specific commitment with a confidence score and timeline.'
    },
    {
      phase: 'Closing',
      duration: '3 min',
      description: 'Session summary and scheduling your next check-in.'
    }
  ];

  return (
    <>
      <PublicHeader />
      <div className="min-h-screen bg-white pt-14">
        
        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-b from-stone-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-stone-900 mb-6 leading-tight">
              Simple steps.<br />
              Lasting change.
            </h1>
            <p className="text-xl md:text-2xl text-stone-600 max-w-2xl mx-auto">
              Professional coaching without the complexity. Here's exactly how it works.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            {steps.map((step, index) => (
              <div key={step.number} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-stone-900 text-white flex items-center justify-center text-xl font-bold">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-lg text-stone-700 mb-2">
                    {step.description}
                  </p>
                  <p className="text-sm text-stone-600">
                    {step.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Session Structure */}
        <section className="py-16 md:py-24 px-4 bg-stone-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-bold text-stone-900 mb-4 leading-tight">
                Inside every session
              </h2>
              <p className="text-lg md:text-xl text-stone-600">
                Our ICF-certified framework ensures consistent, professional coaching
              </p>
            </div>

            <div className="space-y-6">
              {sessionFlow.map((phase, index) => (
                <div 
                  key={phase.phase}
                  className="bg-white rounded-2xl p-6 border border-stone-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-stone-900">
                      {index + 1}. {phase.phase}
                    </h3>
                    <span className="text-sm text-stone-600 font-medium">
                      {phase.duration}
                    </span>
                  </div>
                  <p className="text-stone-700">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-stone-100 rounded-2xl">
              <p className="text-sm text-stone-700 leading-relaxed">
                <strong className="text-stone-900">ICF Certified Approach:</strong> Every session follows International Coaching Federation core competencies. Your coach asks powerful questions, listens deeply, and maintains your agenda—never giving advice or imposing their own solutions.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-stone-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to begin?
            </h2>
            <p className="text-xl text-stone-300 mb-12">
              Start with AI coaching today. Book your first human session tomorrow.
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

