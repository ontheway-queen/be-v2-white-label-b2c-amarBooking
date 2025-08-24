'use client';

import { useGetHotelBookingQuery } from '@/app/(public)/hotels/_api/hotel-endpoint';
import Loading from '@/components/loading';
import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/helper';
import { IHotelBooking } from '@/type/hotel/hotel.interface';
import { ColumnDef } from '@tanstack/react-table';
import { SquareChartGantt } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HotelBookingList = () => {
  const { data, isLoading } = useGetHotelBookingQuery();
  const router = useRouter();
  if (isLoading) return <Loading />;

  const columns: ColumnDef<IHotelBooking>[] = [
    {
      header: 'Hotel Info',
      accessorKey: 'hotel_name',
      cell: ({ row }) => {
        const { hotel_name, hotel_code, booking_ref } = row.original;
        return (
          <div className='text-xs space-y-1'>
            <div className='font-medium'>{hotel_name}</div>
            <div className='text-muted-foreground'>Code: {hotel_code}</div>
            <div className='text-muted-foreground'>Ref: {booking_ref}</div>
          </div>
        );
      },
    },
    {
      header: 'Dates',
      accessorKey: 'checkin_date',
      cell: ({ row }) => {
        const { checkin_date, checkout_date } = row.original;
        return (
          <div className='text-xs space-y-1'>
            <div>Check-in: {formatDate(checkin_date)}</div>
            <div>Check-out: {formatDate(checkout_date)}</div>
          </div>
        );
      },
    },
    {
      header: 'Price',
      accessorKey: 'sell_price.total_price',
      cell: ({ row }) => {
        const { sell_price } = row.original;
        return (
          <div className='text-xs'>
            <div>Total: ৳{sell_price.total_price}</div>
            <div className='text-muted-foreground text-[10px]'>
              Base: ৳{sell_price.price} | Tax: ৳{sell_price.tax}
            </div>
          </div>
        );
      },
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const { status, finalized } = row.original;
        return (
          <div className='text-xs'>
            <div className='capitalize'>{status}</div>
            <div className='text-muted-foreground text-[10px]'>
              Finalized: {finalized ? 'Yes' : 'No'}
            </div>
          </div>
        );
      },
    },
    {
      header: 'Created At',
      accessorKey: 'created_at',
      cell: ({ row }) => <div className='text-xs'>{formatDate(row.original.created_at)}</div>,
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
              size='sm'
              onClick={() => router.push(`/my-account/hotel-booking/${booking.id}/view`)}
            >
              <SquareChartGantt className='mr-1 h-3 w-3' />
              Voucher
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={data?.data || []} />
    </div>
  );
};

export default HotelBookingList;
