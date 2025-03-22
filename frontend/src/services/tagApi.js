export const tagsApi = createApi({
    reducerPath: "tagsApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:5000/api/tags", 
      credentials: "include",
    }),
    endpoints: (builder) => ({
      // ✅ Fetch all public tags (Fixed path)
      getPublicTags: builder.query({
        query: () => "/getPublicTags",
      }),
  
      // ✅ Create a private tag
      createTag: builder.mutation({
        query: (tagName) => ({
          url: "/createTag",
          method: "POST",
          body: { name: tagName }, //TODO: is this correct if it takes user and isPublic fields as well?
        }),
      }),
  
      // ✅ Attach tags to a meal (Max 20)
    
    }),
  });
  
  // Export hooks
  export const {
    useGetPublicTagsQuery,
    useCreateTagMutation,
} = tagsApi;
  