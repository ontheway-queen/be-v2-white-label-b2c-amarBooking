import { HotelTimer } from '@/components/hotel/hotel-timer';
import { Accordion } from '@/components/ui/accordion';
import { memo } from 'react';
import { HotelCancellationFilter } from './filter/hotel-cancellation-filter';
import { HotelFacilitiesFilter } from './filter/hotel-facilities-filter';
import { HotelMealPlansFilter } from './filter/hotel-mealsPlan-filter';
import { HotelPriceRangeFilter } from './filter/hotel-price-range-filter';
import { HotelRatingFilter } from './filter/hotel-rating-filter';
import { HotelRoomsType } from './filter/hotel-rooms-type-filter';

export const HotelFilterSidebar = memo(() => {
  return (
    <Accordion
      className='space-y-2'
      type='multiple'
      defaultValue={
        [
          'price',
          'cancellation',
          // 'facilities',
          // 'mealPlans',
          // 'roomTypes',
          // 'ratings'
        ].filter(Boolean) as string[]
      }
    >
      <HotelTimer />
      <HotelPriceRangeFilter />
      <HotelCancellationFilter />
      <HotelMealPlansFilter />
      <HotelRatingFilter />
      <HotelRoomsType />
      <HotelFacilitiesFilter />
    </Accordion>
  );
});

HotelFilterSidebar.displayName = 'HotelFilterSidebar';
