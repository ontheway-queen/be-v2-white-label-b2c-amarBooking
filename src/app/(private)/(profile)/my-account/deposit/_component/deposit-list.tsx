'use client';

import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
import Loading from '@/components/loading';
import { DataTable } from '@/components/table/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/helper';
import { IDepositList } from '@/type/deposit/deposit.interface';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDeleteDepositMutation, useDepositListQuery } from '../_api/deposit-api';

const DepositList = () => {
  const router = useRouter();
  const { data, isLoading } = useDepositListQuery();
  const [cancelDeposit, { isLoading: deleteLoading }] = useDeleteDepositMutation();

  if (isLoading) return <Loading />;

  const columns: ColumnDef<IDepositList>[] = [
    {
      header: 'Payment Date',
      accessorKey: 'payment_date',
      cell: ({ row }) => <span className='text-xs'>{formatDate(row.original.payment_date)}</span>,
    },

    {
      header: 'Bank',
      accessorKey: 'bank_name',
      cell: ({ row }) => {
        const { bank_name, bank_logo } = row.original;
        return (
          <div className='flex items-center gap-2'>
            <span className='text-sm font-medium'>{bank_name}</span>
          </div>
        );
      },
    },
    {
      header: 'Request No',
      accessorKey: 'request_no',
      cell: ({ row }) => (
        <span className='text-xs text-muted-foreground'>{row.original.request_no}</span>
      ),
    },

    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge
            variant={
              status === 'PENDING' ? 'secondary' : status === 'APPROVED' ? 'default' : 'destructive'
            }
          >
            {status}
          </Badge>
        );
      },
    },

    {
      header: 'Amount',
      accessorKey: 'amount',
      cell: ({ row }) => (
        <span className='font-semibold text-sm'>{formatCurrency(row.original.amount)}</span>
      ),
    },

    {
      header: 'Action',
      id: 'actions',
      cell: ({ row }) => {
        const deposit = row.original;
        return (
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='icon'
              className='h-6 w-6'
              onClick={() => router.push(`/my-account/deposit/${deposit.id}/view`)}
            >
              <Eye className='h-3.5 w-3.5' />
            </Button>
            <ConfirmDeleteDialog
              title='Cancel this deposit?'
              description='Are you sure you want to cancel this deposit'
              itemToCancel={`${deposit?.bank_name} - ${formatCurrency(deposit.amount)}`}
              onConfirm={() => cancelDeposit({ id: deposit.id })}
              cancelButtonText='Keep Deposit'
              confirmButtonText='Cancel Deposit'
              loading={deleteLoading}
            >
              <Button
                variant='destructive'
                size='icon'
                className='h-7 w-7'
                onClick={() => console.log('Delete deposit:', deposit)}
              >
                <Trash2 className='h-4 w-4' />
              </Button>
            </ConfirmDeleteDialog>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={data?.data ?? []} />
    </div>
  );
};

export default DepositList;
