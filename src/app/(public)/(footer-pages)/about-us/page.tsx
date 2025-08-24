import { getSiteInfo } from '@/lib/APIs/config-api';
import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { fetchRequest } from '@/lib/APIs/fetchApis';
import { getImageLink } from '@/lib/helper';
import { Metadata } from 'next';

interface IAboutUs {
  about_us_content: string;
  about_us_thumbnail: string;
}

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getSiteInfo();
  const site_data = data?.site_data!;

  return {
    title: `About us - ${site_data?.site_name}`,
  };
}

export default async function AboutUs() {
  const { data } = await fetchRequest<IAboutUs>(API_ENDPOINTS.ABOUT_US);

  return (
    <section className='bg-white'>
      <div
        style={{ backgroundImage: `url(${getImageLink(data?.about_us_thumbnail)})` }}
        className='tourism-header h-72 relative flex items-end justify-start px-6 backdrop-blur-2xl'
      >
        <section className='flex items-center justify-center container h-full'>
          <div className=''>
            <h1 className='text-4xl lg:text-6xl  underline underline-offset-4 font-semibold text-white text-center'>
              About Us
            </h1>
          </div>
        </section>
      </div>

      <div
        className='prose container mx-auto mt-5'
        dangerouslySetInnerHTML={{ __html: data?.about_us_content! }}
      />
    </section>
  );
}
