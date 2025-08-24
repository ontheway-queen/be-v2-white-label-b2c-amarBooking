import { PaxBookingSchema } from '@/lib/flight/flight-booking-zod-schema';
import {
  AirportSchema,
  classSchema,
  FlightFormSchema,
  IFlightPaxSchema,
  tripTypeSchema,
} from '@/lib/flight/flight-zod-schema';
import { FieldArrayWithId } from 'react-hook-form';
import { z } from 'zod';

export type IFlightTicketClass = z.infer<typeof classSchema>;
export type IFlightTripType = z.infer<typeof tripTypeSchema>;

export type IFlightSearchSchema = z.infer<typeof FlightFormSchema>;
export type IAirportSchema = z.infer<typeof AirportSchema>;
export type IFlightPaxSchema = z.infer<typeof IFlightPaxSchema>;
export type IFlightMultiCitySchema = FieldArrayWithId<
  z.infer<typeof FlightFormSchema>,
  'multiCityTrips',
  'id'
>;

export interface IFlightSearchQueryParams {
  from: string | string[];
  fromAirport: string | string[];
  to: string | string[];
  toAirport: string | string[];
  departure: string | string[];
  return?: string;
  tripType: IFlightTripType;
  class: IFlightTicketClass;
  adults: string;
  child: string;
  infant: string;
  kids: string;
}

export interface IFlightBookingResponse {
  success: boolean;
  data: {
    new_fare: string;
    booking_id: number;
    booking_ref: string;
  };
  message: string;
}

export interface IBookedFlightList {
  id: number;
  booking_ref: string;
  source_type: string;
  source_id: number;
  source_name: string;
  source_logo: string;
  api: string;
  created_at: Date;
  travel_date: Date;
  gds_pnr: null;
  airline_pnr: null;
  journey_type: string;
  total_passenger: number;
  status: string;
  payable_amount: string;
  route: string;
}

export interface IFlightBookingDetails {
  id: number;
  booking_ref: string;
  source_name: string;
  source_logo: string;
  gds_pnr: null;
  total_passenger: number;
  status: string;
  base_fare: string;
  tax: string;
  ait: string;
  discount: string;
  payable_amount: string;
  journey_type: string;
  refundable: boolean;
  route: string;
  ticket_issue_last_time: string;
  airline_pnr: null;
  created_by: number;
  created_by_user_name: string;
  created_by_phone_number: string;
  created_by_email: string;
  cancelled_by_type: null;
  cancelled_by_user_id: null;
  cancelled_by_user_name: null;
  cancelled_at: null;
  issued_by_type: null;
  issued_by_user_id: null;
  issued_by_user_name: null;
  issued_at: null;
  created_at: Date;
  travel_date: Date;
  price_breakdown_data: PriceBreakdownDatum[];
  segment_data: SegmentDatum[];
  traveler_data: TravelerDatum[];
}

export interface PriceBreakdownDatum {
  id: number;
  type: string;
  total_passenger: number;
  base_fare: string;
  tax: string;
  ait: string;
  discount: string;
  total_fare: string;
}

export interface SegmentDatum {
  id: number;
  flight_booking_id: number;
  flight_number: string;
  airline: string;
  airline_code: string;
  airline_logo: string;
  class: string;
  baggage: string;
  departure_date: Date;
  arrival_date: Date;
  departure_time: string;
  arrival_time: string;
  aircraft: string;
  duration: string;
  departure_terminal: string;
  arrival_terminal: string;

  origin: {
    airport: string;
    city: string;
    code: string;
  };
  destination: {
    airport: string;
    city: string;
    code: string;
  };
}

export interface TravelerDatum {
  id: number;
  flight_booking_id: number;
  type: string;
  reference: string;
  first_name: string;
  last_name: string;
  phone: string;
  date_of_birth: Date;
  gender: string;
  email: string;
  passport_number: string;
  passport_expiry_date: Date;
  ticket_number: null;
  issuing_country: number;
  nationality: number;
  frequent_flyer_airline: string;
  frequent_flyer_number: string;
  visa_file: null;
  passport_file: null;
}

export type IFlightPaxBookingPaxType = z.infer<typeof PaxBookingSchema>;
