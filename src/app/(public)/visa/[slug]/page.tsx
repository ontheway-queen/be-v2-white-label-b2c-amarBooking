import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { fetchRequest } from '@/lib/APIs/fetchApis';
import { IVisaDetails } from '@/type/visa/visa.interface';
import { Metadata } from 'next';
import VisaDetails from '../_components/visa-details';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ traveler?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: visa } = await fetchRequest<IVisaDetails>(`${API_ENDPOINTS.VISA}/${slug}`);

  return {
    title: visa?.meta_title || '',
    description: visa?.meta_description || '',
  };
}

const page = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const { traveler = 1 } = await searchParams;
  const { data: visa } = await fetchRequest<IVisaDetails>(`${API_ENDPOINTS.VISA}/${slug}`);

  return <VisaDetails visa={visa} traveler={traveler} slug={slug} />;
};

export default page;
