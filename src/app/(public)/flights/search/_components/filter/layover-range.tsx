import AccordionSection from '@/components/accordion-section';
import Loading from '@/components/loading';
import { Slider } from '@/components/ui/slider';
import { useSmoothScrollToTop } from '@/hooks/useSmoothScrollToTop';
import { setFlightFilters } from '@/lib/redux/slice/flight/extract-flight-filter-slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { useSearchParams } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

const LayoverRange = memo(() => {
  const dispatch = useAppDispatch();
  const scrollToTop = useSmoothScrollToTop();

  const { isResponseEnd } = useAppSelector((state) => state.flightSearchStatus);

  const layoverRange = useAppSelector(
    ({ extractFightFilter }) => extractFightFilter.defaultOption?.layover_range
  );

  const [range, setRange] = useState([0, 10]);
  const [type, setType] = useState<string[]>();
  const [select, setSelect] = useState<any>();

  const searchParams = useSearchParams();
  const route_type = searchParams.get('tripType') as 'One-way' | 'Round-trip';
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  useEffect(() => {
    if (route_type == 'One-way') {
      setType([`${from} - ${to}`]);
    } else if (route_type == 'Round-trip') {
      setType([`${from} - ${to}`, `${to} - ${from}`]);
    }
    setSelect(`${from} - ${to}`);
  }, [searchParams]);

  useEffect(() => {
    if (layoverRange) {
      setRange(layoverRange);
    }
  }, [layoverRange]);

  const [value] = useDebounce(range, 500);

  const handleChange = (val: number[]) => {
    setRange([val[0], val[1]]);
  };

  useEffect(() => {
    const index_no = type?.indexOf(select) || 0;
    dispatch(
      setFlightFilters({
        min_layover: { index: index_no, value: value[0] },
        max_layover: { index: index_no, value: value[1] },
      })
    );
    scrollToTop();
  }, [value]);

  if (layoverRange?.[0] === layoverRange?.[1]) return null;

  if (layoverRange && range[0] != undefined)
    return (
      <AccordionSection value='layover_duration' label='Layover Duration'>
        {(type?.length || 0) > 1 ? (
          <div
            className={`flex gap-2 items-center justify-center text-sm border rounded cursor-pointer bg-background mb-2`}
          >
            {type?.map((item: any, index: number) => (
              <div
                onClick={() => {
                  setSelect(item);
                  dispatch(
                    setFlightFilters({
                      min_layover: undefined,
                      max_layover: undefined,
                    })
                  );
                }}
                key={index}
                className={`flex-1 text-center rounded py-1 font-semibold
            ${item === select ? 'bg-primary text-background' : ''}
            `}
              >
                <h2>{item}</h2>
              </div>
            ))}
          </div>
        ) : (
          ''
        )}
        <h3 className='text-xs mb-2 pb-2'>Filter Layover Duration for {select}</h3>
        {!isResponseEnd ? (
          <Loading />
        ) : (
          <>
            <Slider
              defaultValue={range}
              min={layoverRange[0]}
              max={layoverRange[1]}
              step={1}
              onValueChange={handleChange}
            />
            <div className='flex justify-between'>
              <span className='text-sm'>BDT {formatTime(range[0])}</span>
              <span className='text-sm'>BDT {formatTime(range[1])}</span>
            </div>
          </>
        )}
      </AccordionSection>
    );
});

LayoverRange.displayName = 'LayoverRange';
export default LayoverRange;

function formatTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}
