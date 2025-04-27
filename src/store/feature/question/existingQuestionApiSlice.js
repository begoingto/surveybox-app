import {apiSlice} from "@/store/api/apiSlice";

export const existingQuestionApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["ExistingQuestions"],
    endpoints: (builder) => ({
        getExistingQuestions: builder.query({
            query: ({filters}) => ({
                url: `/existing-questions`,
                params: {
                    ...filters,
                },
            }),
            keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            // providesTags: (result) => result ? [
            //     ...result.map(({id}) => ({type: "ExistingQuestions", id})),{ type: "ExistingQuestions", id: "LIST" }
            // ]: [{type: "ExistingQuestions", id: "LIST" }], // provideTags are used for updating cache
        })
    }),
});

export const {
    useGetExistingQuestionsQuery,
    useLazyGetExistingQuestionsQuery,
} = existingQuestionApiSlice;