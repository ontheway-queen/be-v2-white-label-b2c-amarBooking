import {
  extractHotelFilterData,
  extractHotelFilterReturn,
  IExtractHotelFilter,
} from '@/lib/hotel/extract-hotel-filter-data';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface UnifiedHotelFilterState {
  hasValue: boolean;
  defaultOption: extractHotelFilterReturn | undefined;
  selectedOption: Partial<extractHotelFilterReturn> | undefined;
}

const initialState: UnifiedHotelFilterState = {
  hasValue: false,
  defaultOption: undefined,
  selectedOption: { priceRange: { max: null, min: null } },
};

const extractHotelFilter = createSlice({
  name: 'hotel_filter',
  initialState,
  reducers: {
    setHotelForExtractFilter: (state, action: PayloadAction<IExtractHotelFilter>) => {
      const result = extractHotelFilterData(action.payload);
      state.defaultOption = result;
      state.hasValue = false;
      if (result?.priceRange) state!.selectedOption!.priceRange = result.priceRange;
    },
    setHotelFilters: (state, action: PayloadAction<Partial<extractHotelFilterReturn>>) => {
      state.selectedOption = {
        ...state.selectedOption,
        ...action.payload,
      };
      state.hasValue = true;
    },

    clearAllHotelFilters: (state) => {
      state.selectedOption = {
        priceRange: state.defaultOption?.priceRange || { min: null, max: null },
        cancellation: undefined,
        facilities: undefined,
        mealPlans: undefined,
        ratings: undefined,
        roomTypes: undefined,
      };
      state.hasValue = false;
    },

    removeHotelFilterItem: (
      state,
      action: PayloadAction<{
        key: keyof extractHotelFilterReturn;
        value?: unknown;
      }>,
    ) => {
      const { key, value } = action.payload;
      const current = state.selectedOption?.[key];

      if (Array.isArray(current)) {
        const filtered = current.filter((item) => item !== value);
        if (filtered.length === 0) {
          delete state.selectedOption?.[key];
        } else {
          state.selectedOption![key] = filtered as any;
        }
      } else {
        // For non-array values (like priceRange), handle special case
        if (key === 'priceRange') {
          if (state.defaultOption?.priceRange) {
            state.selectedOption!.priceRange = state.defaultOption.priceRange;
          }
        } else {
          delete state.selectedOption?.[key];
        }
      }

      // Clean up empty fields and update hasValue
      const keys = Object.keys(state.selectedOption || {});

      // If priceRange is the only key and it's equal to default, consider it "cleared"
      const isOnlyPriceRange =
        keys.length === 1 &&
        keys[0] === 'priceRange' &&
        JSON.stringify(state.selectedOption?.priceRange) ===
          JSON.stringify(state.defaultOption?.priceRange);

      state.hasValue = keys.length > 0 && !isOnlyPriceRange;
    },
  },
});

export const {
  setHotelForExtractFilter,
  setHotelFilters,
  clearAllHotelFilters,
  removeHotelFilterItem,
} = extractHotelFilter.actions;

export const useHotelFilter = (state: RootState) => state.extractHotelFilter;

export default extractHotelFilter.reducer;
