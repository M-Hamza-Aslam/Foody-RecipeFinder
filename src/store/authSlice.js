import { createSlice } from "@reduxjs/toolkit";
const authInitialState = { authenticated: false, authResponseData: {} };
const authSlice = createSlice({
  name: "authSlice",
  initialState: authInitialState,
  reducers: {
    login(state, actions) {
      state.authenticated = true;
      state.authResponseData = actions.payload.response;
    },
    logout(state) {
      state.authenticated = false;
      state.authResponseData = {};
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
