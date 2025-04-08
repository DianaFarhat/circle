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
        
        // ✅ Get User Meals
        getUserMeals: builder.query({
          query: () => ({
            url: '/userMeals',
            method: 'GET',
          })  
      }),
        // ✅ Get Meal By Id
        getMealById: builder.query({
          query: (mealId) => ({
            url: `/${mealId.trim()}`,  // Dynamically include the mealId in the URL path
            method: 'GET',
          }),
        }),

        // ✅ ave Meal To User's My Meals
        saveMealAsCopy: builder.mutation({
          query: ({ mealId, mealData }) => ({
            url: `/saveToMyMeals/${mealId.trim()}`,
            method: 'POST',
            body: mealData,
          }),
        }),
        
  
    })
   
});

// Export hooks for easy access in components
export const {
  useCreateMealMutation,
  useGetPublicMealsQuery,
  useGetUserMealsQuery,
  useGetMealByIdQuery,
  useSaveMealAsCopyMutation,
} = mealApi;
