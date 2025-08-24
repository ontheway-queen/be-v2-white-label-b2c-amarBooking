'use client';

import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
import Loading from '@/components/loading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/helper';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import { useCloseSupportMutation, useSupportDetailsQuery } from '../_api/support-api';
import ReplyTicket from './reply-support';
import SupportMessages from './support-messages';

type ReplyFormData = {
  message: string;
  attachments?: FileList;
};

type Props = { id: string };

const SupportTicketDetails = ({ id }: Props) => {
  const { data, isLoading } = useSupportDetailsQuery({ id });
  const [closeTicket, { isLoading: closeLoading }] = useCloseSupportMutation();

  const ticket = data?.data;

  if (isLoading) return <Loading />;

  return (
    <div className='space-y-3'>
      {/* Ticket Header */}
      <Card className='border-none'>
        <CardHeader>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <CardTitle className='text-xl font-bold'>{ticket?.subject}</CardTitle>
                <Badge
                  className={cn(
                    `flex items-center gap-1`,
                    ticket?.status === 'Closed' && 'bg-red-600',
                  )}
                >
                  {ticket?.status}
                </Badge>
              </div>
              <p className='text-sm font-medium'>Ref: {ticket?.ref_type}</p>
              <p className='text-sm font-medium text-primary'>Ticket #{ticket?.support_no}</p>
            </div>

            <div className='text-right space-y-1'>
              <p className='text-sm text-muted-foreground'>Open at</p>
              <p className='font-sm'>{formatDate(ticket?.created_at)}</p>

              {ticket?.status !== 'Closed' ? (
                <ConfirmDeleteDialog
                  title='Close ticket?'
                  description='Are you sure you want to close ticket'
                  itemToCancel={`${ticket?.support_no}`}
                  onConfirm={() => closeTicket({ id: id })}
                  cancelButtonText='Keep Ticket Open'
                  confirmButtonText='Close Ticket'
                  loading={closeLoading}
                >
                  <Button variant='destructive' size='sm'>
                    Close ticket
                  </Button>
                </ConfirmDeleteDialog>
              ) : (
                ''
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Reply Section */}
      {ticket?.status.toLowerCase() === 'open' && <ReplyTicket id={id} />}

      <SupportMessages id={id} name={ticket?.name} />

      {/* Closed Ticket Notice */}
      {ticket?.status.toLowerCase() === 'closed' && (
        <Card className='border-gray-200 bg-gray-50'>
          <CardContent className='p-6 text-center'>
            <div className='flex items-center justify-center gap-2 text-muted-foreground mb-2'>
              <CheckCircle className='w-5 h-5' />
              <span className='font-medium'>This ticket has been closed</span>
            </div>
            <p className='text-sm text-muted-foreground'>
              No further replies can be added to this ticket?. If you need additional assistance,
              please create a new support ticket?.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SupportTicketDetails;
