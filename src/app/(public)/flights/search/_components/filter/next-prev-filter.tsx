import PrevNextDate from '@/components/flight/PrevNextDate';
import { useAppSelector } from '@/lib/redux/store';
import { Loader } from 'lucide-react';
import React from 'react';

type Props = { total?: number };

const NextPrevFilter = ({ total }: Props) => {
  const { isLoading, isResponseEnd } = useAppSelector((state) => state.flightSearchStatus);

  return (
    <div className='items-center justify-between hidden px-3 py-2 w-full rounded-md mb-2 lg:flex bg-background'>
      <h3 className='font-semibold '>
        {isLoading ? (
          <div className='flex items-center justify-center gap-3 '>
            <span>
              <Loader className='size-3 animate-spin' strokeWidth={1.2} />
            </span>
            Available Flights
          </div>
        ) : (
          <div
            className='flex items-center justify-center gap-1'
            style={{
              color: 'rgb(26, 43, 61)',
            }}
          >
            <span>{total}</span>
            Available Flights
            {/* <ResetButton /> */}
          </div>
        )}
      </h3>
      {isResponseEnd ? (
        <div className='flex items-center justify-center gap-5'>
          <PrevNextDate />
        </div>
      ) : (
        <Loader className='size-3 animate-spin' strokeWidth={1.2} />
      )}
    </div>
  );
};

export default NextPrevFilter;
