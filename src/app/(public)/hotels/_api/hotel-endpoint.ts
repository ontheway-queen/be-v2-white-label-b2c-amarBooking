import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { HOTEL_NATIONALITY } from '@/lib/CONSTANT';
import { formatDate } from '@/lib/helper';
import { baseApi } from '@/lib/redux/RTK_API';
import { IHotelRoomListResponse } from '@/type/hotel/hotel-room-list.interface';
import {
  IHotelBooking,
  IHotelBookingDetails,
  IHotelsSearchSchema,
  IIHotelListSchema,
} from '@/type/hotel/hotel.interface';
import { IHotelRecheckBody, IHotelReCheckResponse } from '@/type/hotel/hotel.rateCheck.interface';
import { HotelSearchResponse } from '@/type/hotel/hotel.search.interface';
import { HTTPResponse } from '@/type/type';
import { FetchArgs } from '@reduxjs/toolkit/query';
import { IHotelRoomListBody } from '../_components/room-list/hotel-room-list';

const hotelEndpoint = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET HOTEL LOCATION
    hotelListForSelect: builder.query<
      HTTPResponse<IIHotelListSchema[]>,
      { filter?: string; limit?: number; skip?: number }
    >({
      query: (params): FetchArgs => ({
        url: API_ENDPOINTS.HOTEL_LIST_SEARCH,
        method: 'GET',
        params,
      }),
      providesTags: ['HOTEL_LIST'],
    }),

    // GET HOTEL SEARCH RESULT
    hotelSearch: builder.query<HotelSearchResponse, IHotelsSearchSchema>({
      query: (body): FetchArgs => {
        const formattedBody = {
          client_nationality: HOTEL_NATIONALITY,
          checkin: formatDate(body.date.from),
          checkout: formatDate(body.date.to),
          destination: body.location.type,
          code: body.location.code,
          name: body.location.name,
          rooms: body.rooms.map((item) => {
            const room: any = {};
            if (item.adults) room.adults = item.adults;
            if (item.children_ages?.length) room.children_ages = item.children_ages;
            if (item.infants) room.no_of_infants = item.infants;
            return room;
          }),
        };

        return {
          url: API_ENDPOINTS.HOTEL_SEARCH,
          method: 'POST',
          body: formattedBody,
        };
      },
      keepUnusedDataFor: 0,
    }),

    hotelRoomList: builder.query<IHotelRoomListResponse, IHotelRoomListBody>({
      query: (body): FetchArgs => ({
        url: API_ENDPOINTS.HOTEL_DETAILS_ROOM,
        method: 'POST',
        body: body,
      }),
      providesTags: ['HOTEL_LIST'],
      keepUnusedDataFor: 0,
    }),

    hotelRoomRecheck: builder.query<IHotelReCheckResponse, IHotelRecheckBody>({
      query: (body): FetchArgs => {
        const { from_date, to_date, ...rest } = body;

        return {
          url: API_ENDPOINTS.HOTEL_RATE_CHECK,
          method: 'POST',
          body: rest,
        };
      },
      providesTags: ['HOTEL_LIST'],
      keepUnusedDataFor: 0,
    }),

    getHotelBooking: builder.query<HTTPResponse<IHotelBooking[]>, void>({
      query: (): FetchArgs => ({
        url: API_ENDPOINTS.HOTEL_BOOKING,
        method: 'GET',
      }),
      providesTags: ['HOTEL_LIST'],
      keepUnusedDataFor: 0,
    }),

    getHotelBookingDetails: builder.query<HTTPResponse<IHotelBookingDetails>, { id: string }>({
      query: ({ id }): FetchArgs => ({
        url: `${API_ENDPOINTS.HOTEL_BOOKING}/${id}`,
        method: 'GET',
      }),
      providesTags: ['HOTEL_LIST'],
      keepUnusedDataFor: 0,
    }),

    hotelBookingConfirm: builder.mutation<void, FormData>({
      query: (body): FetchArgs => ({
        url: API_ENDPOINTS.HOTEL_BOOKING,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['HOTEL_LIST'],
    }),
  }),
});

export const {
  useHotelSearchQuery,
  useHotelListForSelectQuery,
  useHotelRoomListQuery,
  useHotelRoomRecheckQuery,
  useGetHotelBookingQuery,
  useHotelBookingConfirmMutation,
  useGetHotelBookingDetailsQuery,
} = hotelEndpoint;
