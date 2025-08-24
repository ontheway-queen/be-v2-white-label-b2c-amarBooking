'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFlightRevalidateMutation } from '../../_api/flight-endpoint';
import FlightBookingForm from './booking-form/flight-booking-from';
import FlightOtherInformation from './flight-other-information';
import FlightPriceChange from './flight-price-change';
import FlightPriceSidebar from './flight-price-sidebar';
import LoadingRetaliate from './flight-revalidate-loading';
import FlightRouteDetails from './flight-route-details';

type Props = {
  // res: IRevalidateData | undefined;
  search_id: string;
  flight_id: string;
};

const FlightBookingDetails = ({ search_id, flight_id }: Props) => {
  const [formVisible, setFormVisible] = useState(false);
  const router = useRouter();

  const [reValidate, { data, isLoading, error }] = useFlightRevalidateMutation();
  const err = error as any;
  const res = data?.data;

  useEffect(() => {
    reValidate({
      search_id: search_id,
      flight_id: flight_id,
    });
  }, [search_id, flight_id]);

  useEffect(() => {
    if (err?.status === 404) {
      router.replace('../', { scroll: true });
    }
  }, [error]);

  if (err) {
    return null;
  }

  if (isLoading) {
    return <LoadingRetaliate />;
  }
  return (
    <>
      <FlightPriceChange currentPrice={Number(res?.fare.payable ?? 0)} show={res?.price_changed} />
      <div className='flex flex-col md:flex-row justify-between py-4 gap-5'>
        <div className='flex-1 space-y-5'>
          {formVisible ? (
            <FlightBookingForm
              pax={res?.passengers}
              setFormVisible={setFormVisible}
              domestic={res?.domestic_flight}
            />
          ) : (
            <>
              <FlightRouteDetails res={res} />
              <FlightOtherInformation res={res} />
            </>
          )}
        </div>
        <div className='w-full md:w-[350px] md:sticky md:top-5 h-fit'>
          <FlightPriceSidebar
            fare={res?.fare}
            setFormVisible={setFormVisible}
            formVisible={formVisible}
          />
        </div>
      </div>
    </>
  );
};

export default FlightBookingDetails;
