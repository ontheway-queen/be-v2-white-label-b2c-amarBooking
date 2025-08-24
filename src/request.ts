export const production_url: string = 'https://server.bookingexpert.us/api/v2';
export const local_url = 'http://10.10.220.23:9000/api/v2';
// export const local_url = 'http://10.10.220.25:9000/api/v2';

export const imageHostLink = 'https://m360ict-data.s3.ap-south-1.amazonaws.com/booking-expert-v2';
export const grnImageBase = 'https://images.grnconnect.com/';

export const isProduction = process.env.NODE_ENV === 'production';

export const baseURL: string = isProduction ? production_url : local_url;

// export const dev_agency_token = 'e662ef4a-0a2b-4979-a354-e4d564f4cfbe';
export const dev_agency_token = '990de3da-77ae-457b-b4c2-8784a369dcf8';
export const prod_agency_token = '19baf924-0994-42aa-bd39-9191dc3f74be';

export const agency_token = isProduction ? prod_agency_token : dev_agency_token;
