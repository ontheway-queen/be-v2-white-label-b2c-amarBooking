'use client';

import { useGetBookingDetailsQuery } from '@/app/(public)/flights/_api/flight-endpoint';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate, getImageLink } from '@/lib/helper';
import { ISiteConfigSiteData } from '@/type/site.config.interface';
import Image from 'next/image';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

type Props = {
  id: string;
  site_info: ISiteConfigSiteData | undefined;
};

const FlightBookingDetailsWithPrice = ({ id, site_info }: Props) => {
  const { data, isLoading } = useGetBookingDetailsQuery(id);
  const bookingData = data?.data;

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    pageStyle: '@page {padding: 20px; margin: 0; shadow: none;}',
  });

  if (isLoading) return <Loading />;

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex justify-between items-center p-4 bg-white shadow z-10'>
        <h1 className='text-lg font-bold'>Price Breakdown</h1>
        <Button onClick={reactToPrintFn}>Print This</Button>
      </div>

      {/* Scrollable Invoice Content */}
      <div className=' min-w-[600px] overflow-y-auto overflow-x-auto'>
        <div ref={contentRef} className='flex-1  bg-gray-50'>
          <div className='mx-auto p-6 bg-white border rounded space-y-6'>
            {/* Header */}
            <div className='flex justify-between gap-4 items-center'>
              <div className='flex items-start sm:items-center gap-4'>
                <img
                  src={`${getImageLink(bookingData?.source_logo)}`}
                  alt={bookingData?.source_name!}
                  width={120}
                  height={40}
                  className='object-contain'
                />
                <div className='flex flex-col text-sm'>
                  <h2 className='text-xl font-bold text-primary'>{site_info?.site_name}</h2>
                  <p className='whitespace-pre-line'>{site_info?.address?.[0].address}</p>
                  <p>{site_info?.emails?.[0]?.email}</p>
                  <p>{site_info?.numbers?.[0]?.number}</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='text-sm font-medium'>Booking Ref:</p>
                <p className='text-lg font-bold'>{bookingData?.booking_ref}</p>
              </div>
            </div>

            {/* Journey Info */}
            <div className='grid sm:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg'>
              {bookingData?.segment_data.map((segment: any) => (
                <div key={segment.id} className='space-y-1'>
                  <h3 className='font-semibold text-gray-700'>
                    {segment.airline} ({segment.airline_code})
                  </h3>
                  <p>
                    {segment.origin.code} → {segment.destination.code}
                  </p>
                  <p>
                    {formatDate(segment.departure_date)} {segment.departure_time} -{' '}
                    {segment.arrival_time}
                  </p>
                  <p className='text-sm text-gray-500'>
                    {segment.class}, Baggage: {segment.baggage}
                  </p>
                </div>
              ))}
            </div>

            {/* Traveler Info */}
            <div className='overflow-x-auto p-4 bg-gray-50 rounded-lg border border-gray-200'>
              <h3 className='font-semibold text-gray-700 mb-4'>Passenger Details</h3>
              <table className='min-w-full text-sm border border-gray-200'>
                <thead className='bg-gray-100'>
                  <tr>
                    {['Passenger', 'DOB', 'Gender', 'Contact', 'Passport'].map((head) => (
                      <th
                        key={head}
                        className='px-3 py-2 text-left font-semibold text-gray-700 border-b border-gray-200'
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className='divide-y divide-gray-200'>
                  {bookingData?.traveler_data.map((traveler) => (
                    <tr key={traveler.id} className='hover:bg-gray-50'>
                      {/* Passenger */}
                      <td className='px-3 py-2'>
                        <p className='font-medium'>
                          {traveler.reference} {traveler.first_name} {traveler.last_name}
                        </p>
                        <p className='text-xs text-gray-500'>{traveler.type}</p>
                      </td>

                      {/* DOB */}
                      <td className='px-3 py-2'>{formatDate(traveler.date_of_birth)}</td>

                      {/* Gender */}
                      <td className='px-3 py-2'>{traveler.gender}</td>

                      {/* Contact */}
                      <td className='px-3 py-2'>
                        <p>{traveler.email}</p>
                        <p className='text-xs text-gray-500'>{traveler.phone}</p>
                      </td>

                      {/* Passport */}
                      <td className='px-3 py-2'>
                        <p>{traveler.passport_number}</p>
                        <p className='text-xs text-gray-500'>
                          Exp: {formatDate(traveler.passport_expiry_date)}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pricing Breakdown */}
            <div className='overflow-x-auto p-4 bg-yellow-50 rounded-lg border border-yellow-200'>
              <h3 className='font-bold text-lg text-yellow-800 mb-4'>Pricing Breakdown</h3>
              <table className='min-w-full text-sm border-collapse'>
                <thead className='bg-yellow-100'>
                  <tr>
                    {['Type', 'Base Fare', 'Tax', 'AIT', 'Discount', 'Total Fare'].map((head) => (
                      <th
                        key={head}
                        className='px-4 py-2 text-left sm:text-right font-semibold text-yellow-900'
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingData?.price_breakdown_data.map((item: any) => (
                    <tr key={item.id} className='bg-yellow-50'>
                      <td className='px-4 py-2 text-left font-medium'>
                        {item.type} × {item.total_passenger}
                      </td>

                      <td className='px-4 py-2 text-right'>{formatCurrency(item.base_fare)}</td>
                      <td className='px-4 py-2 text-right'>{formatCurrency(item.tax)}</td>
                      <td className='px-4 py-2 text-right'>{formatCurrency(item.ait)}</td>
                      <td className='px-4 py-2 text-right'>{formatCurrency(item.discount)}</td>
                      <td className='px-4 py-2 text-right font-bold'>
                        {formatCurrency(item.total_fare)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className='bg-yellow-100 font-bold text-yellow-900'>
                    <td colSpan={5} className='px-4 py-2 text-left'>
                      Total Payable
                    </td>
                    <td className='px-4 py-2 text-right'>
                      {formatCurrency(bookingData?.payable_amount)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Footer */}
            <div className='text-sm text-gray-500 text-center'>
              Booking created by {bookingData?.created_by_user_name} | Status: {bookingData?.status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightBookingDetailsWithPrice;
