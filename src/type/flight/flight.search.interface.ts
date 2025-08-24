export interface ISearchInfo {
  search_id?: string;
  leg_description?: ILegDescription[];
}

export interface ILegDescription {
  departureDate?: string;
  departureLocation: string;
  arrivalLocation: string;
}

export interface IFlightList {
  flight_id: string;
  api_search_id?: string;
  booking_block?: boolean;
  domestic_flight?: boolean;
  price_changed?: boolean;
  direct_ticket_issue?: boolean;
  journey_type?: string;
  api?: string;
  fare: IFlightListFare;

  refundable?: boolean;
  carrier_code?: string;
  carrier_name?: string;
  carrier_logo?: string;
  ticket_last_date?: string;
  ticket_last_time?: string;

  flights: IFlight[];
  passengers: IFlightListPassenger[];
  availability: IAvailability[];
  leg_description?: unknown[];
}

export interface IAvailability {
  from_airport?: string;
  to_airport?: string;
  segments?: ISegment[];
}

export interface ISegment {
  name?: string;
  passenger?: ISegmentPassenger[];
}

export interface ISegmentPassenger {
  type?: string;
  count?: number;
  cabin_code?: string;
  cabin_type?: string;
  booking_code?: string;
  available_seat?: number;
  baggage_unit?: string;
  baggage_count?: number | string;
  available_break?: boolean;
  meal_type?: string;
  meal_code?: string;
}

export interface IFlightListFare {
  base_fare?: string;
  total_tax?: string;
  discount?: string;
  payable: string;
  ait?: string;
  vendor_price: IFlightListFareVendor;
}

export interface IFlightListFareVendor {
  base_fare: number;
  tax: number;
  ait: number;
  charge: number;
  discount: number;
  gross_fare: number;
  net_fare: number;
}

export interface IFlight {
  id?: number;
  stoppage: number;
  elapsed_time?: number;
  layover_time?: number[];
  options: IOption[];
  availability?: IAvailability[];
}

export interface IOption {
  id?: number;
  elapsedTime?: number;
  stopCount?: number;
  total_miles_flown?: number;
  departure: IArrival;
  arrival: IArrival;
  carrier?: ICarrier;
}

export interface IArrival {
  airport?: string;
  city?: string;
  airport_code: string;
  city_code?: string;
  country?: string;
  time: string;
  terminal?: string | null;
  date?: string;
}

export interface ICarrier {
  carrier_marketing_code?: string;
  carrier_marketing_airline?: string;
  carrier_marketing_logo?: string;
  carrier_marketing_flight_number?: number;
  carrier_operating_code?: string;
  carrier_operating_airline?: string;
  carrier_operating_logo?: string;
  carrier_operating_flight_number?: number;
  carrier_aircraft_code?: string | null;
  carrier_aircraft_name?: string | null;
}

export interface IFlightListPassenger {
  type?: string;
  number: number;
  per_pax_fare: IPassengerFare;
}

export interface IPassengerFare {
  base_fare: string;
  tax: string;
  ait: string;
  discount: string;
  total_fare: string;
}

export interface IRevalidateData {
  flight_id: string;
  api_search_id: string;
  booking_block: boolean;
  api: string;
  fare: IFlightListFare;
  refundable: boolean;
  carrier_code: string;
  carrier_name: string;
  carrier_logo: string;
  ticket_last_date: string;
  ticket_last_time: string;

  domestic_flight: boolean;
  price_changed: boolean;
  baggage_changed: boolean;
  direct_ticket_issue: boolean;
  journey_type: string;
  remaining_time: number;

  flights: IFlight[];
  passengers: IFlightListPassenger[];
  availability: IAvailability[];
  leg_description: ILegDescription[];
}
