import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { baseApi } from '@/lib/redux/RTK_API';
import { HTTPResponse } from '@/type/type';
import { IUmarhBookingDetails, IUmrahBookedList } from '@/type/umrah/umrah.interface';
import { IUmrahBookingForm } from '../umrah-packages/_components/UmrahBookedFrom';

export const umrahApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    bookUmrah: builder.mutation<
      HTTPResponse<void>,
      { id: number | undefined; body: IUmrahBookingForm }
    >({
      query: ({ body, id }) => ({
        url: `${API_ENDPOINTS.UMRAH_LIST}/${id}/book`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['UMRAH'],
    }),

    umrahBookingList: builder.query<HTTPResponse<IUmrahBookedList[]>, void>({
      query: () => ({
        url: `${API_ENDPOINTS.UMRAH_BOOKING_LIST}`,
      }),
      providesTags: ['UMRAH'],
    }),

    cancelUmarh: builder.mutation<HTTPResponse<void>, { id: number | undefined }>({
      query: ({ id }) => ({
        url: `${API_ENDPOINTS.UMRAH_BOOKING_LIST}/${id}/cancel`,
        method: 'POST',
      }),
      invalidatesTags: ['UMRAH'],
    }),
    umrahBookingDetails: builder.query<
      HTTPResponse<IUmarhBookingDetails>,
      { id: string | undefined }
    >({
      query: ({ id }) => ({
        url: `${API_ENDPOINTS.UMRAH_BOOKING_LIST}/${id}`,
        method: 'GET',
      }),
      providesTags: ['UMRAH'],
    }),
  }),
});
export const {
  useBookUmrahMutation,
  useUmrahBookingListQuery,
  useCancelUmarhMutation,
  useUmrahBookingDetailsQuery,
} = umrahApi;
