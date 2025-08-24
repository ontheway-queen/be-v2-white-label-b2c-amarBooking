import AccordionSection from '@/components/accordion-section';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useSmoothScrollToTop } from '@/hooks/useSmoothScrollToTop';
import { hostedImage } from '@/lib/helper';
import { setFlightFilters } from '@/lib/redux/slice/flight/extract-flight-filter-slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { memo } from 'react';

const AirlineFilter = memo(() => {
  const dispatch = useAppDispatch();
  const scrollToTop = useSmoothScrollToTop();

  const selected = useAppSelector((st) => st.extractFightFilter.selectOption?.airline);
  const airlines = useAppSelector(
    ({ extractFightFilter }) => extractFightFilter.defaultOption?.airline,
  );

  const handleChange = (value?: string) => {
    if (!value) return;

    const selectedAirlines = selected ?? [];
    const isSelected = selectedAirlines.some((airline) => airline === value);

    const updatedAirlines = isSelected
      ? selectedAirlines.filter((airline) => airline !== value)
      : [...selectedAirlines, value];

    dispatch(setFlightFilters({ airline: updatedAirlines }));
    scrollToTop();
  };

  return (
    <AccordionSection value='airlines' label='Airlines'>
      {airlines?.length &&
        airlines?.map((airline, index) => (
          <div key={index} className={cn('items-center space-x-2 flex')}>
            <Checkbox
              id={airline.name}
              checked={selected?.includes(airline?.name!)}
              onCheckedChange={() => handleChange(airline.name)}
            />
            <Label htmlFor={airline.name} className='font-normal cursor-pointer w-full '>
              <div>
                <Image
                  alt='airline_logo'
                  src={hostedImage(`/${airline.logo!}`)}
                  width={200}
                  height={200}
                  className={cn('w-[15px] h-[15px] rounded')}
                />
              </div>
              {airline.name}
            </Label>
          </div>
        ))}
    </AccordionSection>
  );
});

AirlineFilter.displayName = 'AirlineFilter';

export default AirlineFilter;
