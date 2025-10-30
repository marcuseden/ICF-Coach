'use client';

import { PublicHeader } from '@/components/public-header';
import { PublicFooter } from '@/components/public-footer';

export default function TermsPage() {
  return (
    <>
      <PublicHeader />
      <div className="min-h-screen bg-white pt-14">
        {/* Hero Section for Better Visual Hierarchy */}
        <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-stone-50 to-white border-b border-stone-200">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-stone-900 mb-4 leading-tight">
              Terms of Service
            </h1>
            <p className="text-lg md:text-xl text-stone-600">
              Last updated: October 30, 2025
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <div className="prose prose-stone prose-lg max-w-none">
            {/* Introduction with better spacing */}
            <div className="text-lg text-stone-700 leading-relaxed mb-12 p-6 bg-stone-50 rounded-2xl border border-stone-200">
              <p className="mb-0">
                Welcome to YourCoachAgent! These Terms of Service ("Terms") constitute a legally binding agreement between you ("User" or "you") and YourCoachAgent ("Company," "we," "us," or "our"). By accessing or using our services, you agree to comply with and be bound by these Terms.
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-16 mb-6">1. User Agreement</h2>
            
            <h3 className="text-xl md:text-2xl font-bold text-stone-900 mt-8 mb-4">1.1 Acceptance of Terms</h3>
            <p className="text-lg text-stone-700 leading-relaxed mb-6">
              By accessing or using the services provided by YourCoachAgent, you confirm your acceptance of these Terms. If you do not agree to these Terms, you may not use our services.
            </p>

            <h3 className="text-xl md:text-2xl font-bold text-stone-900 mt-8 mb-4">1.2 Eligibility</h3>
            <p className="text-lg text-stone-700 leading-relaxed mb-6">
              You must be at least 18 years old to use our services. By using our services, you represent and warrant that you meet this age requirement.
            </p>

            <h3 className="text-xl md:text-2xl font-bold text-stone-900 mt-8 mb-4">1.3 Modification of Terms</h3>
            <p className="text-lg text-stone-700 leading-relaxed mb-8">
              We reserve the right to modify these Terms at any time. If we make changes, we will provide notice on our platform. Your continued use of the services after the changes indicates your acceptance of the revised Terms.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-16 mb-6">2. Service Description</h2>

            <h3 className="text-xl md:text-2xl font-bold text-stone-900 mt-8 mb-4">2.1 AI-Powered Voice Coaching</h3>
            <p className="text-lg text-stone-700 leading-relaxed mb-6">
              YourCoachAgent provides AI-powered voice coaching through ElevenLabs. This service offers automated, guided coaching sessions to enhance your personal and professional development.
            </p>

            <h3 className="text-xl md:text-2xl font-bold text-stone-900 mt-8 mb-4">2.2 Human ICF-Certified Coaching Sessions</h3>
            <p className="text-lg text-stone-700 leading-relaxed mb-6">
              We offer video and phone coaching sessions conducted by ICF-certified coaches, providing personalized guidance tailored to your goals.
            </p>

            <h3 className="text-xl md:text-2xl font-bold text-stone-900 mt-8 mb-4">2.3 Progress Tracking and Commitment Management</h3>
            <p className="text-lg text-stone-700 leading-relaxed mb-6">
              Our platform includes tools for tracking your progress and managing your commitments to ensure continuous development.
            </p>

            <h3 className="text-xl md:text-2xl font-bold text-stone-900 mt-8 mb-4">2.4 Subscription Packages</h3>
            <p className="text-lg text-stone-700 leading-relaxed mb-4">We offer three subscription packages:</p>
            <ul className="list-disc pl-6 mb-6 text-stone-700 space-y-2">
              <li>Basic: $400 / 4 weeks</li>
              <li>Standard: $750 / 8 weeks</li>
              <li>Premium: $1,200 / 12 weeks</li>
            </ul>

            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-16 mb-6">3. Payment Terms</h2>

            <h3 className="text-xl md:text-2xl font-bold text-stone-900 mt-8 mb-4">3.1 Billing</h3>
            <p className="text-lg text-stone-700 leading-relaxed mb-6">
              Subscription fees are billed in advance based on your selected plan. You authorize us to charge your payment method for the subscription fees.
            </p>

            <h3 className="text-xl md:text-2xl font-bold text-stone-900 mt-8 mb-4">3.2 Payment Information</h3>
            <p className="text-lg text-stone-700 leading-relaxed mb-8">
              You agree to provide accurate and complete payment information. If a payment is not successfully settled, due to expiration, insufficient funds, or otherwise, we may suspend or terminate your access to the services.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-16 mb-6">4. Cancellation Policy</h2>

            <h3 className="text-xl md:text-2xl font-bold text-stone-900 mt-8 mb-4">4.1 Cancellation</h3>
            <p className="text-lg text-stone-700 leading-relaxed mb-6">
              You may cancel your subscription at any time by contacting support or through your account settings. Your cancellation will take effect at the end of the current billing period.
            </p>

            <h3 className="text-xl md:text-2xl font-bold text-stone-900 mt-8 mb-4">4.2 Refunds</h3>
            <p className="text-lg text-stone-700 leading-relaxed mb-8">
              We do not offer refunds for partial periods or unused services unless required by law.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-16 mb-6">5. Intellectual Property</h2>

            <h3 className="text-xl md:text-2xl font-bold text-stone-900 mt-8 mb-4">5.1 Ownership</h3>
            <p className="text-lg text-stone-700 leading-relaxed mb-6">
              All content, features, and functionality on the YourCoachAgent platform, including the AI models, software, and designs, are owned by or licensed to us and are protected by intellectual property laws.
            </p>

            <h3 className="text-xl md:text-2xl font-bold text-stone-900 mt-8 mb-4">5.2 License</h3>
            <p className="text-lg text-stone-700 leading-relaxed mb-8">
              We grant you a limited, non-exclusive, non-transferable license to access and use the services for personal, non-commercial purposes.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-16 mb-6">6. Limitation of Liability</h2>

            <h3 className="text-xl md:text-2xl font-bold text-stone-900 mt-8 mb-4">6.1 Disclaimer</h3>
            <p className="text-lg text-stone-700 leading-relaxed mb-6">
              Our services are provided "as is" and "as available" without warranties of any kind. We do not guarantee that the services will be uninterrupted or error-free.
            </p>

            <h3 className="text-xl md:text-2xl font-bold text-stone-900 mt-8 mb-4">6.2 Limitation</h3>
            <p className="text-lg text-stone-700 leading-relaxed mb-8">
              To the fullest extent permitted by law, YourCoachAgent shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-16 mb-6">7. Dispute Resolution</h2>

            <h3 className="text-xl md:text-2xl font-bold text-stone-900 mt-8 mb-4">7.1 Governing Law</h3>
            <p className="text-lg text-stone-700 leading-relaxed mb-6">
              These Terms and any disputes related to them will be governed by the laws of the United States, without regard to conflict of law principles.
            </p>

            <h3 className="text-xl md:text-2xl font-bold text-stone-900 mt-8 mb-4">7.2 Arbitration</h3>
            <p className="text-lg text-stone-700 leading-relaxed mb-12">
              Any dispute arising under these Terms shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
            </p>

            <div className="mt-16 p-8 md:p-10 bg-stone-900 text-white rounded-3xl">
              <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
              <p className="text-lg leading-relaxed text-stone-200">
                If you have any questions or concerns about these Terms, please contact us at{' '}
                <a href="mailto:support@yourcoachagent.com" className="text-white underline hover:text-stone-100 font-medium">
                  support@yourcoachagent.com
                </a>. Thank you for choosing YourCoachAgent for your coaching needs.
              </p>
            </div>
          </div>
        </div>
      </div>
      <PublicFooter />
    </>
  );
}

