import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NoticeState {
  dismissed: boolean;
}

const initialState: NoticeState = {
  dismissed: typeof window !== 'undefined' && sessionStorage.getItem('noticeDismissed') === 'true',
};

const noticeSlice = createSlice({
  name: 'notice',
  initialState,
  reducers: {
    dismissNotice(state) {
      state.dismissed = true;
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('noticeDismissed', 'true');
      }
    },
    resetNotice(state) {
      state.dismissed = false;
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('noticeDismissed');
      }
    },
  },
});

export const { dismissNotice, resetNotice } = noticeSlice.actions;
export default noticeSlice.reducer;
