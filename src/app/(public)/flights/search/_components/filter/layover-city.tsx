import AccordionSection from '@/components/accordion-section';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useSmoothScrollToTop } from '@/hooks/useSmoothScrollToTop';
import { setFlightFilters } from '@/lib/redux/slice/flight/extract-flight-filter-slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import React, { memo } from 'react';

const LayoverCity = memo(() => {
  const dispatch = useAppDispatch();
  const scrollToTop = useSmoothScrollToTop();

  const selected = useAppSelector((st) => st.extractFightFilter.selectOption?.layover_city);
  const layover_city = useAppSelector(
    ({ extractFightFilter }) => extractFightFilter.defaultOption?.layover_city
  );

  const handleChange = (value?: string) => {
    if (!value) return;

    const isSelected = selected?.some((item) => item === value);

    const updatedValue = isSelected
      ? selected?.filter((item) => item !== value)
      : [...(selected ?? []), value];

    dispatch(setFlightFilters({ layover_city: updatedValue }));
    scrollToTop();
  };

  if (layover_city?.length)
    return (
      <AccordionSection value='layover_city' label='Layover City'>
        {layover_city?.map((item, index) => (
          <div key={index} className='flex items-center space-x-2 '>
            <Checkbox id={item.code} onCheckedChange={() => handleChange(item.code)} />
            <Label htmlFor={item.code} className='font-normal cursor-pointer w-full '>
              <div className='flex flex-col truncate'>
                <span>{item.code}</span>
                <span className='truncate max-w-60 font-light text-xs'>{item.airport}</span>
              </div>
            </Label>
          </div>
        ))}
      </AccordionSection>
    );
});

LayoverCity.displayName = 'LayoverCity';

export default LayoverCity;
