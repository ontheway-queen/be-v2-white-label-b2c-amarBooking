import { getSiteInfo } from '@/lib/APIs/config-api';
import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { fetchRequest } from '@/lib/APIs/fetchApis';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getSiteInfo();
  const site_data = data?.site_data!;

  return {
    title: `Privacy policy - ${site_data?.site_name}`,
  };
}

interface IContactUs {
  privacy_policy_content: string;
}

const ContactUsPage: React.FC = async () => {
  const { data } = await fetchRequest<IContactUs>(API_ENDPOINTS.PRIVACY_POLICY);

  return (
    <div className='bg-white'>
      <div
        className='prose container mx-auto  mt-5'
        dangerouslySetInnerHTML={{ __html: data?.privacy_policy_content! }}
      />
    </div>
  );
};

export default ContactUsPage;
