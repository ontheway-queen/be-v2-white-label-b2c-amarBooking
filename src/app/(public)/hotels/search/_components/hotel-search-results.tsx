'use client';

import { MobileFilterButton } from '@/app/(public)/flights/search/_components/mobile-filter-button';
import HotelSearchError from '@/components/hotel/hotel-search-error';
import { HotelTimer } from '@/components/hotel/hotel-timer';
import { useMobile } from '@/hooks/use-mobile';
import { useIncrementalRender } from '@/hooks/useIncrementalRender';
import { HOTEL_DURATION_EXPIRED, pageChangeAnimation } from '@/lib/CONSTANT';
import { filterHotelResult } from '@/lib/hotel/filter-hotel-result';
import {
  setHotelForExtractFilter,
  useHotelFilter,
} from '@/lib/redux/slice/hotel/extract-hotel-filter-slice';
import { setHotelExpiredTimer, useSelectedHotel } from '@/lib/redux/slice/hotel/hotel-data-slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { IHotelsSearchSchema } from '@/type/hotel/hotel.interface';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useHotelSearchQuery } from '../../_api/hotel-endpoint';
import HotelBooking from '../../_page_details/hotel-booking';
import HotelDetails from '../../_page_details/hotel-details';
import { HotelFilterSidebar } from './hotel-filter-sidebar';
import HotelListCard from './hotel-list-card';
import HotelSearchLoading from './hotel-search-loading';

interface IProps {
  searchData: IHotelsSearchSchema;
}

const HotelSearchResult = ({ searchData }: IProps) => {
  const dispatch = useAppDispatch();
  const isMobile = useMobile();
  const router = useRouter();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data, isLoading, isFetching, isError } = useHotelSearchQuery(searchData);

  const { hotelPage } = useAppSelector(useSelectedHotel);
  const { selectedOption } = useAppSelector(useHotelFilter);

  const hotel_list = data?.data?.hotels;

  useEffect(() => {
    if (hotel_list?.length) {
      dispatch(setHotelForExtractFilter({ hotels: hotel_list }));
      dispatch(setHotelExpiredTimer(Date.now() + HOTEL_DURATION_EXPIRED));
    }
  }, [hotel_list]);

  useEffect(() => {
    dispatch(setHotelExpiredTimer(Date.now() + HOTEL_DURATION_EXPIRED));
  }, []);

  const filteredResult = useMemo(() => {
    return filterHotelResult(hotel_list, selectedOption);
  }, [hotel_list, selectedOption]);

  const { items, loaderRef, hasMore } = useIncrementalRender(filteredResult, 10);

  if (isLoading || isFetching) return <HotelSearchLoading />;

  if (isError)
    return (
      <div key='error'>
        <HotelSearchError
          message="No hotel found at this location. We couldn't find any hotels at this location. Try adjusting your search or explore nearby areas."
          subtitle=''
          backLabel='Search again'
          onBack={() => {
            router.replace('/hotel');
          }}
        />
      </div>
    );

  if (hotelPage === 'hotel-list')
    return (
      <>
        <div className='bg-muted min-h-screen'>
          <div className='container mx-auto px-4 md:px-0 py-2'>
            <div className='flex flex-col lg:flex-row gap-6'>
              <div className={`${isMobile ? 'hidden' : 'w-full lg:min-w-1/4 lg:max-w-1/4'}`}>
                <div className='sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto no-scrollbar'>
                  <HotelFilterSidebar />
                </div>
              </div>

              {/* Hotel results */}
              <div className='w-full lg:w-3/4'>
                <div className='bg-background rounded-md p-2 mb-2'>
                  <div className='text-sm'>
                    We found <span className='font-medium'>{filteredResult?.length}</span>{' '}
                    accommodations matching your search criteria in this location.
                  </div>
                </div>

                {items?.map((item, index) => (
                  <HotelListCard
                    key={index}
                    hotel={item}
                    searchData={searchData}
                    no_of_night={data?.data?.no_of_nights}
                  />
                ))}

                {hasMore && (
                  <div ref={loaderRef}>
                    <p>Getting more hotel</p>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile filter button */}
            {isMobile && (
              <MobileFilterButton
                isOpen={isFilterOpen}
                setIsOpen={setIsFilterOpen}
                element={<HotelFilterSidebar />}
              />
            )}
          </div>
        </div>
      </>
    );
  return (
    <div className=' min-h-screen bg-muted overflow-hidden'>
      <AnimatePresence mode='wait'>
        {hotelPage === 'hotel-details' && (
          <motion.div
            key='hotel-details'
            initial='initial'
            animate='animate'
            exit='exit'
            variants={pageChangeAnimation}
            className='bg-muted min-h-screen!'
          >
            <div className='bg-muted py-2'>
              <HotelDetails searchData={searchData} />
              <div className='fixed bottom-6 right-6 z-50'>
                <HotelTimer bottom />
              </div>
            </div>
          </motion.div>
        )}

        {hotelPage === 'hotel-booking' && (
          <motion.div
            key='hotel-booking'
            initial='initial'
            animate='animate'
            exit='exit'
            variants={pageChangeAnimation}
            className='bg-muted overflow-hidden'
          >
            <div className='bg-muted py-2'>
              <HotelBooking searchData={searchData} />
              <div className='fixed bottom-6 right-6 z-50'>
                <HotelTimer bottom />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HotelSearchResult;
