'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IVisaSearchSchema } from '@/type/visa/visa.interface';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { variants } from '../flight/select-flight-passenger';
import { FormControl, FormField, FormItem } from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const VisaSelectPax = () => {
  const [open, setOpen] = useState(false);
  const { control, watch } = useFormContext<IVisaSearchSchema>();

  const travelerCount = Number(watch('traveler') || 1);

  const handleSave = () => {
    setOpen(false);
  };

  return (
    <FormField
      control={control}
      name='traveler'
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <div
                  className={cn(
                    'selection:bg-primary selection:text-primary-foreground border-input rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm',
                    'focus:border-ring focus:ring-ring/50 focus:ring-[3px]',
                    'data-[state=open]:border-ring data-[state=open]:ring-ring/50 data-[state=open]:ring-[3px] cursor-pointer w-full truncate min-h-[72px]',
                  )}
                >
                  <div className='w-full mt-1'>
                    <p className='flex justify-start items-center gap-1 font-semibold text-gray-500'>
                      Select Traveler(s)
                    </p>
                    <p className='space-x-1'>
                      <span className='text-lg truncate'>
                        {travelerCount} Traveler{travelerCount > 1 ? 's' : ''}
                      </span>
                    </p>
                  </div>
                </div>
              </PopoverTrigger>

              <PopoverContent className='w-72 max-h-[400px] overflow-y-auto'>
                <motion.div
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  variants={variants}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className='space-y-4'
                >
                  <PassengerSelector
                    title='Traveler'
                    subtitle='Select total travelers'
                    value={travelerCount}
                    onChange={(val) => field.onChange(val)}
                    min={1}
                    max={20}
                  />

                  <Button onClick={handleSave} className='w-full'>
                    Done
                  </Button>
                </motion.div>
              </PopoverContent>
            </Popover>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default VisaSelectPax;

interface PassengerSelectorProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}

function PassengerSelector({ title, subtitle, value, onChange, min, max }: PassengerSelectorProps) {
  return (
    <div className='flex items-center justify-between'>
      <div>
        <h3 className='font-medium text-sm'>{title}</h3>
        <p className='text-muted-foreground text-xs'>{subtitle}</p>
      </div>
      <div className='flex items-center'>
        <Button
          variant='outline'
          size='icon'
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className='rounded-full border-primary w-8 h-8'
        >
          <Minus className='h-4 w-4' />
        </Button>
        <span className='w-8 text-sm text-center font-bold text-primary'>{value}</span>
        <Button
          variant='outline'
          size='icon'
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className='rounded-full border-primary w-8 h-8'
        >
          <Plus className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
