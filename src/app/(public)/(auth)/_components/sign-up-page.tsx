'use client';

import { FormInput, FormSelectInput } from '@/components/form-items';
import { Button } from '@/components/ui/button';
import { useSignUpAccountMutation } from '@/lib/APIs/common-api';
import { getRTKError } from '@/lib/helper';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { AlertTriangle } from 'lucide-react';

const signupSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  name: z.string().nonempty({ message: 'Name is required' }),
  gender: z.string().nonempty({ message: 'Gender is required' }),
  phone_number: z.string().nonempty({ message: 'Phone number is required' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

export type ISignupSchema = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [signUpAcc, { isLoading, error, isSuccess }] = useSignUpAccountMutation();

  const methods = useForm<ISignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      gender: 'Male',
      name: '',
      phone_number: '',
      password: '',
    },
  });

  const onSubmit = async (data: ISignupSchema) => {
    const { data: result } = await signUpAcc(data);

    const user = result?.data;

    await signIn('credentials', {
      token: result?.token,
      id: user?.id,
      email: user?.email,
      name: user?.name,
      username: user?.username,
      gender: user?.gender,
      photo: '',
      redirect: true,
      redirectTo: '/',
    });
  };

  return (
    <FormProvider {...methods}>
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-tr from-primary-50 via-primary-100 to-white px-6 py-12'>
        <div className='flex flex-col md:flex-row max-w-6xl w-full rounded-3xl shadow-xl bg-white/70 backdrop-blur-md overflow-hidden'>
          {/* Image Section with polygon clip */}
          <div
            className='hidden md:block md:w-1/2 relative clip-polygon'
            style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0% 100%)' }}
          >
            <Image
              src='/auth-screen/sign-up.jpg'
              alt='Welcome illustration'
              fill
              priority
              className='object-cover'
            />

            <div className='absolute inset-0 bg-black/30 z-10' />
            <div className='absolute inset-0 bg-gradient-to-tr from-primary-900/70 via-primary-800/50 to-transparent flex flex-col justify-center px-14 z-20'>
              <h1 className='text-white text-5xl font-extrabold mb-3 drop-shadow-lg leading-tight'>
                Welcome!
              </h1>
              <p className='text-white/70 text-xl font-light max-w-xs drop-shadow-md'>
                Create your account to start your adventure with us.
              </p>
            </div>
          </div>

          <div className='md:w-1/2 p-10 sm:p-16 flex flex-col justify-center'>
            <div className='max-w-md mx-auto w-full'>
              <div className='text-center mb-10 relative'>
                <h2 className='text-3xl font-bold text-gray-900 font-sans mb-1'>
                  Open a new account
                </h2>
                {error && (
                  <div className='flex items-center justify-center gap-2 mt-3 text-red-600 font-semibold text-sm'>
                    <AlertTriangle size={18} />
                    <span>{getRTKError(error)}</span>
                  </div>
                )}
              </div>

              <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-4' noValidate>
                <FormInput<ISignupSchema>
                  name='name'
                  label='Full Name'
                  placeholder='Your full name'
                  className='peer rounded-md border border-gray-300 bg-transparent px-3 py-2.5 text-gray-900 placeholder-transparent leading-normal focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition'
                />

                <FormInput<ISignupSchema>
                  name='email'
                  label='Email Address'
                  placeholder='you@example.com'
                  className='peer rounded-md border border-gray-300 bg-transparent px-3 py-2.5 text-gray-900 placeholder-transparent leading-normal focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition'
                />

                <FormInput<ISignupSchema>
                  name='password'
                  label='Password'
                  placeholder='Enter your password'
                  type='password'
                  className='peer rounded-md border border-gray-300 bg-transparent px-3 py-2.5 text-gray-900 placeholder-transparent leading-normal focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition'
                />

                <div className='flex gap-4'>
                  <FormSelectInput<ISignupSchema>
                    name='gender'
                    label='Gender'
                    placeholder='Select gender'
                    options={[
                      { label: 'Male', value: 'Male' },
                      { label: 'Female', value: 'Female' },
                      { label: 'Other', value: 'Other' },
                    ]}
                    className='flex-1'
                  />
                  <FormInput<ISignupSchema>
                    name='phone_number'
                    label='Phone Number'
                    placeholder='Your phone number'
                    className='peer rounded-md border border-gray-300 bg-transparent px-3 py-2.5 text-gray-900 placeholder-transparent leading-normal focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition'
                  />
                </div>

                <Button
                  loading={isLoading}
                  type='submit'
                  className='w-full py-3 bg-gradient-to-r from-primary via-secondary to-primary text-white font-semibold rounded-lg shadow-lg hover:shadow-primary/70 transition-all duration-400'
                >
                  Sign up
                </Button>
              </form>

              <p className='mt-14 text-center text-gray-700 text-sm font-medium'>
                Already have an account?{' '}
                <Link
                  href='/sign-in'
                  className='text-primary hover:text-primary-dark transition-colors font-semibold'
                >
                  Login here
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
    </FormProvider>
  );
}
