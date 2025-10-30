import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="min-h-screen coach-gradient flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-stone-200 dark:border-stone-800">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-900 flex items-center justify-center mb-4">
            <span className="text-2xl font-bold">404</span>
          </div>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
          <CardDescription className="mt-2">
            This page doesn't exist or has been moved
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Let's get you back on track with your coaching journey
          </p>
          <Link href="/" className="block">
            <Button className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-900">
              Return Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

