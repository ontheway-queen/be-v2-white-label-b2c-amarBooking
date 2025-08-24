import { memo } from 'react';

import { HotelAccordion } from '@/components/hotel/hotel-accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  setHotelFilters,
  useHotelFilter,
} from '@/lib/redux/slice/hotel/extract-hotel-filter-slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';

export const HotelMealPlansFilter = memo(() => {
  const dispatch = useAppDispatch();
  const { defaultOption, selectedOption } = useAppSelector(useHotelFilter);

  const state = defaultOption?.mealPlans as string[];
  const selected = selectedOption?.mealPlans;

  const handleChange = (value?: string) => {
    if (!value) return;

    const isSelected = selected?.some((item) => item === value);

    const updatedValue = isSelected
      ? selected?.filter((item) => item !== value)
      : [...(selected ?? []), value];

    dispatch(setHotelFilters({ mealPlans: updatedValue }));
  };

  return (
    <HotelAccordion value={'mealPlans'} label={'Meals Plans'} className='truncate'>
      {state?.map((item, index) => (
        <div key={index} className='flex items-center space-x-2 truncate'>
          <Checkbox
            id={item}
            onCheckedChange={() => handleChange(item)}
            checked={selected?.includes(item) ?? false}
          />
          <Label htmlFor={item} className='font-normal cursor-pointer w-full '>
            <div className='flex flex-col truncate'>
              <span>{item}</span>
            </div>
          </Label>
        </div>
      ))}
    </HotelAccordion>
  );
});

HotelMealPlansFilter.displayName = 'HotelMealPlansFilter';
