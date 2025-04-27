import {apiSlice} from "@/store/api/apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: ({_page,_limit}) => ({
                url: "/categories",
                method:"GET",
                params: {
                    _page,
                    _limit,
                },
            }),
            keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            providesTags: ["Category"], // provideTags are used for updating cache
        }),
        insertCategory: builder.mutation({
            query: (values) => ({
                url: `/categories`,
                method: "POST",
                body: values,
            }),
        }),
        deleteCategory: builder.mutation({
            query(id) {
                return {
                    url: `categories/${id}`,
                    method: 'DELETE',
                }
            },
        }),
        updateCategory: builder.mutation({
            query: ({id,data}) => ({
                url: `categories/${id}`,
                method: 'PUT',
                body: {...data},
            }),
        }),
    }),
});
export const { useGetCategoriesQuery,
    useInsertCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation} = categoryApiSlice;