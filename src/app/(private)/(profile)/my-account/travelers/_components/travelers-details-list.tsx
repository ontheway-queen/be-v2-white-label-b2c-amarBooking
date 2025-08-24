'use client';

import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
import Loading from '@/components/loading';
import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import { formatDate, getImageLink } from '@/lib/helper';
import { ITravelerList } from '@/type/travelers/travelers.interface';
import { ColumnDef } from '@tanstack/react-table';
import { ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { useDeleteTravelerMutation, useTravelersListQuery } from '../_api/traveler-api';
import { useRouter } from 'next/navigation';

const renderFileLink = (url?: string) =>
  url ? (
    <a
      href={getImageLink(url)}
      target='_blank'
      rel='noopener noreferrer'
      className='text-blue-500 underline text-xs flex items-center gap-1'
    >
      <ExternalLink size={12} />
      View
    </a>
  ) : (
    <span className='text-muted-foreground text-xs'>—</span>
  );

const TravelersList = () => {
  const { data, isLoading } = useTravelersListQuery({});
  const router = useRouter();

  const [deleteTraveler, { isLoading: deleteLoading }] = useDeleteTravelerMutation();

  if (isLoading) return <Loading />;

  const travelers = data?.data ?? [];

  const columns: ColumnDef<ITravelerList>[] = [
    {
      header: 'Traveler',
      accessorKey: 'reference',
      cell: ({ row }) => {
        const { reference, first_name, last_name, type, date_of_birth } = row.original;
        return (
          <div className=' text-xs'>
            <div className='font-medium'>{reference}</div>
            <div className='capitalize'>
              {first_name} {last_name}
            </div>
            <div className='text-muted-foreground'>
              {type} — {formatDate(date_of_birth)}
            </div>
          </div>
        );
      },
    },
    {
      header: 'Passport',
      accessorKey: 'passport_number',
      cell: ({ row }) => {
        const { passport_number, passport_expiry_date } = row.original;
        return (
          <div className='text-xs '>
            <div>#{passport_number}</div>
            <div className='text-muted-foreground'>Exp: {formatDate(passport_expiry_date)}</div>
            <div className='text-muted-foreground'></div>
          </div>
        );
      },
    },
    {
      header: 'Contact',
      accessorKey: 'contact_number',
      cell: ({ row }) => (
        <div className='text-xs '>
          <div>{row.original.contact_number}</div>
          <div className='text-muted-foreground truncate max-w-[150px]'>
            {row.original.contact_email}
          </div>
        </div>
      ),
    },
    {
      header: 'Files',
      accessorKey: 'visa_file',
      cell: ({ row }) => (
        <div className='flex flex-col text-xs gap-1'>
          <div>
            <span className='font-medium'>Visa:</span> {renderFileLink(row.original.visa_file)}
          </div>
          <div>
            <span className='font-medium'>Passport:</span>{' '}
            {renderFileLink(row.original.passport_file)}
          </div>
        </div>
      ),
    },

    {
      header: 'Action',
      id: 'actions',
      cell: ({ row }) => {
        const traveler = row.original;

        return (
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='icon'
              className='h-6 w-6'
              onClick={() => router.push(`/my-account/travelers/${traveler.id}/update`)}
            >
              <Pencil className='h-3.5 w-3.5' />
            </Button>

            <ConfirmDeleteDialog
              title='Delete traveler?'
              description='Are you sure you want to delete this traveler'
              itemToCancel={`${traveler?.first_name} ${traveler?.last_name}`}
              onConfirm={() => deleteTraveler({ id: traveler.id })}
              cancelButtonText='Keep Traveler'
              confirmButtonText='Delete Traveler'
              loading={deleteLoading}
            >
              <Button
                variant='destructive'
                size='icon'
                className='h-6 w-6'
                onClick={() => console.log('Delete traveler:', traveler)}
              >
                <Trash2 className='h-3.5 w-3.5' />
              </Button>
            </ConfirmDeleteDialog>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={travelers} />
    </div>
  );
};

export default TravelersList;
