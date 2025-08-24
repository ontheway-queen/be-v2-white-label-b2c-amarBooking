import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FlightTimer {
  flightTimer?: number;
}

const initialState: FlightTimer = {
  flightTimer: undefined,
};

const flightTimerSlice = createSlice({
  name: 'flight_timer',
  initialState,
  reducers: {
    setFlightExpiredTimer: (state, action: PayloadAction<number>) => {
      state.flightTimer = action.payload;
    },
  },
});

export const { setFlightExpiredTimer } = flightTimerSlice.actions;

export default flightTimerSlice.reducer;
