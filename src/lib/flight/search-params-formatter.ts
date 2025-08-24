import { IFlightSearchQueryParams } from '@/type/flight/flight.interface';
import { MultiWayFormatter, OneWayFormatter, RoundWayFormatter } from './trip-formatter';

export const sseSearchParamsFormatter = (searchParams: IFlightSearchQueryParams) => {
  let formatterResult;

  switch (searchParams.tripType) {
    case 'One-way':
      formatterResult = OneWayFormatter(searchParams);
      break;
    case 'Round-trip':
      formatterResult = RoundWayFormatter(searchParams);
      break;
    case 'Multi-city':
      formatterResult = MultiWayFormatter(searchParams);
      break;
    default:
      throw new Error('Invalid route type');
  }

  return `JourneyType=${formatterResult.JourneyType}&PassengerTypeQuantity=${JSON.stringify(
    formatterResult.PassengerTypeQuantity
  )}&OriginDestinationInformation=${JSON.stringify(formatterResult.OriginDestinationInformation)}`;
};
