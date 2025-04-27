import {apiSlice} from "@/store/api/apiSlice";


export const voteApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVote: builder.query({
            // query: () => `votes`,
            query: ({_page,_limit}) => ({
                url: "/votes",
                params: {
                    _page,
                    _limit,
                },
            }),
            keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            providesTags: ["Vote"], // provideTags are used for updating cache
        }),
        postVote: builder.mutation({
            query: (data) => ({
                url: `/votes`,
                method: "POST",
                body: { ...data },
            }),
        }),
        updateVote: builder.mutation({
            query: ({id,data}) => ({
                url: `/votes/${id}`,
                method: "PUT",
                body: { ...data },
            }),
        }),
        getSingleVote: builder.query({
            query: (id) => ({ url: `votes/${id}` })
        }),
        registerVoteResult: builder.mutation({
            query: (id) => ({
                url: `vote-results/${id}/register`,
                method: "POST",
            }),
        }),
        getVoteResponse: builder.query({
            query: () => "votes/response", // Relative URL for the endpoint
            method: "GET", // Specify the HTTP method as GET
        }),
        getVoteResponseById: builder.query({
            query: (id) => `votes/response/${id}`, // Relative URL with the dynamic {id} parameter
            method: "GET", // Specify the HTTP method as GET
        }),
    }),
});
export const {  useGetVoteQuery ,
                useLazyGetVoteQuery,
                useGetSingleVoteQuery,
                useLazyGetSingleVoteQuery,
                usePostVoteMutation,
                useUpdateVoteMutation,
                useRegisterVoteResultMutation,
                useGetVoteResponseQuery,
                useGetVoteResponseByIdQuery,
            } = voteApiSlice;

