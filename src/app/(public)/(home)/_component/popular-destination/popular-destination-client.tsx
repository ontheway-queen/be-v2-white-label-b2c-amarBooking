'use client';

import { encodeFlightSearchParams } from '@/lib/flight/flight-formatter-helper';
import {
  getFormattedPopularFlight,
  IGetFormattedPopularFlight,
} from '@/lib/flight/popular-flight-formatter';
import { setDefaultFlightFilters } from '@/lib/redux/slice/flight/extract-flight-filter-slice';
import { setFlightSearch } from '@/lib/redux/slice/flight/flight-search-form-slice';
import { setExpanded } from '@/lib/redux/slice/ModifySearchState';
import { useAppDispatch } from '@/lib/redux/store';
import { fadeIn } from '@/lib/varients/varients';
import { IFlightSearchSchema } from '@/type/flight/flight.interface';
import { IPopularDestination } from '@/type/site.config.interface';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

interface IProps {
  data: IPopularDestination[] | undefined;
}

const PopularDestinationClient = ({ data }: IProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();

  const destination = getFormattedPopularFlight(data);

  const handleCardClick = (data: IGetFormattedPopularFlight) => {
    if (isPending) return;

    const now = new Date();
    const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

    const flight: IFlightSearchSchema = {
      tripType: 'Round-trip',
      passenger: {
        adults: 1,
        child: 0,
        infant: 0,
        kids: 0,
      },
      class: 'economy',
      from: data.from,
      to: data.to,
      departure: now.toISOString(),
      return: threeDaysLater.toISOString(),
      multiCityTrips: [],
    };

    dispatch(setFlightSearch(flight));
    dispatch(setDefaultFlightFilters());

    startTransition(() => {
      router.push(`/flights/search?${encodeFlightSearchParams(flight)}`);
    });
    dispatch(setExpanded(false));
  };

  return (
    <section className='py-10 md:py-20 bg-gradient-to-b from-white via-blue-50 to-white relative'>
      <div className='container px-4 md:px-6'>
        <div className='mb-12 text-center'>
          <motion.h2
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: true }}
            className='text-3xl font-bold text-neutral-800'
          >
            Popular Destinations
          </motion.h2>
          <motion.p
            variants={fadeIn('up', 0.3)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: true }}
            className='mt-4 max-w-3xl mx-auto text-neutral-600'
          >
            Click on a destination to explore exciting flight deals.
          </motion.p>
        </div>

        <motion.div
          variants={fadeIn('up', 0.4)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: true }}
          className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
        >
          {destination?.map((destination, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(destination)}
              className='cursor-pointer z-10 relative group overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-2xl hover:scale-[1.02]'
            >
              <div className='relative h-[260px] w-full rounded-2xl -z-20'>
                {destination.image ? (
                  <Image
                    src={destination.image}
                    alt={`Bangladesh to ${destination.city}`}
                    fill
                    className='object-cover transition-opacity opacity-0 duration-[2s] group-hover:scale-105'
                    onLoadingComplete={(image) => image.classList.remove('opacity-0')}
                  />
                ) : (
                  ''
                )}
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent'></div>
              </div>

              <div className='absolute bottom-0 w-full p-4 backdrop-blur-sm bg-white/10 text-white space-y-1'>
                <h3 className='text-xl font-semibold flex items-center gap-2'>
                  {destination.from.country} <ArrowRight className='w-4 h-4' /> {destination.city}
                </h3>
                <p className='text-sm text-white/90'>{destination.to.name}</p>
                <div className='flex items-center justify-between text-xs text-white/80'>
                  <span>IATA: {destination.to.iata_code}</span>
                  <span>{destination.country}</span>
                </div>
              </div>

              <div className='absolute top-3 left-3 bg-white/80 text-sm text-gray-800 px-3 py-1 rounded-full shadow-sm backdrop-blur-md'>
                <Sparkles className='inline-block w-4 h-4 mr-1 text-yellow-500' />
                Top Pick
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PopularDestinationClient;
