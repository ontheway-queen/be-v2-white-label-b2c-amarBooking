import {
  IHotelCancellationPolicy,
  IHotelContactDetails,
  IHotelGeolocation,
  IHotelImages,
  IHotelRoom,
  IHotelSafe2Stay,
} from './hotel.search.interface';

export interface IHotelReCheckResponse {
  success: boolean;
  message: string;
  data: IHotelReCheckData;
}

export interface IHotelReCheckData {
  acc_type: string;
  category: number;
  name: string;
  hotel_code: string;
  description: string;
  facilities: string;
  geolocation: IHotelGeolocation;
  images: IHotelImages;
  contact_details: IHotelContactDetails;
  safe2stay: IHotelSafe2Stay;
  supp_cards: string[];
  hotel_extra_charges: IReCheckHotelExtraCharges;
  fee: IRateCheckFee;
  rates: IRate[];
}

export interface IRateCheckFee {
  price: number;
  tax: number;
  total_price: number;
}

export interface IReCheckHotelExtraCharges {
  total_payable_amount: number;
  payable_currency: string;
  charges_name: any[];
}

export interface IRate {
  boarding_details: string[];
  credit_deduction: string;
  group_code: string;
  has_promotions: boolean;
  includes_boarding: boolean;
  no_of_rooms: number;
  pan_required: boolean;
  payment_type: string[];
  currency: string;
  price_details: IRateCheckFee;
  payable_at_hotel: IPayableAtHotel;
  refundable: boolean;
  cancellation_policy: IHotelCancellationPolicy;
  rate_comments: IRateCheckComments;
  rate_key: string;
  rate_type: string;
  room_code: string;
  rooms: IHotelRoom[];
  supports_amendment: boolean;
  supports_cancellation: boolean;
}

export interface IPayableAtHotel {
  currency: string;
  name: any[];
  total_amount: number;
}

export interface IRateCheckComments {
  checkin_begin_time: string;
  checkin_end_time: string;
  checkout_time: string;
  comments: string;
  pax_comments: string;
}

export interface IHotelRecheckBody {
  search_id: string;
  nights: number;
  from_date: string;
  to_date: string;
  rooms: IHotelRecheckBodyRoom[];
}

export interface IHotelRecheckBodyRoom {
  rate_key: string;
  group_code: string;
}
