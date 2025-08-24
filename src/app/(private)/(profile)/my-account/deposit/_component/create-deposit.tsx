'use client';
import { FormDateInput, FormInput, FormInputTextArea } from '@/components/form-items';
import { MultiImageUpload } from '@/components/multi-image-upload';
import { SelectDepositAccountForm } from '@/components/select/select-deposit-account-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { usePaymentMethodQuery } from '@/lib/APIs/common-api';
import { createFormData, formatDate } from '@/lib/helper';
import { IDeposit } from '@/type/deposit/deposit.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { useAddDepositMutation } from '../_api/deposit-api';

export const depositSchema = z.object({
  account_id: z.string().nonempty({ message: 'Account is required' }),
  amount: z.coerce.number({
    invalid_type_error: 'Amount is required',
  }),
  payment_date: z.date(),
  remarks: z.string().optional(),
  document: z
    .array(
      z.object({
        image: z.string().optional().nullable(),
        file: z.any().optional().nullable(),
      }),
    )
    .max(1, 'You can upload up to 1 images'),
});

interface IProps {
  account_id_params?: string;
  noRedirect?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const CreateDeposit = ({ account_id_params, noRedirect, setOpen }: IProps) => {
  const { data: account } = usePaymentMethodQuery({});
  const [addDeposit, { isLoading }] = useAddDepositMutation();
  const router = useRouter();

  const methods = useForm<IDeposit>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      account_id: account_id_params,
      amount: undefined,
      document: undefined,
      payment_date: undefined,
      remarks: undefined,
    },
  });

  const account_id = methods.watch('account_id');
  const selected_acc = account?.data?.find((c) => c.id == Number(account_id));

  useEffect(() => {
    if (account_id_params) methods.setValue('account_id', account_id_params);
  }, [account_id_params]);

  const onSubmit = async (values: IDeposit) => {
    const { document, ...rest } = values;

    const formData = new FormData();
    const body = {
      ...rest,
      payment_date: formatDate(values.payment_date),
    };
    createFormData(body, formData);

    if (document && document?.length > 0) formData.append('document', document[0].file);

    const res = await addDeposit(formData);
    if (res.data?.success) {
      setOpen && setOpen(false);
      if (!noRedirect) router.push('/my-account/deposit');
      toast.success('Deposit created successfully wait for confirmation');
    }
  };

  return (
    <div>
      <div className='max-w-xl mx-auto'>
        <FormProvider {...methods}>
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              autoComplete='off'
              className='space-y-6 max-h-[700px] overflow-y-auto no-scrollbar px-1'
            >
              <SelectDepositAccountForm label='Select deposit account' name='account_id' />

              {selected_acc?.account_name ? (
                <div className='bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4'>
                  <div className='border-b border-gray-200 pb-3'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                      Deposit Instructions
                    </h3>
                    <p className='text-gray-700'>
                      Please transfer your desired amount to the following account:
                      <span className='font-semibold text-primary ml-1'>
                        {selected_acc.account_name}
                      </span>
                    </p>
                  </div>

                  <div className='bg-white rounded-md p-4 border border-gray-100'>
                    <h4 className='text-sm font-medium text-gray-900 mb-3 uppercase tracking-wide'>
                      Bank Details
                    </h4>
                    <dl className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm'>
                      <div className='flex justify-between sm:block'>
                        <dt className='font-medium text-gray-600'>Bank Name:</dt>
                        <dd className='text-gray-900 sm:mt-1 font-mono'>
                          {selected_acc.bank_name}
                        </dd>
                      </div>

                      <div className='flex justify-between sm:block'>
                        <dt className='font-medium text-gray-600'>Account Number:</dt>
                        <dd className='text-gray-900 sm:mt-1 font-mono'>
                          {selected_acc.account_number}
                        </dd>
                      </div>

                      <div className='flex justify-between sm:block'>
                        <dt className='font-medium text-gray-600'>Branch:</dt>
                        <dd className='text-gray-900 sm:mt-1'>{selected_acc.branch}</dd>
                      </div>

                      <div className='flex justify-between sm:block'>
                        <dt className='font-medium text-gray-600'>Routing Number:</dt>
                        <dd className='text-gray-900 sm:mt-1 font-mono'>
                          {selected_acc.routing_no}
                        </dd>
                      </div>

                      <div className='flex justify-between sm:block sm:col-span-2'>
                        <dt className='font-medium text-gray-600'>SWIFT Code:</dt>
                        <dd className='text-gray-900 sm:mt-1 font-mono'>
                          {selected_acc.swift_code}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <Alert variant='destructive'>
                    <AlertTitle>
                      <span className='font-medium'>Important:</span>{' '}
                    </AlertTitle>
                    <AlertDescription>
                      Please ensure all details are correct before initiating the transfer. Keep
                      your transaction receipt for reference.
                    </AlertDescription>
                  </Alert>
                </div>
              ) : null}

              <FormInput<IDeposit>
                name='amount'
                label='Amount'
                placeholder='Enter your amount'
                type='number'
              />

              <FormDateInput<IDeposit> name='payment_date' label='Payment date' />
              <FormInputTextArea<IDeposit> name='remarks' label='Remarks' />

              <FormField
                control={methods.control}
                name={`document`}
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel>Document image</FormLabel>
                    <FormControl>
                      <MultiImageUpload field={field} maxNumber={1} listType={'list'} />
                    </FormControl>
                    <FormMessage className='absolute -bottom-4.5 right-0 text-xs' />
                  </FormItem>
                )}
              />

              <Button loading={isLoading} type='submit' className='w-full bg-primary text-white'>
                Submit
              </Button>
            </form>
          </Form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CreateDeposit;
