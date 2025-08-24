import { travelerSchema } from '@/lib/travelers/travelers-zod-schema';
import z from 'zod';

export interface ITravelerList {
  reference: 'Mr' | 'Mrs' | 'Miss' | 'MSTR';
  first_name: string;
  last_name: string;
  type: 'ADT' | 'C11' | 'C04' | 'INF';
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
  visa_file: string | undefined;
  passport_file: string | undefined;
  id: number;
}

export type ITravelerFormType = z.infer<typeof travelerSchema>;
