import { useHotelListForSelectQuery } from '@/app/(public)/hotels/_api/hotel-endpoint';
import { capitalizeFirstLetter } from '@/lib/helper';
import { cn } from '@/lib/utils';
import { IHotelsSearchSchema, IIHotelListSchema } from '@/type/hotel/hotel.interface';
import { MapPin, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { get, useFormContext } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Badge } from '../ui/badge';

const HotelLocationSelect = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const [debouncedSearch] = useDebounce(search, 500);
  const { data, isLoading } = useHotelListForSelectQuery(
    { filter: debouncedSearch },
    { skip: !debouncedSearch },
  );

  const hotelList = data?.data;

  const {
    watch,
    control,
    formState: { errors },
  } = useFormContext<IHotelsSearchSchema>();

  const selectedHotel = watch('location') as IIHotelListSchema | undefined;
  const { name, country_name, city_name, star_category, type, id } = selectedHotel ?? {};

  const selected = id;

  useEffect(() => {
    if (name) setSearch(name);
  }, [name]);

  const error = get(errors, 'location')?.message as string | undefined;

  return (
    <FormField
      control={control}
      name={'location'}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <div
                  className={cn(
                    'selection:bg-primary selection:text-primary-foreground border-input rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex  md:text-sm',
                    'focus:border-ring focus:ring-ring/50 focus:ring-[3px]',
                    'data-[state=open]:border-ring data-[state=open]:ring-ring/50 data-[state=open]:ring-[3px] cursor-pointer w-full truncate',

                    error && 'border-red-400',
                  )}
                >
                  <div className='w-full'>
                    <p className='flex justify-start items-center gap-1 font-semibold text-[10px] text-gray-500 '>
                      CITY / HOTEL / RESORT / AREA
                    </p>
                    <p className='truncate overflow-ellipsis '>
                      <span className='text-primary font-bold text-lg truncate'>{name}</span>
                    </p>

                    <div className='flex justify-between w-full text-sm md:text-md'>
                      <p className='truncate'>
                        <span>
                          {city_name}, {country_name}
                        </span>
                      </p>
                      <div className='flex items-center gap-2'>
                        {star_category ? (
                          <span className='flex gap-0.5'>{renderStarRating(star_category)}</span>
                        ) : (
                          ''
                        )}
                        <span>{capitalizeFirstLetter(type)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverTrigger>

              <PopoverContent className='w-full min-w-[300px] p-0'>
                <Command shouldFilter={false}>
                  <CommandInput
                    placeholder='Search hotels by name, city or country...'
                    value={search}
                    onValueChange={setSearch}
                    className='h-9'
                  />
                  {isLoading ? (
                    'Loading...'
                  ) : (
                    <>
                      {' '}
                      <CommandList className='no-scrollbar'>
                        <CommandEmpty>No hotel found</CommandEmpty>
                        <CommandGroup>
                          {hotelList?.map((item, index) => {
                            const isSelected = selected === item.id;

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
                                  field.onChange(item);
                                }}
                              >
                                <div className='w-full flex justify-between'>
                                  <div className='flex-[2] tracking-tight truncate'>
                                    <h3
                                      className={cn(
                                        'font-medium',
                                        isSelected ? 'text-accent-foreground' : 'text-primary',
                                      )}
                                    >
                                      {item.name}
                                    </h3>

                                    <p className='text-xs truncate flex items-center gap-1'>
                                      <MapPin
                                        className={cn(
                                          'size-3 text-primary',
                                          isSelected && 'text-accent-foreground',
                                        )}
                                      />{' '}
                                      {item.name}, {item.country_name}
                                    </p>
                                  </div>

                                  <div className='items-center flex-1 flex justify-end'>
                                    <div className='flex flex-col items-end gap-0.5'>
                                      <Badge className='text-xs' variant={'secondary'}>
                                        {item.type}
                                      </Badge>
                                      <div>
                                        {item.star_category ? (
                                          <span className='flex gap-0.5'>
                                            {renderStarRating(item.star_category)}
                                          </span>
                                        ) : (
                                          ''
                                        )}
                                      </div>
                                    </div>
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
      )}
    />
  );
};

export default HotelLocationSelect;

export const renderStarRating = (rating?: number, className?: string) => {
  if (rating === null || rating === undefined) return null;
  return Array.from({ length: 5 }).map((_, index) => (
    <Star
      key={index}
      className={cn('h-3 w-3', className)}
      strokeWidth={0.7}
      fill={index < rating ? '#fab005' : 'transparent'}
      stroke={index < rating ? '#fab005' : '#fab005'}
    />
  ));
};
