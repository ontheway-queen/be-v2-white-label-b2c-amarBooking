'use client';

import {
  useCancelUmarhMutation,
  useUmrahBookingListQuery,
} from '@/app/(public)/(umrah)/_api/umrah-api-endpoints';
import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/helper';
import { cn, getStatusClass } from '@/lib/utils';
import { IUmrahBookedList } from '@/type/umrah/umrah.interface';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {};

const UmrahBookingList = (props: Props) => {
  const router = useRouter();

  const [cancelBooking, { isLoading, isSuccess }] = useCancelUmarhMutation();

  const { data } = useUmrahBookingListQuery();
  const result = data?.data;

  const columns: ColumnDef<IUmrahBookedList>[] = [
    {
      header: 'Booked date',
      cell: ({ row }) => {
        const data = row.original.created_at;
        return formatDate(data);
      },
    },

    {
      header: 'Reference',
      accessorKey: 'booking_ref',
    },
    {
      header: 'Title',
      accessorKey: 'umrah_title',
      cell: ({ row }) => {
        const data = row.original.umrah_title;
        return (
          <p title={data} className={cn('capitalize font-medium truncate max-w-[200px]')}>
            {data}
          </p>
        );
      },
    },
    {
      header: 'Adult',
      accessorKey: 'traveler_adult',
    },
    {
      header: 'Child',
      accessorKey: 'traveler_child',
    },

    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <span className={cn('capitalize font-medium', getStatusClass(status))}>{status}</span>
        );
      },
    },

    {
      header: 'Price',
      accessorKey: 'total_price',
      cell: ({ row }) => {
        const data = row.original.total_price;
        return formatCurrency(data);
      },
    },

    {
      header: 'Action',
      id: 'actions',
      cell: ({ row }) => {
        const booking = row.original;

        return (
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='icon'
              className='h-7 w-7'
              onClick={() => router.push(`/my-account/umrah-booking/${booking.id}/view`)}
            >
              <Eye className='h-3.5 w-3.5' />
            </Button>

            {booking.status === 'CANCELLED' ? null : (
              <ConfirmDeleteDialog
                title='Delete booking?'
                description='Are you sure you want to delete this booking'
                itemToCancel={`${booking?.umrah_title}`}
                onConfirm={() => cancelBooking({ id: booking.id })}
                cancelButtonText='Keep Booking'
                confirmButtonText='Delete Booking'
                loading={isLoading}
              >
                <Button variant='destructive' size='icon' className='h-6 w-6'>
                  <Trash2 className='h-3.5 w-3.5' />
                </Button>
              </ConfirmDeleteDialog>
            )}
          </div>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={result || []} />;
};

export default UmrahBookingList;
