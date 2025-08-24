import { getSiteInfo } from '@/lib/APIs/config-api';
import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { fetchRequest } from '@/lib/APIs/fetchApis';
import { getImageLink } from '@/lib/helper';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getSiteInfo();
  const site_data = data?.site_data!;

  return {
    title: `Contact us - ${site_data?.site_name}`,
  };
}

interface IContactUs {
  contact_us_content: string;
  contact_us_thumbnail: string;
}

const ContactUsPage: React.FC = async () => {
  const { data } = await fetchRequest<IContactUs>(API_ENDPOINTS.CONTACT_US);

  return (
    <section className='bg-white text-gray-800'>
      {/* Hero Section */}
      <div
        className='contact-header  h-72'
        style={{ backgroundImage: `url(${getImageLink(data?.contact_us_thumbnail)})` }}
      >
        <section className='flex items-center justify-center container h-full'>
          <div className=''>
            <h1 className='text-4xl lg:text-6xl  underline underline-offset-4 font-semibold text-white text-center'>
              Contact Us
            </h1>
          </div>
        </section>
      </div>

      <div
        className='prose container mx-auto  mt-5'
        dangerouslySetInnerHTML={{ __html: data?.contact_us_content! }}
      />
    </section>
  );
};

export default ContactUsPage;
