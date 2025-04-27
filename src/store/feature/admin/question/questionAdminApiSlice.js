import {apiSlice} from "@/store/api/apiSlice";

export const questionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // getQuestion: builder.query({
        //     query: ({_page,_limit}) => ({
        //         url: "/questions",
        //         params: {
        //             _page,
        //             _limit,
        //         },
        //     }),
        //     keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
        //     providesTags: ["AdminQuestion"], // provideTags are used for updating cache
        // }),
        getQuestion: builder.query({
            query: ({page,limit}) => ({
                url: "/questions/v2",
                params: {
                    page,
                    limit,
                },
            }),
        }),
        insertQuestion: builder.mutation({
            query: (values) => ({
                url: `/questions`,
                method: "POST",
                body: values,
            }),
        }),
        deleteQuestion: builder.mutation({
            query(id) {
                return {
                    url: `questions/${id}`,
                    method: 'DELETE',
                }
            },
        }),
    }),
});

export const {
    useGetQuestionQuery,
    useLazyGetQuestionQuery,
    useDeleteQuestionMutation
} = questionApiSlice;