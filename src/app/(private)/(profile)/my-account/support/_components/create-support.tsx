'use client'; // Required for Next.js 13+ App Router

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Import necessary shadcn/ui components
import HeaderTitle from '@/components/Header-title';
import { FormInput, FormInputTextArea, FormSelectInput } from '@/components/form-items';
import { MultiImageUpload } from '@/components/multi-image-upload';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ICreateSupport } from '@/type/support/support.interface';
import { createFormData } from '@/lib/helper';
import { useRouter } from 'next/navigation';
import { useOpenSupportMutation } from '../_api/support-api';

export const supportFormSchema = z.object({
  subject: z
    .string()
    .min(5, { message: 'Subject must be at least 5 characters long.' })
    .max(100, { message: 'Subject cannot be longer than 100 characters.' }),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent'], {
    required_error: 'Priority is required.',
  }),
  ref_type: z.enum(
    ['Flight', 'Visa', 'Hotel', 'Holiday', 'Umrah', 'Others', 'Accounts', 'Payments'],
    {
      required_error: 'Reference type is required.',
    },
  ),
  details: z
    .string()
    .min(20, { message: 'Details must be at least 20 characters long.' })
    .max(500, { message: 'Details cannot be longer than 500 characters.' }),

  attachment: z
    .array(
      z.object({
        image: z.string().optional().nullable(),
        file: z.any().optional().nullable(),
      }),
    )
    .max(10, 'You can upload up to 10 images'),
});

const priorities = ['Low', 'Medium', 'High', 'Urgent'];
const referenceTypes = [
  'Flight',
  'Visa',
  'Hotel',
  'Holiday',
  'Umrah',
  'Others',
  'Accounts',
  'Payments',
];

const CreateSupport = () => {
  const [addSupport, { isLoading }] = useOpenSupportMutation();
  const router = useRouter();

  const form = useForm<ICreateSupport>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      subject: '',
      details: '',
      priority: undefined,
      ref_type: undefined,
    },
    mode: 'onSubmit',
  });

  async function onSubmit(values: ICreateSupport) {
    const { attachment, ...rest } = values;

    const formData = new FormData();
    const body = {
      ...rest,
    };
    createFormData(body, formData);

    if (attachment && attachment?.length > 0) {
      attachment.forEach((item) => formData.append('attachment', item.file));
    }
    const res = await addSupport(formData);
    if (res.data?.success) {
      router.push('/my-account/support');
    }
  }

  return (
    <div className=''>
      <HeaderTitle
        title='Create a Support Ticket'
        description="Please fill out the form below, and we'll get back to you as soon as possible."
      />
      <div className='max-w-xl mx-auto'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormInput<ICreateSupport>
              name='subject'
              label='Subject'
              placeholder='e.g., Issue with flight booking'
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormSelectInput<ICreateSupport>
                name='priority'
                label='Priority'
                options={priorities.map((p) => ({ label: p, value: p }))}
              />
              <FormSelectInput<ICreateSupport>
                name='ref_type'
                label='Reference Type'
                options={referenceTypes.map((p) => ({ label: p, value: p }))}
              />
            </div>

            <FormInputTextArea<ICreateSupport>
              name='details'
              label='Details'
              placeholder='Please describe your issue in detail...'
              className='min-h-28'
            />

            <FormField
              control={form.control}
              name={`attachment`}
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>Attachment image</FormLabel>
                  <FormControl>
                    <MultiImageUpload field={field} maxNumber={10} listType={'list'} />
                  </FormControl>
                  <FormMessage className='absolute -bottom-4.5 right-0 text-xs' />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full' loading={isLoading}>
              {form.formState.isSubmitting ? 'Submitting...' : 'Submit Ticket'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateSupport;
