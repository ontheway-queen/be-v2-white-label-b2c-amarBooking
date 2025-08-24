'use client';

import FlightSearchBox from '@/components/flight/flight-search-box';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { decodeFlightSearchParams } from '@/lib/flight/flight-formatter-helper';
import { formatCustomDate } from '@/lib/helper';
import { setFlightSearch } from '@/lib/redux/slice/flight/flight-search-form-slice';
import { toggleExpanded } from '@/lib/redux/slice/ModifySearchState';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { cn } from '@/lib/utils';
import { IFlightSearchQueryParams } from '@/type/flight/flight.interface';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, ChevronUp, Loader, Plane, Search, Users, X } from 'lucide-react';
import { useEffect } from 'react';

type Props = { params: IFlightSearchQueryParams };

const FlightSearchModify = ({ params }: Props) => {
  const dispatch = useAppDispatch();

  const { isExpanded } = useAppSelector((state) => state.searchExpand);
  const { isResponseEnd } = useAppSelector((state) => state.flightSearchStatus);

  const decodeData = decodeFlightSearchParams(params);

  useEffect(() => {
    if (decodeData) {
      dispatch(setFlightSearch(decodeData));
    }
  }, [decodeData]);

  const totalTravelers =
    Number.parseInt(params?.adults || '0') +
    Number.parseInt(params?.child || '0') +
    Number.parseInt(params?.infant || '0') +
    Number.parseInt(params?.kids || '0');

  const isMultiCity = params?.tripType === 'Multi-city';

  return (
    <div className={cn('transition-all duration-500 shadow-md bg-[#fafbfc] backdrop-brightness-0')}>
      <div className='w-full pt-2 bg-transparent relative container mx-auto px-4 md:px-0'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: !isExpanded ? 1 : 0 }}
          transition={{ duration: 1 }}
          hidden={isExpanded}
          className='flex flex-row justify-between items-center md:items-center'
        >
          <div className='space-y-1 w-full md:w-auto '>
            {isMultiCity ? (
              <div className='space-y-1'>
                <div className='flex items-center gap-2'>
                  <Badge variant='outline' className='bg-primary/10 text-primary border-primary/20'>
                    {params?.tripType}
                  </Badge>
                  <span className='text-sm text-muted-foreground'>
                    ({params?.class.charAt(0).toUpperCase() + params?.class.slice(1)})
                  </span>
                </div>

                <div className='space-y-1'>
                  {(params?.from as string[])?.map((from, index) => (
                    <div key={index} className='flex items-center gap-2'>
                      <div className='flex items-center gap-1.5'>
                        <Plane className='h-4 w-4 text-primary rotate-45' />
                        <span className='font-semibold'>{from}</span>
                      </div>
                      <span className='text-muted-foreground'>→</span>
                      <div className='flex items-center gap-1.5'>
                        <Plane className='h-4 w-4 text-primary -rotate-45' />
                        <span className='font-semibold'>{(params?.to as string[])[index]}</span>
                      </div>
                      <span className='text-sm text-muted-foreground ml-1'>
                        ({formatCustomDate((params?.departure as string[])[index])})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className='space-y-1'>
                <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-1.5'>
                    <Plane className='size-3 lg:size-4 text-primary rotate-45' />
                    <span className='font-semibold text-xs lg:text-lg'>{params?.from}</span>
                  </div>
                  <span className='text-muted-foreground'>→</span>
                  <div className='flex items-center gap-1.5'>
                    <Plane className='size-3 lg:size-4 text-primary -rotate-45' />
                    <span className='font-semibold text-xs lg:text-lg'>{params?.to}</span>
                  </div>
                  <span className='text-sm text-muted-foreground ml-1'>
                    ({params?.class.charAt(0).toUpperCase() + params?.class.slice(1)})
                  </span>
                </div>

                <div className='flex flex-wrap items-center text-sm text-muted-foreground gap-x-3'>
                  <div className='flex items-center gap-1'>
                    <span className='font-medium text-xs lg:text-base'>{params?.tripType}</span>
                  </div>
                  <span>|</span>
                  <div className='flex items-center gap-1'>
                    <Calendar className='h-3.5 w-3.5' />
                    <span className='text-xs lg:text-base'>
                      {formatCustomDate(params?.departure as string)}
                      {params?.tripType.toLowerCase() === 'round-trip' && params?.return
                        ? ` - ${formatCustomDate(params?.return)}`
                        : ''}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className='flex items-center text-sm text-muted-foreground gap-x-3 text-xs lg:text-base'>
              <div className='flex items-center gap-1'>
                <Users className='h-3.5 w-3.5' />
                <span>
                  {totalTravelers} {totalTravelers === 1 ? 'Traveler' : 'Travelers'}
                </span>
              </div>
            </div>
          </div>

          <Button
            disabled={!isResponseEnd}
            variant='destructive'
            className='rounded-full bg-secondary text-xs lg:text-base'
            onClick={() => dispatch(toggleExpanded())}
          >
            {!isResponseEnd ? <Loader className='animate-spin' /> : <Search className='size-3.5' />}

            <span>
              Modify <span className='hidden lg:inline'>Search</span>
            </span>
            {isExpanded ? (
              <ChevronUp className='size-3.5 ml-1' />
            ) : (
              <ChevronDown className='size-3.5 ml-1' />
            )}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, maxHeight: 0 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
            maxHeight: isExpanded ? 500 : 0,
          }}
          transition={{ duration: 0.5 }}
          style={{ overflow: 'hidden' }}
          className='pb-2'
        >
          <div>
            <FlightSearchBox />

            <Button
              onClick={() => dispatch(toggleExpanded())}
              className='absolute bg-secondary z-50 -bottom-6 right-0 border rounded-full size-9 p-1 text-white hover:bg-red-300'
            >
              <X />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FlightSearchModify;
