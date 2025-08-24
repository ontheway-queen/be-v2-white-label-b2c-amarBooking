import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { baseApi } from '@/lib/redux/RTK_API';
import { IDepositDetails, IDepositList } from '@/type/deposit/deposit.interface';
import { HTTPResponse } from '@/type/type';

export const DepositAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    depositList: builder.query<HTTPResponse<IDepositList[]>, void>({
      query: () => ({
        url: `${API_ENDPOINTS.DEPOSIT}`,
        method: 'GET',
      }),
      providesTags: ['DEPOSIT'],
    }),

    depositDetails: builder.query<HTTPResponse<IDepositDetails>, { id?: string }>({
      query: ({ id }) => ({
        url: `${API_ENDPOINTS.DEPOSIT}/${id}`,
        method: 'GET',
      }),
      providesTags: ['DEPOSIT'],
    }),

    addDeposit: builder.mutation<HTTPResponse<void>, FormData>({
      query: (formData) => ({
        url: `${API_ENDPOINTS.DEPOSIT}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['DEPOSIT'],
    }),

    deleteDeposit: builder.mutation<HTTPResponse<void>, { id: string | number }>({
      query: ({ id }) => ({
        url: `${API_ENDPOINTS.DEPOSIT}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['DEPOSIT'],
    }),
  }),
});
export const {
  useDepositListQuery,
  useAddDepositMutation,
  useDeleteDepositMutation,
  useDepositDetailsQuery,
} = DepositAPI;
