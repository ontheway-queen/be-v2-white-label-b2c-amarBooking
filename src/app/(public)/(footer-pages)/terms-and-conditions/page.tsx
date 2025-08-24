import { getSiteInfo } from '@/lib/APIs/config-api';
import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { fetchRequest } from '@/lib/APIs/fetchApis';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getSiteInfo();
  const site_data = data?.site_data!;

  return {
    title: `Terms & Conditions - ${site_data?.site_name}`,
  };
}

interface IContactUs {
  terms_and_conditions_content: string;
}

const ContactUsPage: React.FC = async () => {
  const { data } = await fetchRequest<IContactUs>(API_ENDPOINTS.TERMS_AND_CONDITION);

  return (
    <div
      className='prose container mx-auto  mt-5'
      dangerouslySetInnerHTML={{ __html: data?.terms_and_conditions_content! }}
    />
  );
};

export default ContactUsPage;
