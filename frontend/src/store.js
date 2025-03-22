import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from './services/authApi';  // Import Authentication API
import { tagApi } from './services/tagApi';
import authReducer from "./services/authSlice"; 

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer, // ✅ Include authentication state
    [tagApi.reducerPath]: tagApi.reducer,
  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);