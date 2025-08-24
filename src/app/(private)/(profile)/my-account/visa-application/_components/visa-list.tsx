'use client';
import { useGetVisaApplicationListQuery } from '@/app/(public)/visa/_api/visa-endpoints';
import { DateRangePicker } from '@/components/date-range-picker';
import Loading from '@/components/loading';
import { DataTable } from '@/components/table/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/helper';
import { IVisaApplicationList } from '@/type/visa/visa.interface';
import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';

type Props = {};

const VisaList = (props: Props) => {
  const router = useRouter();

  // 🔹 Filter + pagination states

  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [limit, setLimit] = useState(15);
  const [skip, setSkip] = useState(0);

  const { data, isLoading } = useGetVisaApplicationListQuery({
    from_date: formatDate(dateRange?.from),
    to_date: formatDate(dateRange?.to),
    limit: limit,
    skip: skip,
  });

  const total = data?.total ?? 0;

  if (isLoading) return <Loading />;

  const columns: ColumnDef<IVisaApplicationList>[] = [
    {
      header: 'Application Date',
      accessorKey: 'application_date',
      cell: ({ row }) => (
        <span className='text-xs'>{formatDate(row.original.application_date)}</span>
      ),
    },
    {
      header: 'Application Ref',
      accessorKey: 'application_ref',
      cell: ({ row }) => (
        <span className='text-xs font-medium'>{row.original.application_ref}</span>
      ),
    },
    {
      header: 'Title',
      accessorKey: 'title',
      cell: ({ row }) => <span className='text-xs'>{row.original.title}</span>,
    },
    {
      header: 'Visa Type',
      accessorKey: 'visa_type',
      cell: ({ row }) => (
        <span className='text-xs text-muted-foreground'>{row.original.visa_type || '-'}</span>
      ),
    },

    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status;
        const color =
          status === 'Paid' ? 'default' : status === 'Pending' ? 'secondary' : 'destructive';
        return <Badge variant={color}>{status}</Badge>;
      },
    },
    {
      header: 'Action',
      id: 'actions',
      cell: ({ row }) => {
        const application = row.original;
        return (
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='icon'
              className='h-7 w-7'
              onClick={() => router.push(`/my-account/visa-application/${application.id}/view`)}
            >
              <Eye className='h-3.5 w-3.5' />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className='space-y-4'>
      {/* 🔹 Filters */}
      <div className='flex flex-wrap items-center gap-4'>
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      {/* 🔹 Table */}
      <DataTable columns={columns} data={data?.data || []} />

      {/* 🔹 Pagination */}
      <div className='flex items-center justify-end mt-4'>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            disabled={skip === 0}
            onClick={() => setSkip((prev) => Math.max(prev - limit, 0))}
          >
            Prev
          </Button>
          <span className='text-sm'>
            Page {Math.floor(skip / limit) + 1} of {Math.ceil(total / limit)}
          </span>
          <Button
            variant='outline'
            size='sm'
            disabled={skip + limit >= total}
            onClick={() => setSkip((prev) => prev + limit)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VisaList;
