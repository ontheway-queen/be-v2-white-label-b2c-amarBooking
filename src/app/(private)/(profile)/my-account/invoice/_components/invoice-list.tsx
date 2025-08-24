'use client';
import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
import { DateRangePicker } from '@/components/date-range-picker';
import Loading from '@/components/loading';
import { DataTable } from '@/components/table/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/helper';
import { cn } from '@/lib/utils';
import { IInvoiceList } from '@/type/invoice/invoice.interface';
import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useClearDueInvoiceMutation, useInvoiceListQuery } from '../_api/invoice-api';

type Props = {};

const InvoiceList = (props: Props) => {
  const router = useRouter();
  const [clearDue, { isLoading: clearDueLoading }] = useClearDueInvoiceMutation();

  // 🔹 Filter + pagination states

  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [limit, setLimit] = useState(15);
  const [skip, setSkip] = useState(0);

  const { data, isLoading } = useInvoiceListQuery({
    from_date: formatDate(dateRange?.from),
    to_date: formatDate(dateRange?.to),
    limit: limit,
    skip: skip,
  });

  const total = data?.total ?? 0;

  if (isLoading) return <Loading />;

  const columns: ColumnDef<IInvoiceList>[] = [
    {
      header: 'Date',
      accessorKey: 'created_at',
      cell: ({ row }) => (
        <span className='text-xs'>{formatDate(row.original.created_at, 'dd MMM yyyy, HH:mm')}</span>
      ),
    },
    {
      header: 'Invoice No',
      accessorKey: 'invoice_no',
      cell: ({ row }) => <span className='text-xs font-medium'>{row.original.invoice_no}</span>,
    },
    {
      header: 'Details',
      accessorKey: 'details',
      cell: ({ row }) => (
        <div className='max-w-[220px] whitespace-pre-wrap text-xs'>{row.original.details}</div>
      ),
    },
    {
      header: 'Amount',
      accessorKey: 'total_amount',
      cell: ({ row }) => (
        <span className='text-xs font-medium'>{formatCurrency(row.original.total_amount)}</span>
      ),
    },
    {
      header: 'Due',
      accessorKey: 'due',
      cell: ({ row }) => {
        const amount = Number(row.original.due);
        return (
          <span className={cn('text-xs font-medium', amount && 'text-red-700')}>
            {row.original.due}
          </span>
        );
      },
    },
    {
      header: 'Type',
      accessorKey: 'ref_type',
      cell: ({ row }) => (
        <span className='text-xs text-muted-foreground'>{row.original.ref_type}</span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status?.toLowerCase();

        return (
          <Badge
            variant='default'
            className={cn(
              status === 'issued' && 'bg-green-500 text-white hover:bg-green-600',
              status === 'canceled' && 'bg-red-500 text-white hover:bg-red-600',
            )}
          >
            {row.original.status}
          </Badge>
        );
      },
    },

    {
      header: 'Action',
      id: 'actions',
      cell: ({ row }) => {
        const invoice = row.original;
        const due = Number(invoice.due);
        return (
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='icon'
              className='h-7 w-7'
              onClick={() => router.push(`/my-account/invoice/${invoice.id}/view`)}
            >
              <Eye className='h-3.5 w-3.5' />
            </Button>

            <ConfirmDeleteDialog
              title='Clear due?'
              description='Are you sure you want to clear due'
              itemToCancel={`${formatCurrency(due)}`}
              onConfirm={() => clearDue({ id: invoice?.id! })}
              cancelButtonText='Keep due'
              confirmButtonText='Clear due'
              loading={clearDueLoading}
            >
              <Button
                disabled={due ? false : true}
                variant='secondary'
                className='text-xs! px-1! h-6!'
                size={'sm'}
              >
                Clear due
              </Button>
            </ConfirmDeleteDialog>
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

export default InvoiceList;
