'use client';

import { PublicHeader } from '@/components/public-header';
import { PublicFooter } from '@/components/public-footer';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MessageCircle, Clock, MapPin } from 'lucide-react';
import faqData from '@/content/faq.json';

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      value: 'support@yourcoachagent.com',
      description: 'We respond within 24 hours',
      action: 'mailto:support@yourcoachagent.com'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      value: '1-800-555-COACH',
      description: 'Mon-Fri, 9 AM - 8 PM EST',
      action: 'tel:+18005552622'
    },
    {
      icon: MapPin,
      title: 'Visit Our Office',
      value: 'Malmskillnadsgatan 29',
      description: '111 57 Stockholm, Sweden',
      action: 'https://www.google.com/maps/search/?api=1&query=Malmskillnadsgatan+29,+111+57+Stockholm'
    }
  ];

  const faqs = faqData as Array<{ category: string; question: string; answer: string }>;

  return (
    <>
      <PublicHeader />
      <div className="min-h-screen bg-white pt-14">
        
        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-b from-stone-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-stone-900 mb-6 leading-tight">
              We're here to help
            </h1>
            <p className="text-xl md:text-2xl text-stone-600 max-w-2xl mx-auto">
              Get support, ask questions, or share feedback. Our team responds quickly.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <a
                    key={method.title}
                    href={method.action}
                    className="block"
                  >
                    <Card className="hover:border-stone-400 transition-all hover:shadow-lg h-full">
                      <CardContent className="pt-6 text-center">
                        <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center mx-auto mb-4">
                          <Icon className="h-6 w-6 text-stone-900" />
                        </div>
                        <h3 className="text-lg font-semibold text-stone-900 mb-2">
                          {method.title}
                        </h3>
                        <p className="text-sm font-medium text-stone-900 mb-1">
                          {method.value}
                        </p>
                        <p className="text-xs text-stone-600">
                          {method.description}
                        </p>
                      </CardContent>
                    </Card>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Support Hours */}
        <section className="py-8 px-4 bg-stone-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-stone-700">
              <Clock className="h-5 w-5" />
              <p className="text-sm">
                <strong>Support Hours:</strong> Monday-Friday 9 AM - 8 PM EST, Saturday 10 AM - 5 PM EST
              </p>
            </div>
          </div>
        </section>

        {/* Office Location & Map */}
        <section className="py-16 px-4 bg-stone-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-4">
                Visit Our Office
              </h2>
              <p className="text-lg text-stone-600">
                Located in the heart of Stockholm
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Map */}
              <div className="rounded-3xl overflow-hidden shadow-lg h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.6789!2d18.0686!3d59.3343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d5f3f3f3f3f%3A0x0!2sMalmskillnadsgatan+29!5e0!3m2!1sen!2sse!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="YourCoachAgent Office Location"
                />
              </div>

              {/* Address Details */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-stone-900" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-stone-900 mb-2">
                          YourCoachAgent HQ
                        </h3>
                        <p className="text-stone-700 leading-relaxed">
                          Malmskillnadsgatan 29<br />
                          111 57 Stockholm<br />
                          Sweden
                        </p>
                        <a
                          href="https://www.google.com/maps/search/?api=1&query=Malmskillnadsgatan+29,+111+57+Stockholm"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-4 text-sm text-stone-900 hover:underline font-medium"
                        >
                          Get Directions →
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-stone-100 border-stone-200">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold text-stone-900 mb-3">Office Hours</h4>
                    <div className="space-y-2 text-sm text-stone-700">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span className="font-medium">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span className="font-medium">10:00 AM - 3:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span className="font-medium">Closed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <p className="text-sm text-stone-600">
                  Walk-ins welcome, but we recommend scheduling an appointment to ensure availability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-stone-600">
                Everything you need to know about YourCoachAgent
              </p>
            </div>

            {/* Group FAQs by Category */}
            {[...new Set(faqs.map(f => f.category))].map((category) => (
              <div key={category} className="mb-8">
                <h3 className="text-xl font-bold text-stone-900 mb-4 px-2">
                  {category}
                </h3>
                <div className="space-y-3">
                  {faqs
                    .filter(faq => faq.category === category)
                    .map((faq, index) => (
                      <details 
                        key={index}
                        className="group bg-stone-50 border border-stone-200 rounded-2xl p-6 hover:border-stone-400 transition-colors"
                      >
                        <summary className="flex items-start justify-between cursor-pointer list-none">
                          <h4 className="text-base font-semibold text-stone-900 pr-8">
                            {faq.question}
                          </h4>
                          <svg 
                            className="w-5 h-5 text-stone-600 flex-shrink-0 group-open:rotate-180 transition-transform"
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <p className="mt-4 text-stone-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-12 px-4 bg-stone-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-3">Emergency Support</h3>
            <p className="text-stone-300 mb-6">
              For urgent matters outside support hours, call our emergency line
            </p>
            <a 
              href="tel:+18005559999"
              className="inline-block px-8 py-3 bg-white text-stone-900 rounded-full font-medium hover:bg-stone-100 transition-colors"
            >
              1-800-555-9999
            </a>
          </div>
        </section>
      </div>
      <PublicFooter />
    </>
  );
}

