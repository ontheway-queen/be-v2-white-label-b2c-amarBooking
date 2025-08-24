import AccordionSection from '@/components/accordion-section';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useSmoothScrollToTop } from '@/hooks/useSmoothScrollToTop';
import { setFlightFilters } from '@/lib/redux/slice/flight/extract-flight-filter-slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { memo } from 'react';

const data = [
  {
    name: 'Refundable',
    status: 'true',
  },
  {
    name: 'Non Refundable',
    status: 'false',
  },
];

const Refutability = memo(() => {
  const selected = useAppSelector((st) => st.extractFightFilter.selectOption?.refundable);
  const dispatch = useAppDispatch();
  const scrollToTop = useSmoothScrollToTop();

  const handleChange = (name: string) => {
    const value = name === 'true';
    if (selected === value) {
      dispatch(setFlightFilters({ refundable: undefined }));
    } else {
      dispatch(setFlightFilters({ refundable: value }));
    }
    scrollToTop();
  };

  return (
    <AccordionSection value='refund' label='Refundable'>
      {data?.map((item, index) => (
        <div key={index} className='flex items-center space-x-2 '>
          <Checkbox
            id={item.name}
            checked={item.status === String(selected)}
            onCheckedChange={() => handleChange(item.status)}
          />
          <Label htmlFor={item.name} className='font-normal cursor-pointer w-full '>
            {item.name}
          </Label>
        </div>
      ))}
    </AccordionSection>
  );
});

Refutability.displayName = 'Refutability';

export default Refutability;
