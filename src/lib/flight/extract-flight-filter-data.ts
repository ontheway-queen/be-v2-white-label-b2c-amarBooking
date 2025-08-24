import { IFlightList, ISearchInfo } from '@/type/flight/flight.search.interface';

export interface IExtractFlightFilter {
  flightResult: IFlightList[] | undefined;
  searchInfo: ISearchInfo | null | undefined;
}

export const extractFlightFilterData = ({
  flightResult,
  searchInfo,
}: IExtractFlightFilter): IExtractFlightReturnType => {
  if (!flightResult) return null;
  const startTime = performance.now();

  const airline_map = new Map<string, { name?: string; logo?: string }>();
  const aircraft_set = new Set<string>();
  let layover: string[] = [];
  const layover_city = new Map();
  const airlines_lowest_price: Record<string, AirlineLowestPrice> = {};

  let minPrice = Infinity;
  let maxPrice = -Infinity;

  let minLayover = Infinity;
  let maxLayover = -Infinity;

  let stoppage = 0;

  const TIME_RANGES = '00-06 ; 06-12 ; 12-18 ; 18-00';
  const time_frame: TimeFrame = { departure: [], arrival: [] };

  searchInfo?.leg_description?.forEach(({ departureLocation, arrivalLocation }) => {
    time_frame.departure.push({
      code: departureLocation,
      times: TIME_RANGES,
    });
    time_frame.arrival.push({ code: arrivalLocation, times: TIME_RANGES });
  });

  flightResult?.forEach((flightData) => {
    const { carrier_name = 'N/A', carrier_logo, fare, flights, carrier_code = 'N/A' } = flightData;
    const payable = Number(fare?.payable) || 0;

    // Collect minium and maximum price
    minPrice = Math.min(minPrice, payable);
    maxPrice = Math.max(maxPrice, payable);

    // Collect lowest price object
    if (!airline_map.has(carrier_name)) {
      airline_map.set(carrier_name, { name: carrier_name, logo: carrier_logo });
    }
    if (
      !airlines_lowest_price[carrier_code] ||
      airlines_lowest_price[carrier_code].price > payable
    ) {
      airlines_lowest_price[carrier_code] = {
        airline_code: carrier_code,
        airline_logo: carrier_logo,
        airline_name: carrier_name,
        price: payable,
      };
    }

    // Collect layover cites
    flights?.forEach((flight) => {
      flight?.layover_time?.forEach((layover) => {
        if (layover > maxLayover) maxLayover = layover;
        if (layover < minLayover) minLayover = layover;
      });

      stoppage = Math.max(stoppage, flight.stoppage ?? 0);

      if (flight?.layover_time && flight?.layover_time.length > 1) {
        flight?.options?.forEach(({ departure, arrival }) => {
          if ((flight?.stoppage ?? 0) > 0) {
            if (!layover_city.has(arrival?.airport_code)) {
              layover_city.set(arrival?.airport_code, {
                code: arrival?.airport_code,
                city: arrival?.city?.split(' - ')[0],
                airport: arrival?.airport,
              });
            }
            if (!layover_city.has(departure?.airport_code)) {
              layover_city.set(departure?.airport_code, {
                code: departure?.airport_code,
                city: departure?.city?.split(' - ')[0],
                airport: departure?.airport,
              });
            }
            searchInfo?.leg_description?.some((leg) => {
              layover_city.delete(leg.arrivalLocation);
              layover_city.delete(leg.departureLocation);
            });
          }
        });
      }

      // Collect layover time range static
      if (flight?.layover_time && flight?.layover_time?.length > 1) {
        layover = ['0h - 5h', '5h - 10h', '10h - 15h', '15h+'];
      }

      // Collect aircraft names
      flight?.options?.forEach(({ carrier }) => {
        if (carrier?.carrier_aircraft_name)
          if (!aircraft_set.has(carrier.carrier_aircraft_name))
            aircraft_set.add(carrier.carrier_aircraft_name);
      });

      // Collect maximum and minimum layover time
    });
  });

  const endTime = performance.now();
  const duration = endTime - startTime;

  return {
    airline: Array.from(airline_map?.values()),
    aircraft: Array.from(aircraft_set),
    layover_city: Array.from(layover_city?.values()),
    layover,
    price_range: [minPrice, maxPrice],
    airlines_lowest_price: Object.values(airlines_lowest_price),
    time_frame,
    layover_range: [minLayover, maxLayover],
    stoppage,
  };
};

export type IExtractFlightReturnType =
  | {
      airline: IFilterAirlinesType[];
      aircraft: string[];
      layover_city: { code: string; city: string; airport: string }[];
      layover: string[];
      price_range?: number[];
      airlines_lowest_price: AirlineLowestPrice[];
      time_frame?: TimeFrame;
      layover_range?: number[];
      stoppage?: number;
    }
  | null
  | undefined;

interface IFilterAirlinesType {
  name?: string;
  logo?: string;
}

interface AirlineLowestPrice {
  airline_code: string;
  airline_logo?: string;
  airline_name: string;
  price: number;
}

interface TimeFrame {
  departure: Arrival[];
  arrival: Arrival[];
}

interface Arrival {
  code: string;
  times: string;
}
