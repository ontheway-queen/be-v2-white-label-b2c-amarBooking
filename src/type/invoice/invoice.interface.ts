export interface IInvoiceList {
  id: number;
  invoice_no: string;
  source_type: string;
  source_id: number;
  user_id: number;
  ref_id: number;
  total_amount: string;
  due: string;
  details: string;
  type: string;
  created_at: string;
  ref_type: string;
  status: string;
}

export interface IInvoiceDetails {
  id: number;
  invoice_no: string;
  source_type: string;
  source_id: number;
  user_id: number;
  ref_id: number;
  total_amount: string;
  due: string;
  details: string;
  type: string;
  created_at: Date;
  ref_type: string;
  status: string;
  money_receipt: any[];
}
