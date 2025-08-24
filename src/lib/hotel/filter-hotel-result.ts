import { IHotelList } from '@/type/hotel/hotel.search.interface';
import { extractHotelFilterReturn } from './extract-hotel-filter-data';

export const filterHotelResult = (
  hotels: IHotelList[] | undefined,
  filterBy: Partial<extractHotelFilterReturn> | undefined,
) => {
  if (!hotels?.length) return [];

  const { cancellation, facilities, mealPlans, priceRange, ratings, roomTypes } = filterBy || {};

  const minPrice = Number(priceRange?.min);
  const maxPrice = Number(priceRange?.max);

  const useFacilities = facilities?.length;
  const useMealPlans = mealPlans?.length;
  const useRoomTypes = roomTypes?.length;
  const useRatings = ratings?.length;
  const useCancellation = cancellation?.length;

  return hotels.filter((hotel) => {
    const hotelPrice = Number(hotel.price_details.total_price || 0);

    // Price Range Filter
    if (
      priceRange &&
      !isNaN(minPrice) &&
      !isNaN(maxPrice) &&
      (hotelPrice < minPrice || hotelPrice > maxPrice)
    ) {
      return false;
    }

    // Ratings Filter
    if (useRatings) {
      if (ratings!.includes(0)) {
        if (hotel?.category) return false;
      } else if (!ratings!.includes(hotel?.category)) {
        return false;
      }
    }

    // Cancellation Filter
    if (useCancellation) {
      const { refundable } = hotel;
      const freeCancellation = hotel.cancellation_policy?.free_cancellation;

      const isRef = cancellation!.includes('Refundable');
      const isNonRef = cancellation!.includes('Non-refundable');
      const isFreeCan = cancellation!.includes('Free cancellation');
      const isPartCan = cancellation!.includes('Partial cancellation');

      if (
        (isRef && !refundable && cancellation!.length === 1) ||
        (isNonRef && refundable && cancellation!.length === 1) ||
        (isFreeCan && !freeCancellation && cancellation!.length === 1) ||
        (isPartCan && freeCancellation && cancellation!.length === 1)
      ) {
        return false;
      }

      if (
        cancellation!.length === 2 &&
        ((isRef &&
          !refundable &&
          (isNonRef || (isFreeCan && !freeCancellation) || (isPartCan && freeCancellation))) ||
          (isNonRef &&
            refundable &&
            ((isFreeCan && !freeCancellation) || (isPartCan && freeCancellation))) ||
          (isFreeCan && !freeCancellation && isPartCan && freeCancellation))
      ) {
        return false;
      }
    }

    // Facilities Filter (MUST match all)
    if (useFacilities) {
      const hotelFacilities = new Set(hotel.facilities?.split(';').map((f) => f.trim()) || []);
      if (!facilities!.every((f) => hotelFacilities.has(f as string))) return false;
    }

    // Meal Plan Filter (match at least one)
    if (useMealPlans) {
      const hotelMealPlans = new Set(hotel.details.boarding_details.map((m) => m?.trim()) || []);
      if (!mealPlans!.some((m) => hotelMealPlans.has(m as string))) return false;
    }

    // Room Type Filter (match at least one)
    if (useRoomTypes) {
      const hotelRoomTypes = new Set(hotel.rooms.map((room) => room.room_type) || []);
      if (!roomTypes!.some((r) => hotelRoomTypes.has(r as string))) return false;
    }

    return true;
  });
};
