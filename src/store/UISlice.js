import { createSlice } from "@reduxjs/toolkit";
const initialUISlice = {
  isShowFav: false,
  notification: null,
};

const UISlice = createSlice({
  name: "UI",
  initialState: initialUISlice,
  reducers: {
    toggleFav(state) {
      state.isShowFav = !state.isShowFav;
    },
    showNotification(state, actions) {
      state.notification = {
        status: actions.payload.status,
        titile: actions.payload.title,
        message: actions.payload.message,
      };
    },
    hideNotification(state) {
      state.notification = null;
    },
  },
});

export const UIActions = UISlice.actions;
export default UISlice.reducer;
