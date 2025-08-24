import DateSelect from '@/components/flight/flight-date-select';
import { IFlightSearchSchema } from '@/type/flight/flight.interface';
import { addDays, isBefore, subDays } from 'date-fns';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { AirportSelect } from '../AirportSelect';
import { SwapRoute } from '../FlightCommonComponents';

const RoundWayFlight = () => {
  const { setValue, watch } = useFormContext<IFlightSearchSchema>();
  const departureDate = watch('departure');
  const returnDate = watch('return');

  return (
    <motion.div
      key='roundtrip'
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
          if (departureDate && e) {
            const departures = new Date(e);
            const returns = returnDate ? new Date(returnDate) : new Date();

            if (isBefore(returns, departures)) {
              setValue('return', addDays(departures, 3));
            }
          }
        }}
      />
      <DateSelect
        label='Return date'
        name='return'
        disabled={(date) =>
          date < (departureDate ? new Date(departureDate) : subDays(new Date(), 1))
        }
        selectedMonth={new Date(departureDate)}
      />
    </motion.div>
  );
};

export default RoundWayFlight;
