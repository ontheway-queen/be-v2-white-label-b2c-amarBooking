'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  formatCurrency,
  formatTime,
  getStopoverAirportCodes,
  hostedImage,
  minutesToHoursAndMinutes,
} from '@/lib/helper';
import { cn } from '@/lib/utils';
import { IFlightList } from '@/type/flight/flight.search.interface';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, Clock, MapPin, Plane } from 'lucide-react';
import Image from 'next/image';
import { memo } from 'react';
import CardExpandDetails from './expand/card-expand-details';
interface FlightCardProps {
  item: IFlightList;
  searchId: string | undefined;
}

interface IOnSelectType {
  flight_id: string | undefined;
}

export const FlightCard = memo(({ item, searchId }: FlightCardProps) => {
  const onSelect = ({ flight_id }: IOnSelectType) => {
    window.open(`/flights/booking?searchId=${searchId}&flight=${flight_id}`, '_blank');
  };

  const available_seat =
    item?.availability?.[0]?.segments?.[0]?.passenger?.[0]?.available_seat ?? null;
  const count = item?.availability?.[0]?.segments?.[0]?.passenger?.[0]?.baggage_count ?? null;
  const unit = item?.availability?.[0]?.segments?.[0]?.passenger?.[0]?.baggage_unit ?? null;
  const is_refundable = item.refundable;

  return (
    <Accordion
      type='single'
      collapsible
      className={cn(
        'bg-background shadow border rounded-lg transition-shadow duration-300 mb-4 overflow-hidden',
      )}
    >
      <AccordionItem value='item-1'>
        <div className='md:grid md:grid-cols-12 flex flex-col'>
          {/* Flight Information */}
          <div className='md:col-span-9 w-full p-2 space-y-2  my-auto'>
            {item?.flights?.map((flight, index) => {
              const firstOption = flight?.options[0];
              const lastOption = flight?.options[flight?.options?.length - 1];
              const stopovers = getStopoverAirportCodes(flight);
              const stopoverPositions = [];

              if (flight?.stoppage > 0) {
                for (let i = 1; i <= flight.stoppage; i++) {
                  stopoverPositions.push((i / (flight.stoppage + 1)) * 100);
                }
              }

              return (
                <div key={index} className='border-b last:border-b-0 pb-3 '>
                  <div className='flex flex-col md:flex-row items-center '>
                    {/* Airline Info */}
                    <div className='md:w-1/6 w-full flex md:flex-col gap-2 md:gap-0 items-center p-2 md:border-r md:border-gray-100'>
                      <div className='mb-1 w-[48px] h-[48px]'>
                        <Image
                          src={hostedImage(`/${firstOption.carrier?.carrier_operating_logo}`)}
                          alt='airline_logo'
                          width={48}
                          height={48}
                          className='shadow rounded-full p-0.5 bg-background shadow-primary/50 object-cover transition-opacity opacity-0 duration-[2s] group-hover:scale-105'
                          onLoadingComplete={(image) => image.classList.remove('opacity-0')}
                        />
                      </div>
                      <div className='md:text-center md:max-w-[100px] truncate '>
                        <span
                          title={firstOption.carrier?.carrier_operating_airline}
                          className='text-xs font-medium text-primary text-center  
                        w-4 tracking-tight ellipsis'
                        >
                          {firstOption.carrier?.carrier_operating_airline}
                        </span>
                        <div className='flex items-center mt-1 md:justify-center '>
                          <Clock className='h-3 w-3 text-gray-500 mr-1' />
                          <p className='text-xs text-gray-600 font-medium'>
                            {minutesToHoursAndMinutes(flight?.elapsed_time).time}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Flight Route */}
                    <div className='md:w-5/6 w-full p-3 flex-grow'>
                      <div className='flex flex-row items-center justify-between'>
                        {/* Departure */}
                        <div className='flex flex-col items-start w-auto'>
                          <div className='text-lg font-bold text-blue-950'>
                            {firstOption?.departure?.airport_code}
                          </div>
                          <div className='text-sm font-semibold text-gray-700'>
                            {formatTime(firstOption?.departure?.time)}
                          </div>
                          {firstOption?.departure?.date && (
                            <div className='flex items-center text-xs text-gray-600 mt-1'>
                              <Calendar className='h-3 w-3 mr-1' />
                              {format(new Date(firstOption?.departure?.date), 'EEE, dd MMM yyyy')}
                            </div>
                          )}
                          <div className='flex items-center text-xs text-gray-600 mt-1 max-w-xs truncate'>
                            <MapPin className='h-3 w-3 mr-1 flex-shrink-0' />
                            {/* <span className='truncate'>{firstOption.departure?.airport}</span> */}
                            <span
                              className='truncate w-[97px] md:w-[190px]'
                              title={firstOption.departure?.airport}
                            >
                              {firstOption.departure?.airport}
                            </span>
                          </div>
                        </div>

                        {/* Flight Path */}
                        <div className='flex-1 flex flex-col items-center w-full px-2 md:px-1'>
                          <div className='w-full flex items-center justify-center mb-1'>
                            <Badge
                              variant={flight.stoppage === 0 ? 'default' : 'secondary'}
                              className='text-xs px-2 py-0.5 rounded-full'
                            >
                              {flight.stoppage === 0
                                ? 'Direct'
                                : `${flight.stoppage} stop${flight.stoppage > 1 ? 's' : ''}`}
                            </Badge>
                          </div>
                          <div className='relative w-full h-2 bg-gradient-to-r from-blue-100 via-indigo-100 to-blue-100 rounded-full my-2 shadow-sm'>
                            <div className='absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-600'></div>
                            {stopoverPositions.map((position, i) => (
                              <div
                                key={i}
                                className='absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-10'
                                style={{ left: `${position}%` }}
                              >
                                <div className='w-3 h-3 rounded-full bg-red-500 shadow-md'></div>
                                <div className='absolute inset-0 w-3 h-3 rounded-full bg-red-400 animate-ping opacity-75'></div>
                              </div>
                            ))}
                            <div className='absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-green-600'></div>

                            {flight.stoppage == 0 ? (
                              <motion.div
                                className='absolute top-1/2 -translate-y-1/2 z-20'
                                initial='initial'
                                animate='animate'
                                variants={{
                                  initial: { left: '0%' },
                                  animate: {
                                    left: '80%',
                                    transition: {
                                      duration: 6,
                                      repeat: Infinity,
                                      repeatType: 'loop',
                                      ease: 'easeInOut',
                                    },
                                  },
                                }}
                              >
                                <Plane className='rotate-45 text-primary size-5 bg-transparent p-1' />
                              </motion.div>
                            ) : (
                              ''
                            )}
                          </div>
                          <span className='flex items-center text-xs font-semibold text-gray-600 mt-1 text-center'>
                            {stopovers.join(', ')}
                          </span>
                        </div>

                        {/* Arrival */}
                        <div className='flex flex-col items-end w-auto'>
                          <div className='text-lg font-bold text-blue-950'>
                            {lastOption?.arrival?.airport_code}
                          </div>
                          <div className='text-sm font-semibold text-gray-700'>
                            {formatTime(lastOption.arrival?.time)}
                          </div>
                          {lastOption?.arrival?.date && (
                            <div className='flex items-center text-xs text-gray-600 mt-1'>
                              <Calendar className='h-3 w-3 mr-1' />
                              {format(new Date(lastOption?.arrival?.date), 'EEE, dd MMM yyyy')}
                            </div>
                          )}
                          <div className='flex items-center text-xs text-gray-600 mt-1 max-w-xs truncate justify-end w-[110px] md:w-[190px]'>
                            <MapPin className='h-3 w-3 mr-1 flex-shrink-0 text-right flex' />

                            <span
                              className='truncate  text-right'
                              title={lastOption.arrival?.airport}
                            >
                              {lastOption.arrival?.airport}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Price and Booking */}
          <div className='md:col-span-3 w-full bg-primary/25 p-4 flex md:flex-col items-center md:items-start justify-center'>
            <div className='text-left mb-1 w-full flex-1 md:flex-0'>
              <div className='flex items-center gap-3'>
                {item?.fare?.discount ? (
                  <div className='text-sm text-gray-500 line-through'>
                    {' '}
                    {formatCurrency(Number(item?.fare?.payable) + Number(item?.fare?.discount))}
                  </div>
                ) : (
                  ''
                )}
                {item?.fare?.discount ? (
                  <Badge
                    variant='destructive'
                    className={cn('mx-auto md:mx-0 my-1', 'hidden lg:flex')}
                  >
                    Save {Math.round(Number(item?.fare?.discount)).toLocaleString()}
                  </Badge>
                ) : (
                  ''
                )}
              </div>
              <div className='text-xl md:text-2xl font-bold text-blue-900'>
                {formatCurrency(Math.round(Number(item?.fare?.payable)))}
              </div>
            </div>
            <div className='flex flex-col flex-1 md:flex-0 w-full'>
              <Button
                onClick={() => onSelect({ flight_id: item.flight_id })}
                className='w-full flex items-center justify-between bg-secondary'
              >
                <span>Select Flight</span>
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
        <div className='bg-primary/10 flex justify-between px-5 pb-1'>
          <div className='space-x-2'>
            <Badge
              variant={'secondary'}
              className='rounded-full text-[11px] border-0 text-white font-semibold'
            >
              {`${is_refundable ? 'Refundable' : 'Not-Refundable'}`}
            </Badge>
            <Badge
              variant={'outline'}
              className='rounded-full text-[11px] bg-primary/20 border-0 text-gray-700 font-semibold'
            >
              {`${available_seat} Seats`}
            </Badge>
            <Badge
              variant={'outline'}
              className='rounded-full text-[11px] bg-primary/20 border-0 text-gray-700 font-semibold'
            >
              {`${count} ${unit}`}
            </Badge>
          </div>
          <AccordionTrigger className='p-0 cursor-pointer text-primary gap-1'>
            See details
          </AccordionTrigger>
        </div>
        <AccordionContent className='border-t w-full'>
          <CardExpandDetails
            flights={item?.flights}
            fareSummary={{ pax: item.passengers, fare: item.fare }}
            availability={item.availability}
            searchId={searchId}
            flight_id={item.flight_id}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
});

FlightCard.displayName = 'FlightCard';
