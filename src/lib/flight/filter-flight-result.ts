import { IFlightList } from '@/type/flight/flight.search.interface';
import { IFlightSelectOption } from '../redux/slice/flight/extract-flight-filter-slice';

export const filterFlightResult = (
  flightList: IFlightList[] | undefined,
  filter: IFlightSelectOption,
) => {
  return flightList
    ?.filter(({ carrier_name = '', refundable, flights, fare }) => {
      const payable = Number(fare?.payable || 0);
      const { airline, refundable: filterRefundable, stoppage, price_range } = filter ?? {};
      const min_price = price_range?.[0];
      const max_price = price_range?.[1];

      // This is for stoppage filter
      const matchAirline = airline?.length ? airline.includes(carrier_name) : true;

      // This is for refund filter
      const matchRefund = filterRefundable !== undefined ? refundable === filterRefundable : true;

      // This is for stoppage filter
      const stoppageValues = stoppage ? stoppage.split(',').map(Number) : [];

      const matchStops =
        stoppageValues.length > 0 &&
        Array.isArray(flights) &&
        flights.every((single_flight) => stoppageValues.includes(single_flight.stoppage));

      // This is for price range filter
      const matchMinimumPrice = min_price ? payable >= Number(min_price) : true;
      const matchMaximumPrice = max_price ? payable <= Number(max_price) : true;

      type TimeRange = Record<string, { start: number; end: number }>;

      const TIME_RANGES: TimeRange = {
        '00-06': { start: 0, end: 6 },
        '06-12': { start: 6, end: 12 },
        '12-18': { start: 12, end: 18 },
        '18-00': { start: 18, end: 0 },
      };

      const parseHour = (timeString: string): number => parseInt(timeString.split(':')[0], 10);

      const isTimeInRange = (hour: number, range: { start: number; end: number }): boolean => {
        return range.start < range.end
          ? hour >= range.start && hour < range.end
          : hour >= range.start || hour < range.end;
      };

      const matchTimeFrame =
        (filter?.timeFrame?.length ?? 0) > 0
          ? filter?.timeFrame?.every(({ arr_index, type, time, code }) => {
              if (arr_index == null || !type || !time) return false;

              const selectedRange = TIME_RANGES[time];
              if (!selectedRange) return false;

              const flight = flights[arr_index];
              if (!flight) return false;

              return flight.options?.some(({ [type]: option }) => {
                if (!option) return false;
                return (
                  option.airport_code === code &&
                  isTimeInRange(parseHour(option.time), selectedRange)
                );
              });
            })
          : true;

      // This is for Layover City Filter
      const matchLayoverCity = filter.layover_city?.length
        ? flights?.some((flight) => {
            return flight?.options?.some(
              (option) =>
                filter.layover_city?.includes(option?.arrival?.airport_code) ||
                filter.layover_city?.includes(option?.departure?.airport_code),
            );
          })
        : true;

      // This for Aircraft filter
      const matchAircraft = filter.aircraft?.length
        ? flights?.some((flight) => {
            return flight?.options?.some((option) =>
              filter.aircraft?.includes(option?.carrier?.carrier_aircraft_name as string),
            );
          })
        : true;

      // This for Layover time filter
      //filter.min_layover!.index  === filter.max_layover!.index will be same always
      const matchLayoverTime =
        (filter.min_layover || filter.max_layover) && flights
          ? flights[filter.min_layover!.index]?.layover_time?.some((layover) => {
              const matchMinLayover =
                !filter.min_layover || layover >= Number(filter.min_layover.value);
              const matchMaxLayover =
                !filter.max_layover || layover <= Number(filter.max_layover.value);

              return matchMinLayover && matchMaxLayover;
            })
          : true;

      return (
        matchAirline &&
        matchRefund &&
        (matchStops || stoppageValues.length === 0) &&
        matchMinimumPrice &&
        matchMaximumPrice &&
        matchTimeFrame &&
        matchLayoverCity &&
        matchAircraft &&
        matchLayoverTime
      );
    })
    ?.sort((a, b) => {
      const flightA = a.flights[0];
      const flightB = b.flights[0];

      if (filter.airline?.length) {
        return Number(a.fare.payable) - Number(b.fare.payable);
      }

      if (filter.type === 'CHEAPEST') {
        return Number(a.fare.payable) - Number(b.fare.payable);
      }

      if (filter.type === 'SHORTEST') {
        const elapsedTimeA = flightA?.elapsed_time || 0;
        const elapsedTimeB = flightB?.elapsed_time || 0;

        return elapsedTimeA - elapsedTimeB;
      }

      if (filter.type === 'EARLIEST') {
        const timeA = flightA?.options[0]?.departure.time;
        const timeB = flightB?.options[0]?.departure.time;

        if (timeA && timeB) {
          return Date.parse(`1970-01-01T${timeA}`) - Date.parse(`1970-01-01T${timeB}`);
        }

        return timeA ? -1 : 1;
      }

      return 0;
    });
};
