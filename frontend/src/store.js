import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './services/authApi';  // Import Authentication API
import { mealApi } from './services/mealApi';
import { mealPlanApi } from './services/mealPlanApi';
import authReducer from './services/authSlice'; // Import Auth Reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,  // Authentication state
    [authApi.reducerPath]: authApi.reducer,  // Authentication API reducer
    [mealApi.reducerPath]: mealApi.reducer,
    [mealPlanApi.reducerPath]: mealPlanApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, mealApi.middleware, mealPlanApi.middleware), // Add both API middlewares
});

setupListeners(store.dispatch);
