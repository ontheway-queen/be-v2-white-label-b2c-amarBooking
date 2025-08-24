import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export interface HTTPResponse<T> {
  success?: boolean;
  count?: number;
  total?: number;
  data?: T;
  message?: string;
}

export interface ISearchType {
  label: 'Flights' | 'Hotels' | 'Visa' | 'Umrah' | 'Holidays';
  value: 'flights' | 'hotels' | 'visa' | 'umrah' | 'holidays';
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  data: IUserData;
  token: string;
}

export interface IUserData {
  id: number;
  username: string;
  name: string;
  email: string;
  two_fa: boolean;
  status: boolean;
  photo: string;
  gender: 'Male' | 'Female';
  phone_number?: string;
}

export interface IMatchOTPResponse {
  success: boolean;
  message: string;
  token: string;
}

export interface IMyProfileRes {
  agency_id: number;
  agency_name: string;
  agency_email: string;
  agency_logo: string;
  agency_address: string;
  user_id: number;
  photo: string;
  user_email: string;
  username: string;
  gender: 'Male' | 'Female' | undefined;
  name: string;
  phone_number: string;
  blog: boolean;
  flight: boolean;
  group_fare: boolean;
  holiday: boolean;
  hotel: boolean;
  umrah: boolean;
  visa: boolean;
  balance: number;
}

export interface ITravelerForm {
  reference: string;
  first_name: string;
  last_name: string;
  type: string | undefined;
  date_of_birth: string;
  gender: 'Male' | 'Female';
  issuing_country: string;
  nationality: string;
  passport_number: string;
  passport_expiry_date: string;
  contact_number: string;
  contact_email: string;
  frequent_flyer_number?: string;
  frequent_flyer_airline?: string;
  visa_file: string | undefined | File;
  passport_file: string | undefined | File;
}
