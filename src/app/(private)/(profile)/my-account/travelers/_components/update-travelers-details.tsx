'use client';

import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { createFormData, formatDate, getImageLink } from '@/lib/helper';
import { travelerSchema } from '@/lib/travelers/travelers-zod-schema';
import { ITravelerFormType } from '@/type/travelers/travelers.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTravelersDetailsQuery, useUpdateTravelerMutation } from '../_api/traveler-api';
import TravelerInputForm from './travelers-form-input';

interface IProps {
  id: string;
}

export const UpdateTravelerForm = ({ id }: IProps) => {
  const router = useRouter();

  const [updateTraveler, { isLoading }] = useUpdateTravelerMutation();

  const { data, isLoading: getLoading } = useTravelersDetailsQuery({ id });
  const result = data?.data;

  const methods = useForm<ITravelerFormType>({
    resolver: zodResolver(travelerSchema),
    defaultValues: undefined,
  });

  const { watch, reset } = methods;
  const type = watch('type') || result?.type;

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
      passport_expiry_date: formatDate(values.passport_expiry_date),
    };

    createFormData(body, formData);

    if (visa_file && visa_file?.length > 0) {
      if (visa_file[0].file) {
        formData.append('visa_file', visa_file[0].file);
      }
    }

    if (passport_file && passport_file?.length > 0) {
      if (passport_file[0].file) {
        formData.append('passport_file', passport_file[0].file);
      }
    }

    const res = await updateTraveler({ body: formData, id: id });

    if (res.data?.success) {
      router.push('/my-account/travelers');
    }
  };

  useEffect(() => {
    if (result?.type) {
      reset({
        reference: result.reference,
        type: result.type,
        contact_email: result.contact_email,
        contact_number: result.contact_number,
        first_name: result.first_name,
        last_name: result.last_name,
        date_of_birth: new Date(result.date_of_birth),
        passport_number: result.passport_number,
        frequent_flyer_airline: result.frequent_flyer_airline,
        frequent_flyer_number: result.frequent_flyer_number,
        gender: result.gender,
        issuing_country: Number(result.issuing_country),
        nationality: Number(result.nationality),
        passport_expiry_date: result.passport_expiry_date
          ? new Date(result.passport_expiry_date)
          : undefined,
        visa_file: result.visa_file ? [{ image: getImageLink(result.visa_file) }] : [],
        passport_file: result.passport_file ? [{ image: getImageLink(result.passport_file) }] : [],
      });
    }
  }, [result]);

  if (getLoading) return <Loading />;

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
};
