import { defaultHotelFormValue } from '@/lib/CONSTANT';
import { IHotelsSearchSchema } from '@/type/hotel/hotel.interface';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type HotelFormState = IHotelsSearchSchema | null;

const hotelFormSlice = createSlice({
  name: 'hotelSearchForm',
  initialState: defaultHotelFormValue as HotelFormState,
  reducers: {
    setHotelSearch(state, action: PayloadAction<IHotelsSearchSchema>) {
      return action.payload;
    },
    resetHotelSearch() {
      return defaultHotelFormValue;
    },
  },
});

export const { setHotelSearch, resetHotelSearch } = hotelFormSlice.actions;
export default hotelFormSlice.reducer;
