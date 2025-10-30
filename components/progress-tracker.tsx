'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Client } from '@/lib/types';
import { COACHING_PACKAGES } from '@/lib/data';

interface ProgressTrackerProps {
  client: Client;
}

export function ProgressTracker({ client }: ProgressTrackerProps) {
  const packageData = COACHING_PACKAGES.find((pkg) => pkg.id === client.package);
  const completedSessions = client.sessions.filter((s) => s.status === 'completed').length;
  const totalSessions = packageData?.sessions || 0;
  const progressPercentage = (completedSessions / totalSessions) * 100;

  const getStatusColor = (status: string) => {
    if (status === 'completed') return 'bg-stone-900 dark:bg-stone-100';
    if (status === 'in-progress') return 'bg-stone-400 dark:bg-stone-600';
    return 'bg-stone-200 dark:bg-stone-800';
  };

  return (
    <div className="space-y-6">
      <Card className="border-stone-200 dark:border-stone-800">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">Your Journey</CardTitle>
              <CardDescription className="mt-1">
                {packageData?.name} Package • {packageData?.duration}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="bg-stone-100 text-stone-700 border-stone-200">
              {completedSessions} / {totalSessions}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Sessions</p>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: totalSessions }).map((_, index) => {
                const session = client.sessions[index];
                const status = session?.status || 'scheduled';
                return (
                  <div
                    key={index}
                    className={`h-10 rounded-lg flex items-center justify-center text-xs font-medium ${getStatusColor(
                      status
                    )} text-stone-50 dark:text-stone-900`}
                  >
                    {index + 1}
                  </div>
                );
              })}
            </div>
          </div>

          {client.sessions.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium">Recent Actions</p>
              <div className="space-y-2">
                {client.sessions
                  .filter((s) => s.commitedAction)
                  .slice(-3)
                  .reverse()
                  .map((session) => (
                    <div
                      key={session.id}
                      className="p-3 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">
                          Session {session.sessionNumber}
                        </span>
                        {session.status === 'completed' && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-stone-100 text-stone-700 border-stone-200"
                          >
                            Done
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm">{session.commitedAction}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {client.checkIns.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium">Check-In Insights</p>
              <div className="space-y-2">
                {client.checkIns
                  .slice(-2)
                  .reverse()
                  .map((checkIn) => (
                    <div
                      key={checkIn.id}
                      className="p-3 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-muted-foreground">
                          {new Date(checkIn.date).toLocaleDateString()}
                        </span>
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full ${
                                i < checkIn.actionRating
                                  ? 'bg-stone-900 dark:bg-stone-100'
                                  : 'bg-stone-300 dark:bg-stone-700'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm">{checkIn.insight}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

