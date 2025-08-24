'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { isProduction } from '@/request';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader className='space-y-1 flex items-center justify-center text-center'>
          <AlertCircle className='h-12 w-12 text-red-500 mb-2' />
          <CardTitle className='text-2xl font-bold text-gray-900'>
            Oops! Something went wrong
          </CardTitle>
        </CardHeader>
        <CardContent className='text-center'>
          <p className='text-gray-500 mt-2'>
            We encountered an unexpected error while processing your request.
          </p>
          {error.message && (
            <p className='mt-2 text-sm text-gray-600 p-3 bg-gray-100 rounded-md'>{error.message}</p>
          )}
        </CardContent>
        <CardFooter className='flex justify-center gap-4'>
          <Button onClick={() => reset()} className='w-full sm:w-auto bg-secondary'>
            Try Again
          </Button>
          <Button
            onClick={() => router.replace('/')}
            className='w-full sm:w-auto bg-yellow-500 font-bold hover:bg-yellow-600 transition-all'
          >
            <Home /> Back to home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
