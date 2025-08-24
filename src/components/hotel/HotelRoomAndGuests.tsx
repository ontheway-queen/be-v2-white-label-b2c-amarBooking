import { cn } from '@/lib/utils';
import { CircleMinus, CirclePlus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '../ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { IHotelsSearchSchema } from '@/type/hotel/hotel.interface';

const childAgeOptions = Array.from({ length: 16 }, (_, i) => i + 2);

interface IGuestCounter {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
}

interface IChildAgeSelect {
  value: number | undefined;
  onChange: (v: number) => void;
  error?: boolean;
}

// Counter component for adults/children/infants
const GuestsCounter = ({ value, onChange, min, max }: IGuestCounter) => (
  <div className='flex items-center justify-between gap-2'>
    <Button
      type='button'
      variant='outline'
      size='icon'
      className={cn('h-7 w-7 rounded-full bg-secondary')}
      onClick={() => onChange(Math.max(min, value - 1))}
      disabled={value <= min}
    >
      -
    </Button>
    <span className='w-6 text-center text-sm'>{value}</span>

    <Button
      type='button'
      variant='outline'
      size='icon'
      className='h-7 w-7 rounded-full bg-secondary'
      onClick={() => onChange(Math.min(max, value + 1))}
      disabled={value >= max}
    >
      +
    </Button>
  </div>
);

// Select Age component for each child
const ChildAgeSelect = ({ value, onChange, error }: IChildAgeSelect) => (
  <div>
    <Select value={value ? String(value) : ''} onValueChange={(val) => onChange(Number(val))}>
      <SelectTrigger className={error ? 'border-red-500' : ''}>
        <SelectValue placeholder='Select age' />
      </SelectTrigger>
      <SelectContent>
        {childAgeOptions.map((age) => (
          <SelectItem key={age} value={String(age)}>
            {age} years
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {error ? <p className='text-xs text-red-600'>Child age required</p> : ''}
  </div>
);

const HotelRoomAndGuests = () => {
  const [open, setOpen] = useState(false);
  const {
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<IHotelsSearchSchema>();
  const { fields, replace } = useFieldArray({ control, name: 'rooms' });

  const watchRooms = watch('rooms') || [];

  const totals = useMemo(() => {
    return watchRooms.reduce(
      (acc, room) => ({
        adults: acc.adults + room.adults,
        children: acc.children + room.children,
        infants: acc.infants + room.infants,
      }),
      { adults: 0, children: 0, infants: 0 },
    );
  }, [JSON.stringify(watchRooms)]);

  const totalRooms = watchRooms.length;
  const totalGuests = totals.adults + totals.children + totals.infants;

  const handleSave = async () => {
    const isValid = await trigger('rooms');
    if (isValid) setOpen(false);
  };

  // const handleTotalRoomsChange = (value: number) => {
  //   const newRooms = Array.from({ length: value }, () => ({
  //     adults: 1,
  //     children: 0,
  //     infants: 0,
  //     children_ages: [],
  //   }));
  //   replace(newRooms);
  // };

  const handleTotalRoomsChange = (value: number) => {
    const currentLength = watchRooms.length;

    if (value > currentLength) {
      const newRooms = Array.from({ length: value - currentLength }, () => ({
        adults: 1,
        children: 0,
        infants: 0,
        children_ages: [],
      }));
      replace([...watchRooms, ...newRooms]);
    } else {
      replace(watchRooms.slice(0, value));
    }
  };

  useEffect(() => {
    if (errors.rooms?.length) setOpen(true);
  }, [errors.rooms]);

  return (
    <FormField
      control={control}
      name='rooms'
      render={() => (
        <FormItem>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <div
                  className={cn(
                    'selection:bg-primary selection:text-primary-foreground border-input rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm',
                    'focus:border-ring focus:ring-ring/50 focus:ring-[3px]',
                    'data-[state=open]:border-ring data-[state=open]:ring-ring/50 data-[state=open]:ring-[3px]',
                    'cursor-pointer w-full truncate',
                  )}
                >
                  <div className='w-full'>
                    <p className='text-[10px] text-gray-500 font-semibold'>ROOMS & GUESTS</p>
                    <p className='truncate'>
                      <span className='text-primary font-bold text-lg'>
                        {totalRooms} Room, {totalGuests} Guest
                      </span>
                    </p>
                    <div className='flex justify-between text-sm md:text-md'>
                      <span>
                        {totals.adults} Adults | {totals.children} Child | {totals.infants} Infant
                      </span>
                    </div>
                  </div>
                </div>
              </PopoverTrigger>

              <PopoverContent className='w-[320px] p-2'>
                {/* Total Rooms Counter */}
                <div className='flex items-center justify-between bg-gray-50 px-2 py-1 rounded mb-2'>
                  <p className='flex-1'>TOTAL ROOMS</p>
                  <GuestsCounter
                    value={totalRooms}
                    onChange={(val) => handleTotalRoomsChange(val)}
                    min={1}
                    max={10}
                  />
                </div>

                {errors.rooms &&
                  typeof errors.rooms === 'object' &&
                  !Array.isArray(errors.rooms) && (
                    <Alert variant='destructive' className='mb-2'>
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{errors.rooms.message}</AlertDescription>
                    </Alert>
                  )}

                {/* Rooms list */}
                <div className='space-y-4 max-h-[400px] overflow-y-auto pr-1'>
                  {fields.map((field, roomIndex) => (
                    <div key={field.id} className='rounded shadow p-2 space-y-2'>
                      <h3 className='text-xs font-semibold border-b pb-1 border-primary'>
                        Room {roomIndex + 1}
                      </h3>

                      {/* Adults */}
                      <div className='flex justify-between items-center'>
                        <Label className='text-xs flex-1'>Adults</Label>

                        <Controller
                          control={control}
                          name={`rooms.${roomIndex}.adults`}
                          render={({ field }) => (
                            <GuestsCounter
                              value={field.value}
                              onChange={field.onChange}
                              min={1}
                              max={10}
                            />
                          )}
                        />
                      </div>
                      {errors.rooms?.[roomIndex]?.adults && (
                        <span className='text-xs text-red-500'>
                          {errors.rooms[roomIndex].adults?.message}
                        </span>
                      )}

                      {/* Children */}
                      <div className='flex justify-between items-center'>
                        <Label className='text-xs flex-1'>Children (2-17 years)</Label>
                        <Controller
                          control={control}
                          name={`rooms.${roomIndex}.children`}
                          render={({ field }) => (
                            <GuestsCounter
                              value={field.value}
                              onChange={(val) => {
                                field.onChange(val);
                                const currentAges = watch(`rooms.${roomIndex}.children_ages`) || [];
                                if (val > currentAges.length) {
                                  setValue(`rooms.${roomIndex}.children_ages`, [
                                    ...currentAges,
                                    ...Array(val - currentAges.length).fill(undefined),
                                  ]);
                                } else {
                                  setValue(
                                    `rooms.${roomIndex}.children_ages`,
                                    currentAges.slice(0, val),
                                  );
                                }
                              }}
                              min={0}
                              max={6}
                            />
                          )}
                        />
                      </div>

                      {/* Infants */}
                      <div className='flex justify-between items-center'>
                        <Label className='text-xs flex-1'>Infants (0-2 years)</Label>

                        <Controller
                          control={control}
                          name={`rooms.${roomIndex}.infants`}
                          render={({ field }) => (
                            <GuestsCounter
                              value={field.value}
                              onChange={field.onChange}
                              min={0}
                              max={4}
                            />
                          )}
                        />
                      </div>

                      {/* Children Ages */}
                      {watchRooms[roomIndex]?.children > 0 && (
                        <div>
                          <Label className='text-xs mb-1 block'>Children Ages</Label>
                          <div className='grid grid-cols-2 gap-2'>
                            {Array.from({
                              length: watchRooms[roomIndex].children,
                            }).map((_, childIndex) => (
                              <Controller
                                key={childIndex}
                                control={control}
                                name={`rooms.${roomIndex}.children_ages.${childIndex}`}
                                render={({ field }) => (
                                  <ChildAgeSelect
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!errors.rooms?.[roomIndex]?.children_ages?.[childIndex]}
                                  />
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <Button className='w-full mt-4 bg-secondary' onClick={handleSave}>
                  Apply
                </Button>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HotelRoomAndGuests;
