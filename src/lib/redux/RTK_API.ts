import { showToast } from '@/components/toast-utils';
import { baseURL, isProduction } from '@/request';
import { SITE_INFO } from '@/site-config';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { getSession, signOut } from 'next-auth/react';
import { TagTypes } from './tagTypes';

interface EnhancedFetchArgs extends FetchArgs {
  token?: string;
}

const baseQuery: BaseQueryFn<string | EnhancedFetchArgs, unknown, FetchBaseQueryError> =
  fetchBaseQuery({
    baseUrl: baseURL,
    credentials: 'include',
    prepareHeaders: async (headers, { getState: _state }) => {
      const session = await getSession();
      const token = session?.user?.backendToken;

      headers.set('token', `${SITE_INFO.token}`);

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
    },
  });

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: async (args: string | EnhancedFetchArgs, api, extraOptions) => {
    const response = await baseQuery(args, api, extraOptions);
    const method = (response?.meta as any)?.request?.method;
    const message = (response?.data as any)?.message;
    const errorMsg = (response?.error as any)?.data?.message;

    if (response?.data && method !== 'GET' && !isProduction) {
      showToast('success', message || 'Request successful');
    }

    if (response?.error && errorMsg && !isProduction) {
      showToast('error', errorMsg);
    }

    if (response.error?.status === 401) {
      signOut({ redirect: true, redirectTo: './' });
    }

    return response;
  },
  keepUnusedDataFor: 24 * 60,

  endpoints: () => ({}),
  tagTypes: Object.values(TagTypes),
});
