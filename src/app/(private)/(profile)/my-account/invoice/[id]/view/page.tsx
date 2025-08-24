import { getSiteInfo } from '@/lib/APIs/config-api';
import InvoiceView from '../../_components/invoice-view';

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  const { data } = await getSiteInfo();

  return <InvoiceView id={id} site_info={data?.site_data} />;
};

export default page;
