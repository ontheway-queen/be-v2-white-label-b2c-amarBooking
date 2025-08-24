import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { formatQueryParams } from '@/lib/helper';
import { baseApi } from '@/lib/redux/RTK_API';
import { IInvoiceDetails, IInvoiceList } from '@/type/invoice/invoice.interface';
import { HTTPResponse } from '@/type/type';

export const InvoiceAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    invoiceList: builder.query<
      HTTPResponse<IInvoiceList[]>,
      { from_date?: string; to_date?: string; limit?: number; skip?: number }
    >({
      query: (arg) => {
        const url = formatQueryParams(`${API_ENDPOINTS.INVOICE}`, arg);
        return {
          url: url,
          method: 'GET',
        };
      },
      providesTags: ['INVOICE'],
      keepUnusedDataFor: 0,
    }),

    invoiceDetails: builder.query<HTTPResponse<IInvoiceDetails>, { id?: string }>({
      query: ({ id }) => ({
        url: `${API_ENDPOINTS.INVOICE}/${id}`,
        method: 'GET',
      }),
      providesTags: ['INVOICE'],
    }),

    clearDueInvoice: builder.mutation<HTTPResponse<void>, { id?: any }>({
      query: ({ id }) => ({
        url: `${API_ENDPOINTS.INVOICE}/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['INVOICE', 'PROFILE_UPDATE'],
    }),
  }),
});
export const { useInvoiceListQuery, useClearDueInvoiceMutation, useInvoiceDetailsQuery } =
  InvoiceAPI;
