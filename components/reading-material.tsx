'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ReadingMaterial } from '@/lib/types';
import { BookOpen, Check } from 'lucide-react';

interface ReadingMaterialCardProps {
  material: ReadingMaterial;
  completed?: boolean;
  onMarkComplete?: (materialId: string) => void;
}

export function ReadingMaterialCard({
  material,
  completed = false,
  onMarkComplete,
}: ReadingMaterialCardProps) {
  return (
    <Card className="border-stone-200 dark:border-stone-800">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-stone-600 dark:text-stone-400" />
              {material.title}
            </CardTitle>
            <CardDescription className="mt-1">{material.description}</CardDescription>
          </div>
          {completed && (
            <Badge
              variant="secondary"
              className="bg-stone-100 text-stone-700 border-stone-200 ml-2"
            >
              <Check className="h-3 w-3 mr-1" />
              Done
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <p className="text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
            Reading guide:
          </p>
          <p className="text-sm text-stone-900 dark:text-stone-100">{material.prompt}</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <span>Pages {material.pages}</span>
          <span>•</span>
          <span>~3 min read</span>
        </div>

        {!completed && onMarkComplete && (
          <Button
            onClick={() => onMarkComplete(material.id)}
            variant="outline"
            className="w-full"
          >
            Mark as Complete
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

interface ReadingListProps {
  materials: ReadingMaterial[];
  completedMaterials?: string[];
  onMarkComplete?: (materialId: string) => void;
}

export function ReadingList({
  materials,
  completedMaterials = [],
  onMarkComplete,
}: ReadingListProps) {
  const completedCount = completedMaterials.length;
  const totalCount = materials.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Reading Materials</h2>
          <span className="text-sm text-muted-foreground">
            {completedCount} / {totalCount}
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      <div className="space-y-4">
        {materials.map((material) => (
          <ReadingMaterialCard
            key={material.id}
            material={material}
            completed={completedMaterials.includes(material.id)}
            onMarkComplete={onMarkComplete}
          />
        ))}
      </div>

      {completedCount === totalCount && (
        <Card className="border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-900 dark:bg-stone-100 flex items-center justify-center flex-shrink-0">
                <Check className="h-5 w-5 text-stone-50 dark:text-stone-900" />
              </div>
              <div>
                <p className="font-semibold text-sm">All readings complete!</p>
                <p className="text-xs text-muted-foreground">
                  You've absorbed all the materials for this package
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

