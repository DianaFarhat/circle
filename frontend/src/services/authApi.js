import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/users', // API base path for authentication
    credentials: 'include', // Enables cookies for session management
  }),
  endpoints: (builder) => ({
    // ✅ User Signup
    signup: builder.mutation({
      query: (userData) => ({
        url: '/signup',
        method: 'POST',
        body: userData,
      }),
    }),

    // ✅ User Login
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // ✅ Logout User
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),

    // ✅ Update Password (Protected Route)
    updatePassword: builder.mutation({
      query: (passwordData) => ({
        url: '/update-password',
        method: 'PATCH',
        body: passwordData,
      }),
    }),

    // ✅ Get Current User Profile (Protected Route)
    getProfile: builder.query({
      query: () => '/profile',
    }),

    // ✅ Update User Profile (Protected Route)
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: '/profile',
        method: 'PUT',
        body: profileData,
      }),
    }),

    // ✅ Delete Account (Protected Route)
    deleteAccount: builder.mutation({
      query: () => ({
        url: '/delete-account',
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks for easy access in components
export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdatePasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteAccountMutation,
} = authApi;
