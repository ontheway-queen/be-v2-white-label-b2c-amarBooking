'use client';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export default function Unauthorized() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/sign-in');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Access Denied - Authentication Required</title>
        <meta name='description' content='Authentication required to access this resource' />
      </Head>

      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12'>
        <div className='max-w-lg w-full'>
          <div className='bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden'>
            {/* Header Section */}
            <div className='bg-gradient-to-r from-red-50 to-orange-50 px-8 py-6 border-b border-gray-100'>
              <div className='flex items-center justify-center mb-4'>
                <div className='rounded-full bg-red-100 p-4 shadow-sm'>
                  <svg
                    className='w-10 h-10 text-red-600'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
                    />
                  </svg>
                </div>
              </div>
              <h1 className='text-3xl font-bold text-center text-gray-900 mb-2'>Access Denied</h1>
              <p className='text-center text-gray-600 font-medium'>Authentication Required</p>
            </div>

            {/* Content Section */}
            <div className='px-8 py-8'>
              <div className='text-center mb-8'>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  You don't have permission to access this resource. This could be because:
                </p>
                <ul className='text-left text-gray-600 space-y-2 mb-6 max-w-sm mx-auto'>
                  <li className='flex items-start'>
                    <span className='text-red-500 mr-2 mt-1'>•</span>
                    Your session has expired
                  </li>
                  <li className='flex items-start'>
                    <span className='text-red-500 mr-2 mt-1'>•</span>
                    You're not logged in
                  </li>
                  <li className='flex items-start'>
                    <span className='text-red-500 mr-2 mt-1'>•</span>
                    You lack the required permissions
                  </li>
                </ul>
                <p className='text-gray-600'>
                  Please authenticate to continue or contact support if you believe this is an
                  error.
                </p>
              </div>

              {/* Action Buttons */}
              <div className='space-y-3'>
                <Button onClick={handleLogin} className='w-full '>
                  Sign In to Continue
                </Button>

                <Button variant={'outline'} onClick={handleGoHome} className='w-full '>
                  Return to Homepage
                </Button>
              </div>

              {/* Footer Help */}
              <div className='mt-8 pt-6 border-t border-gray-100 text-center'>
                <p className='text-sm text-gray-500'>
                  Need help?{' '}
                  <Link
                    href='/support'
                    className='text-blue-600 hover:text-blue-700 font-medium underline decoration-1 underline-offset-2'
                  >
                    Contact Support
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Additional Security Notice */}
          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-500'>
              <svg className='w-4 h-4 inline mr-1' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                  clipRule='evenodd'
                />
              </svg>
              Your security is important to us
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
