import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { formatQueryParams } from '@/lib/helper';
import { baseApi } from '@/lib/redux/RTK_API';
import { HTTPResponse } from '@/type/type';
import { IVisaApplicationDetails, IVisaApplicationList } from '@/type/visa/visa.interface';

export const visaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    bookVisa: builder.mutation<HTTPResponse<void>, { body: FormData; id: any }>({
      query: ({ body, id }) => ({
        url: `${API_ENDPOINTS.VISA}/${id}/application`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['VISA'],
    }),

    getVisaApplicationList: builder.query<
      HTTPResponse<IVisaApplicationList[]>,
      { from_date?: string; to_date?: string; limit?: number; skip?: number }
    >({
      query: (arg) => {
        const url = formatQueryParams(`${API_ENDPOINTS.VISA}/applications`, arg);
        return {
          url: url,
          method: 'GET',
        };
      },
      providesTags: ['VISA'],
    }),

    visaApplicationDetails: builder.query<HTTPResponse<IVisaApplicationDetails>, { id?: any }>({
      query: (arg) => {
        return {
          url: `${API_ENDPOINTS.VISA}/application/${arg.id}`,
          method: 'GET',
        };
      },
      providesTags: ['VISA'],
    }),
  }),
});
export const {
  useBookVisaMutation,
  useGetVisaApplicationListQuery,
  useVisaApplicationDetailsQuery,
} = visaApi;
