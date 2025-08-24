import { getSiteInfo } from '@/lib/APIs/config-api';
import { SITE_INFO } from '@/site-config';
import { Metadata } from 'next';
import FlightBookingDetails from './_components/flight-booking-details';

interface IFlightBookingSearchParams {
  searchId: string;
  flight: string;
}

type Props = {
  searchParams: Promise<IFlightBookingSearchParams>;
};

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getSiteInfo();
  const site_data = data?.site_data;

  if (!site_data) {
    return {
      title: 'Default Title',
      description: 'Default Description',
    };
  }

  return {
    title: `Your Flight Booking Details | ${site_data.site_name}`,
    description: `Review your flight itinerary, route, and booking summary securely with ${SITE_INFO.url_name}`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

const page = async ({ searchParams }: Props) => {
  const params = await searchParams;

  return (
    <div className='bg-muted min-h-screen'>
      <div className='container px-4 md:px-6'>
        <FlightBookingDetails search_id={params.searchId} flight_id={params.flight} />
      </div>
    </div>
  );
};

export default page;
