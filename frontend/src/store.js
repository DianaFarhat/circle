import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authApi';  // Import Authentication API


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);