import { IHotelSearchParams } from '@/type/hotel/hotel.interface';
import HotelSearchModify from './_components/hotel-search-modify';
import HotelSearchResult from './_components/hotel-search-results';
import { decodedHotelParams } from '@/lib/hotel/hotel-formatter-helper';
import { formatDate } from '@/lib/helper';
import { SITE_INFO } from '@/site-config';

type Props = {
  searchParams: Promise<IHotelSearchParams>;
};

export async function generateMetadata({ searchParams }: Props) {
  const params = await searchParams;
  const decodeData = decodedHotelParams(params);

  const name = decodeData.location.name;
  const check_in = formatDate(decodeData.date.from);
  const check_out = formatDate(decodeData.date.to);

  const title = `Hotels in ${name} | Stay from ${check_in} to ${check_out}`;
  const description = `Discover the best hotel deals in ${name} for your stay from ${check_in} to ${check_out}. Compare prices, reviews, and book with ${SITE_INFO.url_name}.`;

  return {
    title,
    description,
    robots: {
      index: false,
      follow: true,
    },
  };
}

const page = async ({ searchParams }: Props) => {
  const searchQueryData = await searchParams;

  const decodeSearchParams = decodedHotelParams(searchQueryData);

  return (
    <>
      <div className='sticky top-[0px] z-50 bg-background border-t'>
        <HotelSearchModify searchData={decodeSearchParams} />
      </div>
      <HotelSearchResult searchData={decodeSearchParams} />
    </>
  );
};

export default page;
