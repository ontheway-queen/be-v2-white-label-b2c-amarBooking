import AccordionSection from '@/components/accordion-section';
import Loading from '@/components/loading';
import { Slider } from '@/components/ui/slider';
import { useSmoothScrollToTop } from '@/hooks/useSmoothScrollToTop';
import { setFlightFilters } from '@/lib/redux/slice/flight/extract-flight-filter-slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { memo, useEffect, useState } from 'react';

const FlightPriceRange = memo(() => {
  const dispatch = useAppDispatch();
  const scrollToTop = useSmoothScrollToTop();

  const { isResponseEnd } = useAppSelector((state) => state.flightSearchStatus);

  const price_range = useAppSelector(
    ({ extractFightFilter }) => extractFightFilter.defaultOption?.price_range,
  );

  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    if (price_range) {
      setPriceRange(price_range);
    }
  }, [price_range]);

  const handleChange = (val: number[]) => {
    setPriceRange([val[0], val[1]]);
  };

  const onValueCommit = (range: number[]) => {
    dispatch(setFlightFilters({ price_range: range }));
    scrollToTop();
  };

  if (price_range && priceRange[0])
    return (
      <AccordionSection value='price' label='Price Range'>
        {isResponseEnd ? (
          <>
            <Slider
              defaultValue={priceRange}
              min={price_range[0]}
              max={price_range[1]}
              step={1}
              onValueChange={handleChange}
              onValueCommit={onValueCommit}
            />
            <div className='flex justify-between'>
              <span className='text-sm'>BDT {priceRange[0].toLocaleString()}</span>
              <span className='text-sm'>BDT {priceRange[1].toLocaleString()}</span>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </AccordionSection>
    );
});

FlightPriceRange.displayName = 'FlightPriceRange';

export default FlightPriceRange;
