import { getSiteInfo } from '@/lib/APIs/config-api';
import VisaDetails from '../../_components/visa-details';

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  const { data } = await getSiteInfo();
  return <VisaDetails id={id} site_info={data?.site_data} />;
};

export default page;
