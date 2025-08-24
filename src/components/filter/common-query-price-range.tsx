'use client';

import AccordionSection from '@/components/accordion-section';
import { Slider } from '@/components/ui/slider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { memo, useEffect, useState } from 'react';

interface IProps {
  price_range: [number | null | undefined, number | null | undefined];
  name: string;
  label: string;
}

export const CommonQueryPriceRange = memo(({ price_range, name, label }: IProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryMin = parseInt(searchParams.get('min_price') || '', 10);
  const queryMax = parseInt(searchParams.get('max_price') || '', 10);

  const min = price_range?.[0] ?? 0;
  const max = price_range?.[1] ?? 100;

  const initialMin = !isNaN(queryMin) ? queryMin : min;
  const initialMax = !isNaN(queryMax) ? queryMax : max;

  const [localRange, setLocalRange] = useState<[number, number]>([initialMin, initialMax]);

  useEffect(() => {
    setLocalRange([initialMin, initialMax]);
  }, [queryMin, queryMax]);

  const handleChange = (val: number[]) => {
    setLocalRange([val[0], val[1]]);
  };

  const handleCommit = (val: number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('min_price', val[0].toString());
    params.set('max_price', val[1].toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  if (!min || !max) return null;

  return (
    <AccordionSection value={name} label={label}>
      <>
        <Slider
          defaultValue={localRange}
          min={min}
          max={max}
          step={1}
          onValueChange={handleChange}
          onValueCommit={handleCommit}
        />
        <div className='flex justify-between'>
          <span className='text-sm'>BDT {localRange[0].toLocaleString()}</span>
          <span className='text-sm'>BDT {localRange[1].toLocaleString()}</span>
        </div>
      </>
    </AccordionSection>
  );
});

CommonQueryPriceRange.displayName = 'CommonQueryPriceRange';
