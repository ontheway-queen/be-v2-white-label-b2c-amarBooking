import AccordionSection from '@/components/accordion-section';
import { useSmoothScrollToTop } from '@/hooks/useSmoothScrollToTop';
import { capitalizeFirstLetter } from '@/lib/helper';
import { setFlightFilters } from '@/lib/redux/slice/flight/extract-flight-filter-slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { Moon, Sun, Sunrise, Sunset } from 'lucide-react';
import { memo, useState } from 'react';

const type = ['departure', 'arrival'];

const iconComponents = [
  (isSelected: boolean) => (
    <Sunrise
      className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-gray-500'}`}
      strokeWidth={1.5}
    />
  ),
  (isSelected: boolean) => (
    <Sun className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-gray-500'}`} strokeWidth={1.5} />
  ),
  (isSelected: boolean) => (
    <Sunset
      className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-gray-500'}`}
      strokeWidth={1.5}
    />
  ),
  (isSelected: boolean) => (
    <Moon
      className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-gray-500'}`}
      strokeWidth={1.5}
    />
  ),
];

const FlightSchedules = memo(() => {
  const dispatch = useAppDispatch();
  const scrollToTop = useSmoothScrollToTop();

  const data = useAppSelector(
    ({ extractFightFilter }) => extractFightFilter.defaultOption?.time_frame
  );
  const timeFrames = useAppSelector((st) => st.extractFightFilter.selectOption?.timeFrame) ?? [];

  const [select, setSelect] = useState<'departure' | 'arrival'>('departure');

  const selectedData = select === 'departure' ? data?.departure : data?.arrival;

  const handleTimeClick = (code: string, time: string, arr_index: number) => {
    const newData = { type: select, code, time, arr_index };

    const filteredTimeFrames = timeFrames.filter(
      (frame) => !(frame.type === newData.type && frame.arr_index === newData.arr_index)
    );

    const exists = timeFrames.some(
      (frame) =>
        frame.type === newData.type &&
        frame.code === newData.code &&
        frame.time === newData.time &&
        frame.arr_index === newData.arr_index
    );

    const updatedTimeFrames = exists ? filteredTimeFrames : [...filteredTimeFrames, newData];

    dispatch(
      setFlightFilters({ timeFrame: updatedTimeFrames.length ? updatedTimeFrames : undefined })
    );
    scrollToTop();
  };

  return (
    <AccordionSection value='flight_schedules' label='Flight Schedules'>
      {/* Departure / Arrival toggle */}
      <div className='flex gap-2 items-center justify-center text-sm border rounded cursor-pointer bg-background mb-2'>
        {type.map((item) => (
          <div
            key={item}
            onClick={() => setSelect(item as 'departure' | 'arrival')}
            className={`flex-1 text-center rounded py-1 font-semibold ${
              item === select ? 'bg-primary text-background' : ''
            }`}
          >
            <h2>{capitalizeFirstLetter(item)}</h2>
          </div>
        ))}
      </div>

      {/* Flight time slots */}
      <div className='space-y-2'>
        {selectedData?.map(({ code, times }, arr_index) => (
          <div key={arr_index} className='text-center'>
            <h3 className='text-xs mb-2'>
              {capitalizeFirstLetter(select)} {select === 'arrival' ? 'to' : 'from'} {code}
            </h3>
            <div className='border border-gray-100 grid grid-cols-4 gap-0.5 items-center p-0.5 rounded-lg'>
              {times?.split(' ; ').map((time, timeIdx, arr) => {
                const isSelected = timeFrames?.some(
                  (frame) =>
                    frame.type === select &&
                    frame.code === code &&
                    frame.time === time &&
                    frame.arr_index === arr_index
                );

                return (
                  <div
                    key={timeIdx}
                    onClick={() => handleTimeClick(code, time, arr_index)}
                    className={`flex flex-col items-center cursor-pointer text-xs py-2
                      ${
                        timeIdx === 0
                          ? 'rounded-l-lg'
                          : timeIdx === arr.length - 1
                          ? 'rounded-r-lg'
                          : ''
                      }
                      ${isSelected ? 'bg-primary-200 text-primary' : 'bg-primary-50 text-gray-700'}
                    `}
                  >
                    {iconComponents[timeIdx](isSelected)}
                    <p className='text-xs'>{time}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </AccordionSection>
  );
});

FlightSchedules.displayName = 'FlightSchedules';
export default FlightSchedules;
