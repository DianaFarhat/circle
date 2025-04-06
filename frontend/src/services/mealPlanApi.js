import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mealPlanApi = createApi({
  reducerPath: 'mealPlanApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/mealPlan',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    // ✅ Add Meal to Plan
    addMealToPlan: builder.mutation({
      query: (mealPlanData) => ({
        url: '/addMealToPlan',
        method: 'POST',
        body: mealPlanData,
      }),
    }),

    // ✅ Remove Meal from Plan
    removeMealFromPlan: builder.mutation({
      query: (mealId) => ({
        url: `/removeMealFromPlan/${mealId}`,
        method: 'DELETE',
      }),
    }),

    // ✅ Get User's Meal Plan (with optional date range)
    getUserMealPlan: builder.query({
      query: ({ userId, startDate, endDate }) => {
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);

        return {
          url: `/user/${userId}?${params.toString()}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useAddMealToPlanMutation,
  useRemoveMealFromPlanMutation,
  useGetUserMealPlanQuery,
} = mealPlanApi;
