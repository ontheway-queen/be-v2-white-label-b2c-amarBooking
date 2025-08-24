import DateSelect from '@/components/flight/flight-date-select';
import { IFlightSearchSchema } from '@/type/flight/flight.interface';
import { addDays, subDays } from 'date-fns';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { AirportSelect } from '../AirportSelect';
import { EmptyDateSelect, SwapRoute } from '../FlightCommonComponents';

const OneWayFlight = () => {
  const { setValue } = useFormContext<IFlightSearchSchema>();

  return (
    <motion.div
      key='oneway'
      // {...fadeInUp}
      className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'
    >
      <div className='md:col-span-2 grid md:grid-cols-2 gap-4 relative'>
        <AirportSelect label='From' name='from' />
        <AirportSelect label='To' name='to' />
        <SwapRoute />
      </div>
      <DateSelect
        label='Departure date'
        name='departure'
        disabled={(date) => date < subDays(new Date(), 1)}
        onSelect={(e) => {
          if (e) setValue('return', addDays(e, 3));
        }}
      />
      <EmptyDateSelect onClick={() => setValue('tripType', 'Round-trip')} />
    </motion.div>
  );
};

export default OneWayFlight;
