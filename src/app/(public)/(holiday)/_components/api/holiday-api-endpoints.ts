import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { baseApi } from '@/lib/redux/RTK_API';
import { HTTPResponse } from '@/type/type';
import { IHolidayBookingSchema } from '../details/holiday-booking-form';
import { IHolidayBookingDetails } from '@/type/holiday/holiday.interface';

export const CommonAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    bookedHoliday: builder.mutation<HTTPResponse<void>, IHolidayBookingSchema>({
      query: (body) => {
        return {
          url: `${API_ENDPOINTS.BOOK_HOLIDAY}`,
          method: 'POST',
          body,
        };
      },

      invalidatesTags: ['HOLIDAY'],
    }),
    getBookedHoliday: builder.query<HTTPResponse<IHolidayBookingDetails>, { id?: any }>({
      query: ({ id }) => {
        return {
          url: `${API_ENDPOINTS.BOOK_HOLIDAY}/${id}`,
          method: 'GET',
        };
      },

      providesTags: ['HOLIDAY'],
    }),

    cancelBookedHoliday: builder.mutation<HTTPResponse<void>, { id?: string | number }>({
      query: ({ id }) => {
        return {
          url: `${API_ENDPOINTS.BOOK_HOLIDAY}/${id}/cancel`,
          method: 'POST',
        };
      },
      invalidatesTags: ['HOLIDAY'],
    }),
  }),
});

export const {
  useBookedHolidayMutation,
  useCancelBookedHolidayMutation,
  useGetBookedHolidayQuery,
} = CommonAPI;
