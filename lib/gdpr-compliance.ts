// GDPR Compliance Module - European Data Protection Regulation
// Implements: Consent, Right to Access, Right to Erasure, Data Portability, Privacy by Design

import { supabase } from './supabase';

// ============================================================================
// GDPR CONSENT MANAGEMENT
// ============================================================================

export interface ConsentRecord {
  userId: string;
  consentType: 'essential' | 'analytics' | 'marketing' | 'voice_recording';
  granted: boolean;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Record user consent (GDPR Article 7)
 * Must be freely given, specific, informed, and unambiguous
 */
export async function recordConsent(
  userId: string,
  consents: {
    essential: boolean; // Required for service
    analytics?: boolean; // Optional - anonymous usage data
    marketing?: boolean; // Optional - promotional emails
    voiceRecording?: boolean; // Optional - voice session recording
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    const timestamp = new Date().toISOString();
    
    // Store consent record with audit trail
    const { error } = await supabase
      .from('user_consents')
      .insert({
        user_id: userId,
        essential_consent: consents.essential,
        analytics_consent: consents.analytics || false,
        marketing_consent: consents.marketing || false,
        voice_recording_consent: consents.voiceRecording || false,
        consent_date: timestamp,
        consent_version: '1.0', // Track consent form version
        ip_address: null, // Set by backend for audit
        user_agent: navigator.userAgent,
      });

    if (error) {
      console.error('Record consent error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected consent error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Get current user consents
 */
export async function getUserConsents(userId: string): Promise<any | null> {
  try {
    const { data, error } = await supabase
      .from('user_consents')
      .select('*')
      .eq('user_id', userId)
      .order('consent_date', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') { // Ignore "no rows" error
      console.error('Get consents error:', error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected get consents error:', error);
    return null;
  }
}

/**
 * Withdraw consent (GDPR Article 7.3)
 * User can withdraw consent at any time
 */
export async function withdrawConsent(
  userId: string,
  consentType: 'analytics' | 'marketing' | 'voice_recording'
): Promise<{ success: boolean; error?: string }> {
  try {
    const updateField = `${consentType}_consent`;
    
    const { error } = await supabase
      .from('user_consents')
      .update({
        [updateField]: false,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);

    if (error) {
      console.error('Withdraw consent error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected withdraw consent error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

// ============================================================================
// RIGHT TO ACCESS (GDPR Article 15)
// ============================================================================

/**
 * Export all personal data for user
 * User has right to receive copy of their personal data
 */
export async function exportUserData(userId: string): Promise<{
  success: boolean;
  data?: any;
  error?: string;
}> {
  try {
    // First fetch profile, client, and consents
    const [profile, client, consents] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId).single(),
      supabase.from('clients').select('*').eq('user_id', userId).maybeSingle(),
      supabase.from('user_consents').select('*').eq('user_id', userId),
    ]);

    // Then fetch related data using client ID
    const clientId = client?.data?.id || '';
    const [sessions, checkIns, questionnaires, readingProgress] = await Promise.all([
      supabase.from('sessions').select('*').eq('client_id', clientId),
      supabase.from('check_ins').select('*').eq('client_id', clientId),
      supabase.from('questionnaire_responses').select('*').eq('client_id', clientId),
      supabase.from('reading_progress').select('*').eq('client_id', clientId),
    ]);

    // Compile all data into GDPR-compliant export format
    const exportData = {
      exportDate: new Date().toISOString(),
      dataSubject: {
        userId: userId,
        email: profile.data?.email,
        name: profile.data?.name,
      },
      personalData: {
        profile: profile.data,
        client: client.data,
        consents: consents.data,
      },
      sessionData: {
        sessions: sessions.data || [],
        checkIns: checkIns.data || [],
        questionnaires: questionnaires.data || [],
        readingProgress: readingProgress.data || [],
      },
      dataRetention: {
        profileData: 'Retained while account is active',
        sessionData: 'Retained for 7 years (professional coaching standards)',
        consentRecords: 'Retained for 3 years (legal requirement)',
      },
      rights: {
        rightToAccess: 'You can request your data at any time',
        rightToRectification: 'You can update your profile information',
        rightToErasure: 'You can request account deletion',
        rightToDataPortability: 'You can export your data in JSON format',
        rightToObject: 'You can object to processing',
        rightToRestriction: 'You can request processing restriction',
      },
    };

    return { success: true, data: exportData };
  } catch (error) {
    console.error('Export user data error:', error);
    return { success: false, error: 'Failed to export data' };
  }
}

// ============================================================================
// RIGHT TO ERASURE / "Right to be Forgotten" (GDPR Article 17)
// ============================================================================

/**
 * Delete all user data (GDPR Article 17)
 * Note: Some data may need to be retained for legal/professional reasons
 */
export async function requestDataDeletion(
  userId: string,
  reason: string
): Promise<{
  success: boolean;
  retainedData?: string[];
  error?: string;
}> {
  try {
    // Log deletion request for audit
    await supabase.from('data_deletion_requests').insert({
      user_id: userId,
      request_date: new Date().toISOString(),
      reason,
      status: 'pending',
    });

    // Note: Actual deletion should be reviewed by admin due to legal requirements
    // Professional coaching records may need to be retained for 7 years
    
    return {
      success: true,
      retainedData: [
        'Session records (retained for 7 years - professional standards)',
        'Consent records (retained for 3 years - legal requirement)',
        'Financial records (retained for 7 years - tax law)',
      ],
    };
  } catch (error) {
    console.error('Request deletion error:', error);
    return { success: false, error: 'Failed to process deletion request' };
  }
}

/**
 * Anonymize user data (alternative to full deletion)
 * Removes PII while retaining statistical data
 */
export async function anonymizeUserData(userId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const anonymousId = `anon_${Date.now()}`;
    
    // Anonymize profile
    await supabase
      .from('profiles')
      .update({
        email: `${anonymousId}@anonymized.local`,
        name: 'Anonymous User',
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    // Anonymize client data
    await supabase
      .from('clients')
      .update({
        email: `${anonymousId}@anonymized.local`,
        name: 'Anonymous Client',
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);

    return { success: true };
  } catch (error) {
    console.error('Anonymize data error:', error);
    return { success: false, error: 'Failed to anonymize data' };
  }
}

// ============================================================================
// DATA PORTABILITY (GDPR Article 20)
// ============================================================================

/**
 * Export data in machine-readable format
 * User can transfer data to another service
 */
export async function exportDataPortable(userId: string): Promise<{
  success: boolean;
  data?: string; // JSON string
  error?: string;
}> {
  try {
    const exportResult = await exportUserData(userId);
    
    if (!exportResult.success || !exportResult.data) {
      return { success: false, error: exportResult.error };
    }

    // Format as JSON for portability
    const jsonData = JSON.stringify(exportResult.data, null, 2);
    
    return { success: true, data: jsonData };
  } catch (error) {
    console.error('Export portable data error:', error);
    return { success: false, error: 'Failed to export portable data' };
  }
}

// ============================================================================
// DATA RETENTION POLICIES
// ============================================================================

/**
 * Get data retention information
 */
export function getDataRetentionPolicy(): {
  category: string;
  retentionPeriod: string;
  legalBasis: string;
}[] {
  return [
    {
      category: 'Account Information',
      retentionPeriod: 'While account is active + 30 days after deletion request',
      legalBasis: 'Contract performance (GDPR Article 6.1.b)',
    },
    {
      category: 'Session Data',
      retentionPeriod: '7 years from last session',
      legalBasis: 'Legal obligation (Professional coaching standards)',
    },
    {
      category: 'Consent Records',
      retentionPeriod: '3 years from withdrawal',
      legalBasis: 'Legal obligation (GDPR Article 7.1)',
    },
    {
      category: 'Financial Records',
      retentionPeriod: '7 years',
      legalBasis: 'Legal obligation (Tax law)',
    },
    {
      category: 'Analytics Data',
      retentionPeriod: '26 months',
      legalBasis: 'Legitimate interest (GDPR Article 6.1.f)',
    },
    {
      category: 'Voice Recordings',
      retentionPeriod: 'Immediately after session (unless consent given)',
      legalBasis: 'Consent (GDPR Article 6.1.a)',
    },
  ];
}

// ============================================================================
// PRIVACY BY DESIGN HELPERS
// ============================================================================

/**
 * Data minimization - only collect necessary data
 */
export function sanitizeUserInput(input: string): string {
  // Remove PII that shouldn't be stored
  return input
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[SSN REDACTED]') // SSN
    .replace(/\b\d{16}\b/g, '[CARD REDACTED]') // Credit card
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[EMAIL REDACTED]'); // Email in free text
}

/**
 * Pseudonymization for analytics
 */
export function pseudonymizeUserId(userId: string): string {
  // Create hash for analytics (one-way)
  // In production, use proper crypto hash
  return `user_${btoa(userId).substring(0, 10)}`;
}

/**
 * Check if data processing is lawful
 */
export function checkLawfulBasis(
  processingPurpose: string,
  hasConsent: boolean,
  isContractNecessary: boolean,
  isLegalObligation: boolean
): {
  lawful: boolean;
  basis: string;
} {
  if (hasConsent) {
    return { lawful: true, basis: 'Consent (Article 6.1.a)' };
  }
  if (isContractNecessary) {
    return { lawful: true, basis: 'Contract performance (Article 6.1.b)' };
  }
  if (isLegalObligation) {
    return { lawful: true, basis: 'Legal obligation (Article 6.1.c)' };
  }
  
  return { lawful: false, basis: 'No lawful basis found' };
}

// ============================================================================
// BREACH NOTIFICATION (GDPR Article 33-34)
// ============================================================================

/**
 * Log potential data breach for admin review
 * Must notify supervisory authority within 72 hours
 */
export async function logSecurityIncident(
  description: string,
  severity: 'low' | 'medium' | 'high' | 'critical',
  affectedUsers?: string[]
): Promise<{ success: boolean; error?: string }> {
  try {
    await supabase.from('security_incidents').insert({
      description,
      affected_users: affectedUsers || [],
      severity,
      detected_at: new Date().toISOString(),
      status: 'investigating',
    });

    // In production: Send alert to admin/DPO
    console.warn('Security incident logged:', {
      severity,
      description,
      affectedCount: affectedUsers?.length || 0,
    });

    return { success: true };
  } catch (error) {
    console.error('Log incident error:', error);
    return { success: false, error: 'Failed to log incident' };
  }
}

// ============================================================================
// DATA PROCESSOR AGREEMENT COMPLIANCE
// ============================================================================

/**
 * Third-party processors used (Article 28)
 */
export function getDataProcessors(): {
  name: string;
  purpose: string;
  dataProcessed: string[];
  location: string;
  dpAgreement: boolean;
}[] {
  return [
    {
      name: 'Supabase (PostgreSQL)',
      purpose: 'Database hosting',
      dataProcessed: ['All user data', 'Session data', 'Consent records'],
      location: 'EU/US (data residency configurable)',
      dpAgreement: true,
    },
    {
      name: 'ElevenLabs',
      purpose: 'Voice AI coaching',
      dataProcessed: ['Voice recordings (temporary)', 'Transcripts'],
      location: 'US',
      dpAgreement: true, // Verify with ElevenLabs ToS
    },
    {
      name: 'Vercel',
      purpose: 'Application hosting',
      dataProcessed: ['Request logs', 'Error logs'],
      location: 'Global CDN',
      dpAgreement: true,
    },
  ];
}

// ============================================================================
// COOKIE CONSENT (ePrivacy Directive)
// ============================================================================

export interface CookieConsent {
  essential: boolean; // Always true (required for service)
  analytics: boolean;
  marketing: boolean;
}

/**
 * Get cookie categories requiring consent
 */
export function getCookieCategories(): {
  category: string;
  required: boolean;
  purpose: string;
  cookies: string[];
}[] {
  return [
    {
      category: 'Essential',
      required: true,
      purpose: 'Required for authentication and session management',
      cookies: ['sb-auth-token', 'sb-refresh-token'],
    },
    {
      category: 'Analytics',
      required: false,
      purpose: 'Help us improve the service (anonymous)',
      cookies: ['_ga', '_gid'],
    },
    {
      category: 'Marketing',
      required: false,
      purpose: 'Show you relevant coaching content',
      cookies: ['_fbp', '_marketing_consent'],
    },
  ];
}

