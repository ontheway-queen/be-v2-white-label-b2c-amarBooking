'use client';

import React, { useState } from 'react';
import { ITransactionList, useTransactionListQuery } from '../_api/transaction-api';
import Loading from '@/components/loading';
import { ColumnDef } from '@tanstack/react-table';
import { formatCurrency, formatDate } from '@/lib/helper';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/table/data-table';
import { DateRange } from 'react-day-picker';
import { DateRangePicker } from '@/components/date-range-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

type Props = {};

const TransactionList = (props: Props) => {
  // 🔹 Filter + pagination states
  const [status, setStatus] = useState<string | undefined>();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [limit, setLimit] = useState(15);
  const [skip, setSkip] = useState(0);

  const { data, isLoading } = useTransactionListQuery({
    from_date: formatDate(dateRange?.from),
    to_date: formatDate(dateRange?.to),
    limit: limit,
    skip: skip,
    type: status,
  });

  const total = data?.total ?? 0;

  if (isLoading) return <Loading />;

  const columns: ColumnDef<ITransactionList>[] = [
    {
      header: 'Voucher No',
      accessorKey: 'voucher_no',
      cell: ({ row }) => (
        <span className='text-xs text-muted-foreground'>{row.original.voucher_no}</span>
      ),
    },
    {
      header: 'Date',
      accessorKey: 'ledger_date',
      cell: ({ row }) => <span className='text-xs'>{formatDate(row.original.ledger_date)}</span>,
    },
    {
      header: 'Details',
      accessorKey: 'details',
      cell: ({ row }) => {
        const { details } = row.original;
        return (
          <div className='max-w-68 whitespace-pre-line'>
            <span className='text-xs'>{details}</span>
          </div>
        );
      },
    },
    {
      header: 'Status',
      accessorKey: 'type',
      cell: ({ row }) => {
        const type = row.original.type;
        return <Badge variant={type === 'Credit' ? 'default' : 'destructive'}>{type}</Badge>;
      },
    },
    {
      header: 'Amount',
      accessorKey: 'amount',
      cell: ({ row }) => (
        <span className='font-semibold text-sm'>{formatCurrency(row.original.amount)}</span>
      ),
    },
  ];

  return (
    <>
      {/* 🔹 Filters */}
      <div className='flex flex-wrap items-center gap-4 mb-5'>
        <DateRangePicker value={dateRange} onChange={setDateRange} />
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className='w-40'>
            <SelectValue placeholder='Filter Status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Debit'>Debit</SelectItem>
            <SelectItem value='Credit'>Credit</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable columns={columns} data={data?.data ?? []} />

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
    </>
  );
};

export default TransactionList;
