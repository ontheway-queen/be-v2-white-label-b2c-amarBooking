'use client';

import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/helper';
import { cn, getStatusClass } from '@/lib/utils';
import { IHolidayBookingList } from '@/type/holiday/holiday.interface';
import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  data: IHolidayBookingList[] | undefined;
};

const HolidayBookingList = ({ data }: Props) => {
  const router = useRouter();

  const columns: ColumnDef<IHolidayBookingList>[] = [
    {
      header: 'Booking Date',

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
      header: 'Package',
      accessorKey: 'holiday_package_title',
    },

    {
      header: 'Travel date',
      accessorKey: 'travel_date',
      cell: ({ row }) => {
        const data = row.original;
        return formatDate(data.travel_date);
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
      header: 'Action',
      accessorKey: 'id',
      cell: ({ row }) => {
        const data = row.original;
        return (
          <Button
            variant='outline'
            size='icon'
            className='h-7 w-7'
            onClick={() => router.push(`holiday-booking/${data.id}`)}
          >
            <Eye className='h-3.5 w-3.5' />
          </Button>
        );
      },
    },
  ];
  return <DataTable columns={columns} data={data!} />;
};

export default HolidayBookingList;
