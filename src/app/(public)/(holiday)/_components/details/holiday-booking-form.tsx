'use client';

import { FormDateInput, FormInput, FormInputTextArea } from '@/components/form-items';
import { showToast } from '@/components/toast-utils';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useBookedHolidayMutation } from '../api/holiday-api-endpoints';
import { removeEmptyValues } from '@/lib/helper';
import TopUpModal from '@/components/top-up-modal';

type Props = {
  holiday_package_id: number | undefined;
};

const HolidayBookingSchema = z.object({
  holiday_package_id: z.number(),
  total_adult: z.coerce.number().min(1, { message: 'At least one adult is required' }),
  total_child: z.coerce.number().optional(),
  travel_date: z.union([z.string().nonempty('Date is required'), z.date()]),
  contact_email: z.string().email().nonempty('Email is required'),
  contact_number: z.string().min(10, { message: 'Phone no is required' }),
  note_from_customer: z.string().optional(),
});

export type IHolidayBookingSchema = z.infer<typeof HolidayBookingSchema>;

const HolidayBookingForm = ({ holiday_package_id }: Props) => {
  const router = useRouter();
  const { slug } = useParams();

  const { data: session } = useSession();

  const isLogin = session?.user;

  const [bookedHoliday, { isLoading, isSuccess }] = useBookedHolidayMutation();

  const form = useForm<IHolidayBookingSchema>({
    resolver: zodResolver(HolidayBookingSchema),
    defaultValues: {
      holiday_package_id: holiday_package_id,
      contact_email: '',
      contact_number: '',
      note_from_customer: '',
      total_adult: 1,
      total_child: 0,
      travel_date: undefined,
    },
  });

  const onSubmit = async (data: IHolidayBookingSchema) => {
    const res = await bookedHoliday(removeEmptyValues(data));
    if (res.data?.success) {
      showToast('success', 'Holiday booked successfully');
      router.push('/my-account/holiday-booking');
    } else {
      showToast('error', (res?.error as any)?.data?.message);
    }
  };

  return (
    <div className=''>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='pb-1 p-3 space-y-3'>
            <div className='flex gap-2'>
              <FormInput<IHolidayBookingSchema>
                name={`total_adult`}
                type='number'
                label='Adult:'
                placeholder='Enter total adult'
              />

              <FormInput<IHolidayBookingSchema>
                name={`total_child`}
                type='number'
                label='Children:'
                placeholder='Enter total children'
              />
            </div>

            <FormInput<IHolidayBookingSchema>
              name={`contact_email`}
              type='text'
              label='Email:'
              placeholder='Provide your email'
            />

            <FormInput<IHolidayBookingSchema>
              name={`contact_number`}
              type='text'
              label='Phone No:'
              placeholder='Provide your phone no'
            />

            <FormDateInput<IHolidayBookingSchema>
              name={`travel_date`}
              label='Travel Date:'
              placeholder='Provide your travel date'
            />

            <FormInput<IHolidayBookingSchema>
              name={`contact_number`}
              type='text'
              label='Phone No:'
              placeholder='Provide your phone no'
            />

            <FormInputTextArea<IHolidayBookingSchema>
              name={`note_from_customer`}
              label='Note:'
              placeholder='Any note'
            />
          </div>
          <div className='flex justify-end pb-5 px-2'>
            {isLogin ? (
              <Button loading={isLoading} type='submit' className='w-full'>
                Book now
              </Button>
            ) : (
              <Button
                type='button'
                loading={isLoading}
                onClick={() =>
                  router.push(
                    `/sign-in?message=You need to log in before booking a holiday package&redirect=/${slug}`,
                  )
                }
                className='w-full bg-amber-500 text-white hover:bg-amber-500 hover:text-white'
                variant='outline'
              >
                Login to Book
              </Button>
            )}
          </div>
        </form>
      </FormProvider>

      <div className='-mt-3 flex pb-2 px-2'>
        <TopUpModal />
      </div>
    </div>
  );
};

export default HolidayBookingForm;
