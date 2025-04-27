import { apiSlice } from "@/store/api/apiSlice";


// const apiWithTage = apiSlice.enhanceEndpoints({addTagTypes: ['surveyMonth','TotalSurvey']})
export const DashboardSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboard: builder.query({
            query: () => ({
                url: '/dashboard',
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
            providesTags: ["TotalSurvey"],
        }),
        getAdminMonthly: builder.query({
            query: () => ({
                url: '/dashboard/graphs/admins',
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
            providesTags: ["TotalSurveyAdmin"],
        }),
        getSurveyMonthly: builder.query({
            query: () => ({
                url: '/dashboard/graphs',
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
            providesTags: ['surveyMonth'],

        }),
    }),
});

export const {
    useGetDashboardQuery,
    useLazyGetDashboardQuery,
    useGetSurveyMonthlyQuery,
    useLazyGetAdminMonthlyQuery
} = DashboardSlice;


