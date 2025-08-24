'use client';

import { useGetBookingDetailsQuery } from '@/app/(public)/flights/_api/flight-endpoint';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { formatDate, formatTime, getImageLink } from '@/lib/helper';
import { ISiteConfigSiteData } from '@/type/site.config.interface';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

type Props = {
  id: string;
  site_info: ISiteConfigSiteData | undefined;
};

const FlightBookingDetails = ({ id, site_info }: Props) => {
  const { data, isLoading } = useGetBookingDetailsQuery(id);
  const bookingData = data?.data;

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    pageStyle: '@page {padding: 20px; margin: 0; shadow: none;}',
  });

  const {
    booking_ref,
    total_passenger,
    status,
    journey_type,
    segment_data,
    gds_pnr,
    airline_pnr,
    traveler_data,
  } = bookingData || {};

  const segmentData = segment_data?.[0];

  if (isLoading) return <Loading />;

  return (
    <div className='py-5 bg-gray-50'>
      <div className='flex justify-between items-center p-4 bg-white shadow z-10'>
        <h1 className='text-lg font-bold'>e-ticket</h1>
        <Button onClick={reactToPrintFn}>Print This</Button>
      </div>

      <div className='p-5 w-[800px]  overflow-x-auto mx-auto'>
        <div className='mx-auto bg-white border' ref={contentRef}>
          <div className='p-5 border-b'>
            <div className='flex justify-between items-end'>
              <div className='flex items-center space-x-4'>
                <img
                  src={`${getImageLink(bookingData?.source_logo)}`}
                  alt={bookingData?.source_name!}
                  width={120}
                  height={40}
                  className='object-contain'
                />
                <div className='flex flex-col'>
                  <h2 className='text-xl font-bold text-primary'>{site_info?.site_name}</h2>
                  <p className='text-sm whitespace-pre-line'>{site_info?.address?.[0].address}</p>
                  <p className='text-sm'>{site_info?.emails?.[0]?.email}</p>
                  <p className='text-sm'> {site_info?.numbers?.[0]?.number}</p>
                </div>
              </div>

              <div className='text-right'>
                <h2 className='text-xl font-semibold'>e-Ticket</h2>
                <p className='text-sm'>
                  <span className='font-bold'>{booking_ref}</span>
                </p>

                <p className='text-sm text-green-600 font-bold'>{status}</p>
                <p className='text-xs'>{journey_type}</p>
              </div>
            </div>
          </div>

          <div className='bg-gray-100 text-gray-800 uppercase text-xs tracking-wider  border border-gray-200 py-2 mt-2 '>
            <div className='px-5 flex  justify-end gap-5'>
              <div className='font-bold'>GDS PNR: {gds_pnr || 'N/A'} </div>
              <div className='font-bold'>AIRLINE PNR: {airline_pnr || 'N/A'}</div>
            </div>
          </div>

          <div className='p-5 border-b'>
            <h3 className='text-sm font-semibold mb-2'>Passenger Details ({total_passenger})</h3>
            <table className='w-full text-sm text-left border border-gray-200 overflow-hidden'>
              <thead className='bg-gray-100 text-gray-700 uppercase text-xs tracking-wider  border border-gray-200'>
                <tr>
                  <th className='py-3 px-4'>Name & Passport</th>
                  <th className='py-3 px-4'>Ticket No</th>
                  <th className='py-3 px-4'>Baggage</th>
                </tr>
              </thead>
              <tbody>
                {traveler_data?.map((tkt, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className='py-3 px-4'>
                      <p className='font-semibold text-gray-900'>
                        {tkt?.reference} {tkt?.first_name?.toUpperCase()}{' '}
                        {tkt?.last_name?.toUpperCase()}
                      </p>
                      <p className='text-xs '>Adult, {tkt?.gender}</p>
                      <p className='text-xs '>Passport: {tkt?.passport_number}</p>
                    </td>
                    <td className='py-3 px-4 text-gray-800'>{tkt?.ticket_number || 'N/A'}</td>
                    <td className='py-3 px-4'>
                      <p className='text-gray-800'>Cabin: {segmentData?.class || 'N/A'}</p>
                      <p className='text-gray-800'>Checkin: {segmentData?.baggage || 'N/A'}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {segment_data?.map((segment, index) => (
            <div key={index} className='p-5 border-b'>
              {/* Airline Header */}
              <div className='flex items-center'>
                <h3 className='text-sm font-semibold text-gray-800 tracking-wide'>
                  {segment?.airline}
                </h3>
              </div>

              {/* Flight Info */}
              <div className='flex justify-between items-start text-gray-700'>
                {/* Departure */}
                <div className='w-1/3'>
                  <p className='text-2xl font-bold text-gray-900'>
                    {formatTime(segment?.departure_time)}
                  </p>
                  <p className='text-sm text-gray-600'>
                    {formatDate(segment?.departure_date, 'EEE, dd MMM yyyy')}
                  </p>
                  <p className='mt-2 text-sm font-medium'>{segment?.origin.airport}</p>
                  <p className='text-xs text-gray-500'>
                    {segment?.origin.city}, {segment?.origin.code}
                  </p>
                </div>

                {/* Duration + Flight Info */}
                <div className='w-1/3 text-center'>
                  <p className='text-sm text-gray-500 mb-1'>{segment?.duration}</p>
                  <div className='relative flex items-center justify-center'>
                    <hr className='w-full border-t border-gray-300' />
                    <span className='absolute bg-white px-2 text-xs text-gray-500'>✈</span>
                  </div>
                  <p className='text-xs mt-2 text-gray-600'>
                    Flight No: <span className='font-medium'>{segment?.flight_number}</span>
                  </p>
                  <p className='text-xs text-gray-600'>
                    Class: <span className='font-medium'>{segment?.class}</span>
                  </p>
                </div>

                {/* Arrival */}
                <div className='w-1/3 text-right'>
                  <p className='text-2xl font-bold text-gray-900'>
                    {formatTime(segment?.arrival_time)}
                  </p>
                  <p className='text-sm text-gray-600'>
                    {formatDate(segment?.arrival_date, 'EEE, dd MMM yyyy')}
                  </p>
                  <p className='mt-2 text-sm font-medium'>{segment?.destination.airport}</p>
                  <p className='text-xs text-gray-500'>
                    {segment?.destination.city}, {segment?.destination.code}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className='p-5'>
            <h3 className='text-xl font-semibold mb-4'>Important Reminders</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
              <div>
                <h4 className='font-bold'>Flight Status</h4>
                <p>
                  Before your flight, please check your updated flight status on the airline website
                  or by calling the airline customer support.
                </p>
              </div>
              <div>
                <h4 className='font-bold'>Online Check-in</h4>
                <p>
                  Airline websites usually have online check-ins available which can be availed to.
                </p>
              </div>
              <div>
                <h4 className='font-bold'>Bag Drop Counter</h4>
                <p>
                  Please be at the Check-in Bag Drop counter before closure for document
                  verification and acceptance of check-in baggage.
                </p>
              </div>
              <div>
                <h4 className='font-bold'>Government issued ID card</h4>
                <p>
                  Please carry a government issued photo ID card along with your e-ticket while
                  travelling.
                </p>
              </div>
              <div>
                <h4 className='font-bold'>Emergency Exit Row</h4>
                <p>
                  Passengers seated on the emergency exit row must comply with safety regulations
                  and requirements.
                </p>
              </div>
            </div>
          </div>

          <div className='px-8 py-4 bg-gray-50 text-xs text-gray-600'>
            <h4 className='font-bold mb-2'>Important Information</h4>
            <p>
              This e-Ticket receipt / itinerary is your record of your electronic ticket and forms
              part of your contract of carriage. Your electronic ticket is stored in the airline
              computer reservation system. You may need to show this receipt to enter the airport
              and/or to prove return or onward travel to customs and immigration officials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightBookingDetails;
