import { apiSlice } from "@/store/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => `/auth/me`,
            keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            providesTags: ["User"], // provideTags are used for updating cache
        }),
    }),
});
// auto generated hooks for getUser query (GET)
export const {
    useGetUserQuery,
    useLazyGetUserQuery,
} = userApiSlice;


