import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mealApi = createApi({
  reducerPath: 'mealApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/meals', // API base path for meals
    credentials: 'include', // Enables cookies for session management
  }),
  endpoints: (builder) => ({
        // ✅ Create a Meal
        createMeal: builder.mutation({
        query: (mealData) => ({
            url: '/createMeal', // Ensure this matches your backend route for creating a meal
            method: 'POST',
            body: mealData, // Data you want to send in the request body
          }),
        }),
        
        // ✅ Get Public Meals
        getPublicMeals: builder.query({
          query: () => ({
              url: '/publicMeals',
              method: 'GET',
          }),
        }),
  
    })
   
});

// Export hooks for easy access in components
export const {
  useCreateMealMutation,
  useGetPublicMealsQuery,
} = mealApi;
