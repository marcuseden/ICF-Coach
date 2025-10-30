'use client';

import { PublicHeader } from '@/components/public-header';
import { PublicFooter } from '@/components/public-footer';

export default function PrivacyPage() {
  return (
    <>
      <PublicHeader />
      <div className="min-h-screen bg-white pt-14">
        {/* Hero Section for Better Visual Hierarchy */}
        <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-stone-50 to-white border-b border-stone-200">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-stone-900 mb-4 leading-tight">
              Privacy Policy
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
                Your privacy is important to us. This Privacy Policy explains how YourCoachAgent collects, uses, shares, and protects your information. By using our services, you agree to the terms outlined in this policy.
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-16 mb-6">Information Collection</h2>
            <p className="text-lg text-stone-700 leading-relaxed mb-6">YourCoachAgent collects the following types of information:</p>
            <ul className="list-disc pl-6 space-y-3 mb-8 text-stone-700">
              <li><strong>User Account Information:</strong> We collect your name, email address, and phone number when you create an account.</li>
              <li><strong>Session Data:</strong> This includes coaching conversations, commitments, and notes to help personalize and improve your experience.</li>
              <li><strong>Voice Recordings:</strong> We collect and process voice recordings from AI coaching sessions using ElevenLabs.</li>
              <li><strong>Video Session Metadata:</strong> Information about your video sessions conducted via Jitsi Meet, including timestamps and participant data.</li>
              <li><strong>Progress and Analytics Data:</strong> We collect data on your progress and usage patterns to provide analytics and insights.</li>
              <li><strong>Payment Information:</strong> Payments are processed via third-party processors; we do not store your payment information.</li>
            </ul>

            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-16 mb-6">How We Use Data</h2>
            <p className="text-lg text-stone-700 leading-relaxed mb-6">We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-3 mb-8 text-stone-700">
              <li>To provide, maintain, and improve our services</li>
              <li>To personalize your experience based on your interactions</li>
              <li>To communicate with you about your account and provide customer support</li>
              <li>To analyze usage patterns and enhance our platform's functionality</li>
              <li>To process payments and prevent fraudulent transactions</li>
            </ul>

            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-16 mb-6">Data Sharing</h2>
            <p className="text-lg text-stone-700 leading-relaxed mb-6">YourCoachAgent shares your information only under the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-3 mb-8 text-stone-700">
              <li><strong>Service Providers:</strong> We share information with Supabase, ElevenLabs, Jitsi Meet, and OpenAI to deliver our services.</li>
              <li><strong>Legal Compliance:</strong> We may disclose your information to comply with applicable laws or respond to lawful requests.</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred.</li>
            </ul>

            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-16 mb-6">Security Measures</h2>
            <p className="text-lg text-stone-700 leading-relaxed mb-8">
              We implement robust security measures to protect your information, including encryption, access controls, and regular security audits. However, no method of transmission over the internet is completely secure.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-16 mb-6">User Rights</h2>
            <p className="text-lg text-stone-700 leading-relaxed mb-6">You have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 space-y-3 mb-8 text-stone-700">
              <li><strong>Access:</strong> You can request access to your personal data</li>
              <li><strong>Rectification:</strong> You can request correction of inaccurate data</li>
              <li><strong>Erasure:</strong> You can request deletion of your data, subject to legal obligations</li>
              <li><strong>Restriction:</strong> You can request restriction of processing under certain conditions</li>
              <li><strong>Data Portability:</strong> You can request a copy of your data in a structured, machine-readable format</li>
              <li><strong>Objection:</strong> You can object to the processing of your data for direct marketing purposes</li>
            </ul>

            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-16 mb-6">GDPR Compliance</h2>
            <p className="text-lg text-stone-700 leading-relaxed mb-8">
              YourCoachAgent complies with the General Data Protection Regulation (GDPR). We collect and process personal data based on lawful grounds, such as your consent or our legitimate interests.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-16 mb-6">California Privacy Rights</h2>
            <p className="text-lg text-stone-700 leading-relaxed mb-8">
              California residents have specific rights under the California Consumer Privacy Act (CCPA), including the right to know, delete, and opt-out of the sale of personal information. YourCoachAgent does not sell your personal information.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-16 mb-6">Cookies</h2>
            <p className="text-lg text-stone-700 leading-relaxed mb-8">
              We use cookies to enhance your experience on our platform. You can control cookie settings through your browser preferences. Note that disabling cookies may affect functionality.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-16 mb-6">Data Retention</h2>
            <p className="text-lg text-stone-700 leading-relaxed mb-12">
              We retain your personal data only as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>

            <div className="mt-16 p-8 md:p-10 bg-stone-900 text-white rounded-3xl">
              <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
              <p className="text-lg leading-relaxed text-stone-200">
                If you have questions or concerns about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@yourcoachagent.com" className="text-white underline hover:text-stone-100 font-medium">
                  privacy@yourcoachagent.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <PublicFooter />
    </>
  );
}

