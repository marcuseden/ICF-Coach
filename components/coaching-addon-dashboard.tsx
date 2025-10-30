'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import type { DashboardData, CoachingCommitment } from '@/lib/types';

interface CoachingAddonDashboardProps {
  onStartSession?: (mode: 'ai' | 'human') => void;
}

export function CoachingAddonDashboard({ onStartSession }: CoachingAddonDashboardProps) {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingCommitment, setUpdatingCommitment] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/coach/dashboard');
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      
      const result = await response.json();
      setDashboardData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const updateCommitmentStatus = async (commitmentId: string, status: 'active' | 'done' | 'dropped') => {
    try {
      setUpdatingCommitment(commitmentId);
      const response = await fetch('/api/coach/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commitment_id: commitmentId, status })
      });

      if (!response.ok) {
        throw new Error('Failed to update commitment');
      }

      // Refresh dashboard data
      await fetchDashboardData();
    } catch (err) {
      console.error('Error updating commitment:', err);
    } finally {
      setUpdatingCommitment(null);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-stone-100 text-stone-800 border-stone-200';
      case 'done': return 'bg-stone-200 text-stone-900 border-stone-300';
      case 'dropped': return 'bg-stone-50 text-stone-500 border-stone-100';
      default: return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8 text-center">
            <p className="text-stone-600">Loading your coaching dashboard...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8 text-center">
            <p className="text-stone-900 font-medium mb-2">Error loading dashboard</p>
            <p className="text-stone-600 text-sm mb-4">{error}</p>
            <Button onClick={fetchDashboardData}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const { sessions, commitments, stats, recent_activity } = dashboardData;
  const activeCommitments = commitments.filter(c => c.status === 'active');

  return (
    <div className="min-h-screen bg-stone-50 p-4 pb-20">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <div className="text-center space-y-2 pt-4">
          <h1 className="text-2xl font-bold text-stone-900">Coaching Dashboard</h1>
          <p className="text-stone-600">Track your coaching sessions and commitments</p>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Start a Session</CardTitle>
            <CardDescription>Choose your coaching mode</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Button 
              className="flex-1"
              onClick={() => onStartSession?.('ai')}
            >
              AI Coach Session
            </Button>
            <Button 
              className="flex-1"
              variant="outline"
              onClick={() => onStartSession?.('human')}
            >
              Human Coach Session
            </Button>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-stone-900">{stats.completed_sessions}</p>
                <p className="text-sm text-stone-600">Sessions Completed</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-stone-900">{stats.active_commitments}</p>
                <p className="text-sm text-stone-600">Active Commitments</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-medium text-stone-900">{stats.ai_sessions}</p>
                <p className="text-xs text-stone-600">AI Sessions</p>
              </div>
              <div>
                <p className="text-lg font-medium text-stone-900">{stats.human_sessions}</p>
                <p className="text-xs text-stone-600">Human Sessions</p>
              </div>
              <div>
                <p className="text-lg font-medium text-stone-900">
                  {stats.average_confidence ? `${stats.average_confidence}/10` : 'N/A'}
                </p>
                <p className="text-xs text-stone-600">Avg Confidence</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Commitments */}
        {activeCommitments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Active Commitments</CardTitle>
              <CardDescription>Your current action items</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-96">
                <div className="space-y-3">
                  {activeCommitments.map((commitment) => (
                    <CommitmentCard
                      key={commitment.id}
                      commitment={commitment}
                      onUpdateStatus={updateCommitmentStatus}
                      isUpdating={updatingCommitment === commitment.id}
                      formatDate={formatDate}
                    />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recent_activity.map((activity, index) => (
                <div key={`${activity.type}-${activity.id}`}>
                  <div className="flex items-start gap-3">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm text-stone-900">{activity.description}</p>
                      <p className="text-xs text-stone-600">{formatDate(activity.timestamp)}</p>
                    </div>
                    {activity.status && (
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                    )}
                  </div>
                  {index < recent_activity.length - 1 && <Separator className="mt-3" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Session History */}
        {sessions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Session History</CardTitle>
              <CardDescription>All your coaching sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-96">
                <div className="space-y-3">
                  {sessions.map((session, index) => (
                    <div key={session.id}>
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-stone-100 text-stone-800 border-stone-200">
                                {session.mode === 'ai' ? 'AI' : 'Human'}
                              </Badge>
                              {session.focus_area && (
                                <p className="text-sm font-medium text-stone-900">
                                  {session.focus_area}
                                </p>
                              )}
                            </div>
                            <p className="text-xs text-stone-600">
                              {formatDate(session.created_at)}
                            </p>
                          </div>
                          {session.ended_at && (
                            <Badge className="bg-stone-200 text-stone-900 border-stone-300">
                              Completed
                            </Badge>
                          )}
                        </div>
                        {session.summary && (
                          <p className="text-sm text-stone-700">{session.summary}</p>
                        )}
                      </div>
                      {index < sessions.length - 1 && <Separator className="mt-3" />}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

interface CommitmentCardProps {
  commitment: CoachingCommitment;
  onUpdateStatus: (id: string, status: 'active' | 'done' | 'dropped') => void;
  isUpdating: boolean;
  formatDate: (date: string) => string;
}

function CommitmentCard({ commitment, onUpdateStatus, isUpdating, formatDate }: CommitmentCardProps) {
  return (
    <div className="p-3 border border-stone-200 rounded-lg space-y-3 bg-white">
      <div className="space-y-2">
        <p className="text-sm font-medium text-stone-900">{commitment.text}</p>
        <div className="flex items-center gap-2 text-xs text-stone-600">
          {commitment.confidence && (
            <span>Confidence: {commitment.confidence}/10</span>
          )}
          {commitment.due_date && (
            <>
              <span>•</span>
              <span>Due: {formatDate(commitment.due_date)}</span>
            </>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={() => onUpdateStatus(commitment.id, 'done')}
          disabled={isUpdating}
        >
          Mark Done
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={() => onUpdateStatus(commitment.id, 'dropped')}
          disabled={isUpdating}
        >
          Drop
        </Button>
      </div>
    </div>
  );
}

