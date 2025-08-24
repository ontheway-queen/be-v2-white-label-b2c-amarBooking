import { IHotelRecheckBody, IHotelRecheckBodyRoom } from '@/type/hotel/hotel.rateCheck.interface';
import { IHotelList } from '@/type/hotel/hotel.search.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import { RootState } from '../../store';

interface UnifiedHotelFilterState {
  selectedHotel: IHotelList | undefined;
  hotelPage: 'hotel-list' | 'hotel-details' | 'hotel-booking';
  roomCheckInfo?: IHotelRecheckBody | undefined;
  hotelTimer?: number;
}

const initialState: UnifiedHotelFilterState = {
  selectedHotel: undefined,
  hotelPage: 'hotel-list',
  roomCheckInfo: undefined,
  hotelTimer: undefined,
};

const hotelDataSlice = createSlice({
  name: 'hotel_data_slice',
  initialState,
  reducers: {
    setHotelPage: (
      state,
      action: PayloadAction<'hotel-list' | 'hotel-details' | 'hotel-booking'>
    ) => {
      state.hotelPage = action.payload;
    },

    setSelectHotel: (state, action: PayloadAction<IHotelList>) => {
      state.selectedHotel = action.payload;
    },

    setRoomCheckInfo: (
      state,
      action: PayloadAction<{
        search_id: string;
        from_date: string;
        to_date: string;
        rooms: IHotelRecheckBodyRoom[];
      }>
    ) => {
      const { search_id, from_date, to_date, rooms } = action.payload;
      const nights = differenceInCalendarDays(parseISO(to_date), parseISO(from_date));

      state.roomCheckInfo = {
        from_date,
        to_date,
        search_id,
        nights,
        rooms,
      };
    },

    setHotelExpiredTimer: (state, action: PayloadAction<number>) => {
      state.hotelTimer = action.payload;
    },
  },
});

export const { setSelectHotel, setHotelPage, setRoomCheckInfo, setHotelExpiredTimer } =
  hotelDataSlice.actions;

export const useSelectedHotel = (state: RootState) => state.selectedHotelData;

export default hotelDataSlice.reducer;
