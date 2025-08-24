import { getSiteInfo } from '@/lib/APIs/config-api';
import FlightBookingDetailsWithPrice from '../../_components/FlightBookingDetailsWithPrice';

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  const { data } = await getSiteInfo();

  return <FlightBookingDetailsWithPrice id={id} site_info={data?.site_data} />;
};

export default page;
