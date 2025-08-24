import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { formatQueryParams } from '@/lib/helper';
import { baseApi } from '@/lib/redux/RTK_API';

import { HTTPResponse } from '@/type/type';

export const TransactionAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    transactionList: builder.query<
      HTTPResponse<ITransactionList[]>,
      { from_date?: string; to_date?: string; limit?: number; skip?: number; type?: string }
    >({
      query: (arg) => {
        const url = formatQueryParams(`${API_ENDPOINTS.TRANSACTION}`, arg);
        return {
          url: url,
          method: 'GET',
        };
      },
      keepUnusedDataFor: 0,
      providesTags: ['TRANSACTION'],
    }),
  }),
});
export const { useTransactionListQuery } = TransactionAPI;

export interface ITransactionList {
  id: number;
  agency_id: number;
  type: 'Credit' | 'Debit';
  amount: string;
  details: string;
  created_at: string;
  voucher_no: string;
  ledger_date: string;
  agency_name: string;
  agency_logo: string;
}
