import HeaderTitle from '@/components/Header-title';
import UmrahBookingList from './_components/umrah-booking-list';

const page = () => {
  return (
    <div>
      <HeaderTitle title='Umrah Booking List' description='Manage your umrah bookings' />
      <UmrahBookingList />
    </div>
  );
};

export default page;
