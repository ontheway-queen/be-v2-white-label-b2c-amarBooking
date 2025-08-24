'use client';

import { useUmrahBookingDetailsQuery } from '@/app/(public)/(umrah)/_api/umrah-api-endpoints';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatCurrency, formatDate, getImageLink } from '@/lib/helper';
import { ISiteConfigSiteData } from '@/type/site.config.interface';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

type Props = {
  id: string;
  siteName: ISiteConfigSiteData | undefined;
};

const UmrahViewDetails = ({ id, siteName }: Props) => {
  const { data, isLoading } = useUmrahBookingDetailsQuery({ id: id! }, { skip: !id });

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const bookingData = data?.data;

  const handlePrint = () => {
    reactToPrintFn();
  };

  if (isLoading) return <Loading />;

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <div className='mx-auto'>
        <div className='flex justify-between items-center p-4 bg-white shadow z-10 mb-3'>
          <h1 className='text-lg font-bold'>Booking Copy</h1>
          <Button onClick={reactToPrintFn}>Print This</Button>
        </div>

        {/* Invoice Content */}
        <div ref={contentRef} className='bg-white rounded-lg overflow-hidden min-w-3xl'>
          {/* Header */}
          <div className='p-4'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-4'>
                <img
                  src={`${getImageLink(siteName?.main_logo)}`}
                  alt={siteName?.site_name!}
                  width={120}
                  height={40}
                  className='object-contain'
                />
                <div className='flex flex-col'>
                  <h2 className='text-xl font-bold text-primary'>{siteName?.site_name}</h2>
                  <p className='text-sm whitespace-pre-line'>{siteName?.address?.[0].address}</p>
                  <p className='text-sm'>{siteName?.emails?.[0]?.email}</p>
                  <p className='text-sm'> {siteName?.numbers?.[0]?.number}</p>
                </div>
              </div>

              <div className='text-right'>
                <div
                  className={`inline-block px-4 py-1 rounded-full border-2 ${bookingData?.status} font-semibold`}
                >
                  {bookingData?.status}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Invoice Details */}
          <div className='p-8'>
            <div className='border-b'>
              <div className='flex flex-wrap -mx-3'>
                <div className='w-full md:w-1/2 px-3 mb-4'>
                  <h2 className='text-lg font-semibold text-gray-700'>Booking Details</h2>
                  <div className='mt-3 space-y-2'>
                    <p className='flex justify-between text-sm'>
                      <span className='text-gray-500'>Booking Reference:</span>
                      <span className='font-medium'>#{bookingData?.booking_ref}</span>
                    </p>
                    <p className='flex justify-between text-sm gap-5'>
                      <span className='text-gray-500'>Package:</span>
                      <span className='font-medium truncate' title={bookingData?.umrah_title}>
                        {bookingData?.umrah_title}
                      </span>
                    </p>

                    <p className='flex justify-between text-sm  '>
                      <span className='text-gray-500'>Booking Date:</span>
                      <span className='font-medium'>{formatDate(bookingData?.created_at)}</span>
                    </p>
                  </div>
                </div>

                <div className='w-full md:w-1/2 px-3 mb-4'>
                  <h2 className='text-lg font-semibold text-gray-700'>Customer Information</h2>
                  <div className='mt-3 space-y-2'>
                    <p className='flex justify-between text-sm'>
                      <span className='text-gray-500'>Customer Name:</span>
                      <span className='font-medium'>{bookingData?.contact.name}</span>
                    </p>
                    <p className='flex justify-between text-sm'>
                      <span className='text-gray-500'>Email:</span>
                      <span className='font-medium'>{bookingData?.contact.email}</span>
                    </p>
                    <p className='flex justify-between text-sm'>
                      <span className='text-gray-500'>Phone:</span>
                      <span className='font-medium'>{bookingData?.contact.phone}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div className='mb-8'>
              <h2 className='text-xl font-semibold text-gray-800 mb-4 mt-4'>Booking Summary</h2>
              <div className='overflow-x-auto'>
                <table className='w-full border-collapse'>
                  <thead>
                    <tr className='bg-gray-50'>
                      <th className='border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700'>
                        Description
                      </th>
                      <th className='border border-gray-200 px-3 py-2 text-center font-semibold text-gray-700'>
                        Quantity
                      </th>
                      <th className='border border-gray-200 px-3 py-2 text-right font-semibold text-gray-700'>
                        Unit Price
                      </th>
                      <th className='border border-gray-200 px-3 py-2 text-right font-semibold text-gray-700'>
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='hover:bg-gray-50'>
                      <td className='border border-gray-200 px-3 py-2'>Adult Travelers</td>
                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        {bookingData?.traveler_adult}
                      </td>
                      <td className='border border-gray-200 px-3 py-2 text-right'>
                        {formatCurrency(bookingData?.per_adult_price)}
                      </td>
                      <td className='border border-gray-200 px-3 py-2 text-right font-semibold'>
                        {formatCurrency(
                          Number(bookingData?.traveler_adult || 0) *
                            Number(bookingData?.per_adult_price || 0),
                        )}
                      </td>
                    </tr>
                    <tr className='hover:bg-gray-50'>
                      <td className='border border-gray-200 px-3 py-2'>Child Travelers</td>
                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        {bookingData?.traveler_child}
                      </td>
                      <td className='border border-gray-200 px-3 py-2 text-right'>
                        {formatCurrency(bookingData?.per_child_price)}
                      </td>
                      <td className='border border-gray-200 px-3 py-2 text-right font-semibold'>
                        {formatCurrency(
                          Number(bookingData?.traveler_child || 0) *
                            Number(bookingData?.per_child_price || 0),
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notes Section */}
            {bookingData?.note_from_customer && bookingData?.note_from_customer !== 'No note' && (
              <div className='mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg'>
                <h3 className='font-semibold text-gray-800 mb-2'>Customer Notes:</h3>
                <p className='text-gray-700'>{bookingData?.note_from_customer}</p>
              </div>
            )}

            {/* Footer */}
            <div className='mt-12 pt-8 border-t border-gray-200'>
              <div className='text-center text-gray-600'>
                <p className='mb-2'>Thank you for choosing our travel services!</p>

                <p className='text-xs mt-4 text-gray-500'>
                  This is a computer-generated invoice. No signature required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UmrahViewDetails;
