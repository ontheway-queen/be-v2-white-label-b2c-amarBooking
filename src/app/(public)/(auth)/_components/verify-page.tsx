'use client';

import { Button } from '@/components/ui/button';
import { useCheckTokenAccountMutation } from '@/lib/APIs/common-api';
import { getRTKError } from '@/lib/helper';
import { Check, Loader2, Mail } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type Props = {};

const VerifyPage = (props: Props) => {
  const searchParam = useSearchParams();
  const token = searchParam.get('token');

  const [verify, { isLoading = true, isSuccess, data, isError, error }] =
    useCheckTokenAccountMutation();

  const authToken = data?.token;
  const user = data?.data;

  useEffect(() => {
    if (token) {
      verify({ token: token });
    }
  }, [token]);

  const makeLogin = async () => {
    await signIn('credentials', {
      token: authToken,
      id: user?.id,
      email: user?.email,
      username: user?.username,
      name: user?.name,
      gender: user?.gender,
      photo: user?.photo,
      status: user?.status,
      two_fa: user?.two_fa,
      redirect: true,
      redirectTo: '/',
    });
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-muted py-12 px-4 sm:px-6 lg:px-8'>
      <div className='flex w-full max-w-5xl overflow-hidden rounded-2xl shadow-lg'>
        {/* Image Section */}
        <div className='hidden md:block md:w-1/2 bg-blue-600 relative'>
          <Image
            src='/auth-screen/login.webp'
            alt='Login'
            className='absolute inset-0 h-full w-full object-cover'
            height={1280}
            width={1280}
          />
          <div className='absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-600/50 flex flex-col justify-end p-8'>
            <h2 className='text-white text-3xl font-bold mb-2'>Welcome Back</h2>
            <p className='text-primary-100 text-lg'>Sign in to continue your journey</p>
          </div>
        </div>

        <div className='w-full md:w-1/2 bg-background p-8 md:p-12 flex flex-col justify-center'>
          <div className='max-w-md w-full mx-auto'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
              <div className='flex justify-center'>
                <div className='h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center'>
                  <Mail className='h-8 w-8 text-blue-600' />
                </div>
              </div>
              <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                Verify your email
              </h2>
              <p className='mt-2 text-center text-sm text-gray-600'>
                {`We're confirming your email address to secure your account`}
              </p>
            </div>

            <div className='mt-2 sm:mx-auto sm:w-full sm:max-w-md'>
              <div className='bg-background py-4 px-4 shadow sm:rounded-lg sm:px-10'>
                <div className='h-64 flex justify-center items-center flex-col'>
                  {isLoading && (
                    <>
                      <div className='text-center text-gray-700 mb-4'>
                        Please wait while we verify your email automatically
                      </div>
                      <Loader2 className='h-10 w-10 text-blue-600 animate-spin' />
                      <div className='mt-6 w-full bg-gray-200 rounded-full h-2'>
                        <div className='bg-blue-600 h-2 rounded-full animate-pulse w-1/2'></div>
                      </div>
                    </>
                  )}

                  {isSuccess && (
                    <div className='text-center'>
                      <div className='mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100'>
                        <Check className='h-8 w-8 text-green-600' />
                      </div>
                      <p className='mt-4 text-lg font-medium text-green-600'>
                        Email verified successfully!
                      </p>
                      <p className='mt-2 text-sm text-gray-500'>Check your email for password</p>
                      <div className='mt-6'>
                        <Button
                          onClick={makeLogin}
                          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        >
                          Continue to Login
                        </Button>
                      </div>
                    </div>
                  )}

                  {isError && (
                    <p className='text-center text-red-600 text-lg'>{getRTKError(error)}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
