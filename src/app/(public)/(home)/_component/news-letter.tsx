'use client';

import { showToast } from '@/components/toast-utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSubsEmailMutation } from '@/lib/APIs/common-api';
import { fadeIn } from '@/lib/varients/varients';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Form validation schema
const emailSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
});

type EmailFormData = z.infer<typeof emailSchema>;

const NewsLetter = () => {
  const [subsEmail, { isLoading, isSuccess, error }] = useSubsEmailMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: EmailFormData) => {
    subsEmail({ email: data.email });
  };

  useEffect(() => {
    if (isSuccess) {
      showToast('success', 'Successfully subscribed');
      reset();
    }
  }, [isSuccess, reset]);

  return (
    <section className='bg-muted text-muted-foreground py-10 md:py-20 overflow-hidden'>
      <div className='container mx-auto max-w-screen-xl px-4 sm:px-6'>
        <div className='grid gap-8 lg:grid-cols-2 lg:items-center'>
          {/* Text Content */}
          <div className='text-center lg:text-left'>
            <motion.h2
              variants={fadeIn('right', 0.2)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: true, amount: 0.1 }}
              className='text-3xl font-semibold tracking-tight sm:text-4xl'
            >
              Join Our Travel Circle
            </motion.h2>
            <motion.p
              variants={fadeIn('right', 0.2)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: true, amount: 0.1 }}
              className='mt-4 text-muted-foreground/80'
            >
              Get insider travel advice, sneak peeks at new destinations, and access to
              subscriber-only offers. Your next adventure starts in your inbox.
            </motion.p>
          </div>

          {/* Form */}
          <motion.form
            variants={fadeIn('left', 0.3)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: true, amount: 0.1 }}
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-end'
          >
            <div className='relative w-full max-w-md'>
              <Mail
                className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 z-10'
                size={18}
              />
              <Input
                {...register('email')}
                type='email'
                placeholder='you@example.com'
                className={`pl-10 bg-background border text-muted-foreground placeholder:text-muted-foreground/50 ${
                  errors.email
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-muted-foreground/20'
                }`}
              />
              {errors.email && <p className='mt-1 text-sm text-red-500'>{errors.email.message}</p>}
            </div>
            <Button
              type='submit'
              variant='default'
              className='w-full sm:w-auto bg-secondary'
              disabled={isLoading || !isValid}
            >
              {isLoading ? 'Submitting...' : 'Get Updates'}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
