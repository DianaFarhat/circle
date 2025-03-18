import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi"; // Import API for backend authentication

const initialState = {
  userInfo: null, // Stores user info from login/profile
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null; // Clear user info on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.getProfile.matchFulfilled, (state, { payload }) => {
        state.userInfo = payload; // ✅ Store user info from backend
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.userInfo = payload; // ✅ Store user info from login response
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
