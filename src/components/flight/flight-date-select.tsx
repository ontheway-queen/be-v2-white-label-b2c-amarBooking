'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  delayedPopoverSwitch,
  popoverOpenorder,
  setPopoverClose,
  setPopoverOpen,
} from '@/lib/redux/slice/flight/flight-search-popover-slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { cn } from '@/lib/utils';
import { IFlightSearchSchema } from '@/type/flight/flight.interface';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { Matcher } from 'react-day-picker';
import { FieldPath, get, useFormContext } from 'react-hook-form';
import { Calendar } from '../ui/calendar';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';

type Props = {
  label: string;
  name: FieldPath<IFlightSearchSchema>;
  disabled?: Matcher | Matcher[] | undefined;
  onSelect?: (date: Date | undefined) => void | undefined;
  selectedMonth?: Date | undefined;
};

const DateSelect = ({ label, name, disabled, onSelect, selectedMonth }: Props) => {
  const dispatch = useAppDispatch();

  const openState = useAppSelector((state) => state.popover.openState);
  const open = openState[name] || false;

  const [month, setMonth] = React.useState<Date>(new Date());

  const {
    watch,
    control,
    formState: { errors },
  } = useFormContext<IFlightSearchSchema>();
  const date = watch(name) as Date;

  const error = get(errors, name)?.message as string | undefined;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='relative rounded-md overflow-hidden'>
          <FormControl className='overflow-hidden'>
            <div className='relative'>
              <Popover
                open={open}
                onOpenChange={(isOpen) => {
                  if (isOpen) {
                    dispatch(setPopoverOpen(name));
                  } else {
                    dispatch(setPopoverClose(name));
                  }
                }}
              >
                <PopoverTrigger asChild>
                  <div
                    className={cn(
                      'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                      'focus:border-ring focus:ring-ring/50 focus:ring-[3px]',
                      'data-[state=open]:border-ring data-[state=open]:ring-ring/50 data-[state=open]:ring-[3px]',
                      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                      'h-14 cursor-pointer',
                      error && 'border-red-400',
                    )}
                  >
                    <div>
                      <div>
                        <p className='flex justify-start items-center gap-1 font-semibold text-xs text-primary -ml-[1px] '>
                          <CalendarIcon className='size-3 p-0' />
                          {label}
                        </p>
                        {date ? (
                          <p className='flex items-center gap-1'>
                            <span className='text-primary font-bold text-lg'>
                              {format(date, 'EEE')} -{' '}
                            </span>
                            <span className='text-sm md:text-md'>
                              {format(date, 'dd MMMM yyyy')}
                            </span>
                          </p>
                        ) : (
                          <p className='mt-1'>Pick a date</p>
                        )}
                      </div>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className='w-[285px] p-0'>
                  <Calendar
                    mode='single'
                    selected={date}
                    onSelect={(newDate) => {
                      onSelect && onSelect(newDate);
                      field.onChange(newDate);

                      const currentIndex = popoverOpenorder.indexOf(name);
                      const nextField = popoverOpenorder[currentIndex + 1];

                      if (nextField) {
                        dispatch(delayedPopoverSwitch(name, nextField));
                      } else {
                        dispatch(setPopoverClose(name));
                      }
                    }}
                    disabled={disabled}
                    defaultMonth={selectedMonth ? selectedMonth : month}
                    onMonthChange={setMonth}
                    className='w-full'
                  />
                </PopoverContent>
              </Popover>
            </div>
          </FormControl>
          <FormMessage className='text-xs absolute -bottom-4 left-1' />
        </FormItem>
      )}
    />
  );
};

export default DateSelect;
