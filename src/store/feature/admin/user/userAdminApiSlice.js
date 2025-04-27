import {apiSlice} from "@/store/api/apiSlice";

export const userAdminSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAdminUser: builder.query({
            query: ({page,limit}) => ({
                url: "/users",
                params:{
                    page,
                    limit
                }
            }),
            keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            providesTags: ["AdminUser"], // provideTags are used for updating cache
        }),
        updateStatusUser: builder.mutation({
            query: ({id,data}) => ({
                url: `/users/${id}/flipStatus`,
                method: "PUT",
                body: { ...data },
            }),
        }),

    }),
});
// auto generated hooks for getUser query (GET)
export const {
    useGetUserQuery,
    useLazyGetAdminUserQuery,
    useUpdateStatusUserMutation
} = userAdminSlice;


