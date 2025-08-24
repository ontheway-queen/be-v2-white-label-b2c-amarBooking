'use client';

import { cn } from '@/lib/utils';
import { visaSearchSchema } from '@/lib/visa/visa-zod-schema';
import { IVisaSearchSchema } from '@/type/visa/visa.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import VisaSelectCountry from './visa-select-country';
import VisaSelectPax from './visa-select-pax';

const VisaSearchBox = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const methods = useForm<IVisaSearchSchema>({
    resolver: zodResolver(visaSearchSchema),
    defaultValues: {
      country: undefined,
      visa_type_id: undefined,
      traveler: 1,
    },
    mode: 'onSubmit',
  });

  const onSubmit = (data: IVisaSearchSchema) => {
    startTransition(() => {
      if (data.country?.id) {
        router.push(
          `/visa/list?id=${data.country?.id}&country=${data.country?.name}&passenger=${data.traveler}`,
        );
      } else {
        router.push(`/visa/list?traveler=${data.traveler}`);
      }
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='space-y-4'>
          <div className='px-1 text-gray-500 font-semibold font-roboto tracking-wide text-sm lg:text-base'>
            Hassle-Free Visa Services — Apply With Us For Fast Approval! 🛂✈️
          </div>

          <div className='grid sm:grid-cols-2 gap-3'>
            <VisaSelectCountry />
            <VisaSelectPax />
          </div>

          <div className={cn('flex  items-center gap-4 justify-end pt-1 w-full')}>
            <Button
              loading={isPending}
              type='submit'
              className='h-9 px-8 bg-primary hover:bg-green-600 w-full lg:w-fit'
            >
              Find Visa Info
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default VisaSearchBox;
