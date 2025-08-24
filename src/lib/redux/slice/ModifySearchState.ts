import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModifySearchState {
  isExpanded: boolean;
}

const initialState: ModifySearchState = {
  isExpanded: false,
};

const modifySearchSlice = createSlice({
  name: 'modifySearch',
  initialState,
  reducers: {
    setExpanded(state, action: PayloadAction<boolean>) {
      state.isExpanded = action.payload;
    },
    toggleExpanded(state) {
      state.isExpanded = !state.isExpanded;
    },
  },
});

export const { setExpanded, toggleExpanded } = modifySearchSlice.actions;
export default modifySearchSlice.reducer;
