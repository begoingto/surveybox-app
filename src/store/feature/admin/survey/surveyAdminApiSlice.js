import {apiSlice} from "@/store/api/apiSlice";

export const surveyAdminApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["SurveysFeature"],
    endpoints: (builder) => ({
        getSurvey: builder.query({
            query: ({page,limit}) => ({
                url: "/surveys",
                params: {
                    page,
                    limit,
                },
            }),
            keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            providesTags: ["AdminSurvey"], // provideTags are used for updating cache
        }),
    }),
});
export const {
    useGetSurveyQuery
} = surveyAdminApiSlice;