import { HotelAccordion } from '@/components/hotel/hotel-accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  setHotelFilters,
  useHotelFilter,
} from '@/lib/redux/slice/hotel/extract-hotel-filter-slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { memo } from 'react';

const cancellationPolicy = [
  'Refundable',
  'Non-refundable',
  'Free cancellation',
  'Partial cancellation',
];

export const HotelCancellationFilter = memo(() => {
  const dispatch = useAppDispatch();
  const { selectedOption } = useAppSelector(useHotelFilter);

  const selected = selectedOption?.cancellation;

  const handleChange = (value?: string) => {
    if (!value) return;

    const isSelected = selected?.some((item) => item === value);

    const updatedValue = isSelected
      ? selected?.filter((item) => item !== value)
      : [...(selected ?? []), value];

    dispatch(setHotelFilters({ cancellation: updatedValue }));
  };

  return (
    <HotelAccordion value={'cancellation'} label={'Cancellation Policy'} className='truncate'>
      {cancellationPolicy?.map((item, index) => {
        return (
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
        );
      })}
    </HotelAccordion>
  );
});

HotelCancellationFilter.displayName = 'HotelCancellationFilter';
