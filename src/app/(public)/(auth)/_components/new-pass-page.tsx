'use client';

import { FormInput } from '@/components/form-items';
import { showToast } from '@/components/toast-utils';
import { Button } from '@/components/ui/button';
import { useResetPasswordMutation } from '@/lib/APIs/common-api';
import { getRTKError } from '@/lib/helper';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {};

const passwordSchema = z
  .object({
    new_password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm_new_password: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Passwords don't match",
    path: ['confirm_new_password'],
  });

export type IPasswordSchemaSchema = z.infer<typeof passwordSchema>;

const NewPasswordPage = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [resetPassword, { isLoading, isError, error }] = useResetPasswordMutation();

  const methods = useForm<IPasswordSchemaSchema>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      confirm_new_password: '',
      new_password: '',
    },
  });

  const onSubmit = async (data: IPasswordSchemaSchema) => {
    if (token) {
      const res = await resetPassword({
        token: token,
        password: data.confirm_new_password,
      });
      if (res.data?.message) showToast('success', res?.data?.message);
      router.push('/sign-in?message=Login with your new password');
      return;
    }

    showToast('info', 'Kindly try again after a few minutes');
    router.push('/forgot-password');
  };
  return (
    <FormProvider {...methods}>
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

          {/* Form Section */}
          <div className='w-full md:w-1/2 bg-background p-8 md:p-12 flex flex-col justify-center'>
            <div className='max-w-md w-full mx-auto'>
              <div className='text-center mb-8 relative'>
                <h2 className='mt-6 text-2xl font-extrabold text-gray-900 font-sans'>
                  Provide new password
                </h2>
                {isError && (
                  <p className='text-xs absolute text-red-500 font-semibold left-0 right-0 -bottom-5'>
                    {getRTKError(error)}
                  </p>
                )}
              </div>

              <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-6 min-h-40'>
                <FormInput<IPasswordSchemaSchema>
                  name={'new_password'}
                  label='New password'
                  placeholder='Provide your new password'
                  type='password'
                />

                <FormInput<IPasswordSchemaSchema>
                  name={'confirm_new_password'}
                  label='Confirm new password'
                  placeholder='Provide your confirm new password'
                  type='password'
                />

                <div className='mt-5'>
                  <Button loading={isLoading} type='submit' className='w-full bg-secondary'>
                    Reset password
                  </Button>
                </div>
              </form>

              <p className='mt-8 text-center text-sm text-gray-600'>
                Already have a account?{' '}
                <Link
                  href={`/sign-in`}
                  className='font-medium text-primary-600 hover:text-primary-500'
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default NewPasswordPage;
