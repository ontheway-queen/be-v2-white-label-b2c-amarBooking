import { getSiteInfo } from '@/lib/APIs/config-api';
import HolidayBookingDetails from '../_components/holiday-booking-details';

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;

  const { data: result } = await getSiteInfo();

  return <HolidayBookingDetails site_info={result?.site_data} id={id} />;
};

export default page;
