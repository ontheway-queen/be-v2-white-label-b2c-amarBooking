import HeaderTitle from '@/components/Header-title';
import HotelBookingList from './_components/hotel-booking-list';

type Props = {};

const page = async (props: Props) => {
  return (
    <div>
      <HeaderTitle title='Hotel Booking List' description='Manage your Hotel bookings' />

      <HotelBookingList />
    </div>
  );
};

export default page;
