import { ITourList } from '@/type/holiday/holiday.interface';

export const extractHolidayFilterData = (data?: ITourList[]): IExtractHolidayFilterDataReturn => {
  // Initialize result sets
  const result = {
    cities: new Set<string>(),
    countries: new Set<string>(),
    holidayTypes: new Set<string>(),
    minPrice: Infinity,
    maxPrice: -Infinity,
  };

  data?.forEach((pkg) => {
    // Cities and countries
    if (pkg.cities && Array.isArray(pkg.cities)) {
      pkg.cities.forEach((city) => {
        if (city.city_name) result.cities.add(city.city_name);
        if (city.country) result.countries.add(city.country);
      });
    }

    // Holiday types
    if (pkg.holiday_type) {
      result.holidayTypes.add(pkg.holiday_type);
    }

    // Prices
    const price = parseFloat(pkg.price);
    if (!isNaN(price)) {
      if (price < result.minPrice) result.minPrice = price;
      if (price > result.maxPrice) result.maxPrice = price;
    }
  });

  // Convert sets to arrays
  const finalOutput = {
    cities: Array.from(result.cities),
    countries: Array.from(result.countries),
    holidayTypes: Array.from(result.holidayTypes),
    minPrice: result.minPrice,
    maxPrice: result.maxPrice,
  };

  return finalOutput;
};

export interface IExtractHolidayFilterDataReturn {
  cities: string[];
  countries: string[];
  holidayTypes: string[];
  minPrice: number;
  maxPrice: number;
}
