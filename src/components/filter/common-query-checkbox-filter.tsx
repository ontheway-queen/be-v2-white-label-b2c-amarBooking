'use client';
import AccordionSection from '@/components/accordion-section';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useCustomQueryParams } from '@/hooks/useCustomQueryParams';
import { memo } from 'react';

interface IProps {
  data: { label: string; value: string }[];
  name: string;
  label: string;
}

export const CommonQueryCheckBoxFilter = memo(({ data, name, label }: IProps) => {
  const { isChecked, handleCheckboxChange, selectedValues } = useCustomQueryParams(name);

  if (!data?.length) return null;

  return (
    <AccordionSection value={name} label={label} className='truncate'>
      {data.map((item) => (
        <div key={item.value} className='flex items-center space-x-2 truncate'>
          <Checkbox
            id={item.value}
            checked={isChecked(item.value)}
            onCheckedChange={() => handleCheckboxChange(item.value)}
          />
          <Label htmlFor={item.value} className='font-normal cursor-pointer w-full'>
            <div className='flex flex-col truncate'>
              <span>{item.label}</span>
            </div>
          </Label>
        </div>
      ))}
    </AccordionSection>
  );
});

CommonQueryCheckBoxFilter.displayName = 'CommonQueryCheckBoxFilter';
