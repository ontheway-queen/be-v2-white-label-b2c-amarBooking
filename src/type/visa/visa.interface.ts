import { visaApplicationSchema } from '@/lib/visa/visa-application-zod-schema';
import { visaSearchSchema } from '@/lib/visa/visa-zod-schema';
import { z } from 'zod';

export type IVisaSearchSchema = z.infer<typeof visaSearchSchema>;
export type IVisaApplication = z.infer<ReturnType<typeof visaApplicationSchema>>;

export interface IVisaList {
  id: number;
  max_validity: number;
  title: string;
  image: string;
  processing_fee: string;
  visa_fee: string;
  slug: string;
}

export interface IVisaDetails {
  id: number;
  country_name: string;
  title: string;
  visa_fee: string;
  processing_fee: string;
  max_validity: number;
  stay_validity: number;
  visa_type: string;
  visa_mode: string;
  description: string;
  documents_details: string;
  required_fields: { [key: string]: boolean };
  image: string;
  meta_title: string;
  meta_description: string;
}

export interface IVisaRequiredFields {
  passport: boolean;
  nid: boolean;
  birth_certificate: boolean;
  marriage_certificate: boolean;
  bank_statement: boolean;
}

export interface IVisaApplicationList {
  id: number;
  application_ref: string;
  title: string;
  visa_type: string;
  visa_mode: string;
  country_name: string;
  status: string;
  traveler: string;
  application_date: string;
}

export interface IVisaApplicationDetails {
  id: number;
  title: string;
  visa_type: string;
  visa_mode: string;
  country_name: string;
  application_ref: string;
  from_date: string;
  to_date: string;
  visa_fee: string;
  processing_fee: string;
  traveler: number;
  payable: string;
  status: string;
  application_date: string;
  travelers: IVisaApplicationDetailsTraveler[];
}

export interface IVisaApplicationDetailsTraveler {
  id: number;
  title: string;
  type: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  passport_number: string;
  passport_expiry_date: string;
  passport_type: string;
  city: string;
  country: string;
  address: string;
}
