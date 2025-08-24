import {
  IAirportSchema,
  IFlightPaxBookingPaxType,
  IFlightPaxSchema,
  IFlightSearchSchema,
} from '@/type/flight/flight.interface';
import { IHotelsSearchSchema } from '@/type/hotel/hotel.interface';
import { addDays } from 'date-fns';

export const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
};

export const pageChangeAnimation = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -100, transition: { duration: 0.3 } },
};

export const referenceType = [
  { label: 'Mr', value: 'Mr' },
  { label: 'Ms', value: 'Ms' },
  { label: 'Mrs', value: 'Mrs' },
  { label: 'Master', value: 'Master' },
  { label: 'Miss', value: 'Miss' },
];

export const passportType = [
  { value: 'Regular', label: 'Regular' },
  { value: 'Diplomatic', label: 'Diplomatic' },
  { value: 'Official', label: 'Official' },
  { value: 'Service', label: 'Service' },
  { value: 'Special', label: 'Special' },
  { value: 'Emergency', label: 'Emergency' },
];

export const filterReferenceType = (name: IFlightPaxBookingPaxType) => {
  return referenceType.filter((item) => {
    if (name === 'ADT') {
      return item.label !== 'Master' && item.label !== 'Miss';
    } else if (
      name === 'C11' ||
      name === 'C10' ||
      name === 'C09' ||
      name === 'C08' ||
      name === 'C07' ||
      name === 'C06' ||
      name === 'C05' ||
      name === 'C04' ||
      name === 'C03' ||
      name === 'C02'
    ) {
      return item.label !== 'Mr' && item.label !== 'Mrs' && item.label !== 'Master';
    } else if (name === 'INF') {
      return item.label !== 'Mr' && item.label !== 'Mrs' && item.label !== 'Master';
    }
    return true;
  });
};

export const airportList: IAirportSchema[] = [
  {
    id: 210,
    country_id: 18,
    country: 'BANGLADESH',
    name: 'Hazrat Shahjalal International Airport',
    iata_code: 'DAC',
    city_id: 14,
    city_name: 'Dhaka',
  },
  {
    id: 2061,
    country_id: 18,
    country: 'BANGLADESH',
    name: "Cox's Bazar Airport",
    iata_code: 'CXB',
    city_id: 9652,
    city_name: "Cox's Bazar",
  },
];

export const defaultFlightPassenger: IFlightPaxSchema = {
  adults: 1,
  child: 0,
  infant: 0,
  kids: 0,
};

const Form_Select = airportList[0];
const To_Select = airportList[1];
const Dep_date = addDays(new Date(), 3);
const Ret_date = addDays(new Date(), 6);

// FLIGHT DEFAULT VALUE ___________________________________________________________________________________________________

export const defaultFlightFormValues: IFlightSearchSchema = {
  tripType: 'One-way',
  passenger: defaultFlightPassenger,
  class: 'economy',
  from: Form_Select,
  to: To_Select,
  departure: Dep_date,
  return: Ret_date,
  multiCityTrips: [
    { from: Form_Select, to: To_Select, departure: Ret_date },
    { from: undefined, to: undefined, departure: undefined },
  ],
};

export const FLIGHT_DURATION_EXPIRED = 60 * 1000 * 15;

// HOTEL DEFAULT VALUE ______________________________________________________________________________________________________
export const defaultHotelFormValue: IHotelsSearchSchema = {
  date: {
    from: addDays(new Date(), 3),
    to: addDays(new Date(), 6),
  },
  location: {
    id: 158785,
    name: 'Dhaka',
    code: 121096,
    star_category: 0,
    type: 'City',
    city_code: 121096,
    city_name: 'Dhaka',
    country_code: 'BD',
    country_name: 'Bangladesh',
  },
  rooms: Array.from({ length: 1 }, () => ({
    adults: 2,
    children: 0,
    infants: 0,
    children_ages: [],
  })),
};

export const HOTEL_CURRENCY = 'BDT';
export const HOTEL_NATIONALITY = 'BD';
export const HOTEL_DURATION_EXPIRED = 60 * 1000 * 15;

export const TWO_FA_ERROR_MESSAGE = 'Two factor authentication is required for this account';
