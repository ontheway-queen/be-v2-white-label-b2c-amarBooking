import { IFlightSearchQueryParams } from '@/type/flight/flight.interface';
import { formatDateTime } from '../helper';
import { getCabinPref, getPassengerTypes } from './flight-formatter-helper';

export const OneWayFormatter = (query: IFlightSearchQueryParams) => ({
  JourneyType: '1',
  OriginDestinationInformation: [
    {
      RPH: '1',
      DepartureDateTime: formatDateTime(query.departure as string),
      OriginLocation: { LocationCode: query.from },
      DestinationLocation: { LocationCode: query.to },
      TPA_Extensions: { CabinPref: getCabinPref(query.class) },
    },
  ],
  PassengerTypeQuantity: getPassengerTypes(query),
});

export const RoundWayFormatter = (query: IFlightSearchQueryParams) => ({
  JourneyType: '2',
  OriginDestinationInformation: [
    {
      RPH: '1',
      DepartureDateTime: formatDateTime(query.departure as string),
      OriginLocation: { LocationCode: query.from },
      DestinationLocation: { LocationCode: query.to },
      TPA_Extensions: { CabinPref: getCabinPref(query.class) },
    },
    {
      RPH: '2',
      DepartureDateTime: formatDateTime(query.return as string),
      OriginLocation: { LocationCode: query.to },
      DestinationLocation: { LocationCode: query.from },
      TPA_Extensions: { CabinPref: getCabinPref(query.class) },
    },
  ],
  PassengerTypeQuantity: getPassengerTypes(query),
});

export const MultiWayFormatter = (query: IFlightSearchQueryParams) => {
  const fromList = Array.isArray(query.from) ? query.from : query.from.split(',');
  const toList = Array.isArray(query.to) ? query.to : query.to.split(',');
  const dateList = Array.isArray(query.departure) ? query.departure : query.departure.split(',');

  const legs = fromList.map((from, i) => ({
    RPH: String(i + 1),
    DepartureDateTime: formatDateTime(dateList[i]),
    OriginLocation: { LocationCode: from },
    DestinationLocation: { LocationCode: toList[i] },
    TPA_Extensions: { CabinPref: getCabinPref(query.class) },
  }));

  return {
    JourneyType: '3',
    OriginDestinationInformation: legs,
    PassengerTypeQuantity: getPassengerTypes(query),
  };
};
