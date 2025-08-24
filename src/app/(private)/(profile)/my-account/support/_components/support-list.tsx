'use client';

import { DateRangePicker } from '@/components/date-range-picker';
import Loading from '@/components/loading';
import { DataTable } from '@/components/table/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatDate } from '@/lib/helper';
import { ISupportList } from '@/type/support/support.interface';
import { ColumnDef } from '@tanstack/react-table';
import { MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useSupportListQuery } from '../_api/support-api';

type Props = {};

const SupportList = (props: Props) => {
  const router = useRouter();

  // 🔹 Filter + pagination states
  const [status, setStatus] = useState<string | undefined>();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [limit, setLimit] = useState(15);
  const [skip, setSkip] = useState(0);

  const { data, isLoading } = useSupportListQuery({
    from_date: formatDate(dateRange?.from),
    to_date: formatDate(dateRange?.to),
    limit: limit,
    skip: skip,
    status: status,
  });

  const supportList = data?.data ?? [];
  const total = data?.total ?? 0;

  if (isLoading) return <Loading />;

  const columns: ColumnDef<ISupportList>[] = [
    {
      header: 'Ticket No',
      accessorKey: 'support_no',
      cell: ({ row }) => <span className='text-xs font-medium'>{row.original.support_no}</span>,
    },
    {
      header: 'Subject',
      accessorKey: 'subject',
      cell: ({ row }) => (
        <div>
          <div className='max-w-[220px] truncate text-xs'>{row.original.subject}</div>
          <span className='text-xs text-muted-foreground'>{row.original.ref_type}</span>
        </div>
      ),
    },

    {
      header: 'Last Reply',
      accessorKey: 'last_message_created_at',
      cell: ({ row }) => (
        <div className='text-xs'>
          <div className='max-w-[260px] truncate '>{row.original.last_message}</div>
          <span className='text-muted-foreground'>
            {formatDate(row.original.last_message_created_at, 'dd MMM yyyy, HH:mm')}
          </span>
        </div>
      ),
    },
    {
      header: 'Priority',
      accessorKey: 'priority',
      cell: ({ row }) => {
        const priority = row.original.priority;
        const color =
          priority === 'Urgent'
            ? 'destructive'
            : priority === 'High'
              ? 'default'
              : priority === 'Medium'
                ? 'secondary'
                : 'outline';
        return <Badge variant={color}>{priority}</Badge>;
      },
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status;
        const color =
          status === 'Open' ? 'default' : status === 'Closed' ? 'destructive' : 'outline';
        return <Badge variant={color}>{status}</Badge>;
      },
    },

    {
      header: 'Action',
      id: 'actions',
      cell: ({ row }) => {
        const ticket = row.original;
        return (
          <div className='flex items-center gap-2'>
            <Button
              variant='secondary'
              size='icon'
              className='h-7 w-7'
              onClick={() => router.push(`/my-account/support/${ticket.id}/view`)}
            >
              <MessageCircle className='h-4 w-4' />
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
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className='w-40'>
            <SelectValue placeholder='Filter Status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Open'>Open</SelectItem>
            <SelectItem value='Closed'>Closed</SelectItem>
            <SelectItem value='ReOpen'>ReOpen</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 🔹 Table */}
      <DataTable columns={columns} data={supportList} />

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

export default SupportList;
