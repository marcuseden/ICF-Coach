'use client';

import { useRouter } from 'next/navigation';
import { PublicHeader } from '@/components/public-header';
import { PublicFooter } from '@/components/public-footer';

export default function PricingPage() {
  const router = useRouter();

  const packages = [
    {
      name: 'Basic',
      price: '$400',
      duration: '4 weeks',
      sessions: '4 sessions',
      sessionLength: '30 minutes',
      features: [
        '30-min coaching sessions',
        'Weekly check-ins',
        'Unlimited AI voice coach access',
        '2 curated reading materials',
        'Progress tracking dashboard',
        'Mobile app access'
      ],
      ideal: 'Perfect for exploring coaching'
    },
    {
      name: 'Standard',
      price: '$750',
      duration: '8 weeks',
      sessions: '8 sessions',
      sessionLength: '45 minutes',
      features: [
        '45-min coaching sessions',
        'Bi-weekly check-ins',
        'Unlimited AI voice coach access',
        '3 curated reading materials',
        'Progress tracking dashboard',
        'Mid-point assessment',
        'Detailed progress reports',
        'Priority email support'
      ],
      popular: true,
      ideal: 'Most popular for sustained growth'
    },
    {
      name: 'Premium',
      price: '$1,200',
      duration: '12 weeks',
      sessions: '12 sessions',
      sessionLength: '60 minutes',
      features: [
        '60-min coaching sessions',
        'Weekly check-ins',
        'Unlimited AI voice coach access',
        '4 curated reading materials',
        'Complete assessment suite',
        'Comprehensive progress reports',
        'Priority support',
        'Video session recordings',
        'Voice journaling features',
        'Extended access (3 months post-program)'
      ],
      ideal: 'For comprehensive transformation'
    }
  ];

  return (
    <>
      <PublicHeader />
      <div className="min-h-screen bg-stone-50 pt-14">
        
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-white to-stone-50">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-stone-900 mb-6 leading-tight">
              Invest in yourself.<br />
              Transform your leadership.
            </h1>
            <p className="text-xl md:text-2xl text-stone-600 mb-8 max-w-2xl mx-auto">
              Choose the package that fits your timeline and goals. All include AI and human coaching.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-20 px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {packages.map((pkg) => (
              <div 
                key={pkg.name}
                className={`relative bg-white rounded-3xl p-6 md:p-8 transition-all hover:shadow-2xl ${
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
                
                <div className="flex flex-col gap-6">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-stone-200">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">
                        {pkg.name}
                      </h3>
                      <p className="text-sm text-stone-600 mb-3">{pkg.ideal}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl md:text-5xl font-bold text-stone-900">{pkg.price}</span>
                        <span className="text-stone-600">/ {pkg.duration}</span>
                      </div>
                    </div>
                    
                    <div className="text-center md:text-right">
                      <p className="text-lg font-semibold text-stone-900 mb-1">{pkg.sessions}</p>
                      <p className="text-sm text-stone-600">{pkg.sessionLength} each</p>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-stone-900 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-stone-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA */}
                  <div className="pt-4">
                    <button
                      onClick={() => router.push('/signup')}
                      className={`w-full md:w-auto px-8 py-3 rounded-full text-base font-medium transition-colors ${
                        pkg.popular
                          ? 'bg-stone-900 text-white hover:bg-stone-800'
                          : 'bg-stone-100 text-stone-900 hover:bg-stone-200'
                      }`}
                    >
                      Get Started with {pkg.name}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-stone-900 text-center mb-12">
              Compare packages
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-stone-200">
                    <th className="text-left py-4 px-4 text-stone-900 font-semibold">Feature</th>
                    <th className="text-center py-4 px-4 text-stone-900 font-semibold">Basic</th>
                    <th className="text-center py-4 px-4 text-stone-900 font-semibold">Standard</th>
                    <th className="text-center py-4 px-4 text-stone-900 font-semibold">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-stone-100">
                    <td className="py-3 px-4 text-stone-700">Coaching Sessions</td>
                    <td className="text-center py-3 px-4 text-stone-900">4</td>
                    <td className="text-center py-3 px-4 text-stone-900">8</td>
                    <td className="text-center py-3 px-4 text-stone-900">12</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-3 px-4 text-stone-700">Session Length</td>
                    <td className="text-center py-3 px-4 text-stone-900">30 min</td>
                    <td className="text-center py-3 px-4 text-stone-900">45 min</td>
                    <td className="text-center py-3 px-4 text-stone-900">60 min</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-3 px-4 text-stone-700">AI Voice Coach</td>
                    <td className="text-center py-3 px-4">✓</td>
                    <td className="text-center py-3 px-4">✓</td>
                    <td className="text-center py-3 px-4">✓</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-3 px-4 text-stone-700">Video Sessions</td>
                    <td className="text-center py-3 px-4 text-stone-400">—</td>
                    <td className="text-center py-3 px-4">✓</td>
                    <td className="text-center py-3 px-4">✓</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-3 px-4 text-stone-700">Session Recordings</td>
                    <td className="text-center py-3 px-4 text-stone-400">—</td>
                    <td className="text-center py-3 px-4 text-stone-400">—</td>
                    <td className="text-center py-3 px-4">✓</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-3 px-4 text-stone-700">Progress Reports</td>
                    <td className="text-center py-3 px-4 text-stone-400">—</td>
                    <td className="text-center py-3 px-4">✓</td>
                    <td className="text-center py-3 px-4">✓✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-stone-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start your transformation today
            </h2>
            <p className="text-xl text-stone-300 mb-12">
              Choose your package and begin in minutes
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

