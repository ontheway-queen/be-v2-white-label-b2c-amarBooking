import { IHotelList } from '@/type/hotel/hotel.search.interface';

export interface IExtractHotelFilter {
  hotels: IHotelList[] | undefined;
}

export const extractHotelFilterData = ({
  hotels,
}: IExtractHotelFilter): extractHotelFilterReturn => {
  if (!hotels?.length) {
    return {
      priceRange: { min: 0, max: 0 },
      ratings: [],
      facilities: [],
      mealPlans: [],
      roomTypes: [],
    };
  }

  const result = hotels.reduce(
    (acc, hotel) => {
      // Track min and max prices
      const price = Number(hotel.price_details.total_price || 0);
      if (typeof price === 'number') {
        acc.priceRange.min = Math.min(acc.priceRange.min, price);
        acc.priceRange.max = Math.max(acc.priceRange.max, price);
      }

      // Process ratings
      if (hotel.category) {
        acc.ratings.add(hotel.category);
      } else {
        acc.ratings.add(0);
      }

      // Process facilities
      if (hotel.facilities) {
        hotel.facilities
          .split(';')
          .map((facility) => facility.trim())
          .filter(Boolean)
          .forEach((facility) => acc.facilities.add(facility));
      }

      // Process meal plans
      hotel.details.boarding_details
        .map((meal) => meal?.trim())
        .filter(Boolean)
        .forEach((meal) => acc.mealPlans.add(meal));

      // Process room types
      hotel.rooms
        .filter((room) => room?.room_type)
        .forEach((room) => acc.roomTypes.add(room.room_type));

      return acc;
    },
    {
      priceRange: { min: Infinity, max: -Infinity },
      ratings: new Set(),
      facilities: new Set(),
      mealPlans: new Set(),
      roomTypes: new Set(),
    },
  );

  return {
    priceRange: result.priceRange,
    ratings: Array.from(result.ratings),
    facilities: Array.from(result.facilities),
    mealPlans: Array.from(result.mealPlans),
    roomTypes: Array.from(result.roomTypes),
  };
};

export interface extractHotelFilterReturn {
  priceRange: {
    min: number | null;
    max: number | null;
  };
  ratings: unknown[];
  facilities: unknown[];
  mealPlans: unknown[];
  roomTypes: unknown[];
  cancellation?: unknown[];
}
