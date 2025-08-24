'use client';

import { useGetBookingListQuery } from '@/app/(public)/flights/_api/flight-endpoint';
import Loading from '@/components/loading';
import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/helper';
import { cn, getStatusClass } from '@/lib/utils';
import { IBookedFlightList } from '@/type/flight/flight.interface';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';

type Props = {};

const FlightBookingList = (props: Props) => {
  const { data, isLoading } = useGetBookingListQuery({});
  const result = data?.data;

  const router = useRouter();

  const columns: ColumnDef<IBookedFlightList>[] = [
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
      header: 'Route',
      accessorKey: 'route',
      cell: ({ row }) => {
        const route = row.original.route;
        const journey_type = row.original.journey_type;
        return (
          <div className='flex flex-col'>
            <span className='text-xs'>{journey_type}</span>
            <span>{route}</span>
          </div>
        );
      },
    },

    {
      header: 'Travel date',
      cell: ({ row }) => {
        const data = row.original.travel_date;
        return formatDate(data);
      },
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
      header: 'Amount',
      accessorKey: 'payable_amount',
      cell: ({ row }) => {
        const data = row.original.payable_amount;
        return formatCurrency(data);
      },
    },

    {
      header: 'Action',
      accessorKey: 'id',
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div className='flex flex-col gap-2'>
            <Button
              className='h-5 text-xs'
              onClick={() => router.push(`flight-booking/${data.id}/e-ticket`)}
            >
              E-Ticket
            </Button>
            <Button
              variant={'outline'}
              className='h-5 text-xs'
              onClick={() => router.push(`flight-booking/${data.id}/pricing`)}
            >
              Pricing
            </Button>
          </div>
        );
      },
    },
  ];
  if (isLoading) return <Loading />;
  return (
    <div>
      <DataTable columns={columns} data={result || []} />
    </div>
  );
};

export default FlightBookingList;
