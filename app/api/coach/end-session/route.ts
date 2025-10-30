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
    const { 
      session_id, 
      focus_area, 
      summary, 
      commitment,
      commitment_confidence,
      commitment_due_date
    } = body;

    if (!session_id) {
      return NextResponse.json(
        { error: 'session_id is required' },
        { status: 400 }
      );
    }

    // Update session with summary and commitment
    const { data: updatedSession, error: updateError } = await supabase
      .from('coaching_sessions')
      .update({
        focus_area,
        summary,
        commitment,
        ended_at: new Date().toISOString()
      })
      .eq('id', session_id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating session:', updateError);
      return NextResponse.json(
        { error: 'Failed to update session' },
        { status: 500 }
      );
    }

    // If there's a commitment, create a new commitment record
    let newCommitment = null;
    if (commitment && commitment.trim()) {
      const { data, error: commitmentError } = await supabase
        .from('coaching_commitments')
        .insert({
          user_id: user.id,
          session_id: session_id,
          text: commitment,
          confidence: commitment_confidence || null,
          due_date: commitment_due_date || null,
          status: 'active'
        })
        .select()
        .single();

      if (commitmentError) {
        console.error('Error creating commitment:', commitmentError);
        // Don't fail the whole request if commitment creation fails
      } else {
        newCommitment = data;
      }
    }

    // Get updated statistics
    const { data: stats } = await supabase
      .from('coaching_sessions')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .not('ended_at', 'is', null);

    const { data: activeCommitments } = await supabase
      .from('coaching_commitments')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('status', 'active');

    return NextResponse.json({
      success: true,
      session: updatedSession,
      commitment: newCommitment,
      stats: {
        total_sessions: stats?.length || 0,
        active_commitments: activeCommitments?.length || 0
      }
    });

  } catch (error) {
    console.error('Unexpected error in end-session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

