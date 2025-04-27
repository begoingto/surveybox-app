import {apiSlice} from "@/store/api/apiSlice";

export const themeAdminSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTheme: builder.query({
            query: () => ({
                url: "/themes",

            }),
        }),
        keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
        providesTags: ["AdminTheme"], // provideTags are used for updating cache
    }),
});
// auto generated hooks for getUser query (GET)
export const {
    useGetThemeQuery,
} = themeAdminSlice;


