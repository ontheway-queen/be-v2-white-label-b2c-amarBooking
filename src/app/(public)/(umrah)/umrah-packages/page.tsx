import { ImageWithLoading } from '@/components/image-with-loading';
import { buttonVariants } from '@/components/ui/button';
import { getSiteInfo } from '@/lib/APIs/config-api';
import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { fetchRequest } from '@/lib/APIs/fetchApis';
import { formatCurrency, getImageLink } from '@/lib/helper';
import { IGetUmrahList } from '@/type/umrah/umrah.interface';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getSiteInfo();
  const site_data = data?.site_data;

  if (!site_data) {
    return {
      title: 'Default Title',
      description: 'Default Description',
    };
  }

  return {
    title: `Umrah Packages ${dayjs().format('YYYY')}-${dayjs().add(1, 'year').format('YYYY')} | ${site_data.site_name}`,
    description: `Discover our upcoming Umrah Packages from Bangladesh ${dayjs().format('YYYY')} - ${dayjs().add(1, 'year').format('YYYY')}`,
  };
}

const page = async () => {
  const data = await fetchRequest<IGetUmrahList[]>(API_ENDPOINTS.UMRAH_LIST);
  const result = data?.data;

  return (
    <div>
      <div className="relative bg-cover bg-center h-36 md:h-64 w-full bg-[url('/umrah-banner.webp')] ">
        <div className='absolute inset-0 bg-black/60 z-0' />

        <div className='relative z-10 container px-4 lg:px-6 mx-auto h-full'>
          <div className='flex flex-row items-center justify-center h-full'>
            <h3 className='text-xl md:text-3xl font-bold text-white text-center px-4 py-2 rounded backdrop-blur-sm bg-white/10 border border-white/20 shadow-md'>
              Umrah Packages {dayjs().format('YYYY')}-{dayjs().add(1, 'year').format('YYYY')} from
              Bangladesh
            </h3>
          </div>
        </div>
      </div>
      <div className='container my-8 px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {!result?.length ? <span>No package found</span> : ''}
        {result?.map((item) => (
          <div
            key={item.id}
            className='bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col'
          >
            <Image
              src={getImageLink(item.thumbnail)}
              alt={item.title}
              width={1000}
              height={1000}
              className='h-48 w-full object-cover'
            />

            <div className='p-4 flex flex-col justify-between flex-grow'>
              <div>
                <h4 className='text-lg font-semibold text-gray-800 mb-1'>{item.title}</h4>
                <p className='text-sm text-gray-600 mb-2'>{item.short_description}</p>
              </div>

              <div className='mt-4 flex flex-wrap gap-2 text-sm text-gray-700'>
                <span className='bg-gray-100 px-2 py-1 rounded-full'>🕒 {item.duration} days</span>
                <span className='bg-gray-100 px-2 py-1 rounded-full'>
                  👥 {item.group_size} People
                </span>
                <span className='bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium'>
                  {formatCurrency(item.adult_price)}/Adult
                </span>
              </div>

              <div className='mt-4'>
                <Link
                  href={`/umrah-packages/${item.slug}`}
                  className={buttonVariants({ className: 'w-full' })}
                >
                  View Package
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
