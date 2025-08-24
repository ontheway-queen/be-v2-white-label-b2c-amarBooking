import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { formatQueryParams } from '@/lib/helper';
import { baseApi } from '@/lib/redux/RTK_API';
import {
  IBookedFlightList,
  IFlightBookingDetails,
  IFlightBookingResponse,
} from '@/type/flight/flight.interface';
import { IRevalidateData } from '@/type/flight/flight.search.interface';
import { HTTPResponse } from '@/type/type';

const hotelEndpoint = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    bookFlight: builder.mutation<IFlightBookingResponse, FormData>({
      query: (body) => ({
        url: API_ENDPOINTS.FLIGHT_BOOKED,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['FLIGHT_BOOK'],
    }),

    flightRevalidate: builder.mutation<
      HTTPResponse<IRevalidateData>,
      { search_id: string; flight_id: string }
    >({
      query: (arg) => {
        const url = formatQueryParams(API_ENDPOINTS.FLIGHT_REVALIDATE, arg);
        return {
          url: url,
          method: 'POST',
        };
      },
      invalidatesTags: ['FLIGHT_BOOK'],
    }),

    getBookingList: builder.query<HTTPResponse<IBookedFlightList[]>, any>({
      query: (arg) => {
        const url = formatQueryParams(API_ENDPOINTS.FLIGHT_BOOKED_LIST, arg);

        return {
          url,
          method: 'GET',
        };
      },
      providesTags: ['FLIGHT_BOOK'],
      keepUnusedDataFor: 0,
    }),

    getBookingDetails: builder.query<HTTPResponse<IFlightBookingDetails>, string>({
      query: (arg) => {
        return {
          url: `${API_ENDPOINTS.FLIGHT_BOOKED_LIST}/${arg}`,
          method: 'GET',
        };
      },
      providesTags: ['FLIGHT_BOOK'],
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useBookFlightMutation,
  useGetBookingListQuery,
  useGetBookingDetailsQuery,
  useFlightRevalidateMutation,
} = hotelEndpoint;
