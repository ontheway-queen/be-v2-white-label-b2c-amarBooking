import { IBookingPax } from '@/app/(public)/flights/booking/_components/booking-form/flight-booking-from';
import { formatDate, removeEmptyValues } from '../helper';

export const flightBookPaxFormat = (data: IBookingPax[]) => {
  const passengers = data?.map((item) => {
    const { visa = [], passport = [], ...rest } = item ?? {};
    return {
      ...rest,
      date_of_birth: formatDate(rest.date_of_birth),
      passport_expiry_date: formatDate(rest.passport_expiry_date),
    };
  });

  return removeEmptyValues(passengers);
};
