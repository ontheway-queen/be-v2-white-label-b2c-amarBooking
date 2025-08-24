'use client';

import { FormInput } from '@/components/form-items';
import { Button } from '@/components/ui/button';
import { useChangePasswordMutation } from '@/lib/APIs/common-api';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const passwordSchema = z
  .object({
    old_password: z.string().min(1, 'Current password is required'),
    new_password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm_new_password: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Passwords don't match",
    path: ['confirm_new_password'],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

const ChangePassword: React.FC = () => {
  const [changePass, { isLoading, isSuccess }] = useChangePasswordMutation();

  const methods = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      confirm_new_password: undefined,
      new_password: undefined,
      old_password: undefined,
    },
  });

  const onSubmit = async (data: PasswordFormData) => {
    changePass({
      new_password: data.new_password,
      old_password: data.old_password,
    });
  };

  return (
    <FormProvider {...methods}>
      <div className='max-w-md mx-auto bg-background p-6 mt-8'>
        <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-6'>
          <FormInput<PasswordFormData> name='old_password' label='Current password' />

          <FormInput<PasswordFormData> name='new_password' label='New password' />

          <FormInput<PasswordFormData> name='confirm_new_password' label='Confirm password' />

          <div className='flex items-center justify-end gap-2'>
            <Button
              type='button'
              onClick={() => methods.reset()}
              variant={'destructive'}
              className='bg-secondary'
            >
              Cancel
            </Button>
            <Button type='submit' disabled={isLoading} className='bg-secondary' loading={isLoading}>
              Change Password
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default ChangePassword;
