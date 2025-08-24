import CommonSidebarMobile from '@/components/filter/common-sidebar-filter-mobile';
import { Button } from '@/components/ui/button';
import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { fetchRequest } from '@/lib/APIs/fetchApis';
import { capitalizeFirstLetter, formatQueryParams } from '@/lib/helper';
import { extractHolidayFilterData } from '@/lib/holiday/extract-holiday-filter-data';
import { IHolidaySearchQueryParams, ITourList } from '@/type/holiday/holiday.interface';
import { Metadata } from 'next';
import HolidaySidebarFilter from '../_components/holiday-sidebar-filter';
import HolidaySingleCard from '../_components/holiday-single-card';
import Link from 'next/link';
import { SITE_INFO } from '@/site-config';

export const metadata: Metadata = {
  title: SITE_INFO.holiday_search_page_title,
  description: SITE_INFO.holiday_search_page_description,
};

type Props = {
  searchParams: Promise<IHolidaySearchQueryParams>;
};

const page = async ({ searchParams }: Props) => {
  const searchQuery = await searchParams;

  const url = formatQueryParams(API_ENDPOINTS.SEARCH_HOLIDAY, {
    city_id: searchQuery.city_id,
  });

  const res = await fetchRequest<ITourList[]>(url, {
    method: 'POST',
  });

  const tourPackages = res?.data;

  const filterData = extractHolidayFilterData(tourPackages);

  return (
    <div className='bg-muted min-h-screen'>
      <div className='container py-5'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold mb-3'>Explore Our Tour Packages</h1>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Discover the beauty of{' '}
            {searchQuery.country ? capitalizeFirstLetter(searchQuery.country) : 'nature'} with our
            carefully curated tour packages
          </p>
        </div>
        <div className='grid grid-cols-7 gap-5'>
          <div className='hidden lg:block col-span-2 min-h-screen'>
            <div className='sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto no-scrollbar'>
              <HolidaySidebarFilter filterData={filterData} />
            </div>
          </div>
          <div className='col-span-7 lg:col-span-5'>
            <div className='p-6 rounded-md mb-3 text-white bg-gradient-to-r from-primary/90 via-primary/80 to-primary/70 shadow-lg'>
              <div className='flex items-center justify-between flex-wrap gap-4'>
                <div>
                  <h6 className='text-3xl font-bold leading-tight'>Need a</h6>
                  <h6 className='text-3xl font-bold leading-tight'>CUSTOMIZED TOUR?</h6>
                </div>
                <Button className='font-bold'>REQUEST NOW</Button>
              </div>
            </div>
            <p className='mb-1'>
              Explore tour packages in <strong>{searchQuery.city ?? 'ALL'}</strong>.{' '}
              <Link href='/tour-packages' className='text-blue-600 underline'>
                View all packages
              </Link>
            </p>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 h-fit'>
              {tourPackages?.map((item, index) => (
                <HolidaySingleCard key={index} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile filter button */}

        <CommonSidebarMobile element={<HolidaySidebarFilter filterData={filterData} />} />
      </div>
    </div>
  );
};

export default page;
