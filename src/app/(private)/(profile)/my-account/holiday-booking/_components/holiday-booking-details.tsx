'use client';

import {
  useCancelBookedHolidayMutation,
  useGetBookedHolidayQuery,
} from '@/app/(public)/(holiday)/_components/api/holiday-api-endpoints';
import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
import { showToast } from '@/components/toast-utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatCurrency, formatDate, getImageLink } from '@/lib/helper';
import { cn } from '@/lib/utils';
import { ISiteConfigSiteData } from '@/type/site.config.interface';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

type Props = {
  site_info: ISiteConfigSiteData | undefined;
  id: string;
};

const HolidayBookingDetails = ({ site_info, id }: Props) => {
  const { data: res } = useGetBookedHolidayQuery({ id });
  const data = res?.data;

  const [cancelBooking, { isLoading }] = useCancelBookedHolidayMutation();

  const handleCancelBooking = async () => {
    const res = await cancelBooking({ id: id });

    if (res.data?.success) {
      showToast('success', 'Holiday booking cancelled successfully');
    } else {
      showToast('error', (res?.error as any)?.data?.message);
    }
  };

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    pageStyle: '@page {padding: 20px; margin: 0; shadow: none;}',
  });

  const isCanceled = data?.status === 'CANCELLED';

  return (
    <div>
      <div className='flex justify-end items-center gap-3 p-4 bg-white shadow z-10'>
        {!isCanceled ? (
          <ConfirmDeleteDialog
            title='Cancel Booking?'
            description='Are you sure you want to cancel your booking for'
            itemToCancel={data?.holiday_package_title}
            onConfirm={handleCancelBooking}
            cancelButtonText='Keep Booking'
          >
            <Button loading={isLoading} variant='destructive'>
              Cancel Reservation
            </Button>
          </ConfirmDeleteDialog>
        ) : (
          ''
        )}

        <Button onClick={reactToPrintFn}>Print This</Button>
      </div>
      <div
        ref={contentRef}
        className='flex justify-center  min-h-screen p-4 min-w-3xl print:max-w-full '
      >
        <div className='w-full bg-white rounded border shadow overflow-hidden'>
          {/* Header */}
          <div className='p-6 relative'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-4'>
                <img
                  src={`${getImageLink(site_info?.main_logo)}`}
                  alt={site_info?.site_name!}
                  width={120}
                  height={30}
                  className='object-contain '
                />
                <div className='flex flex-col'>
                  <h2 className='text-xl font-bold text-primary'>{site_info?.site_name}</h2>
                  <p className='text-sm whitespace-pre-line'>{site_info?.address?.[0].address}</p>
                  <p className='text-sm'>{site_info?.emails?.[0]?.email}</p>
                  <p className='text-sm'> {site_info?.numbers?.[0]?.number}</p>
                </div>
              </div>

              <div className='text-right'>
                <div className='text-right'>
                  <div
                    className={cn(
                      `inline-block px-4 py-1 rounded-full border-2  font-semibold`,
                      isCanceled && 'text-red-700 border-red-600',
                    )}
                  >
                    {data?.status}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Booking Info */}
          <div className='p-6 border-b'>
            <div className='flex flex-wrap -mx-3'>
              <div className='w-full md:w-1/2 px-3 mb-4'>
                <h2 className='text-lg font-semibold text-gray-700'>Booking Details</h2>
                <div className='mt-3 space-y-2'>
                  <p className='flex justify-between text-sm'>
                    <span className='text-gray-500'>Booking Reference:</span>
                    <span className='font-medium'>{data?.booking_ref}</span>
                  </p>
                  <p className='flex justify-between text-sm gap-4'>
                    <span className='text-gray-500'>Package:</span>
                    <span className='font-medium' title={data?.holiday_package_title}>
                      {data?.holiday_package_title}
                    </span>
                  </p>
                  <p className='flex justify-between text-sm'>
                    <span className='text-gray-500'>Travel Date:</span>
                    <span className='font-medium'>{formatDate(data?.travel_date)}</span>
                  </p>
                  <p className='flex justify-between text-sm'>
                    <span className='text-gray-500'>Booking Date:</span>
                    <span className='font-medium'>{formatDate(data?.created_at)}</span>
                  </p>
                </div>
              </div>

              <div className='w-full md:w-1/2 px-3 mb-4'>
                <h2 className='text-lg font-semibold text-gray-700'>Customer Information</h2>
                <div className='mt-3 space-y-2'>
                  <p className='flex justify-between text-sm'>
                    <span className='text-gray-500'>Customer Name:</span>
                    <span className='font-medium'>{data?.user_name}</span>
                  </p>
                  <p className='flex justify-between text-sm'>
                    <span className='text-gray-500'>Email:</span>
                    <span className='font-medium'>{data?.contact_email}</span>
                  </p>
                  <p className='flex justify-between text-sm'>
                    <span className='text-gray-500'>Phone:</span>
                    <span className='font-medium'>{data?.contact_number}</span>
                  </p>
                  <p className='flex justify-between text-sm'>
                    <span className='text-gray-500'>Customer Note:</span>
                    <span className='font-medium'>{data?.note_from_customer}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Price Details */}
          <div className='p-6'>
            <h2 className='text-lg font-semibold text-gray-700 mb-4'>Price Summary</h2>
            <div className='bg-gray-50 rounded-lg p-4'>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Adults ({data?.total_adult})</span>
                  <span className='font-medium'>{formatCurrency(data?.total_adult_price)}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Children ({data?.total_child})</span>
                  <span className='font-medium'>{formatCurrency(data?.total_child_price)}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Price Adjustment</span>
                  <span className='font-medium'>{formatCurrency(data?.total_markup)}</span>
                </div>
                <div className='border-t pt-2 mt-2 flex justify-between'>
                  <span className='font-bold text-gray-800'>Total Price</span>
                  <span className='font-bold text-primary'>
                    {formatCurrency(data?.total_price)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayBookingDetails;
