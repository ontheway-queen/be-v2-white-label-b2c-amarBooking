import { IPopularDestination } from '@/type/site.config.interface';
import { getImageLink } from '../helper';
import { IAirportSchema } from '@/type/flight/flight.interface';

export const getFormattedPopularFlight = (
  data: IPopularDestination[] | undefined,
): PopularFlightsResponse => {
  const formattedData = data?.map((dest) => ({
    city: dest.to_airport_city || undefined,
    country: dest.to_airport_country ? dest.to_airport_country : undefined,
    image: dest.thumbnail ? `${getImageLink(dest.thumbnail)}` : undefined,
    to: {
      name: dest.to_airport_name,
      iata_code: dest.to_airport_code,
      id: dest.to_airport || undefined,
      country_id: undefined, // not in source data
      country:
        dest.to_airport_country?.toLowerCase()?.replace(/\b\w/g, (char) => char.toUpperCase()) ||
        undefined,
      city_id: undefined, // not in source data
      city_name: dest.to_airport_city || undefined,
    },
    from: {
      name: dest.from_airport_name,
      iata_code: dest.from_airport_code,
      id: dest.from_airport || undefined,
      country_id: undefined, // not in source data
      country:
        dest.from_airport_country?.toLowerCase()?.replace(/\b\w/g, (char) => char.toUpperCase()) ||
        undefined,
      city_id: undefined, // not in source data
      city_name: dest.from_airport_city || undefined,
    },
  }));

  return formattedData;
};

export interface IAirportInfo {
  name: string;
  iata_code: string;
  id?: number;
  country_id?: number;
  country?: string;
  city_id?: number;
  city_name?: string;
}

export interface IGetFormattedPopularFlight {
  city?: string;
  country?: string;
  image?: string;
  to: IAirportSchema;
  from: IAirportSchema;
}

type PopularFlightsResponse = IGetFormattedPopularFlight[] | undefined;
