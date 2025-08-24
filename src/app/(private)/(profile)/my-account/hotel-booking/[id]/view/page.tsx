import { getSiteInfo } from '@/lib/APIs/config-api';
import HotelDetailsView from './_components/hotel-details-view';

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  const { data } = await getSiteInfo();

  return <HotelDetailsView id={id} siteData={data?.site_data} />;
};

export default page;
