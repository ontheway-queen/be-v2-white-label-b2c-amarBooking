'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCityListQuery } from '@/lib/APIs/common-api';
import { cn } from '@/lib/utils';
import { IHolidaySearchSchema } from '@/type/holiday/holiday.interface';
import { MapPin } from 'lucide-react';
import { useState } from 'react';
import { get, useFormContext } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';

const SelectHolidayCity = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const [debouncedName] = useDebounce(search, 500);
  const { data, isLoading } = useCityListQuery({ name: debouncedName });

  const {
    watch,
    control,
    formState: { errors },
  } = useFormContext<IHolidaySearchSchema>();

  const error = get(errors, 'city')?.message as string | undefined;

  return (
    <FormField
      control={control}
      name={'city'}
      render={({ field }) => {
        const value = field.value;

        return (
          <FormItem>
            <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <div
                    className={cn(
                      'selection:bg-primary selection:text-primary-foreground border-input rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex  md:text-sm',
                      'focus:border-ring focus:ring-ring/50 focus:ring-[3px]',
                      'data-[state=open]:border-ring data-[state=open]:ring-ring/50 data-[state=open]:ring-[3px] cursor-pointer w-full truncate min-h-[72px]',

                      error && 'border-red-400',
                    )}
                  >
                    <div className='w-full mt-1'>
                      <p className='flex justify-start items-center gap-1 font-semibold  text-gray-500 '>
                        Select Your Tour Destination City
                      </p>
                      <p className='space-x-1'>
                        <span className='text-primary font-bold text-lg truncate'>
                          {value.city}
                        </span>
                        <span>-</span>
                        <span className='text-lg truncate'>{value.country_name}</span>
                      </p>
                    </div>
                  </div>
                </PopoverTrigger>

                <PopoverContent className='w-[500px] lg:min-w-[300px] p-0' align='start'>
                  <Command shouldFilter={false}>
                    <CommandInput
                      placeholder='Search by name, city or country...'
                      value={search}
                      onValueChange={setSearch}
                      className='h-9'
                    />
                    {isLoading ? (
                      'Please wait ...'
                    ) : (
                      <>
                        {' '}
                        <CommandList className='no-scrollbar'>
                          <CommandEmpty>No city found</CommandEmpty>
                          <CommandGroup>
                            {data?.data?.map((item, index) => {
                              const isSelected = value.city_id === item.id;

                              return (
                                <CommandItem
                                  key={index}
                                  className={cn(
                                    'cursor-pointer w-full border-b py-2 px-2 truncate',
                                    isSelected ? 'bg-primary text-primary-foreground' : '',
                                  )}
                                  value={String(item.id)}
                                  onSelect={(e) => {
                                    setOpen(false);
                                    const selectedItem = {
                                      city_id: item.id,
                                      city: item.name,
                                      country_name: item.country_name,
                                    };

                                    field.onChange(selectedItem);
                                  }}
                                >
                                  <div className='w-full truncate'>
                                    <div className='flex flex-col truncate'>
                                      <span
                                        className={cn(
                                          'font-medium',
                                          isSelected ? 'text-white' : 'text-primary',
                                        )}
                                      >
                                        {item.name}
                                      </span>
                                    </div>

                                    <div className='flex justify-between items-center'>
                                      <span className='text-xs truncate flex items-center gap-1'>
                                        <MapPin
                                          className={cn(
                                            'size-3 text-primary',
                                            isSelected && 'text-white',
                                          )}
                                        />{' '}
                                        {item.name}, {item.country_name}
                                      </span>
                                    </div>
                                  </div>
                                </CommandItem>
                              );
                            })}
                          </CommandGroup>
                        </CommandList>{' '}
                      </>
                    )}
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default SelectHolidayCity;
