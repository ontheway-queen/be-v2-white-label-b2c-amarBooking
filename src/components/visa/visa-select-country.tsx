'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCountryListQuery, useVisaCountryListQuery } from '@/lib/APIs/common-api';
// import { useCountryListQuery } from "@/redux/api/flight.api";
import { cn } from '@/lib/utils';
import { IVisaSearchSchema } from '@/type/visa/visa.interface';
import { MapPin } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { FormControl, FormField, FormItem } from '../ui/form';
import { useDebounce } from 'use-debounce';

const VisaSelectCountry = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const [debouncedName] = useDebounce(search, 500);

  const { data, isLoading } = useVisaCountryListQuery({ name: debouncedName });

  const {
    watch,
    control,
    formState: { errors },
  } = useFormContext<IVisaSearchSchema>();

  return (
    <FormField
      control={control}
      name={'country'}
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
                    )}
                  >
                    <div className='w-full mt-1'>
                      <p className='flex justify-start items-center gap-1 font-semibold  text-gray-500 '>
                        Select Your Visa City
                      </p>
                      <p className='space-x-1'>
                        <span className='text-lg truncate'> {value?.name || 'Select country'}</span>
                      </p>
                    </div>
                  </div>
                </PopoverTrigger>

                <PopoverContent className='w-[500px] lg:min-w-[300px] p-0' align='start'>
                  <Command shouldFilter={false}>
                    <CommandInput
                      placeholder='Search visa country...'
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
                          <CommandEmpty>No country found</CommandEmpty>
                          <CommandGroup>
                            {data?.data?.map((item, index) => {
                              const isSelected = value?.id === item.id;

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
                                      id: item.id,
                                      name: item.name,
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
                                        {item.name}
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
          </FormItem>
        );
      }}
    />
  );
};

export default VisaSelectCountry;
