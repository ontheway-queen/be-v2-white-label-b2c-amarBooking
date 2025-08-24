// flightSearchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FlightSearchState {
  isLoading: boolean;
  error: boolean;
  isResponseEnd: boolean;
}

const initialState: FlightSearchState = {
  isLoading: false,
  error: false,
  isResponseEnd: true,
};

const flightSearchSlice = createSlice({
  name: 'flightSearchStatus',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    setIsResponseEnd: (state, action: PayloadAction<boolean>) => {
      state.isResponseEnd = action.payload;
    },
    resetFlightSearchState: () => initialState,
  },
});

export const { setLoading, setError, setIsResponseEnd, resetFlightSearchState } =
  flightSearchSlice.actions;

export default flightSearchSlice.reducer;
