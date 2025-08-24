import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { baseApi } from '@/lib/redux/RTK_API';
import { ITravelerList } from '@/type/travelers/travelers.interface';
import { HTTPResponse } from '@/type/type';

export const TravelersAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    travelersList: builder.query<HTTPResponse<ITravelerList[]>, { name?: string }>({
      query: () => ({
        url: `${API_ENDPOINTS.TRAVELERS}`,
        method: 'GET',
      }),
      providesTags: ['TRAVELERS'],
    }),

    travelersDetails: builder.query<HTTPResponse<ITravelerList>, { id?: string }>({
      query: ({ id }) => ({
        url: `${API_ENDPOINTS.TRAVELERS}/${id}`,
        method: 'GET',
      }),
      providesTags: ['TRAVELERS'],
    }),

    addTraveler: builder.mutation<HTTPResponse<void>, FormData>({
      query: (formData) => ({
        url: `${API_ENDPOINTS.TRAVELERS}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['TRAVELERS'],
    }),

    updateTraveler: builder.mutation<HTTPResponse<void>, { body: FormData; id?: string }>({
      query: ({ body, id }) => ({
        url: `${API_ENDPOINTS.TRAVELERS}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['TRAVELERS'],
    }),

    deleteTraveler: builder.mutation<HTTPResponse<void>, { id: string | number }>({
      query: ({ id }) => ({
        url: `${API_ENDPOINTS.TRAVELERS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TRAVELERS'],
    }),
  }),
});
export const {
  useTravelersListQuery,
  useAddTravelerMutation,
  useDeleteTravelerMutation,
  useTravelersDetailsQuery,
  useUpdateTravelerMutation,
} = TravelersAPI;
