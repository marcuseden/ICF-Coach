import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
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

    // Fetch all coaching sessions
    const { data: sessions, error: sessionsError } = await supabase
      .from('coaching_sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (sessionsError) {
      console.error('Error fetching sessions:', sessionsError);
      return NextResponse.json(
        { error: 'Failed to fetch sessions' },
        { status: 500 }
      );
    }

    // Fetch all commitments
    const { data: commitments, error: commitmentsError } = await supabase
      .from('coaching_commitments')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (commitmentsError) {
      console.error('Error fetching commitments:', commitmentsError);
      return NextResponse.json(
        { error: 'Failed to fetch commitments' },
        { status: 500 }
      );
    }

    // Calculate statistics
    const completedSessions = sessions?.filter(s => s.ended_at).length || 0;
    const activeCommitments = commitments?.filter(c => c.status === 'active').length || 0;
    const doneCommitments = commitments?.filter(c => c.status === 'done').length || 0;
    
    const aiSessions = sessions?.filter(s => s.mode === 'ai').length || 0;
    const humanSessions = sessions?.filter(s => s.mode === 'human').length || 0;

    // Calculate average confidence for active commitments
    const activeCommitmentsWithConfidence = commitments?.filter(
      c => c.status === 'active' && c.confidence
    ) || [];
    const avgConfidence = activeCommitmentsWithConfidence.length > 0
      ? activeCommitmentsWithConfidence.reduce((sum, c) => sum + c.confidence, 0) / activeCommitmentsWithConfidence.length
      : null;

    // Get recent activity (last 5 items)
    const recentActivity = [
      ...sessions.slice(0, 3).map(s => ({
        type: 'session',
        id: s.id,
        timestamp: s.created_at,
        description: `${s.mode === 'ai' ? 'AI' : 'Human'} coaching session${s.focus_area ? ` on ${s.focus_area}` : ''}`
      })),
      ...commitments.slice(0, 2).map(c => ({
        type: 'commitment',
        id: c.id,
        timestamp: c.created_at,
        description: c.text,
        status: c.status
      }))
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5);

    return NextResponse.json({
      success: true,
      data: {
        sessions: sessions || [],
        commitments: commitments || [],
        stats: {
          total_sessions: sessions?.length || 0,
          completed_sessions: completedSessions,
          ai_sessions: aiSessions,
          human_sessions: humanSessions,
          total_commitments: commitments?.length || 0,
          active_commitments: activeCommitments,
          done_commitments: doneCommitments,
          average_confidence: avgConfidence ? parseFloat(avgConfidence.toFixed(1)) : null
        },
        recent_activity: recentActivity
      }
    });

  } catch (error) {
    console.error('Unexpected error in dashboard:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST endpoint for updating commitment status
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

    const body = await request.json();
    const { commitment_id, status } = body;

    if (!commitment_id || !status) {
      return NextResponse.json(
        { error: 'commitment_id and status are required' },
        { status: 400 }
      );
    }

    if (!['active', 'done', 'dropped'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be active, done, or dropped' },
        { status: 400 }
      );
    }

    // Update commitment status
    const { data, error } = await supabase
      .from('coaching_commitments')
      .update({ status })
      .eq('id', commitment_id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating commitment:', error);
      return NextResponse.json(
        { error: 'Failed to update commitment' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      commitment: data
    });

  } catch (error) {
    console.error('Unexpected error in dashboard POST:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

