'use client';

import { FormInputTextArea } from '@/components/form-items';
import { MultiImageUpload } from '@/components/multi-image-upload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { createFormData } from '@/lib/helper';
import { IReplySupport } from '@/type/support/support.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import { useReplySupportMutation } from '../_api/support-api';

export const replyTicketSchema = z.object({
  message: z.string().min(1),
  attachment: z
    .array(
      z.object({
        image: z.string().optional().nullable(),
        file: z.any().optional().nullable(),
      }),
    )
    .max(10, 'You can upload up to 10 images')
    .nullable()
    .optional(),
});

interface Props {
  id: string;
}

const ReplyTicket = ({ id }: Props) => {
  const [replySupport, { isLoading, isSuccess }] = useReplySupportMutation();

  const method = useForm<IReplySupport>({
    resolver: zodResolver(replyTicketSchema),
    defaultValues: { attachment: undefined, message: undefined },
  });

  const watchedMessage = method.watch('message');

  const onSubmit = async (data: IReplySupport) => {
    const { attachment, ...rest } = data;
    const formData = new FormData();

    createFormData(rest, formData);

    if (attachment && attachment?.length > 0) {
      attachment.forEach((item) => formData.append('attachment', item.file));
    }

    const res = await replySupport({ body: formData, id: id });
    if (res.data?.success) {
      method.reset();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      method.setValue('message', '');
    }
  }, [isSuccess]);

  return (
    <FormProvider {...method}>
      <Form {...method}>
        <form onSubmit={method.handleSubmit(onSubmit)} autoComplete='off' className='space-y-6'>
          <Card className='gap-0! border-primary/50'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-primary'>
                <Send className='w-5 h-5' />
                <span>Reply to Ticket</span>
              </CardTitle>
            </CardHeader>
            <CardContent className='mt-2'>
              <div>
                <FormInputTextArea
                  label='Your Message *'
                  name='message'
                  placeholder='Type your reply here...'
                  className='min-h-32!'
                />

                <div className='text-right'>
                  <span className='text-xs text-muted-foreground'>
                    {watchedMessage?.length || 0} characters
                  </span>
                </div>
              </div>

              {/* File Upload */}
              <FormField
                control={method.control}
                name={`attachment`}
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel>Attachment</FormLabel>
                    <FormControl>
                      <MultiImageUpload field={field} maxNumber={10} listType={'list'} />
                    </FormControl>
                    <FormMessage className='absolute -bottom-4.5 right-0 text-xs' />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className='flex justify-end mt-3'>
                <Button loading={isLoading} onClick={method.handleSubmit(onSubmit)}>
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </FormProvider>
  );
};

export default ReplyTicket;
