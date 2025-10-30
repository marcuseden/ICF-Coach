'use client';

// GDPR Consent Banner - Cookie Consent & Data Processing
// Complies with ePrivacy Directive and GDPR Article 6-7

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, Cookie, Eye, BarChart3, Mail, Mic, Check, X } from 'lucide-react';

interface ConsentState {
  essential: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  voiceRecording: boolean;
}

export function GDPRConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consents, setConsents] = useState<ConsentState>({
    essential: true,
    analytics: false,
    marketing: false,
    voiceRecording: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    const savedConsent = localStorage.getItem('gdpr_consent');
    if (!savedConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allConsents = {
      essential: true,
      analytics: true,
      marketing: true,
      voiceRecording: true,
    };
    saveConsent(allConsents);
  };

  const handleAcceptEssential = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
      voiceRecording: false,
    };
    saveConsent(essentialOnly);
  };

  const handleCustomSave = () => {
    saveConsent(consents);
  };

  const saveConsent = (consentData: ConsentState) => {
    localStorage.setItem('gdpr_consent', JSON.stringify({
      ...consentData,
      timestamp: new Date().toISOString(),
      version: '1.0',
    }));
    
    // In production: Save to database via API
    // recordConsent(userId, consentData);
    
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 bg-stone-900/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-stone-200 dark:border-stone-800 shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-stone-900 dark:text-stone-100" />
            <CardTitle className="text-lg">Your Privacy Matters</CardTitle>
          </div>
          <CardDescription>
            We respect your privacy and comply with GDPR (European Data Protection Regulation).
            Please choose your data processing preferences.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {!showDetails ? (
            // Simple view
            <>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  We use cookies and process your personal data to provide coaching services, 
                  improve your experience, and comply with legal requirements.
                </p>
                <p>
                  <button
                    onClick={() => setShowDetails(true)}
                    className="text-stone-900 dark:text-stone-100 underline hover:no-underline"
                  >
                    View detailed settings
                  </button>
                  {' '}or accept our recommended settings.
                </p>
              </div>

              <Separator className="bg-stone-200 dark:bg-stone-800" />

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={handleAcceptAll}
                  className="flex-1 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-900"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Accept All
                </Button>
                <Button
                  onClick={handleAcceptEssential}
                  variant="outline"
                  className="flex-1 border-stone-300 dark:border-stone-700"
                >
                  <X className="h-4 w-4 mr-2" />
                  Essential Only
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                By clicking "Accept All", you consent to data processing as described in our{' '}
                <a href="/privacy" className="underline hover:no-underline">Privacy Policy</a>
              </p>
            </>
          ) : (
            // Detailed view
            <>
              <div className="space-y-4">
                {/* Essential Cookies */}
                <div className="flex items-start gap-3 p-3 bg-stone-50 dark:bg-stone-900 rounded-lg">
                  <Cookie className="h-5 w-5 text-stone-600 dark:text-stone-400 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-medium text-sm">Essential Cookies</h4>
                      <Badge className="bg-stone-200 text-stone-700 border-stone-300">
                        Required
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Required for authentication, session management, and core functionality.
                      Cannot be disabled.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-stone-900 dark:text-stone-100" />
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-start gap-3 p-3 border border-stone-200 dark:border-stone-800 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-stone-600 dark:text-stone-400 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-medium text-sm">Analytics</h4>
                      <Badge variant="outline" className="text-xs">
                        Optional
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Anonymous usage statistics to improve the coaching experience. No personal data shared.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => setConsents(prev => ({ ...prev, analytics: !prev.analytics }))}
                      className={`w-10 h-6 rounded-full transition-colors ${
                        consents.analytics
                          ? 'bg-stone-900 dark:bg-stone-100'
                          : 'bg-stone-200 dark:bg-stone-800'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        consents.analytics ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>

                {/* Marketing */}
                <div className="flex items-start gap-3 p-3 border border-stone-200 dark:border-stone-800 rounded-lg">
                  <Mail className="h-5 w-5 text-stone-600 dark:text-stone-400 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-medium text-sm">Marketing Communications</h4>
                      <Badge variant="outline" className="text-xs">
                        Optional
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Receive tips, resources, and updates about coaching packages. You can unsubscribe anytime.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => setConsents(prev => ({ ...prev, marketing: !prev.marketing }))}
                      className={`w-10 h-6 rounded-full transition-colors ${
                        consents.marketing
                          ? 'bg-stone-900 dark:bg-stone-100'
                          : 'bg-stone-200 dark:bg-stone-800'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        consents.marketing ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>

                {/* Voice Recording */}
                <div className="flex items-start gap-3 p-3 border border-stone-200 dark:border-stone-800 rounded-lg">
                  <Mic className="h-5 w-5 text-stone-600 dark:text-stone-400 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-medium text-sm">Voice Session Recording</h4>
                      <Badge variant="outline" className="text-xs">
                        Optional
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Store voice recordings for future playback. Recordings are encrypted and deleted after 7 years.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => setConsents(prev => ({ ...prev, voiceRecording: !prev.voiceRecording }))}
                      className={`w-10 h-6 rounded-full transition-colors ${
                        consents.voiceRecording
                          ? 'bg-stone-900 dark:bg-stone-100'
                          : 'bg-stone-200 dark:bg-stone-800'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        consents.voiceRecording ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              <Separator className="bg-stone-200 dark:bg-stone-800" />

              {/* GDPR Rights Information */}
              <div className="bg-stone-50 dark:bg-stone-900 p-3 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Eye className="h-4 w-4 text-stone-600 dark:text-stone-400 mt-0.5" />
                  <h4 className="text-xs font-medium">Your GDPR Rights</h4>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1 ml-6">
                  <li>• Right to access your data (export anytime)</li>
                  <li>• Right to rectification (update your profile)</li>
                  <li>• Right to erasure (delete your account)</li>
                  <li>• Right to data portability (download JSON)</li>
                  <li>• Right to withdraw consent (change settings anytime)</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={handleCustomSave}
                  className="flex-1 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-900"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
                <Button
                  onClick={() => setShowDetails(false)}
                  variant="outline"
                  className="border-stone-300 dark:border-stone-700"
                >
                  Back
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                Read our{' '}
                <a href="/privacy" className="underline hover:no-underline">Privacy Policy</a>
                {' '}and{' '}
                <a href="/terms" className="underline hover:no-underline">Terms of Service</a>
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

