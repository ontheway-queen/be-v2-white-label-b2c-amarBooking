'use client';

import { useTravelersListQuery } from '@/app/(private)/(profile)/my-account/travelers/_api/traveler-api';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { IFlightPaxBookingPaxType } from '@/type/flight/flight.interface';
import { ITravelerList } from '@/type/travelers/travelers.interface';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

type Props = {
  value?: number;
  onChange?: (selected: ITravelerList) => void;
  label?: string;
  placeholder?: string;
  defaultValue?: number;
  type: IFlightPaxBookingPaxType;
};

const mapTravelerType = (t: string): 'ADT' | 'INF' | 'C04' | 'C11' => {
  if (t === 'ADT' || t === 'INF') return t;
  const n = Number(t.slice(1));
  if (n >= 2 && n <= 4) return 'C04';
  if (n >= 5 && n <= 11) return 'C11';
  return t as any; // fallback
};

export function SelectTraveler({
  value,
  onChange,
  label,
  placeholder = 'Select a traveler',
  defaultValue,
  type,
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [selected, setSelected] = useState<ITravelerList | undefined>(undefined);
  const [debouncedSearch] = useDebounce(search, 500);

  const { data } = useTravelersListQuery({ name: debouncedSearch });

  const filteredTravelers = data?.data?.filter((traveler) => {
    return mapTravelerType(traveler.type) === type;
  });

  const travelerOptions = filteredTravelers ?? [];

  useEffect(() => {
    if (defaultValue && data?.data?.length) {
      const found = data.data.find((item) => item.id === defaultValue);
      if (found) setSelected(found);
    }
  }, [defaultValue, data?.data]);

  const handleSelect = (traveler: ITravelerList) => {
    setSelected(traveler);
    setOpen(false);
    onChange?.(traveler);
  };

  const handleClear = () => {
    setSelected(undefined);
    onChange?.(undefined as unknown as ITravelerList);
  };

  return (
    <div className='flex flex-col relative'>
      {label && (
        <label className='mb-1 text-sm font-medium flex items-center justify-between'>
          {label}
          {selected && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              size={'icon'}
              variant={'destructive'}
              className='w-5 h-5'
            >
              <X />
            </Button>
          )}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className='min-w-[200px]'>
          <Button
            variant='outline'
            role='combobox'
            className={cn('w-full justify-between', !selected && 'text-muted-foreground')}
          >
            <div className='flex items-center gap-2 truncate'>
              {selected ? (
                <span className='truncate'>{selected.first_name + ' ' + selected.last_name}</span>
              ) : (
                placeholder
              )}
            </div>

            <div className='flex items-center gap-2'>
              <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent className='min-w-[250px] w-full p-0'>
          <Command shouldFilter={false}>
            <CommandInput
              placeholder='Search traveler...'
              value={search}
              onValueChange={setSearch}
            />
            <CommandEmpty>No traveler found.</CommandEmpty>
            <CommandGroup>
              {travelerOptions?.map((traveler) => (
                <CommandItem
                  key={traveler.id}
                  value={String(traveler.id)}
                  onSelect={() => handleSelect(traveler)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selected?.id === traveler.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  <div className='flex gap-2'>
                    <span>{traveler.first_name + ' ' + traveler.last_name}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
