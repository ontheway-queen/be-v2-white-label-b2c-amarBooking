import React from 'react';
import FlightBookingList from './_components/FlightBookingList';
import HeaderTitle from '@/components/Header-title';

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <HeaderTitle title='Flight Booking List' description='Manage your flight bookings' />

      <FlightBookingList />
    </div>
  );
};

export default page;
