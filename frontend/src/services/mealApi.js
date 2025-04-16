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
        
        // ✅ Edit a Meal
        editMeal: builder.mutation({
          query: ({ mealId, mealData }) => ({
            url: `/editMeal/${mealId}`,
            method: 'PUT', // or 'PATCH' if you prefer partial updates
            body: mealData,
          }),
          invalidatesTags: ['MyMeals'], // Optionally re-fetch user's meals after edit
        }),

        // ✅ Get User Meals
        getUserMeals: builder.query({
          query: () => ({
            url: '/userMeals',
            method: 'GET',
          }),
          providesTags: ['MyMeals'],
      }),
        // ✅ Get Meal By Id
        getMealById: builder.query({
          query: (mealId) => ({
            url: `/${mealId.trim()}`,  // Dynamically include the mealId in the URL path
            method: 'GET',
          }),
        }),

        // ✅ Save Meal To User's My Meals
        saveMealAsCopy: builder.mutation({
          query: ({ mealId, mealData }) => ({
            url: `/saveToMyMeals/${mealId.trim()}`,
            method: 'POST',
            body: mealData,
          }),
          invalidatesTags: ['MyMeals'], 
        }),
        
        // ✅ Delete meal mutation
        deleteMeal: builder.mutation({
          query: (mealId) => ({
            url: `/deleteMeal/${mealId}`,
            method: 'DELETE',
          }),
          invalidatesTags: ['MyMeals'], 
        }),
  
    })
   
});

// Export hooks for easy access in components
export const {
  useCreateMealMutation,
  useGetPublicMealsQuery,
  useGetUserMealsQuery,
  useEditMealMutation,
  useGetMealByIdQuery,
  useSaveMealAsCopyMutation,
  useDeleteMealMutation,
} = mealApi;
