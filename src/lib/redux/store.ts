import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { baseApi } from './RTK_API';
import extractFlightReducer from './slice/flight/extract-flight-filter-slice';
import flightFormReducer from './slice/flight/flight-search-form-slice';
import popoverReducer from './slice/flight/flight-search-popover-slice';
import flightSearchStatusReducer from './slice/flight/flight-search-status-slice';
import flightTimerReducer from './slice/flight/flight-timer-slice';
import hotelDataReducer from './slice/hotel/hotel-data-slice';
import modifyReducer from './slice/ModifySearchState';
import hotelFormReducer from './slice/hotel/hotel-search-form-slice';
import extractHotelReducer from './slice/hotel/extract-hotel-filter-slice';
import noticeSliceReducer from './slice/noticeSlice';
import popupReducer from './slice/popupSlice';

const flightFormPersistConfig = {
  key: 'session_flight_form',
  storage: storageSession,
};
const flightTimerPersist = {
  key: 'session_flight_timer',
  storage: storageSession,
};

const hotelFormPersistConfig = {
  key: 'session_hotel_form',
  storage: storageSession,
};
const noticePersistConfig = {
  key: 'session_notice',
  storage: storageSession,
};
const popupPersistConfig = {
  key: 'session_popup',
  storage: storageSession,
};

const flightFormPersist = persistReducer(flightFormPersistConfig, flightFormReducer);
const flightTimer = persistReducer(flightTimerPersist, flightTimerReducer);
const hotelFormPersist = persistReducer(hotelFormPersistConfig, hotelFormReducer);
const noticePersist = persistReducer(noticePersistConfig, noticeSliceReducer);
const popupPersist = persistReducer(popupPersistConfig, popupReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    flightForm: flightFormPersist,
    searchExpand: modifyReducer,
    extractFightFilter: extractFlightReducer,
    popover: popoverReducer,
    flightSearchStatus: flightSearchStatusReducer,
    extractHotelFilter: extractHotelReducer,
    hotelForm: hotelFormPersist,
    flightTimer: flightTimer,
    selectedHotelData: hotelDataReducer,
    notice: noticePersist,
    popup: popupPersist,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
