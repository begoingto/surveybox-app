import {apiSlice} from "@/store/api/apiSlice";

export const questionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuestions: builder.query({
            query: () => ({
                url: "/questions"
            }),
            keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            providesTags: ["Questions"], // provideTags are used for updating cache
        }),
        getQuestionsV2: builder.query({
            query: ({page,limit,filters}) => ({
                url: "/questions/v2",
                params: {
                    page,
                    limit,
                    ...filters
                }
            })
        }),
        getQuestion: builder.query({
            query: ({id}) => ({
                url: `/questions/${id}`
            })
        }),
        insertQuestion: builder.mutation({
            query: (data) => ({
                url: `/questions`,
                method: "POST",
                body: {...data}
            })
        })
    }),
});

export const {
    useGetQuestionsQuery,
    useGetQuestionsV2Query,
    useLazyGetQuestionsQuery,
    useLazyGetQuestionsV2Query,
    useGetQuestionQuery,
    useInsertQuestionMutation
} = questionApiSlice;