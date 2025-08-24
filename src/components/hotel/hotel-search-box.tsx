'use client';

import { encodedHotelParams } from '@/lib/hotel/hotel-formatter-helper';
import { hotelSearchSchema } from '@/lib/hotel/hotel-zod-schema';

import { setExpanded } from '@/lib/redux/slice/ModifySearchState';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { cn } from '@/lib/utils';
import { IHotelsSearchSchema } from '@/type/hotel/hotel.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '../ui/button';

import CheckInCheckOutDate from './check-in-check-out-date';
import HotelLocationSelect from './hotel-location-select';
import HotelRoomAndGuests from './HotelRoomAndGuests';
import { setHotelSearch } from '@/lib/redux/slice/hotel/hotel-search-form-slice';
import { setHotelPage } from '@/lib/redux/slice/hotel/hotel-data-slice';
import { clearAllHotelFilters } from '@/lib/redux/slice/hotel/extract-hotel-filter-slice';

const HotelSearchBox = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();

  const [isPending, startTransition] = useTransition();

  const hotelSessionData = useAppSelector((state) => state.hotelForm);

  const methods = useForm<IHotelsSearchSchema>({
    resolver: zodResolver(hotelSearchSchema),
    defaultValues: hotelSessionData,
    mode: 'onSubmit',
  });

  const onSubmit = (data: IHotelsSearchSchema) => {
    startTransition(() => {
      const res = encodedHotelParams(data);
      dispatch(setHotelSearch(data));
      route.push(`/hotels/search?${res}`);
    });

    dispatch(clearAllHotelFilters());
    dispatch(setExpanded(false));
    dispatch(setHotelPage('hotel-list'));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='space-y-4'>
          <div className='px-1 text-muted-foreground font-semibold font-roboto text-xs lg:text-base'>
            Stay More, Pay Less — Book Your Dream Hotel Now! 🏨💫
          </div>

          <AnimatePresence mode='wait'>
            <motion.div
              key='oneway'
              // {...fadeInUp}
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4'
            >
              <div className='lg:col-span-2'>
                <HotelLocationSelect />
              </div>

              <div className='lg:col-span-3 '>
                <CheckInCheckOutDate />
              </div>

              <div className='lg:col-span-2'>
                <HotelRoomAndGuests />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className={cn('flex  items-center gap-4 justify-end pt-1 w-full')}>
            <Button
              loading={isPending}
              type='submit'
              className='h-9 px-8 bg-primary hover:bg-green-600 w-full lg:w-fit'
            >
              Search Hotel
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default HotelSearchBox;
