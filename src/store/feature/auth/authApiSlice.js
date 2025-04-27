import {apiSlice} from "@/store/api/apiSlice";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // mutation is using for POST PUT DELETE
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        // Mutation for register
        register: builder.mutation({
            query: (userData) => ({
                url: "/auth/register",
                method: "POST",
                body: { ...userData },
            }),
        }),

        update: builder.mutation({
            tagTypes: ['AuthMe'],
            query: (userData) => ({
                url: "/auth/me/update",
                method: "PUT",
                body: { ...userData },
                // mode: "no-cors",
                // providesTags: ["User"],
            }),
        }),
        verifyEmail: builder.mutation({
            query: ({ email, verifiedCode }) => ({
                url: '/auth/check-verify',
                method: 'GET',
                params: {
                    email,
                    verifiedCode,
                },
            }),
        }),
        // Mutation for updating personal information
        updatePersonalInfo: builder.mutation({
            query: (personalInfo) => ({
                url: '/auth/personal-info',
                method: 'PUT',
                body: { ...personalInfo },
            }),
        }),
        forgotPassword: builder.mutation({
            query: (credentials) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: { ...credentials },
            }),
        }),

        newPassword: builder.mutation({
            query: (newPasswordData) => ({
                url: "/auth/new-password",
                method: "PUT", // Change the method to PUT
                body: { ...newPasswordData },
            }),
        }),


    }),
});
export const {
    useRegisterMutation ,
    useLoginMutation ,
    useVerifyEmailMutation  ,
    useUpdateMutation,
    useUpdatePersonalInfoMutation,
    useForgotPasswordMutation, // Add this line for forgot password
    useNewPasswordMutation, // Add this line for new password
} = authApiSlice;
export default authApiSlice;