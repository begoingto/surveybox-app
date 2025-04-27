import { apiSlice } from "@/store/api/apiSlice";

export const FeedbackSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        feedback: builder.mutation({
            query: (data) => ({
                url: "/feedbacks",
                method: "POST",
                body:{...data},
            }),
        }),
    }),
});
export const { useFeedbackMutation } = FeedbackSlice;


