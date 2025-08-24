import { defaultFlightFormValues } from '@/lib/CONSTANT';
import { IFlightSearchSchema } from '@/type/flight/flight.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const flightFormSlice = createSlice({
  name: 'flightForm',
  initialState: defaultFlightFormValues as IFlightSearchSchema,
  reducers: {
    setFlightSearch(state, action: PayloadAction<IFlightSearchSchema>) {
      const { tripType, from, to, departure, multiCityTrips } = action.payload;

      let updatedMultiCityTrips = [...multiCityTrips];

      if (tripType !== 'Multi-city') {
        updatedMultiCityTrips[0] = {
          from,
          to,
          departure,
        };
        updatedMultiCityTrips[1] = {
          from: undefined,
          to: undefined,
          departure: undefined,
        };
      }

      return {
        ...action.payload,
        multiCityTrips: updatedMultiCityTrips,
      };
    },
    resetFlightSearch() {
      return defaultFlightFormValues;
    },
  },
});

export const { setFlightSearch, resetFlightSearch } = flightFormSlice.actions;
export default flightFormSlice.reducer;
