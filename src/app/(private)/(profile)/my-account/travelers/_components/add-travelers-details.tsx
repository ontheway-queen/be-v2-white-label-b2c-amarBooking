'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { createFormData, formatDate } from '@/lib/helper';
import { travelerSchema } from '@/lib/travelers/travelers-zod-schema';
import { ITravelerFormType } from '@/type/travelers/travelers.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAddTravelerMutation } from '../_api/traveler-api';
import TravelerInputForm from './travelers-form-input';

export default function AddTravelerForm() {
  const router = useRouter();
  const [addTraveler, { isLoading }] = useAddTravelerMutation();

  const methods = useForm<ITravelerFormType>({
    resolver: zodResolver(travelerSchema),
    defaultValues: {
      reference: 'Mr',
      type: 'ADT',
      gender: undefined,
      nationality: 18,
      issuing_country: 18,
    },
  });

  const {
    watch,
    formState: { errors },
  } = methods;

  const type = watch('type');

  const referenceOptions = useMemo(() => {
    if (type === 'ADT') {
      return ['Mr', 'Mrs'];
    }

    if (['INF', 'C11', 'C04'].includes(type)) {
      return ['Miss', 'MSTR'];
    }

    return [];
  }, [type]);

  const onSubmit = async (values: ITravelerFormType) => {
    const { visa_file, passport_file, ...rest } = values;

    const formData = new FormData();

    const body = {
      ...rest,
      date_of_birth: formatDate(values.date_of_birth),
      passport_expiry_date: formatDate(values?.passport_expiry_date),
    };

    createFormData(body, formData);

    if (visa_file && visa_file?.length > 0) formData.append('visa_file', visa_file[0].file);
    if (passport_file && passport_file?.length > 0)
      formData.append('passport_file', passport_file[0].file);

    const res = await addTraveler(formData);

    if (res.data?.success) {
      router.push('/my-account/travelers');
    }
  };

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete='off' className='space-y-6'>
          <TravelerInputForm referenceOptions={referenceOptions} methods={methods} />

          <Button loading={isLoading} type='submit' className='w-full bg-primary text-white'>
            Submit
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
}
