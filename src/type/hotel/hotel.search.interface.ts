export interface HotelSearchResponse {
  success: boolean;
  message: string;
  data: IHotelSearchData;
}

export interface IHotelSearchData {
  no_of_nights: number;
  checkin: string;
  checkout: string;
  no_of_adults: number;
  no_of_hotels: number;
  no_of_rooms: number;
  hotels: IHotelList[];
}

export interface IHotelList {
  search_id: string;
  hotel_code: string;
  acc_type: string;
  name: string;
  category: number;
  description: string;
  facilities: string;
  geolocation: IHotelGeolocation;
  images: IHotelImages;
  contact_details: IHotelContactDetails;
  currency: string;
  price_details: IHotelPriceDetails;
  refundable: boolean;
  cancellation_policy?: IHotelCancellationPolicy;
  details: IHotelDetails;
  rooms: IHotelRoom[];
  safe2stay: IHotelSafe2Stay;
  supp_cards: string[];
}

export interface IHotelCancellationPolicy {
  no_show_fee: number;
  details: ICancelDetail[];
  free_cancellation: boolean;
}

export interface ICancelDetail {
  fee: number;
  from_date: string;
}

export interface IHotelContactDetails {
  email: string;
  phone: string;
  fax: string;
  website_url: string;
  address: string;
  city_code: string;
  country: string;
}

export interface IHotelDetails {
  group_code: string;
  boarding_details: string[];
  credit_deduction: string;
  has_promotions: boolean;
  includes_boarding: boolean;
  no_of_rooms: number;
  pan_required: boolean;
  payment_type: string[];
  rate_comments: RateComments;
  rate_key: string;
  rate_type: string;
  room_code: string;
  supports_amendment: boolean;
  supports_cancellation: boolean;
  promotions_details?: string[];
}

export interface RateComments {
  pax_comments: string;
}

export interface IHotelGeolocation {
  latitude: number;
  longitude: number;
}

export interface IHotelImages {
  main_image: string;
  additional_images: AdditionalImage[];
}

export interface AdditionalImage {
  id: number;
  image_url: string;
  image_caption: string;
}

export interface IHotelPriceDetails {
  price: number;
  tax: number;
  total_price: number;
}

export interface IHotelRoom {
  children_ages: number[];
  description: string;
  no_of_adults: number;
  no_of_children: number;
  no_of_rooms: number;
  room_reference: string;
  room_type: string;
}

export interface IHotelSafe2Stay {
  covid_19_safe_to_stay?: string;
  covid_19_safety_protocol?: string;
  essential_workers_only?: string;
}
