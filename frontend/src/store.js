import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './services/authApi';  // Import Authentication API
import { tagApi } from './services/tagApi';   // Import Tag API
import authReducer from './services/authSlice'; // Import Auth Reducer

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,  // Authentication API reducer
    auth: authReducer,  // Authentication state
    [tagApi.reducerPath]: tagApi.reducer,    // Tag API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, tagApi.middleware), // Add both API middlewares
});

setupListeners(store.dispatch);
