import { depositSchema } from '@/app/(private)/(profile)/my-account/deposit/_component/create-deposit';
import z from 'zod';

export type IDeposit = z.infer<typeof depositSchema>;

export interface IDepositList {
  id: number;
  bank_name: string;
  bank_logo: string;
  amount: string;
  request_no: string;
  status: string;
  payment_date: string;
  created_at: string;
}

export interface IDepositDetails {
  id: number;
  request_no: string;
  bank_name: string;
  bank_logo: string;
  account_name: string;
  account_number: string;
  branch: string;
  amount: string;
  remarks: string;
  status: string;
  payment_date: Date;
  created_at: Date;
  docs: string;
  created_by: number;
  updated_at: null;
  update_note: null;
  created_by_name: string;
}
