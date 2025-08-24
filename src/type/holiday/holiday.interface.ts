import { holidaySearchSchema } from '@/lib/holiday/holiday-zod-schema';
import { z } from 'zod';

export type IHolidaySearchSchema = z.infer<typeof holidaySearchSchema>;

export interface ITourList {
  id: number;
  slug: string;
  title: string;
  duration: number;
  status: boolean;
  created_at: string;
  cities: IITourCardCities[] | IITourCardCities | null;
  holiday_type: string;
  holiday_for: string;
  price: string;
  image: string;
}

export interface IITourCardCities {
  city_id: number;
  city_name: string;
  country: string;
}

export interface IHolidaySearchQueryParams {
  city_id: string;
  city: string;
  country: string;
}

export interface ITourDetails {
  id: number;
  slug: string;
  title: string;
  details: string;
  holiday_type: string;
  duration: number;
  valid_till_date: string;
  group_size: number;
  cancellation_policy: string;
  tax_details: string;
  general_condition: string;
  holiday_for: string;
  status: boolean;
  created_at: Date;
  cities: ITourDetailsCity[];
  pricing: ITourDetailsPricing[];
  itinerary: ITourDetailsItinerary[];
  services: ITourDetailsService[];
  images: ITourDetailsImage[];
}

export interface ITourDetailsCity {
  city_id: number;
  city_name: string;
  country: string;
}

export interface ITourDetailsImage {
  id: number;
  holiday_package_id: number;
  image: string;
  created_at: Date;
}

export interface ITourDetailsItinerary {
  id: number;
  holiday_package_id: number;
  day_number: number;
  title: string;
  details: string;
  created_at: Date;
}

export interface ITourDetailsPricing {
  id: number;
  holiday_package_id: number;
  price_for: string;
  adult_price: number;
  child_price: number;
  markup_price: number;
  markup_type: string;
  created_at: Date;
}

export interface ITourDetailsService {
  id: number;
  holiday_package_id: number;
  type: string;
  title: string;
  created_at: Date;
}

export interface IHolidayBookingList {
  id: number;
  booking_ref: string;
  holiday_package_title: string;
  source_type: string;
  source_name: string;
  total_adult: number;
  total_child: number;
  total_price: string;
  travel_date: string;
  created_at: string;
  status: string;
}

export interface IHolidayBookingDetails {
  id: number;
  booking_ref: string;
  holiday_package_id: number;
  holiday_package_title: string;
  source_type: string;
  source_id: null;
  source_name: string;
  user_id: number;
  user_name: string;
  total_adult: number;
  total_child: number;
  total_adult_price: string;
  total_child_price: string;
  total_markup: string;
  total_price: string;
  travel_date: string;
  contact_email: string;
  contact_number: string;
  note_from_customer: string;
  status: string;
  created_at: string;
}
