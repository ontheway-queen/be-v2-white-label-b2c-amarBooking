import { memo } from 'react';
import { HotelAccordion } from '@/components/hotel/hotel-accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  setHotelFilters,
  useHotelFilter,
} from '@/lib/redux/slice/hotel/extract-hotel-filter-slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';

export const HotelFacilitiesFilter = memo(() => {
  const dispatch = useAppDispatch();
  const { defaultOption, selectedOption } = useAppSelector(useHotelFilter);

  const state = defaultOption?.facilities as string[];
  const selected = selectedOption?.facilities;

  const handleChange = (value?: string) => {
    if (!value) return;

    const isSelected = selected?.some((item) => item === value);

    const updatedValue = isSelected
      ? selected?.filter((item) => item !== value)
      : [...(selected ?? []), value];

    dispatch(setHotelFilters({ facilities: updatedValue }));
  };

  return (
    <HotelAccordion value={'facilities'} label={'Facilities'} className='truncate'>
      <div className='grid grid-cols-2 gap-2'>
        {state?.map((item, index) => (
          <div key={index} className='flex items-center gap-2 pr-4 py-1'>
            <Checkbox
              id={item}
              onCheckedChange={() => handleChange(item)}
              checked={selected?.includes(item) ?? false}
            />
            <Label htmlFor={item} title={item} className='font-normal cursor-pointer w-full'>
              <span className='truncate block mr-1'>{item}</span>
            </Label>
          </div>
        ))}
      </div>
    </HotelAccordion>
  );
});

HotelFacilitiesFilter.displayName = 'HotelFacilitiesFilter';
