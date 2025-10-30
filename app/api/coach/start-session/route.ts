import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get request body
    const body = await request.json();
    const { mode = 'ai' } = body;

    // Fetch active commitments
    const { data: commitments, error: commitmentsError } = await supabase
      .from('coaching_commitments')
      .select('id, text, confidence, status, due_date, created_at')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (commitmentsError) {
      console.error('Error fetching commitments:', commitmentsError);
      return NextResponse.json(
        { error: 'Failed to fetch commitments' },
        { status: 500 }
      );
    }

    // Fetch recent sessions for context
    const { data: recentSessions, error: sessionsError } = await supabase
      .from('coaching_sessions')
      .select('id, focus_area, summary, commitment, created_at, ended_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(3);

    if (sessionsError) {
      console.error('Error fetching sessions:', sessionsError);
    }

    // Create new session record
    const { data: newSession, error: insertError } = await supabase
      .from('coaching_sessions')
      .insert({
        user_id: user.id,
        mode: mode
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating session:', insertError);
      return NextResponse.json(
        { error: 'Failed to create session' },
        { status: 500 }
      );
    }

    // Build context for ElevenLabs agent
    const context = {
      session_id: newSession.id,
      coach_role: 'ICF Management Coach',
      coaching_mode: mode,
      open_commitments: commitments || [],
      recent_sessions: recentSessions || [],
      suggested_opening_prompt:
        'Welcome back. What leadership or management topic feels most alive for you today?',
      icf_principles: [
        'Ask powerful questions rather than giving advice',
        'Listen deeply and reflect back what you hear',
        'Maintain presence and create a safe space',
        'Focus on the client\'s agenda, not your own',
        'Evoke awareness and facilitate growth'
      ]
    };

    return NextResponse.json({
      success: true,
      session: newSession,
      context
    });

  } catch (error) {
    console.error('Unexpected error in start-session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

