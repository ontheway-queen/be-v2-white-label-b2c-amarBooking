import { IUserFormData } from '@/app/(public)/flights/booking/_components/booking-form/flight-booking-from';
import {
  IAirportSchema,
  IFlightMultiCitySchema,
  IFlightPaxSchema,
  IFlightSearchQueryParams,
  IFlightSearchSchema,
  IFlightTicketClass,
} from '@/type/flight/flight.interface';
import { IAvailability, IFlightListPassenger } from '@/type/flight/flight.search.interface';
import { ITravelerList } from '@/type/travelers/travelers.interface';
import { format, parse } from 'date-fns';
import { UseFormReturn } from 'react-hook-form';

export const getCabinPref = (ticketClass?: IFlightTicketClass) => {
  const cabinMap: Record<IFlightTicketClass, string> = {
    economy: '1',
    business: '2',
    first: '3',
  };

  return {
    Cabin: cabinMap[ticketClass as IFlightTicketClass] ?? undefined,
    PreferLevel: 'Preferred',
  };
};

export const getPassengerTypes = (query: IFlightSearchQueryParams) => {
  const result = [
    {
      Code: 'ADT',
      Quantity: Number(query.adults || 1),
    },
  ];

  if (Number(query.child || 0) > 0) result.push({ Code: 'C11', Quantity: Number(query.child) });

  if (Number(query.kids || 0) > 0) result.push({ Code: 'C04', Quantity: Number(query.kids) });

  if (Number(query.infant || 0) > 0) result.push({ Code: 'INF', Quantity: Number(query.infant) });

  return result;
};

// export function formatFlightPassengers(passengers: IFlightListPassenger[]): any {
//   const getName = (type: string | undefined): string => {
//     if (type === 'ADT') return 'Adult';
//     if (type === 'INF') return 'Infant';
//     if (type === 'CHD') return 'Child';

//     if (!type) return 'Unknown';

//     const num = parseInt(type.slice(1), 10);
//     if (num >= 2 && num <= 4) return 'Kids';
//     if (num >= 5 && num <= 11) return 'Child';

//     return 'Unknown';
//   };

//   const nameCounters: Record<string, number> = {};

//   return passengers.map((p, index) => {
//     const name = getName(p.type);
//     nameCounters[name] = (nameCounters[name] || 0) + 1;

//     return {
//       key: index,
//       type: p.type ?? '',
//       reference: undefined,
//       first_name: undefined,
//       last_name: undefined,
//       contact_number: undefined,
//       date_of_birth: undefined,
//       gender: undefined,
//       contact_email: undefined,
//       passport_number: undefined,
//       passport_expiry_date: undefined,
//       nationality: 18,
//       issuing_country: 18,
//       frequent_flyer_number: undefined,
//       frequent_flyer_airline: undefined,
//       passport: undefined,
//       visa: undefined,
//     };
//   });
// }

export function formatFlightPassengers(passengers: IFlightListPassenger[]): any {
  const getName = (type: string | undefined): string => {
    if (type === 'ADT') return 'Adult';
    if (type === 'INF') return 'Infant';
    if (type === 'CHD') return 'Child';

    if (!type) return 'Unknown';

    const num = parseInt(type.slice(1), 10);
    if (num >= 2 && num <= 4) return 'Kids';
    if (num >= 5 && num <= 11) return 'Child';

    return 'Unknown';
  };

  const nameCounters: Record<string, number> = {};
  let keyCounter = 0;

  return passengers.flatMap((p) => {
    const results: any[] = [];

    // Repeat passenger object "number" times
    for (let i = 0; i < (p.number ?? 1); i++) {
      const name = getName(p.type);
      nameCounters[name] = (nameCounters[name] || 0) + 1;

      results.push({
        key: keyCounter++,
        type: p.type ?? '',
        reference: undefined,
        first_name: undefined,
        last_name: undefined,
        contact_number: undefined,
        date_of_birth: undefined,
        gender: undefined,
        contact_email: undefined,
        passport_number: undefined,
        passport_expiry_date: undefined,
        nationality: 18,
        issuing_country: 18,
        frequent_flyer_number: undefined,
        frequent_flyer_airline: undefined,
        passport: undefined,
        visa: undefined,
      });
    }

    return results;
  });
}

export const getFlightDetailsTabName = (data?: IAvailability[]) => {
  if (!data) return null;
  const result = data.map((item) => `${item.from_airport} - ${item.to_airport}`);
  return result;
};

export const getFullPaxType = (type?: string): any => {
  switch (type) {
    case 'ADT':
      return 'Adult';
    case 'C11':
      return 'Child';
    case 'CHD':
      return 'Child';
    case 'Children-11':
      return 'Child';
    case 'Children-06':
      return 'Child';
    case 'C04':
      return 'Kids';
    case 'INF':
      return 'Infants';
    default:
      return type;
  }
};

export const encodeFlightSearchParams = (value: IFlightSearchSchema) => {
  const {
    tripType,
    departure: depDate,
    return: returnDate,
    passenger,
    from,
    to,
    class: tktCls,
    multiCityTrips,
  } = value;

  const commonParams = `tripType=${tripType}&class=${tktCls}&adults=${passenger.adults}&child=${passenger.child}&infant=${passenger.infant}&kids=${passenger.kids}`;

  if (tripType === 'One-way') {
    return `from=${from.iata_code}&to=${to.iata_code}&departure=${format(
      depDate as Date,
      'yyyy-MM-dd',
    )}&${commonParams}&fromAirport=${from.name}&toAirport=${to.name}`;
  } else if (tripType === 'Round-trip') {
    return `from=${from.iata_code}&to=${to.iata_code}&departure=${format(
      depDate as Date,
      'yyyy-MM-dd',
    )}&return=${format(returnDate as Date, 'yyyy-MM-dd')}&${commonParams}&fromAirport=${
      from.name
    }&toAirport=${to.name}`;
  } else if (tripType === 'Multi-city') {
    const multiCityParams = multiCityTrips
      ?.map((trip, _index) => {
        return `from=${trip?.from?.iata_code}&to=${trip?.to?.iata_code}&departure=${format(
          trip?.departure!,
          'yyyy-MM-dd',
        )}&fromAirport=${from.name}&toAirport=${to.name}`;
      })
      .join('&');

    return `${multiCityParams}&${commonParams}`;
  }

  return commonParams;
};

export const decodeFlightSearchParams = (params: IFlightSearchQueryParams): IFlightSearchSchema => {
  const {
    tripType,
    class: tktClsRaw,
    adults,
    child,
    infant,
    kids,
    from,
    fromAirport,
    to,
    toAirport,
    departure,
    return: returnDateStr,
  } = params;

  const tktCls = tktClsRaw;

  const passenger: IFlightPaxSchema = {
    adults: parseInt(adults, 10) || 1,
    child: parseInt(child, 10) || 0,
    infant: parseInt(infant, 10) || 0,
    kids: parseInt(kids, 10) || 0,
  };

  let multiCityTrips: Partial<IFlightMultiCitySchema[]> = [];
  let fromObj: IAirportSchema = { iata_code: '', name: '' };
  let toObj: IAirportSchema = { iata_code: '', name: '' };
  let departureDate: Date | undefined = undefined;
  let returnDate: Date | undefined = undefined;

  const isMultiCity = Array.isArray(from) && Array.isArray(to);

  if (isMultiCity) {
    const fromList = from as string[];
    const toList = to as string[];
    const fromAirportList = fromAirport as string[];
    const toAirportList = toAirport as string[];
    const departureList = Array.isArray(departure) ? departure : [departure];

    const tripCount = Math.min(fromList.length, toList.length, departureList.length);

    for (let i = 0; i < tripCount; i++) {
      try {
        multiCityTrips.push({
          id: String(i),
          from: { iata_code: fromList[i], name: fromAirportList[i] },
          to: { iata_code: toList[i], name: toAirportList[i] },
          departure: parse(departureList[i], 'yyyy-MM-dd', new Date()),
        });
      } catch {
        // skip invalid entry
      }
    }
  }
  if (departure) {
    try {
      departureDate = parse(
        Array.isArray(departure) ? departure[0] : departure,
        'yyyy-MM-dd',
        new Date(),
      );
    } catch {}
  }

  if (tripType === 'Round-trip' && returnDateStr) {
    try {
      returnDate = parse(returnDateStr, 'yyyy-MM-dd', new Date());
    } catch {}
  }

  fromObj = {
    iata_code: Array.isArray(from) ? from[0] : from,
    name: Array.isArray(fromAirport) ? fromAirport[0] : fromAirport,
  };
  toObj = {
    iata_code: Array.isArray(to) ? to[0] : to,
    name: Array.isArray(toAirport) ? toAirport[0] : toAirport,
  };

  return {
    tripType: tripType,
    class: tktCls,
    passenger,
    from: fromObj,
    to: toObj,
    departure: departureDate as string | Date,
    return: returnDate,
    multiCityTrips: multiCityTrips as any,
  };
};

export const selectTravelerFillFields = (
  methods: UseFormReturn<IUserFormData>,
  index: number,
  e: ITravelerList,
) => {
  methods.setValue(`passengers.${index}.reference`, e.reference);
  methods.setValue(`passengers.${index}.first_name`, e.first_name);
  methods.setValue(`passengers.${index}.last_name`, e.last_name);
  methods.setValue(`passengers.${index}.contact_number`, e.contact_number);
  methods.setValue(`passengers.${index}.date_of_birth`, new Date(e.date_of_birth));
  methods.setValue(`passengers.${index}.gender`, 'Male');
  methods.setValue(`passengers.${index}.contact_email`, e.contact_email);
  methods.setValue(`passengers.${index}.nationality`, Number(e.nationality));
  methods.setValue(`passengers.${index}.issuing_country`, Number(e.issuing_country));
  methods.setValue(`passengers.${index}.passport_number`, e.passport_number);
  methods.setValue(
    `passengers.${index}.passport_expiry_date`,
    e.passport_expiry_date ? new Date(e.passport_expiry_date) : undefined,
  );

  // USER NEED TO UPLOAD VISA AND PASSPORT EVERY TIME UP TO DATE

  // methods.setValue(`passengers.${index}.visa`, [
  //   {
  //     image: getImageLink(e.visa_file),
  //   },
  // ]);

  // methods.setValue(`passengers.${index}.passport`, [
  //   {
  //     image: getImageLink(e.passport_file),
  //   },
  // ]);

  methods.setValue(
    `passengers.${index}.frequent_flyer_number`,
    e.frequent_flyer_number || undefined,
  );

  methods.setValue(
    `passengers.${index}.frequent_flyer_airline`,
    e.frequent_flyer_airline || undefined,
  );
};
