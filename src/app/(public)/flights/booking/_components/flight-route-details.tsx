'use client';

import { formatTime, hostedImage, minutesToHoursAndMinutes } from '@/lib/helper';
import { IRevalidateData } from '@/type/flight/flight.search.interface';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Briefcase,
  Calendar,
  ChevronDown,
  Clock,
  HandPlatter,
  MapPin,
  Plane,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  res: IRevalidateData | undefined;
};

const FlightRouteDetails = ({ res }: Props) => {
  const flights = res?.flights ?? [];
  const availability = res?.availability ?? [];

  const [expandedFlights, setExpandedFlights] = useState(Array(flights.length).fill(true));

  const toggleFlightExpansion = (index: number) => {
    const newExpandedFlights = [...expandedFlights];
    newExpandedFlights[index] = !newExpandedFlights[index];
    setExpandedFlights(newExpandedFlights);
  };

  return (
    <div className='space-y-5 w-full mx-auto'>
      {flights.map((flight, flightIndex) => {
        // Determine if this is outbound or return flight
        const isOutbound = flightIndex === 0;
        const flightColor = isOutbound ? 'text-blue-600' : 'text-emerald-600';
        const flightBgColor = isOutbound ? 'bg-blue-50 ' : 'bg-emerald-50';
        const flightBorderColor = isOutbound ? 'border-blue-100' : 'border-emerald-100';
        const isExpanded = expandedFlights[flightIndex];

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: flightIndex * 0.2 }}
            className='bg-background rounded-xl shadow overflow-hidden border border-gray-100 '
            key={flightIndex}
          >
            {/* Flight Header - Always visible */}

            <motion.div
              className={`${flightBgColor} px-4 sm:px-6 py-3 sm:py-4 border-b ${flightBorderColor} cursor-pointer`}
              onClick={() => toggleFlightExpansion(flightIndex)}
              whileHover={{
                backgroundColor: isOutbound ? 'rgba(59, 130, 246, 0.2)' : 'rgba(16, 185, 129, 0.2)',
              }}
              transition={{ duration: 0.2 }}
            >
              <div className='flex flex-row sm:justify-between sm:items-center gap-3 sm:gap-0'>
                {/* Left Section */}
                <div className='flex items-center space-x-3 sm:space-x-4'>
                  <motion.div
                    className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                      isOutbound ? 'bg-blue-600' : 'bg-emerald-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      animate={{ rotate: isExpanded ? 0 : 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Plane className='text-white h-4 w-4 sm:h-6 sm:w-6' />
                    </motion.div>
                  </motion.div>

                  <div>
                    <h3 className='font-bold text-lg sm:text-xl mt-1 flex items-center flex-wrap'>
                      {flight.options[0].departure.airport_code}
                      <motion.svg
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        className='mx-1 sm:mx-2'
                        initial={{ x: -5, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <path
                          d='M5 12H19M19 12L13 6M19 12L13 18'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </motion.svg>
                      {flight.options[flight.options.length - 1].arrival.airport_code}
                    </h3>

                    <div className='flex items-center text-xs sm:text-sm text-gray-600 mt-1'>
                      <Calendar className='h-3 w-3 sm:h-4 sm:w-4 mr-1' />
                      <span>
                        {format(new Date(flight.options[0].departure.date!), 'EEEE, dd MMMM yyyy')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className='flex items-center justify-between sm:justify-end'>
                  <div className='text-right mr-3 sm:mr-4'>
                    <motion.div
                      className={`flex items-center ${flightColor} font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm ${flightBgColor} border ${flightBorderColor}`}
                      whileHover={{ scale: 1.03 }}
                    >
                      <Clock className='h-3 w-3 mr-1 hidden sm:block' />
                      <span className='text-xs sm:text-sm md:text-md'>
                        {minutesToHoursAndMinutes(flight.elapsed_time).time}
                      </span>
                    </motion.div>
                    <div className='text-[11px] sm:text-xs mt-1 sm:mt-2 flex items-center justify-end text-gray-600'>
                      {flight.stoppage === 0 ? (
                        <span className='font-medium'>Direct Flight</span>
                      ) : (
                        <span>
                          {flight.stoppage} {flight.stoppage === 1 ? 'Stop' : 'Stops'}
                        </span>
                      )}
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className='h-4 w-4 sm:h-5 sm:w-5 text-gray-500' />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Flight Details - Expandable */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {/* Flight Segments */}

                  <div>
                    {flight?.options?.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className='border-b border-gray-100 last:border-b-0'
                      >
                        {/* Airline Info */}
                        <div className='px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 gap-3'>
                          {/* Airline Logo */}
                          <motion.div
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Image
                              src={hostedImage(`/${option.carrier?.carrier_marketing_logo}`)}
                              alt='airline'
                              width={40}
                              height={40}
                              className='rounded-lg sm:mr-4 mx-auto sm:mx-0'
                            />
                          </motion.div>

                          {/* Airline Name & Flight Info */}
                          <div className='flex-1 text-center sm:text-left'>
                            <div className='font-semibold text-base sm:text-lg'>
                              {option.carrier?.carrier_marketing_airline}
                            </div>
                            <div className='text-xs sm:text-sm text-gray-600 flex items-center justify-center sm:justify-start flex-wrap mt-1'>
                              <span className='font-medium'>
                                Flight {option.carrier?.carrier_marketing_code}{' '}
                                {option.carrier?.carrier_marketing_flight_number}
                              </span>
                              <span className='hidden sm:inline mx-2'>•</span>
                              <motion.span
                                whileHover={{ scale: 1.05 }}
                                className='px-2 py-0.5 bg-gray-200/70 rounded text-gray-700 mt-1 sm:mt-0'
                              >
                                {availability[flightIndex]?.segments?.[0]?.passenger?.[0]
                                  ?.cabin_type || 'Unknown'}
                              </motion.span>
                            </div>
                          </div>

                          {/* Refund + Baggage */}
                          <div className='text-center sm:text-right'>
                            {res?.refundable ? (
                              <motion.div
                                className='flex justify-center sm:justify-end items-center text-green-600 text-xs sm:text-sm'
                                whileHover={{ scale: 1.05 }}
                              >
                                <svg className='w-4 h-4 mr-1' viewBox='0 0 24 24' fill='none'>
                                  <path
                                    d='M7 13L10 16L17 9'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                  />
                                  <circle
                                    cx='12'
                                    cy='12'
                                    r='9'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                  />
                                </svg>
                                <span>Refundable</span>
                              </motion.div>
                            ) : (
                              <motion.div
                                className='flex justify-center sm:justify-end items-center text-gray-500 text-xs sm:text-sm'
                                whileHover={{ scale: 1.05 }}
                              >
                                <AlertCircle className='w-4 h-4 mr-1' />
                                <span>Non-Refundable</span>
                              </motion.div>
                            )}
                            <div className='mt-1 text-[11px] sm:text-xs text-gray-500 flex items-center justify-center sm:justify-end'>
                              <Briefcase className='w-3 h-3 mr-1' />
                              <span>
                                {
                                  availability?.[flightIndex]?.segments?.[0]?.passenger?.[0]
                                    ?.baggage_count
                                }
                                {
                                  availability?.[flightIndex]?.segments?.[0]?.passenger?.[0]
                                    ?.baggage_unit
                                }
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Flight Times */}
                        <div className='px-4 sm:px-6 py-4'>
                          <div className='flex flex-col md:flex-row md:flex-nowrap gap-6'>
                            {/* Departure */}
                            <div className='w-full md:w-1/3 text-center md:text-left'>
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className='text-xl sm:text-2xl font-bold text-gray-900'
                              >
                                {formatTime(option.departure.time)}
                              </motion.div>
                              <div className='text-sm sm:text-base font-medium mt-1'>
                                {option.departure.airport_code}
                              </div>
                              <div className='text-xs sm:text-sm text-gray-600 mt-1'>
                                {format(new Date(option.departure.date!), 'EEE, dd MMM yyyy')}
                              </div>
                              <div className='flex items-start justify-center md:justify-start mt-2'>
                                <MapPin className='h-3 w-3 sm:h-4 sm:w-4 text-gray-500 mt-0.5 mr-1.5 flex-shrink-0' />
                                <div className='text-xs sm:text-sm text-gray-600 line-clamp-2'>
                                  {option.departure.airport}
                                </div>
                              </div>
                            </div>

                            {/* Flight Path */}
                            <div className='w-full md:w-1/3 flex flex-col items-center justify-center'>
                              <div className='text-xs sm:text-sm text-gray-600 font-medium mb-2 sm:mb-3'>
                                {minutesToHoursAndMinutes(option.elapsedTime).time}
                              </div>
                              <div className='w-full relative flex items-center'>
                                <motion.div
                                  className='h-0.5 flex-1 bg-primary/30'
                                  initial={{ width: 0 }}
                                  animate={{ width: '100%' }}
                                  transition={{ duration: 0.5, delay: 0.2 }}
                                />
                                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                                  <motion.div
                                    animate={{
                                      scale: [1, 1.2, 1],
                                      opacity: [1, 0.8, 1],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                    }}
                                  >
                                    <Plane className='h-4 w-4 text-primary' />
                                  </motion.div>
                                </motion.div>
                                <motion.div
                                  className='h-0.5 flex-1 bg-primary/30'
                                  initial={{ width: 0 }}
                                  animate={{ width: '100%' }}
                                  transition={{ duration: 0.5, delay: 0.7 }}
                                />
                              </div>
                            </div>

                            {/* Arrival */}
                            <div className='w-full md:w-1/3 text-center md:text-right'>
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className='text-xl sm:text-2xl font-bold text-gray-900'
                              >
                                {formatTime(option.arrival.time)}
                              </motion.div>
                              <div className='text-sm sm:text-base font-medium mt-1'>
                                {option.arrival.airport_code}
                              </div>
                              <div className='text-xs sm:text-sm text-gray-600 mt-1'>
                                {format(new Date(option.arrival.date!), 'EEE, dd MMM yyyy')}
                              </div>
                              <div className='flex items-start justify-center md:justify-end mt-2'>
                                <MapPin className='h-3 w-3 sm:h-4 sm:w-4 text-gray-500 mt-0.5 mr-1.5 flex-shrink-0' />
                                <div className='text-xs sm:text-sm text-gray-600 text-center md:text-right line-clamp-2'>
                                  {option.arrival.airport}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Layover */}
                          {flight.layover_time && flight.layover_time[index] !== 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                              className='mt-4 sm:mt-5 py-3 px-4 rounded-lg border border-dashed text-center md:text-left'
                              style={{
                                backgroundColor: isOutbound
                                  ? 'rgba(59, 130, 246, 0.05)'
                                  : 'rgba(16, 185, 129, 0.05)',
                                borderColor: isOutbound
                                  ? 'rgba(59, 130, 246, 0.3)'
                                  : 'rgba(16, 185, 129, 0.3)',
                              }}
                            >
                              <div className='flex flex-col sm:flex-row items-center sm:items-start gap-2'>
                                <HandPlatter
                                  className={`h-4 w-4 sm:h-5 sm:w-5 ${
                                    isOutbound ? 'text-blue-500' : 'text-emerald-500'
                                  }`}
                                />
                                <div>
                                  <span className='font-medium text-gray-900'>
                                    {minutesToHoursAndMinutes(flight.layover_time[index]).time}{' '}
                                    Layover
                                  </span>
                                  <span className='mx-1 text-gray-600'>at</span>
                                  <span className='font-semibold text-gray-900'>
                                    {option.arrival.airport_code}
                                  </span>
                                  <p className='text-[11px] sm:text-xs text-gray-500 mt-0.5'>
                                    {option.arrival.airport}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Flight Footer */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className='bg-gray-50 px-4 sm:px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4'
                  >
                    {/* Left Info */}
                    <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
                      <motion.div className='flex items-center' whileHover={{ scale: 1.03 }}>
                        <Clock className='h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2' />
                        <div>
                          <div className='text-[11px] sm:text-xs text-gray-500 uppercase tracking-wide'>
                            Total Duration
                          </div>
                          <div className='font-semibold text-sm sm:text-base'>
                            {minutesToHoursAndMinutes(flight.elapsed_time).time}
                          </div>
                        </div>
                      </motion.div>

                      <motion.div className='flex items-center' whileHover={{ scale: 1.03 }}>
                        <Briefcase className='h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2' />
                        <div>
                          <div className='text-[11px] sm:text-xs text-gray-500 uppercase tracking-wide'>
                            Baggage Allowance
                          </div>
                          <div className='font-semibold text-sm sm:text-base'>
                            {
                              res?.availability?.[flightIndex]?.segments?.[0]?.passenger?.[0]
                                ?.baggage_count
                            }{' '}
                            {
                              res?.availability?.[flightIndex]?.segments?.[0]?.passenger?.[0]
                                ?.baggage_unit
                            }
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Right Info */}
                    <motion.div
                      className='flex flex-col items-start md:items-end'
                      whileHover={{ scale: 1.03 }}
                    >
                      <div className='text-[11px] sm:text-xs text-gray-500 uppercase tracking-wide'>
                        Flight Type
                      </div>
                      <div className='font-semibold flex flex-wrap items-center text-sm sm:text-base'>
                        {flight.stoppage === 0
                          ? 'Direct'
                          : `${flight.stoppage} ${flight.stoppage === 1 ? 'Stop' : 'Stops'}`}
                        {flight.stoppage > 0 && (
                          <span className='text-xs sm:text-sm text-gray-500 ml-2'>
                            (
                            {flight.options
                              .map((opt, i) => opt.arrival.airport_code)
                              .filter((_, i) => i < flight.options.length - 1)
                              .join(', ')}
                            )
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FlightRouteDetails;
