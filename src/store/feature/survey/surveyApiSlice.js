import {apiSlice} from "@/store/api/apiSlice";


export const surveyApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["SurveysFeature"],
    endpoints: (builder) => ({
        getSurvey: builder.query({
            query: ({page,limit,filters}) => ({
                url: "/surveys",
                params: {
                    page,
                    limit,
                    ...filters
                },
             }),
            keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            providesTags: ["Survey"], // provideTags are used for updating cache
        }),
        insertSurvey: builder.mutation({
            query: (data) => ({
                url: `/surveys`,
                method: "POST",
                body: { ...data },
            }),
        }),
        updateSurvey: builder.mutation({
            query: ({id,data}) => ({
                url: `/surveys/${id}`,
                method: "PUT",
                body: { ...data },
            }),
        }),
        updateSurveyQuestions: builder.mutation({
            query: ({id,data}) => ({
                url: `/surveys/${id}/survey-question`,
                method: "PUT",
                body: { ...data },
            }),
        }),
        updateStatusSurvey: builder.mutation({
            query: ({id,data}) => ({
                url: `/surveys/${id}/flipStatus`,
                method: "PUT",
                body: { ...data },
            }),
        }),
        getSingleSurvey: builder.query({
            query: (id) => ({ url: `surveys/${id}` })
        }),
        getSurveyResponse: builder.query({
            query: (id) => ({ url: `responses/survey/${id}` })
        })
    }),
});
export const {
    useGetSurveyQuery,
    useLazyGetSurveyQuery,
    useGetSingleSurveyQuery,
    useLazyGetSingleSurveyQuery,
    useInsertSurveyMutation,
    useUpdateSurveyMutation,
    useUpdateSurveyQuestionsMutation,
    useUpdateStatusSurveyMutation,
    useGetSurveyResponseQuery,
    useLazyGetSurveyResponseQuery
} = surveyApiSlice;
