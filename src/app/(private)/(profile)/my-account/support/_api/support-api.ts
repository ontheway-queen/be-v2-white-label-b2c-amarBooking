import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { formatQueryParams } from '@/lib/helper';
import { baseApi } from '@/lib/redux/RTK_API';
import {
  ISupportConversation,
  ISupportDetails,
  ISupportList,
} from '@/type/support/support.interface';

import { HTTPResponse } from '@/type/type';

export const SupportAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    openSupport: builder.mutation<HTTPResponse<void>, FormData>({
      query: (body) => ({
        url: `${API_ENDPOINTS.SUPPORT}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['SUPPORT'],
    }),

    supportList: builder.query<
      HTTPResponse<ISupportList[]>,
      { status?: string; from_date?: string; to_date?: string; limit?: number; skip?: number }
    >({
      query: (arg) => {
        const url = formatQueryParams(`${API_ENDPOINTS.SUPPORT}`, arg);
        return {
          url: url,
          method: 'GET',
        };
      },
      providesTags: ['SUPPORT'],
    }),

    supportDetails: builder.query<HTTPResponse<ISupportDetails>, { id?: string }>({
      query: ({ id }) => ({
        url: `${API_ENDPOINTS.SUPPORT}/${id}`,
        method: 'GET',
      }),
      providesTags: ['SUPPORT'],
    }),

    supportMessages: builder.query<
      HTTPResponse<ISupportConversation[]>,
      { id?: string; limit?: number; skip?: number }
    >({
      query: ({ id, ...rest }) => {
        const url = formatQueryParams(`${API_ENDPOINTS.SUPPORT}/${id}/conversations`, rest);
        return {
          url: url,
          method: 'GET',
        };
      },
      providesTags: ['SUPPORT'],
    }),

    replySupport: builder.mutation<HTTPResponse<void>, { id?: string; body: FormData }>({
      query: ({ body, id }) => ({
        url: `${API_ENDPOINTS.SUPPORT}/${id}/conversations`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['SUPPORT'],
    }),

    closeSupport: builder.mutation<HTTPResponse<void>, { id: string | number }>({
      query: ({ id }) => ({
        url: `${API_ENDPOINTS.SUPPORT}/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['SUPPORT'],
    }),
  }),
});
export const {
  useSupportListQuery,
  useReplySupportMutation,
  useSupportMessagesQuery,
  useCloseSupportMutation,
  useSupportDetailsQuery,
  useOpenSupportMutation,
} = SupportAPI;
