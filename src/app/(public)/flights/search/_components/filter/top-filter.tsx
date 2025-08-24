import { setFlightFilters } from '@/lib/redux/slice/flight/extract-flight-filter-slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { motion } from 'framer-motion';
import { memo, useState } from 'react';
import CheapAirlineFilter from './cheap-airline-filter';
import NextPrevFilter from './next-prev-filter';

type Props = {
  total: number | undefined;
};

const tabs = ['CHEAPEST', 'SHORTEST', 'EARLIEST'];

const TopFilter = memo(({ total }: Props) => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState('CHEAPEST');
  const selected = useAppSelector((state) => state.extractFightFilter.selectOption.type);
  const { isLoading, isResponseEnd, error } = useAppSelector((state) => state.flightSearchStatus);

  const changeTab = (value: 'CHEAPEST' | 'SHORTEST' | 'EARLIEST') => {
    if (selected === value) {
      return dispatch(setFlightFilters({ type: undefined }));
    }
    dispatch(setFlightFilters({ type: value }));
    setActiveTab(value);
  };

  return (
    <>
      <NextPrevFilter total={total} />
      <CheapAirlineFilter />
      <div className='w-full  mx-auto pb-2'>
        <div className='flex relative bg-background rounded-lg p-1'>
          {tabs.map((tab: any, index) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => changeTab(tab)}
                className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  isActive ? 'text-white' : 'text-gray-600'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId='tab-indicator'
                    className='absolute inset-0 bg-primary rounded-md z-[-1]'
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                {tab.charAt(0).toUpperCase() + tab.toLowerCase().slice(1)}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
});

TopFilter.displayName = 'TopFilter';

export default TopFilter;
