import AccordionSection from '@/components/accordion-section';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useSmoothScrollToTop } from '@/hooks/useSmoothScrollToTop';
import { setFlightFilters } from '@/lib/redux/slice/flight/extract-flight-filter-slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { memo } from 'react';

const Aircraft = memo(() => {
  const dispatch = useAppDispatch();
  const scrollToTop = useSmoothScrollToTop();

  const selected = useAppSelector((st) => st.extractFightFilter.selectOption?.aircraft);
  const aircraft = useAppSelector(
    ({ extractFightFilter }) => extractFightFilter.defaultOption?.aircraft
  );

  const handleChange = (value?: string) => {
    if (!value) return;

    const isSelected = selected?.some((item) => item === value);

    const updatedValue = isSelected
      ? selected?.filter((item) => item !== value)
      : [...(selected ?? []), value];

    dispatch(setFlightFilters({ aircraft: updatedValue }));
    scrollToTop();
  };

  return (
    <AccordionSection value='aircraft' label='Aircraft'>
      {aircraft?.map((item, index) => (
        <div key={index} className='flex items-center space-x-2 '>
          <Checkbox id={item} onCheckedChange={() => handleChange(item)} />
          <Label htmlFor={item} className='font-normal cursor-pointer w-full '>
            {item}
          </Label>
        </div>
      ))}
    </AccordionSection>
  );
});

Aircraft.displayName = 'Aircraft';

export default Aircraft;
