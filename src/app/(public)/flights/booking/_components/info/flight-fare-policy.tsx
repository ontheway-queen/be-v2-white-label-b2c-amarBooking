import { useGetFlightRulesQuery } from '@/lib/APIs/common-api';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

type Props = {
  flight_id?: string;
  search_id?: string;
};

export const FlightFarePolicy = ({ flight_id, search_id }: Props) => {
  const { data, isLoading, isFetching } = useGetFlightRulesQuery(
    { flight_id, search_id },
    { skip: !flight_id && !search_id }
  );

  const res = data?.data;

  return (
    <div>
      <div className='p-4 space-y-3'>
        {isLoading || isFetching ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton width={'70%'} />
          </>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: res || '' }} className='text-sm prose' />
        )}
      </div>
    </div>
  );
};
