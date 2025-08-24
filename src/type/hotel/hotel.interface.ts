import {} from '@/components/hotel/hotel-search-box';
import { HotelListSchema, hotelSearchSchema, RoomSchema } from '@/lib/hotel/hotel-zod-schema';
import { z } from 'zod';

export type IHotelsSearchSchema = z.infer<typeof hotelSearchSchema>;
export type IIHotelListSchema = z.infer<typeof HotelListSchema>;
export type IRoomSchema = z.infer<typeof RoomSchema>;

export interface IHotelSearchParams {
  check_in: string;
  check_out: string;
  rooms: string;
  location: string;
}

export interface IHotelBooking {
  id: number;
  booking_ref: string;
  hotel_code: number;
  hotel_name: string;
  sell_price: {
    price: number;
    tax: number;
    total_price: number;
  };
  checkin_date: string;
  checkout_date: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  finalized: boolean;
  created_at: string;
}

export interface IHotelBookingDetails {
  id: number;
  booking_ref: string;
  hotel_code: number;
  hotel_name: string;
  checkin_date: string;
  checkout_date: string;
  supplier: string;
  source_type: string;
  agency_id: number;
  agency_name: string;
  created_by: number;
  created_by_name: string;
  created_at: string;
  holder: Holder;
  sell_price: SellPrice;
  confirmation_no: null;
  refundable: boolean;
  free_cancellation: boolean;
  hotel_extra_charges: HotelExtraCharges;
  status: string;
  hotel_data: HotelData;
  city_code: number;
  city_country_name: string;
  finalized: boolean;
  free_cancellation_last_date: string;
  search_id: string;
  rooms: Room[];
  traveler: Traveler[];
}

export interface Holder {
  title: string;
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  client_nationality: string;
}

export interface HotelData {
  name: string;
  hotel_code: string;
  category: number;
  geolocation: Geolocation;
  contact_details: ContactDetails;
  images: Images;
  facilities: string;
}

export interface ContactDetails {
  email: string;
  phone: string;
  fax: string;
  website_url: string;
  address: string;
  city_code: string;
  country: string;
}

export interface Geolocation {
  latitude: number;
  longitude: number;
}

export interface Images {
  main_image: string;
  additional_images: AdditionalImage[];
}

export interface AdditionalImage {
  id: number;
  image_url: string;
  image_caption: null | string;
  hotel_code: number;
}

export interface HotelExtraCharges {
  total_payable_amount: number;
  payable_currency: string;
  charges_name: any[];
}

export interface Room {
  description: string;
  no_of_adults: number;
  no_of_children: number;
  no_of_rooms: number;
  room_reference: string;
  room_type: string;
  children_ages?: number[];
}

export interface SellPrice {
  price: number;
  tax: number;
  total_price: number;
  markup: number;
  discount: number;
  agent_markup: string;
  agent_discount: number;
}

export interface Traveler {
  id: number;
  booking_id: number;
  room: number;
  type: string;
  title: string;
  name: string;
  surname: string;
  id_file: null;
}
