export interface IHotelRoomListResponse {
  success: boolean;
  message: string;
  data: IHotelRoomList[];
}

export interface IHotelRoomList {
  boarding_details: string[];
  credit_deduction: string;
  currency: string;
  group_code: string;
  has_promotions: boolean;
  includes_boarding: boolean;
  no_of_rooms: number;
  pan_required: boolean;
  payment_type: PaymentType[];
  rate_comments: IRateComments;
  rate_key: string;
  rate_type: IRateType;
  room_code: string;
  rooms: IHotelRoomList[];
  supports_amendment: boolean;
  supports_cancellation: boolean;
  refundable: boolean;
  cancellation_policy?: IRoomListCancellation;
  price_details: IHotelRoomPricing;
  promotions_details?: IPromotionsDetail[];
}

export interface IRoomListCancellation {
  no_show_fee: number;
  details: IRoomListDetail[];
  free_cancellation: boolean;
}

export interface IRoomListDetail {
  fee: number;
  from_date: Date;
}

export enum PaymentType {
  AtWeb = 'AT_WEB',
}

export interface IHotelRoomPricing {
  price: number;
  tax: number;
  total_price: number;
}

export enum IPromotionsDetail {
  NonRefundableRateNoAmendmentsPermitted = 'Non-refundable rate. No amendments permitted',
}

export interface IRateComments {
  pax_comments: string;
}

export enum IRateType {
  Recheck = 'recheck',
}

export interface IHotelRoomList {
  children_ages: number[];
  description: string;
  no_of_adults: number;
  no_of_children: number;
  no_of_rooms: number;
  room_reference: string;
  room_type: string;
}
