import { Suspense } from 'react';
import AppDownload from './_component/app-download/app-download';
import { Features } from './_component/Features';
import HeroWrapper from './_component/hero/hero';
import NewsLetter from './_component/news-letter';

import AppDownloadLoading from './_component/app-download/app-download-loading';
import HotDeals from './_component/hot-deals/hot-deals';
import PopularDestination from './_component/popular-destination/popular-destination';
import PopularDestinationsSkeleton from './_component/popular-destination/popular-destination-loading';
import TopDestination from './_component/top-destination/top-destination';

export default function Home() {
  return (
    <>
      <div className='flex bg-cover bg-center min-h-full md:min-h-[90vh] flex-col'>
        <main className='flex-1'>
          <HeroWrapper defaultValue='FLIGHT' />

          <Suspense fallback={''}>
            <HotDeals />
          </Suspense>

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
        </main>
      </div>
    </>
  );
}
