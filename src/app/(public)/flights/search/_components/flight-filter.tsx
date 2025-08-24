import { Accordion } from '@/components/ui/accordion';
import { useAppSelector } from '@/lib/redux/store';
import Aircraft from './filter/aircraft-filter';
import AirlineFilter from './filter/airline-filter';
import FlightPriceRange from './filter/flight-price-range';
import FlightSchedules from './filter/flight-schedules';
import LayoverCity from './filter/layover-city';
import LayoverRange from './filter/layover-range';
import Refutability from './filter/refutability-filter';
import Stoppage from './filter/stoppage-filter';
import AirlineTimeCounter from '../../../../../components/flight/airline-time-counter';

export function FilterFlightSection() {
  const { isResponseEnd } = useAppSelector((state) => state.flightSearchStatus);

  return (
    <Accordion
      className='space-y-3'
      type='multiple'
      defaultValue={
        [
          // 'price',
          'airlines',
          // 'aircraft',
          // 'duration',
          // 'layover_duration',
          // 'times',
          // 'layover_city',
          'flight_schedules',
          'refund',
          // 'stoppage',
        ].filter(Boolean) as string[]
      }
      disabled={!isResponseEnd}
    >
      <AirlineTimeCounter />
      <FlightPriceRange />
      <AirlineFilter />
      <FlightSchedules />
      <Aircraft />
      <LayoverRange />
      <LayoverCity />
      <Stoppage />
      <Refutability />
    </Accordion>
  );
}
