'use client';

import ProgressBar from '@/components/progress-bar';
import { useMobile } from '@/hooks/use-mobile';
import useFlightSearch from '@/hooks/useFlightSearchSSE';
import { useIncrementalRender } from '@/hooks/useIncrementalRender';
import { FLIGHT_DURATION_EXPIRED } from '@/lib/CONSTANT';
import { filterFlightResult } from '@/lib/flight/filter-flight-result';
import { setFlightExpiredTimer } from '@/lib/redux/slice/flight/flight-timer-slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { IFlightSearchQueryParams } from '@/type/flight/flight.interface';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import TopFilter from './filter/top-filter';
import { FlightCard } from './flight-card';
import FlightSearchError from './flight-error';
import { FilterFlightSection } from './flight-filter';
import FlightLoading from './flight-loading';
import FlightNotFound from './flight-no-found';
import { MobileFilterButton } from './mobile-filter-button';

interface Props {
  params: IFlightSearchQueryParams;
}

export const FlightSearchResults = ({ params }: Props) => {
  const isMobile = useMobile();
  const dispatch = useAppDispatch();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterBy = useAppSelector((state) => state.extractFightFilter.selectOption);

  const { isLoading, isResponseEnd, error } = useAppSelector((state) => state.flightSearchStatus);
  const { flightData, searchInfo } = useFlightSearch(params);
  const searchId = searchInfo?.search_id;

  useEffect(() => {
    if (!isLoading) {
      dispatch(setFlightExpiredTimer(Date.now() + FLIGHT_DURATION_EXPIRED));
    }
  }, [isLoading]);

  const filteredResult = useMemo(() => {
    return filterFlightResult(flightData, filterBy);
  }, [flightData, filterBy]);

  const { items, loaderRef, hasMore } = useIncrementalRender(filteredResult, 10);

  return (
    <div className='bg-muted min-h-screen'>
      <ProgressBar isResponseEnd={isResponseEnd} />

      {error ? (
        <FlightSearchError />
      ) : (
        <div className='container mx-auto px-4 py-4'>
          <div className='flex flex-col lg:flex-row gap-6'>
            {/* Filter section - hidden on mobile when not active */}
            <div className={`${isMobile ? 'hidden' : 'w-full lg:min-w-1/4 lg:max-w-1/4'}`}>
              <div className='sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto no-scrollbar'>
                <FilterFlightSection />
              </div>
            </div>

            {/* Flight results */}
            <div className='w-full lg:w-3/4'>
              <TopFilter total={filteredResult?.length} />
              {isLoading && [0, 1, 2, 4].map((item) => <FlightLoading key={item} />)}
              {items?.map((item) => (
                <motion.div
                  key={item.flight_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <FlightCard key={item.flight_id} item={item} searchId={searchId} />
                </motion.div>
              ))}

              {isResponseEnd && flightData.length === 0 ? <FlightNotFound /> : ''}

              {hasMore && (
                <div ref={loaderRef}>
                  {isLoading && [0, 1, 2, 4].map((item) => <FlightLoading key={item} />)}
                </div>
              )}
            </div>
          </div>

          {/* Mobile filter button */}
          {isMobile && (
            <MobileFilterButton
              isOpen={isFilterOpen}
              setIsOpen={setIsFilterOpen}
              element={<FilterFlightSection />}
            />
          )}
        </div>
      )}
    </div>
  );
};
