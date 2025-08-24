import {
  extractFlightFilterData,
  IExtractFlightFilter,
  IExtractFlightReturnType,
} from '@/lib/flight/extract-flight-filter-data';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFlightSelectOption {
  type?: 'CHEAPEST' | 'SHORTEST' | 'EARLIEST';
  price_range?: number[];
  airline?: string[];
  stoppage?: string;
  refundable?: boolean;
  aircraft?: string[];
  max_layover?: { index: number; value: number } | undefined;
  min_layover?: { index: number; value: number } | undefined;
  layover_city?: string[] | undefined;
  timeFrame?:
    | { type: 'departure' | 'arrival'; code: string; time: string; arr_index: number }[]
    | undefined;
}

interface UnifiedFlightFilterState {
  hasValue: boolean;
  defaultOption: IExtractFlightReturnType;
  selectOption: IFlightSelectOption;
}

const initialState: UnifiedFlightFilterState = {
  hasValue: false,
  defaultOption: {
    price_range: undefined,
    airline: [{ name: undefined, logo: undefined }],
    aircraft: [],
    airlines_lowest_price: [],
    layover: [],
    layover_city: [],
    layover_range: [],
    time_frame: undefined,
  },
  selectOption: { price_range: [] },
};

const extractFlightFilter = createSlice({
  name: 'flight_filter',
  initialState,
  reducers: {
    setFlightForExtractFilter: (state, action: PayloadAction<IExtractFlightFilter>) => {
      const result = extractFlightFilterData(action.payload);
      state.defaultOption = result;
      state.hasValue = false;
      if (result?.price_range?.length) state!.selectOption!.price_range = result.price_range;
    },
    setFlightFilters: (state, action: PayloadAction<Partial<IFlightSelectOption>>) => {
      state.selectOption = {
        ...state.selectOption,
        ...action.payload,
      };
      state.hasValue = true;
    },
    setDefaultFlightFilters: (state) => {
      state.selectOption = {
        price_range: [],
      };
      state.defaultOption = {
        price_range: undefined,
        airline: [{ name: undefined, logo: undefined }],
        aircraft: [],
        airlines_lowest_price: [],
        layover: [],
        layover_city: [],
        layover_range: [],
        time_frame: undefined,
      };
      state.hasValue = false;
    },
  },
});

export const { setFlightForExtractFilter, setFlightFilters, setDefaultFlightFilters } =
  extractFlightFilter.actions;

export default extractFlightFilter.reducer;
