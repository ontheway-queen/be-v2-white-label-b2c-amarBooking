'use client';

import { HotelAccordion } from '@/components/hotel/hotel-accordion';
import { Accordion } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { useMobile } from '@/hooks/use-mobile';
import { Image as ImageIcon } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const HotelSearchLoading = () => {
  const isMobile = useMobile();

  return (
    <div>
      <div className='bg-muted min-h-screen'>
        <div className='container mx-auto px-4 md:px-0 py-2'>
          <div className='flex flex-col lg:flex-row gap-6'>
            <div className={`${isMobile ? 'hidden' : 'w-full lg:min-w-1/4 lg:max-w-1/4'}`}>
              <div className='sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto no-scrollbar'>
                <Accordion
                  className='space-y-3'
                  type='multiple'
                  defaultValue={
                    [
                      'price',
                      'cancellation',
                      'facilities',
                      'mealPlans',
                      'roomTypes',
                      'ratings',
                    ].filter(Boolean) as string[]
                  }
                >
                  <HotelAccordion value={'price'} label={'Price Range'}>
                    <div className='space-y-2'>
                      <Skeleton width='50%' height={16} />
                      <Skeleton width='33%' height={16} />
                      <Skeleton width='25%' height={16} />
                    </div>
                  </HotelAccordion>
                  <HotelAccordion value={'cancellation'} label={'Cancellation'}>
                    <div className='space-y-2'>
                      <Skeleton width='50%' height={16} />
                      <Skeleton width='33%' height={16} />
                      <Skeleton width='25%' height={16} />
                    </div>
                  </HotelAccordion>
                  <HotelAccordion value={'facilities'} label={'Facilities'}>
                    <div className='space-y-2'>
                      <Skeleton width='50%' height={16} />
                      <Skeleton width='33%' height={16} />
                      <Skeleton width='25%' height={16} />
                    </div>
                  </HotelAccordion>
                  <HotelAccordion value={'mealPlans'} label={'Meal Plans'}>
                    <div className='space-y-2'>
                      <Skeleton width='50%' height={16} />
                      <Skeleton width='33%' height={16} />
                      <Skeleton width='25%' height={16} />
                    </div>
                  </HotelAccordion>
                  <HotelAccordion value={'roomTypes'} label={'Room Types'}>
                    <div className='space-y-2'>
                      <Skeleton width='50%' height={16} />
                      <Skeleton width='33%' height={16} />
                      <Skeleton width='25%' height={16} />
                    </div>
                  </HotelAccordion>
                </Accordion>
              </div>
            </div>

            {/* Hotel results */}
            <div className='w-full lg:w-3/4'>
              {[0, 1, 2, 3, 4, 5].map((item) => (
                <Card
                  key={item}
                  className='card w-full p-0 mb-4 rounded-lg shadow overflow-hidden dark:border dark:border-background'
                >
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-0'>
                    <div className='w-full h-[220px] bg-muted/70 flex items-center justify-center'>
                      <div className='border border-background rounded-full p-5'>
                        <ImageIcon />
                      </div>
                    </div>
                    <div className='w-full px-4 py-3 flex flex-col justify-between'>
                      <div>
                        <Skeleton width='50%' height={24} />
                        <div className='flex items-center gap-2 mt-1'>
                          <Skeleton width='25%' height={16} />
                        </div>
                        <Skeleton className='mt-2' width='66%' height={16} />
                        <div className='flex flex-wrap gap-2 items-center mt-4'>
                          <Skeleton width='33%' height={16} />
                        </div>
                        <Skeleton className='mt-4' width='75%' height={16} />
                        <Skeleton className='mt-4' width='75%' height={16} />
                      </div>
                    </div>
                    <div className='w-full bg-primary/10 px-4 py-3'>
                      <Skeleton width='50%' height={16} />
                      <Skeleton width='50%' height={16} className='mt-2' />
                      <Skeleton width='66%' height={16} className='mt-2' />
                      <Skeleton width='100%' height={40} className='mt-4' />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelSearchLoading;
