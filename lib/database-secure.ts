// Secure Database Operations - Protected by RLS (Row Level Security)
// All queries automatically filtered by Supabase RLS policies
import { supabase } from './supabase';
import type { Client, Session as CoachingSession, CheckIn } from './types';

// ============================================================================
// CLIENT OPERATIONS (Protected by RLS)
// ============================================================================

/**
 * Get current user's client profile
 * RLS Policy: Users can only access their own client data
 */
export async function getClientProfile(userId: string): Promise<Client | null> {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select(`
        *,
        package:packages(*)
      `)
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Get client error:', error.message);
      return null;
    }

    return data as Client;
  } catch (error) {
    console.error('Unexpected get client error:', error);
    return null;
  }
}

/**
 * Create client profile
 * RLS Policy: Users can only create client data for themselves
 */
export async function createClientProfile(
  userId: string,
  name: string,
  email: string,
  packageId: 'basic' | 'standard' | 'premium'
): Promise<{ success: boolean; clientId?: string; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('clients')
      .insert({
        user_id: userId,
        name,
        email,
        package_id: packageId,
        start_date: new Date().toISOString(),
        current_session: 1,
      })
      .select()
      .single();

    if (error) {
      console.error('Create client error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, clientId: data.id };
  } catch (error) {
    console.error('Unexpected create client error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Update client profile
 * RLS Policy: Users can only update their own client data
 */
export async function updateClientSession(
  userId: string,
  sessionNumber: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('clients')
      .update({
        current_session: sessionNumber,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);

    if (error) {
      console.error('Update client error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected update client error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

// ============================================================================
// SESSION OPERATIONS (Protected by RLS)
// ============================================================================

/**
 * Get all sessions for current user's client
 * RLS Policy: Users can only view their own sessions
 */
export async function getSessions(clientId: string): Promise<CoachingSession[]> {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('client_id', clientId)
      .order('session_number', { ascending: true });

    if (error) {
      console.error('Get sessions error:', error.message);
      return [];
    }

    return data as CoachingSession[];
  } catch (error) {
    console.error('Unexpected get sessions error:', error);
    return [];
  }
}

/**
 * Create a new coaching session
 * RLS Policy: Users can only create sessions for their own client profile
 */
export async function createSession(
  clientId: string,
  sessionData: {
    sessionNumber: number;
    sessionType: 'text' | 'voice';
    focus?: string;
    insights?: string[];
    committedAction?: string;
    actionDeadline?: Date;
    notes?: string[];
  }
): Promise<{ success: boolean; sessionId?: string; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .insert({
        client_id: clientId,
        session_number: sessionData.sessionNumber,
        session_type: sessionData.sessionType,
        focus: sessionData.focus,
        insights: sessionData.insights || [],
        committed_action: sessionData.committedAction,
        action_deadline: sessionData.actionDeadline?.toISOString(),
        notes: sessionData.notes || [],
        status: 'completed',
        date: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Create session error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, sessionId: data.id };
  } catch (error) {
    console.error('Unexpected create session error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Update an existing session
 * RLS Policy: Users can only update their own sessions
 */
export async function updateSession(
  sessionId: string,
  updates: Partial<CoachingSession>
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('sessions')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', sessionId);

    if (error) {
      console.error('Update session error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected update session error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

// ============================================================================
// CHECK-IN OPERATIONS (Protected by RLS)
// ============================================================================

/**
 * Get all check-ins for current user's client
 * RLS Policy: Users can only view their own check-ins
 */
export async function getCheckIns(clientId: string): Promise<CheckIn[]> {
  try {
    const { data, error } = await supabase
      .from('check_ins')
      .select('*')
      .eq('client_id', clientId)
      .order('date', { ascending: false });

    if (error) {
      console.error('Get check-ins error:', error.message);
      return [];
    }

    return data as CheckIn[];
  } catch (error) {
    console.error('Unexpected get check-ins error:', error);
    return [];
  }
}

/**
 * Create a check-in
 * RLS Policy: Users can only create check-ins for themselves
 */
export async function createCheckIn(
  clientId: string,
  sessionId: string,
  actionRating: number,
  insight: string
): Promise<{ success: boolean; checkInId?: string; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('check_ins')
      .insert({
        client_id: clientId,
        session_id: sessionId,
        action_rating: actionRating,
        insight,
        date: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Create check-in error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, checkInId: data.id };
  } catch (error) {
    console.error('Unexpected create check-in error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

// ============================================================================
// QUESTIONNAIRE OPERATIONS (Protected by RLS)
// ============================================================================

/**
 * Get questionnaire responses for current user
 * RLS Policy: Users can only view their own responses
 */
export async function getQuestionnaireResponses(
  clientId: string,
  type?: 'intake' | 'midpoint' | 'exit'
): Promise<any[]> {
  try {
    let query = supabase
      .from('questionnaire_responses')
      .select('*')
      .eq('client_id', clientId);

    if (type) {
      query = query.eq('questionnaire_type', type);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Get questionnaires error:', error.message);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Unexpected get questionnaires error:', error);
    return [];
  }
}

/**
 * Submit questionnaire responses
 * RLS Policy: Users can only submit responses for themselves
 */
export async function submitQuestionnaire(
  clientId: string,
  questionnaireId: string,
  type: 'intake' | 'midpoint' | 'exit',
  responses: Record<string, any>
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('questionnaire_responses')
      .insert({
        client_id: clientId,
        questionnaire_id: questionnaireId,
        questionnaire_type: type,
        responses,
      });

    if (error) {
      console.error('Submit questionnaire error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected submit questionnaire error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

// ============================================================================
// READING PROGRESS OPERATIONS (Protected by RLS)
// ============================================================================

/**
 * Get reading progress for current user
 * RLS Policy: Users can only view their own reading progress
 */
export async function getReadingProgress(clientId: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('reading_progress')
      .select('material_id')
      .eq('client_id', clientId)
      .eq('completed', true);

    if (error) {
      console.error('Get reading progress error:', error.message);
      return [];
    }

    return data.map(item => item.material_id);
  } catch (error) {
    console.error('Unexpected get reading progress error:', error);
    return [];
  }
}

/**
 * Mark reading material as complete
 * RLS Policy: Users can only update their own reading progress
 */
export async function markReadingComplete(
  clientId: string,
  materialId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('reading_progress')
      .upsert({
        client_id: clientId,
        material_id: materialId,
        completed: true,
        completed_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Mark reading complete error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected mark reading error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

// ============================================================================
// PACKAGE INFORMATION (Public - No RLS needed)
// ============================================================================

/**
 * Get all available packages
 * Public data, no RLS needed
 */
export async function getPackages(): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('sessions', { ascending: true });

    if (error) {
      console.error('Get packages error:', error.message);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Unexpected get packages error:', error);
    return [];
  }
}

/**
 * Get specific package by ID
 * Public data, no RLS needed
 */
export async function getPackage(packageId: string): Promise<any | null> {
  try {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('id', packageId)
      .single();

    if (error) {
      console.error('Get package error:', error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected get package error:', error);
    return null;
  }
}

