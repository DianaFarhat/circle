import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './services/authApi';  // Import Authentication API
import { mealApi } from './services/mealApi';
import authReducer from './services/authSlice'; // Import Auth Reducer

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,  // Authentication API reducer
    auth: authReducer,  // Authentication state
    [mealApi.reducerPath]: mealApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, mealApi.middleware), // Add both API middlewares
});

setupListeners(store.dispatch);
