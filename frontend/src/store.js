import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './services/authApi';  // Import Authentication API
import authReducer from './services/authSlice'; // Import Auth Reducer

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,  // Authentication API reducer
    auth: authReducer,  // Authentication state
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware), // Add both API middlewares
});

setupListeners(store.dispatch);
