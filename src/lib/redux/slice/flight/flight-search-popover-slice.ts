import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';

interface PopoverState {
  openState: Record<string, boolean>; // A record where the key is the popover name and the value is its open state (true/false)
}

const initialState: PopoverState = {
  openState: {
    from: false,
    to: false,
    departure: false,
    return: false,
  },
};

const popoverSlice = createSlice({
  name: 'popover',
  initialState,
  reducers: {
    setPopoverOpen(state, action: PayloadAction<string>) {
      state.openState = { ...state.openState, [action.payload]: true }; // Set the specific popover to open
    },
    setPopoverClose(state, action: PayloadAction<string>) {
      state.openState = { ...state.openState, [action.payload]: false }; // Set the specific popover to close
    },
    setPopoverSwitch(state, action: PayloadAction<{ current: string; next: string }>) {
      state.openState[action.payload.current] = false;
      state.openState[action.payload.next] = true;
    },
  },
});

export const { setPopoverOpen, setPopoverClose, setPopoverSwitch } = popoverSlice.actions;

export default popoverSlice.reducer;

export const popoverOpenorder = [
  'from',
  'to',
  'departure',
  'return',
  'multiCityTrips.0.from',
  'multiCityTrips.0.to',
  'multiCityTrips.0.departure',

  'multiCityTrips.1.from',
  'multiCityTrips.1.to',
  'multiCityTrips.1.departure',

  'multiCityTrips.2.from',
  'multiCityTrips.2.to',
  'multiCityTrips.2.departure',

  'multiCityTrips.3.from',
  'multiCityTrips.3.to',
  'multiCityTrips.3.departure',

  'multiCityTrips.4.from',
  'multiCityTrips.4.to',
  'multiCityTrips.4.departure',

  'multiCityTrips.5.from',
  'multiCityTrips.5.to',
  'multiCityTrips.5.departure',
];

export const delayedPopoverSwitch = (current: string, next: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setPopoverClose(current));
    setTimeout(() => {
      dispatch(setPopoverOpen(next));
    }, 200);
  };
};
