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
import { usePaymentMethodQuery } from '@/lib/APIs/common-api';
import { cn } from '@/lib/utils';
import { FormSelectProps } from '@/type/formItem.interface';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

export function SelectDepositAccountForm<T extends FieldValues>({
  name,
  label,
  placeholder = 'Enter your input',
}: Omit<FormSelectProps<T>, 'options'>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string | undefined>(undefined);

  const [debouncedSearch] = useDebounce(search, 500);
  const { data: account } = usePaymentMethodQuery({ name: debouncedSearch });

  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormField
            control={control}
            name={name}
            render={({ field }) => {
              const selected = account?.data?.find((c) => String(c.id) === String(field.value));

              return (
                <FormItem className='flex flex-col relative'>
                  <FormLabel>{label}</FormLabel>
                  <Popover open={open} onOpenChange={setOpen} modal>
                    <PopoverTrigger asChild>
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
                              <span>{selected.account_name}</span>
                              <span className='text-muted-foreground'>
                                ({selected.account_number})
                              </span>
                            </div>
                          ) : (
                            placeholder
                          )}
                          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent className='min-w-[450px] w-full p-0'>
                      <Command shouldFilter={false}>
                        <CommandInput
                          placeholder='Search account...'
                          value={search}
                          onValueChange={setSearch}
                        />
                        <CommandEmpty>No account found.</CommandEmpty>
                        <CommandGroup>
                          {account?.data?.slice(0, 10)?.map((account) => (
                            <CommandItem
                              key={account.id}
                              value={String(account.id)}
                              onSelect={(item) => {
                                field.onChange(String(account.id));
                                setOpen(false);
                              }}
                              className='flex items-start gap-3 p-3'
                            >
                              <Check
                                className={cn(
                                  'mt-1 h-4 w-4 text-primary transition-opacity',
                                  field.value == account.id ? 'opacity-100' : 'opacity-0',
                                )}
                              />

                              <div className='flex flex-col'>
                                {/* Account Name & Number */}
                                <div className='flex items-center gap-2'>
                                  <span className='font-medium text-foreground'>
                                    {account.account_name}
                                  </span>
                                  <span className='text-sm text-muted-foreground'>
                                    (Acc. No: {account.account_number})
                                  </span>
                                </div>

                                {/* Bank details */}
                                <div className='flex flex-wrap gap-x-4 text-sm text-muted-foreground mt-1'>
                                  <span>🏦 {account.bank_name}</span>
                                  <span>SWIFT: {account.swift_code}</span>
                                  <span>Routing: {account.routing_no}</span>
                                </div>
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
