'use client';

import { encodeFlightSearchParams } from '@/lib/flight/flight-formatter-helper';
import { FlightFormSchema } from '@/lib/flight/flight-zod-schema';
import { setDefaultFlightFilters } from '@/lib/redux/slice/flight/extract-flight-filter-slice';
import { setFlightSearch } from '@/lib/redux/slice/flight/flight-search-form-slice';
import { setExpanded } from '@/lib/redux/slice/ModifySearchState';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { cn } from '@/lib/utils';
import { IFlightSearchSchema } from '@/type/flight/flight.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { SelectClass, SelectTripType } from './FlightCommonComponents';
import SelectFlightPassenger from './select-flight-passenger';
import MultiWayFlight from './way/MultiWayFlight';
import OneWayFlight from './way/OneWayFlight';
import RoundWayFlight from './way/RoundWayFlight';

const FlightSearchBox = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();

  const flightSessionData = useAppSelector((state) => state.flightForm);

  const methods = useForm<IFlightSearchSchema>({
    resolver: zodResolver(FlightFormSchema),
    defaultValues: flightSessionData,
    mode: 'onSubmit',
  });

  const onSubmit = (data: IFlightSearchSchema) => {
    const { tripType, from, to, multiCityTrips } = data;

    // return;

    let hasError = false;
    const errorMsg = 'From and To airport cannot be the same.';

    if (tripType === 'One-way' || tripType === 'Round-trip') {
      if (from.iata_code === to.iata_code) {
        methods.setError('from', { message: errorMsg });
        methods.setError('to', { message: errorMsg });
        hasError = true;
      }
    } else if (tripType === 'Multi-city') {
      multiCityTrips?.forEach((trip, index) => {
        if (trip?.from?.iata_code === trip?.to?.iata_code) {
          methods.setError(`multiCityTrips.${index}.from`, { message: errorMsg });
          methods.setError(`multiCityTrips.${index}.to`, { message: errorMsg });
          hasError = true;
        }
      });
    }

    if (hasError) return;

    // console.log(encodeFlightSearchParams(data));

    dispatch(setFlightSearch(data));
    dispatch(setDefaultFlightFilters());

    startTransition(() => {
      router.push(`/flights/search?${encodeFlightSearchParams(data)}`);
    });
    dispatch(setExpanded(false));
  };

  const currentTripType = methods.watch('tripType');
  const isMultiCity = currentTripType === 'Multi-city';

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'multiCityTrips',
  });

  const addNewTrip = () => {
    append({ from: undefined, to: undefined, departure: undefined });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='space-y-4'>
          <SelectTripType name='tripType' />

          <div>
            {currentTripType === 'One-way' && <OneWayFlight />}

            {currentTripType === 'Round-trip' && <RoundWayFlight />}

            {currentTripType === 'Multi-city' && <MultiWayFlight remove={remove} fields={fields} />}
          </div>

          <div
            className={cn(
              'flex flex-wrap items-center gap-4 justify-between pt-1',
              isMultiCity ? 'justify-between' : 'justify-end',
            )}
          >
            {isMultiCity && (
              <Button disabled={fields.length >= 5} type='button' onClick={() => addNewTrip()}>
                <Plus /> ADD MORE FLIGHT
              </Button>
            )}
            <div className='flex flex-wrap items-center gap-3'>
              <div className='flex gap-3 justify-between md:justify-end '>
                <SelectFlightPassenger />

                <SelectClass />
              </div>

              <Button
                loading={isPending}
                type='submit'
                className='h-9 px-8 bg-primary hover:bg-green-600 w-full md:w-fit'
              >
                Search Flight
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default FlightSearchBox;
