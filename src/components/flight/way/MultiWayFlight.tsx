import DateSelect from '@/components/flight/flight-date-select';
import { Button } from '@/components/ui/button';
import { fadeInUp } from '@/lib/CONSTANT';
import { IFlightSearchSchema, IFlightMultiCitySchema } from '@/type/flight/flight.interface';
import { subDays } from 'date-fns';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { UseFieldArrayRemove, useFormContext } from 'react-hook-form';
import { AirportSelect } from '../AirportSelect';

type Props = {
  remove: UseFieldArrayRemove;
  fields: IFlightMultiCitySchema[];
};

const MultiWayFlight = ({ remove, fields }: Props) => {
  const { watch, setValue } = useFormContext<IFlightSearchSchema>();
  const totalLength = fields.length;

  return (
    <motion.div
      key='multitrip'
      //  {...fadeInUp}
    >
      <div className='space-y-5'>
        {fields.map((item, index) => {
          const prevDepartureDate =
            index > 0 ? watch(`multiCityTrips.${index - 1}.departure`) : null;

          return (
            <div key={item.id} className='grid grid-cols-1 md:grid-cols-12 gap-4'>
              <div className='md:col-span-4'>
                <AirportSelect
                  label={`From - ${index + 1}`}
                  name={`multiCityTrips.${index}.from`}
                />
              </div>
              <div className='md:col-span-4'>
                <AirportSelect label={`To - ${index + 1}`} name={`multiCityTrips.${index}.to`} />
              </div>
              <div className='md:col-span-3'>
                <DateSelect
                  label={`Departure date - ${index + 1}`}
                  name={`multiCityTrips.${index}.departure`}
                  onSelect={(date) => {
                    for (let i = index + 1; i < fields.length; i++) {
                      setValue(`multiCityTrips.${i}.departure`, undefined);
                    }
                  }}
                  disabled={(date) => {
                    const today = subDays(new Date(), 1);
                    if (prevDepartureDate) {
                      return date <= today || date < new Date(prevDepartureDate);
                    }
                    return date <= today;
                  }}
                />
              </div>
              <div className='md:col-span-1 flex items-end'>
                <Button
                  disabled={totalLength <= 2}
                  type='button'
                  size='icon'
                  onClick={() => remove(index)}
                  className='md:w-full md:h-full opacity-90 bg-red-500/90 hover:bg-red-800'
                >
                  <Trash2 className='w-4 h-4' />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MultiWayFlight;
