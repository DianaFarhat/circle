import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi"; // Import API for backend authentication

// 🔄 Load user data from localStorage (to persist session after refresh)
const storedUser = JSON.parse(localStorage.getItem("userInfo")) || null;

const initialState = {
  userInfo: storedUser, // ✅ Load user info from localStorage on start
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null; // Clear user info on logout
      localStorage.removeItem("userInfo"); // ✅ Remove from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.getProfile.matchFulfilled, (state, { payload }) => {
        state.userInfo = payload.data.user; // ✅ Correctly extract the user object
        localStorage.setItem("userInfo", JSON.stringify(payload.data.user)); // ✅ Save only the user data
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.userInfo = payload;
        localStorage.setItem("userInfo", JSON.stringify(payload)); // ✅ Save login info
      });
}, 
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
