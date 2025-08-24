'use client';

import { FormInput } from '@/components/form-items';
import { Button } from '@/components/ui/button';
import { TWO_FA_ERROR_MESSAGE } from '@/lib/CONSTANT';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import LoginOTP from './login-otp';
import Image from 'next/image';
import { AlertTriangle } from 'lucide-react';

const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .nonempty({ message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export type ILoginSchema = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [twoFa, setTwoFa] = useState(false);

  const messages = searchParams.get('message');
  const redirect = decodeURIComponent(searchParams.get('redirect') ?? '');

  const methods = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const email = methods.watch('email');

  const onSubmit = async (data: ILoginSchema) => {
    try {
      setIsLoading(true);
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      console.log(result);

      if (result?.error) {
        setIsLoading(false);

        if (result.code === TWO_FA_ERROR_MESSAGE) {
          setTwoFa(true);
        }

        setError(result.code ? result.code : 'Login failed. Please try again.');
        return;
      }
      if (redirect) {
        router.replace(redirect);
      } else {
        router.replace('/');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-50 via-indigo-100 to-white px-6 py-12'>
      <div className='flex flex-col md:flex-row bg-white/70 backdrop-blur-md shadow-xl rounded-3xl max-w-6xl w-full overflow-hidden'>
        {/* Image Section with polygon clip and overlay */}
        <div
          className='hidden md:block md:w-1/2 relative clip-polygon'
          style={{
            clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0% 100%)',
          }}
        >
          <Image
            src='/auth-screen/login.webp'
            alt='Welcome illustration'
            fill
            priority
            className='object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-tr from-indigo-900/70 via-purple-800/50 to-transparent flex flex-col justify-center px-14'>
            <h1 className='text-white text-5xl font-extrabold mb-3 drop-shadow-lg leading-tight'>
              Welcome Back
            </h1>
            <p className='text-indigo-200 text-xl font-light max-w-xs drop-shadow-md'>
              Let’s continue your journey. Sign in securely to access your account.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className='md:w-1/2 p-10 sm:p-16 flex flex-col justify-center'>
          <div className='max-w-md mx-auto w-full'>
            <div className='text-center mb-10 relative'>
              {messages && (
                <p className='text-green-600 font-semibold text-lg mb-3 animate-fadeIn'>
                  {messages}
                </p>
              )}
              <h2
                className={cn(
                  'text-3xl font-bold text-gray-900 font-sans mb-1',
                  messages && 'text-2xl font-semibold',
                )}
              >
                {twoFa ? (
                  <span className=''>Please check your email for the OTP</span>
                ) : (
                  'Sign in to your account'
                )}
              </h2>
            </div>

            {twoFa ? (
              <LoginOTP twoFa={twoFa} setTwoFa={setTwoFa} email={email} />
            ) : (
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-4' noValidate>
                  {/* Email input with floating label */}
                  <FormInput<ILoginSchema>
                    name='email'
                    label='Email Address'
                    placeholder=' '
                    className='peer rounded-md border border-gray-300 bg-transparent px-3 py-2.5 text-gray-900 placeholder-transparent leading-normal focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition'
                    labelClassName='absolute left-3 top-2 text-gray-500 text-sm font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-primary-400 peer-focus:text-sm'
                    inputWrapperClassName='relative'
                  />

                  {/* Password input with floating label */}
                  <FormInput<ILoginSchema>
                    name='password'
                    label='Password'
                    placeholder=' '
                    type='password'
                    className='peer rounded-md border border-gray-300 bg-transparent px-3 py-2.5 text-gray-900 placeholder-transparent leading-normal focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition'
                    labelClassName='absolute left-3 top-2 text-gray-500 text-sm font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-primary-400 peer-focus:text-sm'
                    inputWrapperClassName='relative'
                  />

                  {/* Error message under inputs if any */}
                  {error && (
                    <div className='flex items-center gap-2 text-red-600 font-semibold text-sm -mt-6'>
                      <AlertTriangle size={18} />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className='flex justify-between items-center text-sm text-gray-600'>
                    <Link
                      href='/forgot-password'
                      className='hover:text-indigo-700 font-semibold transition-colors'
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  <Button loading={isLoading} type='submit' className='w-full py-3'>
                    Log in
                  </Button>
                </form>
              </FormProvider>
            )}

            <p className='mt-14 text-center text-gray-700 text-sm font-medium'>
              Not a member?{' '}
              <Link
                href='sing-up'
                className='text-primary-400 hover:text-primary-500 transition-colors font-semibold'
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .clip-polygon {
          clip-path: polygon(0 0, 85% 0, 100% 100%, 0% 100%);
        }
      `}</style>
    </div>
  );
}
