import { ILoginOtpSchema } from '@/app/(public)/(auth)/_components/login-otp';
import { ISignupSchema } from '@/app/(public)/(auth)/_components/sign-up-page';
import { IPaymentMethod } from '@/app/(public)/payment-method/page';
import { IAirportSchema } from '@/type/flight/flight.interface';
import { HTTPResponse, ILoginResponse, IMatchOTPResponse, IMyProfileRes } from '@/type/type';
import { IUserCreatedResponse } from '@/type/user/user.interface';
import { formatQueryParams } from '../helper';
import { baseApi } from '../redux/RTK_API';
import { API_ENDPOINTS } from './endpoint-list';

export const CommonAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    airportList: builder.query<HTTPResponse<IAirportSchema[]>, { name?: string }>({
      query: ({ name }) => {
        return {
          url: `${API_ENDPOINTS.AIRPORT_SEARCH}?skip=0&limit=20&name=${name}`,
          method: 'GET',
        };
      },

      providesTags: ['AIRPORT_LIST'],
      
    }),

    getFlightRules: builder.query<
      HTTPResponse<IAirportSchema[]>,
      { search_id?: string; flight_id?: string }
    >({
      query: ({ flight_id, search_id }) => {
        return {
          url: `${API_ENDPOINTS.FLIGHT_RULES}?search_id=${search_id}&flight_id=${flight_id}`,
          method: 'GET',
        };
      },

      providesTags: ['AIRPORT_LIST'],
    }),

    cityList: builder.query<
      HTTPResponse<{ id: number; name: string; country_name: string }[]>,
      { name?: string; country_id?: string | number; city_id?: string | number }
    >({
      query: (arg) => {
        const url = formatQueryParams(API_ENDPOINTS.CITY_LIST, { ...arg, skip: 0, limit: 100 });
        return {
          url: url,
          method: 'GET',
        };
      },

      providesTags: ['CITY_LIST'],
    }),

    countryList: builder.query<
      HTTPResponse<{ id: number; name: string; iso: string }[]>,
      { name?: string }
    >({
      query: (arg) => {
        const url = formatQueryParams(API_ENDPOINTS.GET_COUNTRY, { ...arg, skip: 0, limit: 20 });
        return {
          url: url,
          method: 'GET',
        };
      },

      providesTags: ['COUNTRY_LIST'],
    }),
    visaCountryList: builder.query<
      HTTPResponse<{ id: number; name: string; iso: string }[]>,
      { name?: string }
    >({
      query: (arg) => {
        const url = formatQueryParams(API_ENDPOINTS.GET_COUNTRY_VISA, {
          ...arg,
          skip: 0,
          limit: 20,
        });
        return {
          url: url,
          method: 'GET',
        };
      },

      providesTags: ['COUNTRY_LIST'],
    }),

    updateProfile: builder.mutation<HTTPResponse<void>, FormData>({
      query: (body) => {
        return {
          url: `${API_ENDPOINTS.PROFILE}`,
          method: 'PATCH',
          body: body,
        };
      },

      invalidatesTags: ['PROFILE_UPDATE'],
    }),

    getProfile: builder.query<HTTPResponse<IMyProfileRes>, { name?: string }>({
      query: (body) => {
        return {
          url: `${API_ENDPOINTS.PROFILE}`,
          method: 'GET',
        };
      },

      providesTags: ['PROFILE_UPDATE'],
    }),
    changePassword: builder.mutation<
      HTTPResponse<void>,
      { old_password: string; new_password: string }
    >({
      query: (body) => {
        return {
          url: `${API_ENDPOINTS.CHANGE_PASSWORD}`,
          method: 'POST',
          body: body,
        };
      },

      invalidatesTags: ['PROFILE_UPDATE'],
    }),

    signUpAccount: builder.mutation<IUserCreatedResponse, ISignupSchema>({
      query: (body) => {
        return {
          url: `${API_ENDPOINTS.REGISTER}`,
          method: 'POST',
          body: body,
        };
      },

      invalidatesTags: ['PROFILE_UPDATE'],
    }),

    checkTokenAccount: builder.mutation<ILoginResponse, { token?: string }>({
      query: (body) => {
        return {
          url: `${API_ENDPOINTS.REGISTER_COMPLETE}`,
          method: 'POST',
          body: body,
        };
      },

      invalidatesTags: ['PROFILE_UPDATE'],
    }),

    sendOTP: builder.mutation<
      HTTPResponse<{ email: string }>,
      { type?: 'reset_agent_b2c'; email: string }
    >({
      query: (body) => {
        return {
          url: `${API_ENDPOINTS.SEND_OTP}`,
          method: 'POST',
          body: body,
        };
      },

      invalidatesTags: ['PROFILE_UPDATE'],
    }),

    matchOTP: builder.mutation<
      IMatchOTPResponse,
      {
        type: 'reset_agent_b2c';
        email: string;
        otp: string;
      }
    >({
      query: (body) => {
        return {
          url: `${API_ENDPOINTS.MATCH_OTP}`,
          method: 'POST',
          body: body,
        };
      },

      invalidatesTags: ['PROFILE_UPDATE'],
    }),

    resetPassword: builder.mutation<
      HTTPResponse<void>,
      {
        token: string;
        password: string;
      }
    >({
      query: (body) => {
        return {
          url: `${API_ENDPOINTS.RESET_PASSWORD}`,
          method: 'POST',
          body: body,
        };
      },

      invalidatesTags: ['PROFILE_UPDATE'],
    }),

    twoFALogin: builder.mutation<HTTPResponse<void>, ILoginOtpSchema>({
      query: (body) => {
        return {
          url: `${API_ENDPOINTS.TWO_FA_LOGIN}`,
          method: 'POST',
          body: body,
        };
      },

      invalidatesTags: ['PROFILE_UPDATE'],
    }),

    subsEmail: builder.mutation<HTTPResponse<void>, { email?: string }>({
      query: (body) => {
        return {
          url: `${API_ENDPOINTS.EMAIL_SUBSCRIPTION}`,
          method: 'POST',
          body: body,
        };
      },
    }),
    paymentMethod: builder.query<HTTPResponse<IPaymentMethod[]>, { name?: string }>({
      query: (arg) => {
        const url = formatQueryParams(API_ENDPOINTS.PAYMENT_METHOD, { ...arg, skip: 0, limit: 20 });
        return {
          url: url,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useAirportListQuery,
  useGetFlightRulesQuery,
  useUpdateProfileMutation,
  useGetProfileQuery,
  useChangePasswordMutation,
  useSignUpAccountMutation,
  useCheckTokenAccountMutation,
  useSendOTPMutation,
  useMatchOTPMutation,
  useResetPasswordMutation,
  useCityListQuery,
  useTwoFALoginMutation,
  useCountryListQuery,
  useVisaCountryListQuery,
  useSubsEmailMutation,
  usePaymentMethodQuery,
} = CommonAPI;
