'use client';

// GDPR Privacy Dashboard - User Data Management
// Allows users to exercise their GDPR rights

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  Trash2, 
  Shield, 
  Eye, 
  FileText, 
  Clock,
  AlertTriangle,
  CheckCircle2,
  Settings
} from 'lucide-react';
import { exportUserData, requestDataDeletion, exportDataPortable } from '@/lib/gdpr-compliance';

interface PrivacyDashboardProps {
  userId: string;
  userEmail: string;
}

export function PrivacyDashboard({ userId, userEmail }: PrivacyDashboardProps) {
  const [loading, setLoading] = useState(false);
  const [exportStatus, setExportStatus] = useState<'idle' | 'exporting' | 'success' | 'error'>('idle');
  const [deleteRequested, setDeleteRequested] = useState(false);

  const handleExportData = async () => {
    setLoading(true);
    setExportStatus('exporting');

    try {
      const result = await exportDataPortable(userId);
      
      if (result.success && result.data) {
        // Create downloadable file
        const blob = new Blob([result.data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `icf-coach-data-${userEmail}-${new Date().toISOString()}.json`;
        link.click();
        URL.revokeObjectURL(url);
        
        setExportStatus('success');
      } else {
        setExportStatus('error');
      }
    } catch (error) {
      console.error('Export error:', error);
      setExportStatus('error');
    } finally {
      setLoading(false);
      setTimeout(() => setExportStatus('idle'), 3000);
    }
  };

  const handleRequestDeletion = async () => {
    if (!confirm('Are you sure you want to request account deletion? This action cannot be undone. Some data may be retained for legal/professional requirements.')) {
      return;
    }

    setLoading(true);

    try {
      const result = await requestDataDeletion(userId, 'User requested via Privacy Dashboard');
      
      if (result.success) {
        setDeleteRequested(true);
        alert('Deletion request submitted. You will receive an email confirmation within 72 hours. Some data may be retained for legal compliance.');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Deletion request error:', error);
      alert('Failed to submit deletion request. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Privacy & Data Management</h1>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-stone-100 dark:bg-stone-900">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rights">Your Rights</TabsTrigger>
          <TabsTrigger value="consent">Consent</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-4">
          <Card className="border-stone-200 dark:border-stone-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Data Protection Overview
              </CardTitle>
              <CardDescription>
                Your data is protected under GDPR (General Data Protection Regulation)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-900 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Data Controller</p>
                    <p className="text-xs text-muted-foreground">ICF Coach Platform</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    EU Compliant
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-900 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Your Account</p>
                    <p className="text-xs text-muted-foreground">{userEmail}</p>
                  </div>
                  <Badge variant="outline">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-900 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Data Location</p>
                    <p className="text-xs text-muted-foreground">EU/EEA Servers (Supabase)</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>

                <div className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-900 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Encryption</p>
                    <p className="text-xs text-muted-foreground">AES-256 at rest, TLS 1.3 in transit</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* YOUR RIGHTS TAB */}
        <TabsContent value="rights" className="space-y-4">
          {/* Right to Access */}
          <Card className="border-stone-200 dark:border-stone-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Download className="h-5 w-5" />
                Right to Access (Article 15)
              </CardTitle>
              <CardDescription>
                Download a complete copy of your personal data in machine-readable format
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleExportData}
                disabled={loading || exportStatus === 'exporting'}
                className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-900"
              >
                {exportStatus === 'exporting' ? (
                  <>Exporting Data...</>
                ) : exportStatus === 'success' ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Export Complete!
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Export My Data (JSON)
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Includes: Profile, sessions, check-ins, questionnaires, consent records, and all personal data
              </p>
            </CardContent>
          </Card>

          {/* Right to Erasure */}
          <Card className="border-stone-200 dark:border-stone-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Right to Erasure (Article 17)
              </CardTitle>
              <CardDescription>
                Request permanent deletion of your account and personal data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {!deleteRequested ? (
                <>
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-3 rounded-lg">
                    <div className="flex gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
                      <div className="text-xs space-y-1">
                        <p className="font-medium">Important Notes:</p>
                        <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                          <li>Session records retained for 7 years (professional coaching standards)</li>
                          <li>Financial records retained for 7 years (tax law)</li>
                          <li>Consent records retained for 3 years (GDPR requirement)</li>
                          <li>Personal identifiers will be anonymized</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleRequestDeletion}
                    disabled={loading}
                    variant="outline"
                    className="w-full border-red-300 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Request Account Deletion
                  </Button>
                </>
              ) : (
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 p-4 rounded-lg text-center">
                  <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="font-medium text-sm mb-1">Deletion Request Submitted</p>
                  <p className="text-xs text-muted-foreground">
                    You will receive confirmation within 72 hours
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right to Rectification */}
          <Card className="border-stone-200 dark:border-stone-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Right to Rectification (Article 16)
              </CardTitle>
              <CardDescription>
                Update or correct your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full border-stone-300 dark:border-stone-700"
                onClick={() => window.location.href = '/profile/edit'}
              >
                <Settings className="h-4 w-4 mr-2" />
                Edit My Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CONSENT TAB */}
        <TabsContent value="consent" className="space-y-4">
          <Card className="border-stone-200 dark:border-stone-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Manage Your Consent
              </CardTitle>
              <CardDescription>
                Control how we process your data (GDPR Article 6-7)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-stone-200 dark:border-stone-800 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Essential Cookies</p>
                    <p className="text-xs text-muted-foreground">Required for service</p>
                  </div>
                  <Badge className="bg-stone-200 text-stone-700 border-stone-300">
                    Required
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 border border-stone-200 dark:border-stone-800 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Analytics</p>
                    <p className="text-xs text-muted-foreground">Anonymous usage data</p>
                  </div>
                  <Button size="sm" variant="outline">Manage</Button>
                </div>

                <div className="flex items-center justify-between p-3 border border-stone-200 dark:border-stone-800 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Marketing</p>
                    <p className="text-xs text-muted-foreground">Promotional emails</p>
                  </div>
                  <Button size="sm" variant="outline">Manage</Button>
                </div>

                <div className="flex items-center justify-between p-3 border border-stone-200 dark:border-stone-800 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Voice Recording</p>
                    <p className="text-xs text-muted-foreground">Store voice sessions</p>
                  </div>
                  <Button size="sm" variant="outline">Manage</Button>
                </div>
              </div>

              <Separator className="bg-stone-200 dark:bg-stone-800" />

              <p className="text-xs text-muted-foreground">
                You can withdraw consent at any time. Changes take effect immediately.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* RETENTION TAB */}
        <TabsContent value="retention" className="space-y-4">
          <Card className="border-stone-200 dark:border-stone-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Data Retention Periods
              </CardTitle>
              <CardDescription>
                How long we keep different types of data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">Account Information</p>
                    <Badge variant="outline">Active + 30 days</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Kept while account is active, deleted 30 days after deletion request
                  </p>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">Session Data</p>
                    <Badge variant="outline">7 years</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Retained for professional coaching standards (anonymized after deletion)
                  </p>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">Consent Records</p>
                    <Badge variant="outline">3 years</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Required to prove consent compliance (GDPR Article 7.1)
                  </p>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">Analytics Data</p>
                    <Badge variant="outline">26 months</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Anonymous usage statistics (GDPR recommendation)
                  </p>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">Voice Recordings</p>
                    <Badge variant="outline">7 years</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Only if consent given. Deleted immediately otherwise.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer Links */}
      <div className="flex justify-center gap-4 text-xs text-muted-foreground">
        <a href="/privacy" className="hover:underline">Privacy Policy</a>
        <span>•</span>
        <a href="/terms" className="hover:underline">Terms of Service</a>
        <span>•</span>
        <a href="/dpo" className="hover:underline">Contact DPO</a>
      </div>
    </div>
  );
}

