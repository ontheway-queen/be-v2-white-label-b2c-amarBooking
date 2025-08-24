'use client';

import { useGetHotelBookingDetailsQuery } from '@/app/(public)/hotels/_api/hotel-endpoint';
import Loading from '@/components/loading';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CardFooter, CardHeader } from '@/components/ui/card';
import { formatDate } from '@/lib/helper';
import { calculateTotalsPaxAndRooms } from '@/lib/hotel/hotel-formatter-helper';
import { grnImageBase } from '@/request';
import { ISiteConfigSiteData } from '@/type/site.config.interface';
import { differenceInDays } from 'date-fns';
import { useRef } from 'react';
import QRCode from 'react-qr-code';
import { useReactToPrint } from 'react-to-print';

interface IProps {
  id: string;
  siteData: ISiteConfigSiteData | undefined;
}

const HotelDetailsView = ({ id, siteData }: IProps) => {
  const { data, isLoading } = useGetHotelBookingDetailsQuery({ id });
  const booking = data?.data;
  const rooms = data?.data?.rooms;
  const totals = calculateTotalsPaxAndRooms(rooms);

  const qrValue = booking?.booking_ref || 'NoRef';

  const nights = differenceInDays(
    new Date(booking?.checkout_date!),
    new Date(booking?.checkin_date!),
  );

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    pageStyle: '@page {padding: 20px; margin: 0; shadow: none;}',
  });

  if (isLoading) return <Loading />;

  return (
    <div className='bg-gray-100 min-h-screen lg:p-10 justify-center flex flex-col'>
      <div className='flex justify-between items-center p-4 bg-white shadow z-10 mb-5'>
        <h1 className='text-lg font-bold'>Accommodation voucher</h1>
        <Button onClick={reactToPrintFn}>Print This</Button>
      </div>

      <Card
        ref={contentRef}
        className='w-full min-w-3xl mx-auto shadow-lg rounded-none border p-0 '
      >
        {/* Header */}
        <CardHeader className='bg-green-900 text-white flex items-center gap-4 p-4 justify-between'>
          <div className='bg-white p-1 rounded'>
            <QRCode value={qrValue} size={80} />
          </div>
          <div>
            <h1 className='text-lg font-semibold'>Accommodation Voucher</h1>
            <p className='text-sm'>Reservation Confirmed & Guaranteed</p>
            <p className='text-xs'>Booking Ref: {booking?.booking_ref}</p>
          </div>
        </CardHeader>

        {/* Check-in / Check-out / Stay */}
        <div className='grid grid-cols-3 text-center py-4  bg-muted/20'>
          <div>
            <p className='text-xs uppercase text-gray-500'>Check-in</p>
            <p className='font-semibold'>{formatDate(booking?.checkin_date, 'EEE, dd MMM yyyy')}</p>
          </div>
          <div>
            <p className='text-xs uppercase text-gray-500'>Check-out</p>
            <p className='font-semibold'>
              {formatDate(booking?.checkout_date, 'EEE, dd MMM yyyy')}
            </p>
          </div>
          <div>
            <p className='text-xs uppercase text-gray-500'>Stay</p>
            <p className='font-semibold'>
              {nights} {nights > 1 ? 'Nights' : 'Night'}
            </p>
          </div>
        </div>

        {/* Booking Info */}
        <CardContent className='grid grid-cols-3 gap-4 px-0 py-3 bg-muted/20 text-sm'>
          <div className='px-4'>
            <p className='text-gray-500'>Booking ID</p>
            <p className='font-semibold'>{booking?.booking_ref}</p>
          </div>
          <div className='px-4'>
            <p className='text-gray-500'>Hotel Confirmation No</p>
            <p className='font-semibold'>{booking?.confirmation_no || 'Pending'}</p>
          </div>
          <div className='px-4'>
            <p className='text-gray-500'>Nationality</p>
            <p className='font-semibold'>{booking?.holder.client_nationality}</p>
          </div>
        </CardContent>

        {/* Hotel Info */}
        <CardContent className='flex items-center gap-4 p-4 bg-muted/20'>
          <div className='w-32 h-28 relative flex-shrink-0'>
            <img
              src={`${grnImageBase}${booking?.hotel_data.images.main_image}`}
              alt={booking?.hotel_name!}
              className='object-cover rounded w-32 h-28'
            />
          </div>
          <div className='text-sm space-y-0.5'>
            <p className='text-muted-foreground'>{booking?.hotel_data?.category} Star</p>
            <p className='font-semibold'>{booking?.hotel_name}</p>
            <p className='text-muted-foreground'>{booking?.hotel_data.contact_details.address}</p>
            <p className='text-muted-foreground'>
              Phone: {booking?.hotel_data.contact_details.phone || 'N/A'}
            </p>
            <p className='text-muted-foreground'>
              Email: {booking?.hotel_data.contact_details.email || 'N/A'}
            </p>
          </div>
        </CardContent>

        {/* Lead Passenger */}
        <CardContent className='grid grid-cols-3 gap-4 p-4 bg-muted/20 text-sm'>
          <div>
            <p className='text-gray-500'>Lead PAX</p>
            <p className='font-semibold'>
              {booking?.holder.title} {booking?.holder.name} {booking?.holder.surname}
            </p>
          </div>
          <div>
            <p className='text-gray-500'>Date of Booking</p>
            <p className='font-semibold'>{formatDate(booking?.created_at)}</p>
          </div>
          <div>
            <p className='text-gray-500'>Occupancy</p>
            <p className='font-semibold'>
              {totals.total_rooms} Room, {totals.total_pax} Guest
            </p>
          </div>
        </CardContent>

        {/* Room & Guest Details */}
        <CardContent className='p-4 border-b text-sm'>
          <p className='font-semibold mb-3'>Room & Guest Details</p>
          <div className='border border-gray-300 rounded overflow-hidden'>
            <div className='grid grid-cols-3 bg-gray-100 text-gray-600 font-semibold text-xs uppercase'>
              <div className='p-2 border-r border-gray-300'>Room Type</div>
              <div className='p-2 border-r border-gray-300'>Rate Plan</div>
              <div className='p-2'>Guest Name</div>
            </div>
            {rooms?.map((room, rateIndex) => (
              <div className='grid grid-cols-3 text-gray-800' key={`${rateIndex}`}>
                <div className='p-2 border-t border-gray-300 border-r flex flex-col'>
                  <span className='whitespace-pre-line'>{room.room_type}</span>
                  <div className='space-x-2'>
                    <span>{room.no_of_adults} Adult</span>
                    {room.no_of_children ? <span>{room.no_of_children} Child</span> : ''}
                  </div>
                </div>
                <div className='p-2 border-t border-gray-300 border-r'>{room.description}</div>
                <div className='p-2 border-t border-gray-300'>
                  {booking?.holder.title} {booking?.holder.name} {booking?.holder.surname}
                </div>
              </div>
            ))}
          </div>
        </CardContent>

        <CardContent className='p-4 text-sm'>
          <p className='font-semibold mb-2'>Facilities</p>
          <div className='text-gray-700 space-y-1'>{booking?.hotel_data.facilities}</div>
        </CardContent>
        <CardContent className='p-4 text-sm'>
          <p className='font-semibold mb-2'>Remarks</p>
          <ul className='list-disc list-inside text-gray-700 space-y-1'>
            <li>Please note airport transfer is not available for this hotel.</li>
            <li>The maximum occupancy for Superior Room is 3 persons.</li>
            <li>Check-in time is 14:00 hrs & Check-out time is 12:00 hrs.</li>
            <li>No amendments are possible after check-in.</li>
          </ul>
        </CardContent>

        {/* Footer */}
        <CardFooter className='bg-green-700 text-white flex justify-between items-center px-4 py-2 text-sm'>
          <p className='font-medium'>HELP LINE: {siteData?.numbers[0].number}</p>
          <p className='font-medium'>{booking?.agency_name}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HotelDetailsView;
