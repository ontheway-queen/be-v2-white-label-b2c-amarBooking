import HeaderTitle from '@/components/Header-title';
import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { fetchRequest } from '@/lib/APIs/fetchApis';
import { IHolidayBookingList } from '@/type/holiday/holiday.interface';
import React from 'react';
import HolidayBookingList from './_components/holiday-booking-list';

type Props = {};

const page = async (props: Props) => {
  const res = await fetchRequest<IHolidayBookingList[]>(`${API_ENDPOINTS.HOLIDAY_BOOKING_LIST}`);
  const data = res.data;

  return (
    <div>
      <HeaderTitle title='Holiday Booking List' description='Manage your holiday bookings' />

      <HolidayBookingList data={data} />
    </div>
  );
};

export default page;
