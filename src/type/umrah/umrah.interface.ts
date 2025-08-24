export interface IGetUmrahList {
  id: number;
  slug: string;
  thumbnail: string;
  title: string;
  duration: number;
  group_size: number;
  short_description: string;
  adult_price: string;
}

export interface IUmrahDetails {
  id: number;
  title: string;
  description: string;
  duration: number;
  valid_till_date: string | Date;
  status: boolean;
  package_details?: string;
  package_price_details?: string;
  package_accommodation_details?: string;
  slug: string;
  meta_description: string;
  adult_price: string;
  child_price: string;
  meta_title: string;
  short_description: string;
  thumbnail: string;
  group_size: string;
  photos: {
    id: number;
    image: string;
  }[];
  includes: {
    id: number;
    umrah_id: number;
    service_name: string;
  }[];
}

export interface IUmrahBookedList {
  id: number;
  booking_ref: string;
  umrah_id: number;
  umrah_title: string;
  umrah_short_description: string;
  status: string;
  traveler_adult: number;
  traveler_child: number;
  total_price: string;
  created_at: string;
}

export interface IUmarhBookingDetails {
  id: number;
  booking_ref: string;
  traveler_adult: number;
  traveler_child: number;
  per_child_price: string;
  per_adult_price: string;
  note_from_customer: string;
  status: string;
  total_price: string;
  umrah_title: string;
  created_at: string;
  contact: IUmarhBookingContact;
}

export interface IUmarhBookingContact {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}
