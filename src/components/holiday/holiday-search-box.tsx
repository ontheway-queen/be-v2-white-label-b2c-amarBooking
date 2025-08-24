'use client';
import { holidaySearchSchema } from '@/lib/holiday/holiday-zod-schema';
import { cn } from '@/lib/utils';
import { IHolidaySearchSchema } from '@/type/holiday/holiday.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '../ui/button';

import { useRouter } from 'next/navigation';
import SelectHolidayCity from './select-holiday-city';

const HolidaySearchBox = () => {
  const router = useRouter();

  const methods = useForm<IHolidaySearchSchema>({
    resolver: zodResolver(holidaySearchSchema),
    defaultValues: { city: { city: "Cox's Bazar", city_id: 9652, country_name: 'BANGLADESH' } },
    mode: 'onSubmit',
  });

  const onSubmit = (data: IHolidaySearchSchema) => {
    router.push(
      // `/tour-packages?city_id=${data.city.city_id}&city=${data.city.city}&country=${data.city.country_name}`,
      `/tour-packages`,
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='space-y-4'>
          <div className='px-1 text-muted-foreground font-semibold font-roboto text-xs lg:text-base'>
            Explore More, Pay Less — Book Your Dream Tour Today! 🌍✨
          </div>

          <AnimatePresence mode='wait'>
            <motion.div
              key='oneway'
              // {...fadeInUp}
            >
              <SelectHolidayCity />
            </motion.div>
          </AnimatePresence>

          <div className={cn('flex  items-center gap-4 justify-end pt-1 w-full')}>
            <Button
              type='submit'
              className='h-9 px-8 bg-primary hover:bg-green-600 w-full lg:w-fit'
            >
              Search Holiday
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default HolidaySearchBox;
