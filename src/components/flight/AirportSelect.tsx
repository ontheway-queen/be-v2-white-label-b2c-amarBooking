'use client';

import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAirportListQuery } from '@/lib/APIs/common-api';
import {
  delayedPopoverSwitch,
  popoverOpenorder,
  setPopoverClose,
  setPopoverOpen,
} from '@/lib/redux/slice/flight/flight-search-popover-slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { cn } from '@/lib/utils';
import { IAirportSchema, IFlightSearchSchema } from '@/type/flight/flight.interface';
import { useSearchParams } from 'next/navigation';
import { FieldPath, get, useFormContext } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';

interface SearchableSelectProps {
  label: string;
  name: FieldPath<IFlightSearchSchema>;
}

export function AirportSelect({ label, name }: SearchableSelectProps) {
  const dispatch = useAppDispatch();
  const openState = useAppSelector((state) => state.popover.openState);
  const open = openState[name] || false;

  const [search, setSearch] = useState('');
  const [debouncedName] = useDebounce(search, 500);
  const searchParamsValue = useSearchParams().get(name);

  const { data } = useAirportListQuery({ name: debouncedName });

  const airportList = data?.data;

  useEffect(() => {
    if (searchParamsValue) {
      setSearch(searchParamsValue);
    }
  }, [searchParamsValue]);

  const {
    setValue,
    watch,
    register,
    control,
    formState: { errors },
  } = useFormContext<IFlightSearchSchema>();

  const selectedAirport = watch(name) as IAirportSchema | undefined;

  const error = get(errors, name)?.message as string | undefined;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='relative  rounded-md overflow-hidden'>
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
                      'selection:bg-primary selection:text-primary-foreground border-input rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex md:text-sm',
                      'focus:border-ring focus:ring-ring/50 focus:ring-[3px]',
                      'data-[state=open]:border-ring data-[state=open]:ring-ring/50 data-[state=open]:ring-[3px] cursor-pointer',
                      error && 'border-red-400',
                      'min-h-14',
                    )}
                  >
                    <div className='truncate'>
                      <p className='flex justify-start items-center gap-1 font-semibold text-xs text-primary -ml-[1px] '>
                        <MapPin className='size-3 p-0' />
                        {label}
                      </p>
                      <p className='truncate ml-[1px] overflow-ellipsis flex items-center gap-1'>
                        <span
                          title={
                            selectedAirport?.iata_code ? `${selectedAirport?.iata_code} -` : ''
                          }
                          className='text-primary font-bold text-lg '
                        >
                          {selectedAirport?.iata_code ? `${selectedAirport?.iata_code} -` : '? -'}
                        </span>{' '}
                        <span
                          title={selectedAirport?.name || 'Select an airport'}
                          className='text-sm md:text-md'
                        >
                          {selectedAirport?.name || 'Select an airport'}
                        </span>
                      </p>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className='w-[350px] xs:w-[370px] lg:w-[285px] p-0'>
                  <Command shouldFilter={false}>
                    <CommandInput
                      placeholder='Search airport...'
                      value={search}
                      onValueChange={setSearch}
                    />
                    <CommandList>
                      <CommandEmpty>No airport found.</CommandEmpty>
                      <CommandGroup>
                        {airportList?.map((item) => {
                          const isActive = item.id === selectedAirport?.id;

                          return (
                            <CommandItem
                              key={item.id}
                              className={cn(
                                'border-b cursor-pointer rounded-none border-primary-100 py-2',
                                isActive
                                  ? 'text-white data-[selected=true]:bg-primary-500 data-[selected=true]:text-white bg-primary-500'
                                  : '',
                              )}
                              value={String(item.id)}
                              onSelect={() => {
                                field.onChange(item);

                                const currentIndex = popoverOpenorder.indexOf(name);
                                const nextField = popoverOpenorder[currentIndex + 1];

                                if (nextField) {
                                  dispatch(delayedPopoverSwitch(name, nextField));
                                } else {
                                  dispatch(setPopoverClose(name));
                                }
                              }}
                            >
                              <div className={cn('flex gap-2 truncate')}>
                                <span
                                  className={cn(
                                    'text-md font-bold min-w-[30px]',
                                    isActive ? 'bg-primary-500 text-white' : 'text-primary ',
                                  )}
                                >
                                  {item.iata_code}
                                </span>
                                <span
                                  className={cn(
                                    'border-r ',
                                    isActive ? 'border-white' : 'border-primary',
                                  )}
                                ></span>
                                <span className='truncate'>{item.name}</span>
                              </div>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </FormControl>
          <FormMessage className='text-xs absolute -bottom-4 left-1' />
        </FormItem>
      )}
    />
  );
}
