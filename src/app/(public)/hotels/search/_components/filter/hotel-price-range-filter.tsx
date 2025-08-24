import { HotelAccordion } from '@/components/hotel/hotel-accordion';
import { Slider } from '@/components/ui/slider';
import {
  setHotelFilters,
  useHotelFilter,
} from '@/lib/redux/slice/hotel/extract-hotel-filter-slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';

import { useEffect, useState } from 'react';

export const HotelPriceRangeFilter = () => {
  const dispatch = useAppDispatch();
  const { defaultOption, selectedOption } = useAppSelector(useHotelFilter);

  const state = defaultOption?.priceRange;
  const state_min_price = state?.min ?? null;
  const state_max_price = state?.max ?? null;

  const { max: prMax, min: prMin } = selectedOption?.priceRange ?? {};

  const [priceRange, setPriceRange] = useState<[number | null, number | null]>([null, null]);

  useEffect(() => {
    if (state_min_price && state_max_price) {
      setPriceRange([state_min_price, state_max_price]);
    }
  }, [state_min_price, state_max_price]);

  useEffect(() => {
    if (prMin && prMax) {
      setPriceRange([prMin, prMax]);
    }
  }, [prMin, prMax]);

  const handleChange = (val: number[]) => {
    setPriceRange([val[0], val[1]]);
  };

  const onValueCommit = (range: number[]) => {
    dispatch(setHotelFilters({ priceRange: { min: range[0], max: range[1] } }));
  };

  // if (state?.min == state?.max) return null;

  if (state_min_price && state_max_price && priceRange[0] && priceRange[1])
    return (
      <HotelAccordion value={'price'} label={'Price Range'}>
        <>
          <Slider
            defaultValue={priceRange as number[]}
            onValueCommit={onValueCommit}
            min={state_min_price as number}
            max={state_max_price as number}
            step={1}
            onValueChange={handleChange}
            value={priceRange as number[]}
          />
          <div className='flex justify-between'>
            <span className='text-sm'>BDT {priceRange[0]?.toLocaleString()}</span>
            <span className='text-sm'>BDT {priceRange[1]?.toLocaleString()}</span>
          </div>
        </>
      </HotelAccordion>
    );

  return null;
};

HotelPriceRangeFilter.displayName = 'HotelPriceRangeFilter';
