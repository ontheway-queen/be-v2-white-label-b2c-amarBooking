import AppDownload from '@/app/(public)/(home)/_component/app-download/app-download';
import AppDownloadLoading from '@/app/(public)/(home)/_component/app-download/app-download-loading';
import { Features } from '@/app/(public)/(home)/_component/Features';
import HeroWrapper from '@/app/(public)/(home)/_component/hero/hero';
import NewsLetter from '@/app/(public)/(home)/_component/news-letter';
import PopularDestination from '@/app/(public)/(home)/_component/popular-destination/popular-destination';
import PopularDestinationsSkeleton from '@/app/(public)/(home)/_component/popular-destination/popular-destination-loading';
import TopDestination from '@/app/(public)/(home)/_component/top-destination/top-destination';
import { getSiteInfo } from '@/lib/APIs/config-api';
import { getImageLink } from '@/lib/helper';
import { SITE_INFO } from '@/site-config';
import { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getSiteInfo();
  const api_data = data?.site_data;

  if (!api_data) {
    return {
      title: 'Default Title',
      description: 'Default Description',
    };
  }

  return {
    title: `${SITE_INFO.flight_title} | ${api_data.site_name}`,
    description: `${SITE_INFO.flight_description} | ${api_data.site_name}`,
    keywords: api_data.meta_tags || '',
    alternates: {
      canonical: SITE_INFO.url,
    },
    openGraph: {
      title: `${SITE_INFO.flight_title} | ${api_data.site_name}`,
      description: `${SITE_INFO.flight_description} | ${api_data.site_name}`,
      images: [api_data.site_thumbnail ? `${getImageLink(api_data.site_thumbnail)}` : ''],
    },
  };
}

const HomePage = () => {
  return (
    <>
      <HeroWrapper defaultValue='FLIGHT' />
      <Suspense fallback={<PopularDestinationsSkeleton />}>
        <PopularDestination />
      </Suspense>
      <Features />
      <Suspense>
        <TopDestination />
      </Suspense>
      <Suspense fallback={<AppDownloadLoading />}>
        <AppDownload />
      </Suspense>
      <NewsLetter />
    </>
  );
};

export default HomePage;
