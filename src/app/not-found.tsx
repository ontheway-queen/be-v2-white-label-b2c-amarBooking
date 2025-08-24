import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Ghost } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-background text-center px-4'>
      <Ghost className='h-20 w-20 text-muted-foreground mb-6' />
      <h1 className='text-4xl font-bold tracking-tight mb-2'>404 - Page Not Found</h1>
      <p className='text-muted-foreground max-w-md mb-6'>
        Oops! The page you're looking for doesn’t exist or has been moved.
      </p>
      <Button asChild>
        <Link href='/'>Go to Home</Link>
      </Button>
    </div>
  );
}
