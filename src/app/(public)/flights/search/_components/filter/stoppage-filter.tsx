import AccordionSection from '@/components/accordion-section';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useSmoothScrollToTop } from '@/hooks/useSmoothScrollToTop';
import { setFlightFilters } from '@/lib/redux/slice/flight/extract-flight-filter-slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { memo } from 'react';

const Stoppage = memo(() => {
  const dispatch = useAppDispatch();
  const scrollToTop = useSmoothScrollToTop();

  const total_stoppage = useAppSelector(
    ({ extractFightFilter }) => extractFightFilter.defaultOption?.stoppage
  );

  const selected = useAppSelector((st) => st.extractFightFilter.selectOption?.stoppage);

  const info = selected?.split(',') ?? [];

  const handleChange = (value?: string) => {
    if (!value) return;

    const updatedInfo = info.includes(value)
      ? info.filter((item) => item !== value)
      : [...info, value];

    dispatch(setFlightFilters({ stoppage: updatedInfo?.filter(Boolean).join(',') }));
    scrollToTop();
  };

  if (total_stoppage)
    return (
      <AccordionSection value='stoppage' label='Stoppage'>
        {Array.from({ length: (total_stoppage ?? 0) + 1 }, (_, index) => {
          const stopStr = String(index);

          return (
            <div key={index} className='flex items-center space-x-2'>
              <Checkbox id={stopStr} onCheckedChange={() => handleChange(stopStr)} />
              <Label htmlFor={stopStr} className='font-normal cursor-pointer w-full'>
                {stopStr} Stops
              </Label>
            </div>
          );
        })}
      </AccordionSection>
    );
});

Stoppage.displayName = 'Stoppage';

export default Stoppage;
