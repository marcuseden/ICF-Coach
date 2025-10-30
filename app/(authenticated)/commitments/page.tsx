'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Calendar, Target, TrendingUp, CheckCircle2, XCircle } from 'lucide-react';

export default function CommitmentsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [commitments, setCommitments] = useState<any[]>([]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    
    setUser(currentUser);
    fetchCommitments();
  }, [router]);

  const fetchCommitments = async () => {
    try {
      // Fetch from coaching add-on API
      const response = await fetch('/api/coach/dashboard');
      if (response.ok) {
        const result = await response.json();
        setCommitments(result.data?.commitments || []);
      }
    } catch (error) {
      console.error('Failed to fetch commitments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCommitmentStatus = async (commitmentId: string, status: 'done' | 'dropped') => {
    try {
      const response = await fetch('/api/coach/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commitment_id: commitmentId, status })
      });

      if (response.ok) {
        fetchCommitments(); // Reload commitments
      }
    } catch (error) {
      console.error('Failed to update commitment:', error);
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
      case 'active': return 'bg-stone-100 text-stone-900 border-stone-200';
      case 'done': return 'bg-stone-800 text-white border-stone-900';
      case 'dropped': return 'bg-stone-50 text-stone-500 border-stone-200';
      default: return 'bg-stone-100 text-stone-900 border-stone-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 pt-14">
        <p className="text-stone-600">Loading your commitments...</p>
      </div>
    );
  }

  const activeCommitments = commitments.filter(c => c.status === 'active');
  const completedCommitments = commitments.filter(c => c.status === 'done');
  const droppedCommitments = commitments.filter(c => c.status === 'dropped');

  return (
    <div className="min-h-screen bg-stone-50 pt-14 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.back()}
            className="mb-2"
          >
            ← Back
          </Button>
          <h1 className="text-3xl font-bold text-stone-900">Your Commitments</h1>
          <p className="text-stone-600 mt-1">
            Track and manage your action items
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <p className="text-3xl font-bold text-stone-900">{activeCommitments.length}</p>
              <p className="text-xs text-stone-600 mt-1">Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <p className="text-3xl font-bold text-stone-900">{completedCommitments.length}</p>
              <p className="text-xs text-stone-600 mt-1">Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <p className="text-3xl font-bold text-stone-900">
                {activeCommitments.length > 0 
                  ? Math.round((completedCommitments.length / (completedCommitments.length + activeCommitments.length)) * 100)
                  : 0}%
              </p>
              <p className="text-xs text-stone-600 mt-1">Success</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Commitments */}
        {activeCommitments.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Active Commitments
            </h2>
            <div className="space-y-3">
              {activeCommitments.map((commitment) => (
                <Card key={commitment.id} className="hover:border-stone-400 transition-colors">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-base font-medium text-stone-900 mb-2">
                          {commitment.text}
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs text-stone-600">
                          {commitment.confidence && (
                            <Badge className="bg-stone-100 text-stone-800 border-stone-200">
                              Confidence: {commitment.confidence}/10
                            </Badge>
                          )}
                          {commitment.due_date && (
                            <Badge className="bg-stone-100 text-stone-800 border-stone-200">
                              Due: {formatDate(commitment.due_date)}
                            </Badge>
                          )}
                          <Badge className="bg-stone-100 text-stone-800 border-stone-200">
                            Created: {formatDate(commitment.created_at)}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => updateCommitmentStatus(commitment.id, 'done')}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Mark Done
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateCommitmentStatus(commitment.id, 'dropped')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Drop
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Completed Commitments */}
        {completedCommitments.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Completed
            </h2>
            <div className="space-y-3">
              {completedCommitments.map((commitment) => (
                <Card key={commitment.id} className="bg-stone-50 border-stone-200">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-stone-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-stone-700 line-through">
                          {commitment.text}
                        </p>
                        <p className="text-xs text-stone-500 mt-1">
                          Completed {formatDate(commitment.updated_at)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {commitments.length === 0 && (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <Target className="h-16 w-16 mx-auto mb-4 text-stone-300" />
              <h3 className="text-xl font-semibold text-stone-900 mb-2">
                No commitments yet
              </h3>
              <p className="text-stone-600 mb-6">
                Start a coaching session to create your first commitment
              </p>
              <Button onClick={() => router.push('/voice-session')}>
                Start AI Coaching
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

