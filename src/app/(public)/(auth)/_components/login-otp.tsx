import { FormInput } from '@/components/form-items';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useTwoFALoginMutation } from '@/lib/APIs/common-api';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {
  twoFa: boolean;
  setTwoFa: Dispatch<SetStateAction<boolean>>;
  email: string;
};

const loginOtpSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  otp: z.string().min(6, { message: 'OTP must be at least 6 digits long' }),
});

export type ILoginOtpSchema = z.infer<typeof loginOtpSchema>;

const LoginOTP = ({ setTwoFa, twoFa, email }: Props) => {
  const [twoFALogin, { isLoading }] = useTwoFALoginMutation();

  const methods = useForm<ILoginOtpSchema>({
    resolver: zodResolver(loginOtpSchema),
    defaultValues: {
      email: email,
      otp: undefined,
    },
  });

  const onSubmit = async (data: ILoginOtpSchema) => {
    const res = await twoFALogin(data);
    const err_msg = (res?.error as any)?.data?.message;

    if (err_msg) {
      methods.setError('otp', { type: 'manual', message: err_msg });
    }
  };

  return (
    <FormProvider {...methods}>
      <p className='text-center'>
        <Badge className='cursor-pointer' onClick={() => setTwoFa(!twoFa)}>
          <MoveLeft /> Back to login
        </Badge>
      </p>
      <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='space-y-6'>
          <FormInput<ILoginOtpSchema>
            name={'email'}
            label='Email'
            placeholder='Provide your email'
            readOnly
          />
          <FormField
            control={methods.control}
            name={'otp'}
            render={({ field }) => (
              <FormItem className='w-full relative'>
                <FormLabel className='w-full'>Provide your OTP</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />

                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage className='absolute -bottom-4.5 right-0 text-xs' />
              </FormItem>
            )}
          />

          <Button loading={isLoading} type='submit' className='w-full bg-secondary'>
            Submit OTP
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginOTP;
