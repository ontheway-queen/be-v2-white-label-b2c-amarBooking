import {
  formatCustomDate,
  formatDuration,
  formatTime,
  hostedImage,
  minutesToHoursAndMinutes,
} from '@/lib/helper';
import { IFlight } from '@/type/flight/flight.search.interface';
import Image from 'next/image';
import { useState } from 'react';

import { motion } from 'framer-motion';

type Props = {
  flights: IFlight[] | undefined;
  flightDetailsTab: string[] | null;
};

const FlightDetailsTab = ({ flights, flightDetailsTab }: Props) => {
  const [active, setActive] = useState<number>(0);
  const activeFlight = flights?.[active];

  return (
    <div className='w-full'>
      <div className='flex gap-2 items-center justify-center text-sm border rounded cursor-pointer bg-background mb-2 w-fit mx-auto'>
        {flightDetailsTab?.map((route, index) => {
          const isActive = active === index;
          return (
            <div
              key={route}
              onClick={() => setActive(index)}
              className={`flex-1 text-center rounded py-1 font-semibold px-2 ${
                isActive ? 'bg-primary text-background' : ''
              }`}
            >
              {route}
            </div>
          );
        })}
      </div>

      <div className='rounded-lg'>
        <div className='relative'>
          {activeFlight?.options?.map((segment, index) => {
            return (
              <div key={index} className='mb-8 last:mb-0 '>
                {/* Timeline and carrier logo */}
                <div className='relative mr-4 flex items-center gap-2 mt-[10px] border-b border-t px-2 md:px-6 w-full'>
                  <div className='flex py-1 items-center justify-center z-10 relative'>
                    <Image
                      src={hostedImage(`/${segment?.carrier?.carrier_operating_logo}`)}
                      alt={'airLine Logo'}
                      className='shadow rounded-full p-0.5 bg-background shadow-primary/50'
                      height={40}
                      width={40}
                    />
                  </div>

                  <div className='text-sm text-gray-600 '>
                    <p className='font-semibold'>{segment?.carrier?.carrier_operating_airline}</p>
                    <p>Flight {segment?.carrier?.carrier_marketing_flight_number}</p>
                  </div>
                </div>

                <div className='flex p-2 md:px-6 '>
                  {/* Flight segment details */}
                  <div className='flex-1'>
                    {/* Departure and Arrival */}
                    <div className='flex justify-between items-center'>
                      {/* Departure */}
                      <div className='w-5/12'>
                        <div className='font-bold text-xl text-gray-800'>
                          {formatTime(segment?.departure?.time)}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {formatCustomDate(segment?.departure?.date)}
                        </div>
                        <div className='font-medium mt-0.5'>{segment?.departure?.airport_code}</div>
                        <div className='text-sm text-gray-600 mt-0.5'>
                          {segment?.departure?.airport}
                        </div>
                        <div className='text-xs text-gray-500 mt-0.5'>
                          Terminal {segment?.departure?.terminal}
                        </div>
                      </div>

                      <div className='w-2/12 flex flex-col items-center justify-start pt-2'>
                        <div className='text-xs text-center '>
                          {minutesToHoursAndMinutes(segment?.elapsedTime).time}
                        </div>

                        <div className='w-full h-6 my-2 relative overflow-hidden'>
                          {/* Flight path line */}
                          <div className='absolute left-0 w-full border-t  border-dashed transform '></div>

                          {/* Animated plane */}
                          <motion.div
                            className='absolute left-0  z-10 text-primary w-full'
                            initial={{ x: '0%' }}
                            animate={{ x: '100%' }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            ᯓ ✈︎
                          </motion.div>
                        </div>
                      </div>

                      {/* Arrival */}
                      <div className='w-5/12 text-right'>
                        <div className='font-bold text-xl text-gray-800'>
                          {formatTime(segment?.arrival?.time)}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {formatCustomDate(segment?.arrival?.date)}
                        </div>
                        <div className='font-medium mt-1'>{segment?.arrival?.airport_code}</div>
                        <div className='text-sm text-gray-600 mt-1'>
                          {segment?.arrival?.airport}
                        </div>
                        <div className='text-xs text-gray-500 mt-1'>
                          Terminal {segment?.arrival?.terminal}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layover information */}
                {index < activeFlight.options.length - 1 && (
                  <div className='ml-11 md:ml-16 mt-1 py-3 px-4 bg-amber-50 border-l-4 border-amber-300 rounded-r-md'>
                    <div className='flex items-center'>
                      <span className='text-sm font-medium text-amber-800'>
                        Layover: {formatDuration(activeFlight?.layover_time?.[index])} in{' '}
                        {segment?.arrival?.airport_code}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsTab;
