export const API_ENDPOINTS = {
  LOGIN: 'auth/agent-b2c/login',
  TWO_FA_LOGIN: '/auth/agent-b2c/login/2fa',
  REGISTER: 'auth/agent-b2c/register',
  REGISTER_COMPLETE: 'auth/agent-b2c/register/complete',
  RESET_PASSWORD: 'auth/agent-b2c/reset-password',

  SEND_OTP: 'agent-b2c/email-otp/send',
  MATCH_OTP: 'agent-b2c/email-otp/match',

  PROFILE: 'agent-b2c/profile',
  CHANGE_PASSWORD: 'agent-b2c/profile/change-password',
  LOGOUT: 'logout',

  // SELECT____________
  AIRPORT_SEARCH: 'public/common/airport',
  HOTEL_LIST_SEARCH: 'public/common/location-hotel',

  // PUBLIC
  GET_COUNTRY: '/public/common/country',
  GET_COUNTRY_VISA: '/agent-b2c/visa/country',

  // FLIGHT____________
  SSE_FLIGHT_SEARCH: 'agent-b2c/flight/search/sse',
  FLIGHT_REVALIDATE: 'agent-b2c/flight/revalidate',
  FLIGHT_RULES: 'agent-b2c/flight/search/fare-rules',
  FLIGHT_BOOKED: 'agent-b2c/flight/booking',
  FLIGHT_BOOKED_LIST: 'agent-b2c/flight/booking',

  // HOTEL
  HOTEL_SEARCH: 'agent-b2c/hotel/search',
  HOTEL_DETAILS_ROOM: 'agent-b2c/hotel/rooms',
  HOTEL_RATE_CHECK: 'agent-b2c/hotel/room/recheck',
  HOTEL_BOOKING: 'agent-b2c/hotel/booking',

  // HOLIDAY
  CITY_LIST: 'public/common/city',
  SEARCH_HOLIDAY: 'agent-b2c/holiday/search',
  HOLIDAY_DETAILS: 'agent-b2c/holiday/search',
  BOOK_HOLIDAY: 'agent-b2c/holiday/booking',
  HOLIDAY_BOOKING_LIST: 'agent-b2c/holiday/booking',

  // VISA
  VISA: 'agent-b2c/visa',

  // TRAVELERS
  TRAVELERS: 'agent-b2c/traveler',

  // UMRAH
  UMRAH_LIST: 'agent-b2c/umrah',
  UMRAH_BOOKING_LIST: 'agent-b2c/umrah/booking',

  //BLOG
  BLOG_LIST: 'agent-b2c/blog',

  // SITE_CONFIG
  SITE_CONFIG_HOME: 'agent-b2c/config/home',
  ABOUT_US: 'agent-b2c/config/about-us',
  CONTACT_US: 'agent-b2c/config/contact-us',
  PRIVACY_POLICY: 'agent-b2c/config/privacy-policy',
  TERMS_AND_CONDITION: 'agent-b2c/config/terms-and-conditions',
  PAYMENT_METHOD: 'agent-b2c/config/accounts',

  //DEPOSIT
  DEPOSIT: 'agent-b2c/payments/deposit',

  //TRANSACTION
  TRANSACTION: 'agent-b2c/payments/ledger',

  //INVOICE
  INVOICE: 'agent-b2c/payments/invoice',

  //SUPPORT
  SUPPORT: 'agent-b2c/support-ticket',
};
