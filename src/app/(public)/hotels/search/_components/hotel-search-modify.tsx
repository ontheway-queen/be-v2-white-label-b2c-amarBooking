'use client';

import HotelSearchBox from '@/components/hotel/hotel-search-box';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/helper';
import { setHotelPage, useSelectedHotel } from '@/lib/redux/slice/hotel/hotel-data-slice';
import { setHotelSearch } from '@/lib/redux/slice/hotel/hotel-search-form-slice';
import { setExpanded } from '@/lib/redux/slice/ModifySearchState';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { cn } from '@/lib/utils';
import { IHotelsSearchSchema } from '@/type/hotel/hotel.interface';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Building2,
  Calendar,
  ChevronDown,
  ChevronUp,
  CreditCard,
  MapPin,
  Search,
  Settings,
  Star,
  StepBack,
  Users,
} from 'lucide-react';
import { useEffect } from 'react';

type Props = {
  searchData: IHotelsSearchSchema;
};

const HotelSearchModify = ({ searchData }: Props) => {
  const dispatch = useAppDispatch();
  const { isExpanded } = useAppSelector((state) => state.searchExpand);

  const { hotelPage } = useAppSelector(useSelectedHotel);

  // Calculate total guests
  const totalGuests = searchData?.rooms.reduce((acc, room) => {
    return acc + room.adults + room.children;
  }, 0);

  useEffect(() => {
    if (searchData) {
      dispatch(setHotelSearch(searchData));
    }
  }, [searchData]);

  return (
    <div className={cn('border-b py-2 transition-all duration-300 mt-1')}>
      <div className='container mx-auto px-4 md:px-0'>
        <div className='flex flex-row justify-between items-center'>
          <div className='w-full md:w-auto mb-4 md:mb-0'>
            <div>
              <div className='flex items-center gap-3'>
                {/* Enhanced Navigation Buttons */}
                {hotelPage === 'hotel-details' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      onClick={() => {
                        dispatch(setHotelPage('hotel-list'));
                        dispatch(setExpanded(false));
                      }}
                      size={'sm'}
                      className='h-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200'
                    >
                      <StepBack className='mr-1' size={14} />
                      <span className='font-medium'>Back to Search</span>
                    </Button>
                  </motion.div>
                )}

                {hotelPage === 'hotel-booking' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className='flex items-center gap-2'
                  >
                    <Button
                      onClick={() => {
                        dispatch(setHotelPage('hotel-details'));
                        dispatch(setExpanded(false));
                      }}
                      size={'sm'}
                      className='h-8 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200'
                    >
                      <StepBack className='mr-1' size={14} />
                      <span className='font-medium'>Back to Details</span>
                    </Button>

                    {/* Breadcrumb for booking page */}
                  </motion.div>
                )}

                {/* Dynamic Titles */}
                <div className='flex items-center gap-2'>
                  {hotelPage === 'hotel-list' && (
                    <div className='flex items-center gap-2'>
                      <Search size={20} className='text-amber-600' />
                      <h1 className='text-xs lg:text-xl font-bold text-gray-800'>
                        Hotels in {searchData?.location.name}
                      </h1>
                    </div>
                  )}

                  {hotelPage === 'hotel-details' && (
                    <div className='lg:flex items-center gap-2 hidden'>
                      <Building2 size={20} className='text-blue-600' />
                      <h1 className='text-xs lg:text-xl font-bold text-blue-800'>Hotel Details</h1>
                    </div>
                  )}

                  {hotelPage === 'hotel-booking' && (
                    <div className='lg:flex items-center gap-2 hidden'>
                      <CreditCard size={20} className='text-emerald-600' />
                      <h1 className='text-xs lg:text-xl font-bold text-emerald-800'>
                        Complete Your Booking
                      </h1>
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Location Info */}
              <div
                className={cn(
                  'flex items-center mt-2 transition-all duration-300',
                  hotelPage === 'hotel-details' && 'text-blue-700',
                  hotelPage === 'hotel-booking' && 'text-emerald-700',
                  hotelPage === 'hotel-list' && 'text-muted-foreground',
                )}
              >
                <MapPin size={16} className='mr-2' />
                <span className='font-medium text-xs lg:text-base '>
                  {searchData?.location.name} {searchData?.location.country_name}
                </span>

                {/* Enhanced Star Rating */}
                {searchData?.location.star_category ? (
                  <div
                    className={cn(
                      'ml-3 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-all duration-300',
                      hotelPage === 'hotel-details' && 'bg-blue-100 text-blue-800',
                      hotelPage === 'hotel-booking' && 'bg-emerald-100 text-emerald-800',
                      hotelPage === 'hotel-list' && 'bg-amber-100 text-amber-800',
                    )}
                  >
                    <Star size={12} className='fill-current' />
                    {searchData?.location.star_category}
                  </div>
                ) : (
                  ''
                )}

                {/* Page Status Indicator */}
                {hotelPage === 'hotel-booking' && (
                  <div className='ml-3 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold animate-pulse hidden lg:block'>
                    🔒 Secure Booking
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Right Section */}
          <div
            className='flex flex-row items-center space-y-0 space-x-4 text-sm'
            onClick={() => dispatch(setExpanded(!isExpanded))}
          >
            {/* Date Display */}
            <motion.div
              className={cn(
                'hidden md:flex items-center px-4 py-2 rounded-lg shadow-sm transition-all duration-300 cursor-pointer hover:scale-105',
                hotelPage === 'hotel-details' && 'bg-blue-100 text-blue-800 hover:bg-blue-200',
                hotelPage === 'hotel-booking' &&
                  'bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
                hotelPage === 'hotel-list' && 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar size={16} className='mr-2' />
              <span className='font-medium'>
                {formatDate(searchData?.date.from)} - {formatDate(searchData?.date.to)}
              </span>
            </motion.div>

            {/* Guests Display */}
            <motion.div
              className={cn(
                'hidden md:flex items-center px-4 py-2 rounded-lg shadow-sm transition-all duration-300 cursor-pointer hover:scale-105',
                hotelPage === 'hotel-details' && 'bg-blue-100 text-blue-800 hover:bg-blue-200',
                hotelPage === 'hotel-booking' &&
                  'bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
                hotelPage === 'hotel-list' && 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Users size={16} className='mr-2' />
              <span className='font-medium'>
                {totalGuests} Guest{totalGuests > 1 ? 's' : ''} • {searchData?.rooms.length} Room
                {searchData?.rooms.length > 1 ? 's' : ''}
              </span>
            </motion.div>

            {/* Enhanced Modify Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Button
                onClick={() => dispatch(setExpanded(!isExpanded))}
                aria-expanded={isExpanded}
                className={cn(
                  'shadow-md font-medium bg-secondary transition-colors duration-300',
                  hotelPage === 'hotel-details' &&
                    (isExpanded
                      ? 'bg-orange-600 hover:bg-orange-700'
                      : 'bg-blue-500 hover:bg-blue-600'),
                  hotelPage === 'hotel-booking' &&
                    (isExpanded
                      ? 'bg-orange-600 hover:bg-orange-700'
                      : 'bg-emerald-500 hover:bg-emerald-600'),
                  hotelPage === 'hotel-list' && isExpanded && 'bg-orange-600 hover:bg-orange-700',
                )}
              >
                <div className='flex items-center'>
                  {isExpanded ? (
                    <>
                      <motion.span
                        key='hide'
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        transition={{ duration: 0.2 }}
                      >
                        Hide Search
                      </motion.span>
                      <ChevronUp size={16} className='ml-2' />
                    </>
                  ) : (
                    <>
                      <Settings size={16} className='mr-2' />
                      <motion.span
                        key='modify'
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.2 }}
                        className='text-xs lg:text-base'
                      >
                        <span>
                          Modify <span className='hidden lg:inline'>Search</span>
                        </span>
                      </motion.span>
                      <ChevronDown size={16} className='ml-2' />
                    </>
                  )}
                </div>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Animated Search Box */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{
                duration: 0.4,
                ease: 'easeInOut',
                staggerChildren: 0.1,
              }}
              className='overflow-hidden'
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <HotelSearchBox />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HotelSearchModify;
