'use client';

import { FormInput, FormInputTextArea } from '@/components/form-items';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useBookUmrahMutation } from '../../_api/umrah-api-endpoints';
import { useSession } from 'next-auth/react';
import LoginWarning from '@/components/login-warning';
import { removeEmptyValues } from '@/lib/helper';
import TopUpModal from '@/components/top-up-modal';

const umrahBookingSchema = z.object({
  traveler_adult: z.coerce
    .number({
      required_error: 'Total adults is required',
      invalid_type_error: 'Total adults must be a number',
    })
    .min(1, 'At least one adult is required'),

  traveler_child: z.coerce
    .number({
      invalid_type_error: 'Child must be a number',
    })
    .optional(),

  name: z
    .string({
      required_error: 'Contact name is required',
    })
    .min(1, 'Contact name cannot be empty'),

  email: z
    .string({
      required_error: 'Contact email is required',
    })
    .email('Invalid email address'),

  phone: z
    .string({
      required_error: 'Contact phone is required',
    })
    .min(6, 'Contact phone must be at least 6 digits'),

  address: z
    .string({
      required_error: 'Contact address is required',
    })
    .min(1, 'Contact address cannot be empty'),

  note: z.string().optional(),
});

export type IUmrahBookingForm = z.infer<typeof umrahBookingSchema>;

interface IProps {
  id: number | undefined;
  slug: string;
}

const UmrahBookedFrom = ({ id, slug }: IProps) => {
  const [bookedUmrah, { isLoading, isSuccess }] = useBookUmrahMutation();
  const router = useRouter();

  const { status } = useSession();

  const form = useForm<IUmrahBookingForm>({
    resolver: zodResolver(umrahBookingSchema),
    defaultValues: {
      traveler_adult: 1,
      traveler_child: undefined,
      name: '',
      email: '',
      phone: '',
      address: '',
      note: '',
    },
  });

  async function onSubmit(values: IUmrahBookingForm) {
    const clean = removeEmptyValues(values);

    bookedUmrah({ body: clean, id: id });
  }

  useEffect(() => {
    if (isSuccess) {
      router.replace(`../my-account/umrah-booking`);
    }
  }, [isSuccess]);

  if (status === 'unauthenticated') {
    return <LoginWarning redirect={`umrah-packages/${slug}`} />;
  }

  return (
    <div>
      <Form {...form}>
        <div>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 '>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormInput<IUmrahBookingForm>
                label='Total Adults'
                name='traveler_adult'
                type='number'
              />

              <FormInput<IUmrahBookingForm>
                label='Children'
                name='traveler_child'
                type='number'
                placeholder='Optional'
              />
            </div>

            <FormInput<IUmrahBookingForm>
              label='Contact Name'
              name='name'
              type='text'
              placeholder='Your full name'
            />

            <FormInput<IUmrahBookingForm>
              label='Email Address'
              name='email'
              type='email'
              placeholder='you@example.com'
            />

            <FormInput<IUmrahBookingForm>
              label='Phone Number'
              name='phone'
              type='tel'
              placeholder='+8801XXXXXXXXX'
            />

            <FormInput<IUmrahBookingForm>
              label='Address'
              name='address'
              type='text'
              placeholder='Your full address...'
            />

            <FormInputTextArea<IUmrahBookingForm>
              label='Note (optional)'
              name='note'
              placeholder='Anything else we should know?'
            />

            <Button loading={isLoading} type='submit' className='w-full'>
              Submit Booking
            </Button>
          </form>
        </div>
      </Form>

      <div className='mt-2 flex'>
        <TopUpModal />
      </div>
    </div>
  );
};

export default UmrahBookedFrom;
