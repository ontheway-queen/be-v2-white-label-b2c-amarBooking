import { cn } from '@/lib/utils';
import { IHotelsSearchSchema } from '@/type/hotel/hotel.interface';
import { format } from 'date-fns';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useFormContext } from 'react-hook-form';
import { Calendar } from '../ui/calendar';
import { FormField, FormItem, FormMessage } from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

type Props = {};

const CheckInCheckOutDate = (props: Props) => {
  const [open, setOpen] = useState(false);

  const {
    watch,
    control,
    formState: { errors },
  } = useFormContext<IHotelsSearchSchema>();

  const date = watch('date');

  const error = errors.date?.from?.message || errors.date?.to?.message;

  return (
    <FormField
      control={control}
      name={'date'}
      render={({ field }) => {
        const checkInDate = date?.from as Date;
        const checkOutDate = date?.to as Date;

        const handleSelect = (selected: DateRange | undefined, selectedDay: Date) => {
          const currentSelection = date;

          // No previous selection - start fresh
          if (!currentSelection?.from) {
            field.onChange(selected);
            return;
          }

          if (currentSelection.from && currentSelection.to) {
            field.onChange({ from: selectedDay, to: undefined });
            return;
          }

          // Only start date exists
          if (currentSelection.from && !currentSelection.to && selectedDay) {
            const fromDate = currentSelection.from as Date;
            const clickedDate = selectedDay;

            // Same date - clear selection
            if (clickedDate.getTime() === fromDate.getTime()) {
              field.onChange(undefined);
            }
            // Future date - complete the range
            else if (clickedDate > fromDate) {
              field.onChange({ from: fromDate, to: clickedDate });
            }
            // Past date - start new range from this date
            else {
              field.onChange({ from: clickedDate, to: undefined });
            }
          }
        };

        return (
          <FormItem className='relative'>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <div
                  className={cn(
                    'selection:bg-primary selection:text-primary-foreground border-input rounded-md border bg-transparent  text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex  md:text-sm',
                    'focus:border-ring focus:ring-ring/50 focus:ring-[3px]',
                    'data-[state=open]:border-ring data-[state=open]:ring-ring/50 data-[state=open]:ring-[3px] cursor-pointer  truncate',

                    error && 'border-red-400',
                  )}
                >
                  <div className='flex justify-center divide-x-2 py-1'>
                    <div className='flex-1 px-3 '>
                      <p className='flex justify-start items-center gap-1 font-semibold text-[10px] text-gray-500'>
                        CHECK IN DATE
                      </p>
                      <div>
                        <div className='text-primary font-bold text-lg'>
                          {checkInDate ? format(checkInDate, 'dd MMMM yyyy') : 'Select date'}
                        </div>
                        <span className='text-sm md:text-md'>
                          {checkInDate ? format(checkInDate, 'EEEE') : 'No date selected'}
                        </span>
                      </div>
                    </div>
                    <div className='flex-1 px-3 '>
                      <p className='flex justify-start items-center gap-1 font-semibold text-[10px] text-gray-500'>
                        CHECK OUT DATE
                      </p>
                      <div>
                        <div className='text-primary font-bold text-lg'>
                          {checkOutDate ? format(checkOutDate, 'dd MMMM yyyy') : 'Select date'}
                        </div>
                        <span className='text-sm md:text-md'>
                          {checkOutDate ? format(checkOutDate, 'EEEE') : 'No date selected'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className='w-full p-0'>
                <Calendar
                  // showOutsideDays={false}
                  initialFocus
                  mode='range'
                  defaultMonth={date?.from as Date}
                  selected={{
                    from: checkInDate,
                    to: checkOutDate,
                  }}
                  onSelect={handleSelect}
                  numberOfMonths={2}
                  disabled={(date) => date < new Date()}
                  className='w-full'
                />
              </PopoverContent>
            </Popover>

            <span className='text-xs absolute -bottom-4 left-1 text-red-500'>{error}</span>
            <FormMessage className='text-xs absolute -bottom-4 left-1 text-red-500' />
          </FormItem>
        );
      }}
    />
  );
};

export default CheckInCheckOutDate;
