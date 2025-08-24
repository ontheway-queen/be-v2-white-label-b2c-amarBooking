'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCountryListQuery } from '@/lib/APIs/common-api';
import { cn } from '@/lib/utils';
import { FormSelectProps } from '@/type/formItem.interface';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

export function SelectCountryForm<T extends FieldValues>({
  name,
  label,
  placeholder = 'Enter your input',
}: Omit<FormSelectProps<T>, 'options'>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string | undefined>(undefined);

  const [debouncedSearch] = useDebounce(search, 500);
  const { data: countries } = useCountryListQuery({ name: debouncedSearch });

  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selected = countries?.data?.find((c) => c.id === field.value);

        return (
          <FormField
            control={control}
            name={name}
            render={({ field }) => {
              const selected = countries?.data?.find((c) => c.id === field.value);

              return (
                <FormItem className='flex flex-col relative'>
                  <FormLabel>{label}</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild className='bg-white'>
                      <FormControl>
                        <Button
                          variant='outline'
                          role='combobox'
                          className={cn(
                            'w-full justify-between',
                            !selected && 'text-muted-foreground',
                          )}
                        >
                          {selected ? (
                            <div className='flex gap-2'>
                              <span>{selected.name}</span>
                              <span className='text-muted-foreground'>({selected.iso})</span>
                            </div>
                          ) : (
                            placeholder
                          )}
                          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent className='min-w-[250px] w-full p-0'>
                      <Command shouldFilter={false}>
                        <CommandInput
                          placeholder='Search country...'
                          value={search}
                          onValueChange={setSearch}
                        />
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                          {countries?.data?.slice(0, 10)?.map((country) => (
                            <CommandItem
                              key={country.id}
                              value={country.name}
                              onSelect={() => {
                                field.onChange(country.id);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  field.value === country.id ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                              <div className='flex gap-2'>
                                <span>{country.name}</span>
                                <span className='text-muted-foreground'>({country.iso})</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage className='absolute -bottom-4.5 right-0 text-xs' />
                </FormItem>
              );
            }}
          />
        );
      }}
    />
  );
}
