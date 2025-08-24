import { createSlice } from '@reduxjs/toolkit';

interface PopupState {
  isOpen: boolean;
  hasBeenShown: boolean;
}

const initialState: PopupState = {
  isOpen: false,
  hasBeenShown: typeof window !== 'undefined' && sessionStorage.getItem('popupShown') === 'true',
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openPopup(state) {
      state.isOpen = true;
      state.hasBeenShown = true;
      sessionStorage.setItem('popupShown', 'true');
    },
    closePopup(state) {
      state.isOpen = false;
    },
    resetPopup(state) {
      state.isOpen = false;
      state.hasBeenShown = false;
      sessionStorage.removeItem('popupShown');
    },
  },
});

export const { openPopup, closePopup, resetPopup } = popupSlice.actions;
export default popupSlice.reducer;
