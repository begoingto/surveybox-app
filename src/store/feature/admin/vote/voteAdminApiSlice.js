import {apiSlice} from "@/store/api/apiSlice";

export const voteAdminSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVote: builder.query({
            // query: () => `votes`,
            query: ({page,limit}) => ({
                url: "/votes",
                params: {
                    page,
                    limit,
                },
            }),
            keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            providesTags: ["AdminVote"], // provideTags are used for updating cache
        }),
    }),
});
// auto generated hooks for getUser query (GET)
export const {
    useGetVoteQuery,
} = voteAdminSlice;


