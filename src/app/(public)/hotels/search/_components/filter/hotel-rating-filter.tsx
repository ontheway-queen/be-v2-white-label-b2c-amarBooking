import { HotelAccordion } from '@/components/hotel/hotel-accordion';
import { renderStarRating } from '@/components/hotel/hotel-location-select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  setHotelFilters,
  useHotelFilter,
} from '@/lib/redux/slice/hotel/extract-hotel-filter-slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { memo } from 'react';

export const HotelRatingFilter = memo(() => {
  const dispatch = useAppDispatch();
  const { defaultOption, selectedOption } = useAppSelector(useHotelFilter);

  const state = defaultOption?.ratings as string[];
  const selected = selectedOption?.ratings;

  const handleChange = (value?: string) => {
    if (!value) return;

    const isSelected = selected?.some((item) => item === value);

    const updatedValue = isSelected
      ? selected?.filter((item) => item !== value)
      : [...(selected ?? []), value];

    dispatch(setHotelFilters({ ratings: updatedValue }));
  };

  const sorted = Array.isArray(state) ? [...state].sort((a, b) => Number(a) - Number(b)) : [];

  return (
    <HotelAccordion value={'ratings'} label={'Star'} className='truncate'>
      {sorted?.map((item, index) => (
        <div key={index} className='flex items-center space-x-2 truncate'>
          <Checkbox
            id={item}
            onCheckedChange={() => handleChange(item)}
            checked={selected?.includes(item) ?? false}
          />
          <Label htmlFor={item} className='font-normal cursor-pointer w-full '>
            <div className=' truncate'>
              <span className='flex'>
                ({item}){' - '}
                {renderStarRating(Number(item))}
              </span>
            </div>
          </Label>
        </div>
      ))}
    </HotelAccordion>
  );
});

HotelRatingFilter.displayName = 'HotelRatingFilter';
