'use client';

import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Card } from './ui/card';

type Props = {
  redirect: string;
};

const LoginWarning = ({ redirect }: Props) => {
  const router = useRouter();

  return (
    <Card className='mx-auto  p-6 md:p-8 rounded shadow border border-red-200 bg-white'>
      <div className='flex items-start gap-4'>
        <AlertTriangle className='w-7 h-7 mt-0.5 text-red-500 flex-shrink-0' />
        <div className='flex-grow'>
          <h3 className='text-xl font-semibold text-gray-800 mb-2'>Authentication Required</h3>
          <p className='text-base text-gray-600 mb-5'>
            Please <span className='font-medium text-red-600'>log in</span> to continue and access
            this feature. You'll be redirected shortly.
          </p>
          <Button
            onClick={() => router.push(`../sign-in?redirect=${encodeURIComponent(redirect)}`)}
            className='w-full sm:w-auto px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors duration-200 ease-in-out shadow-sm'
          >
            Login now
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LoginWarning;
