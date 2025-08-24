'use client';

import * as React from 'react';
import { CalendarIcon, X } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { formatDate } from '@/lib/helper';

type Props = {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  className?: string;
};

export function DateRangePicker({
  value,
  onChange,
  placeholder = 'Pick a date range',
  className,
}: Props) {
  const [open, setOpen] = React.useState(false);

  // 🔹 Local state, sync with prop if provided
  const [internalValue, setInternalValue] = React.useState<DateRange | undefined>(value);

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleSelect = (range: DateRange | undefined) => {
    setInternalValue(range);
    if (range?.from && range?.to) {
      onChange?.(range);
    }
  };

  const handleClear = () => {
    setInternalValue(undefined);
    onChange?.(undefined);
    setOpen(false);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <div className='relative w-[260px]'>
          <PopoverTrigger asChild>
            <Button
              id='date'
              variant='outline'
              className={cn(
                'w-full justify-start text-left font-normal pr-8',
                !internalValue && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {internalValue?.from ? (
                internalValue.to ? (
                  <>
                    {formatDate(internalValue.from, 'dd MMM yyyy')} –{' '}
                    {formatDate(internalValue.to, 'dd MMM yyyy')}
                  </>
                ) : (
                  formatDate(internalValue.from, 'dd MMM yyyy')
                )
              ) : (
                <span>{placeholder}</span>
              )}
            </Button>
          </PopoverTrigger>

          {internalValue && (
            <button
              type='button'
              aria-label='Clear date range'
              className='absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted cursor-pointer'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClear();
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <X className='h-4 w-4 text-muted-foreground' />
            </button>
          )}
        </div>

        <PopoverContent className='w-auto p-2 space-y-2' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={internalValue?.from}
            selected={internalValue}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
          {internalValue && (
            <Button variant='ghost' size='sm' className='w-full' onClick={handleClear}>
              Clear
            </Button>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
