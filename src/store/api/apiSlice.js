import { getUnencryptedRefreshToken } from "@/lib/cryptography";
import { getUserAvatar } from "@/lib/fileBase";
import { logout, setCredentials, setCurrentUser, setIsGlobalLoading } from "@/store/feature/auth/AuthSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken;
        // headers.set("content-type", "application/json");
        // headers.set('Access-Control-Allow-Origin', '*')
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});
// customer query re-authentication when token expired
const baseQueryWithReAuth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
        const refreshToken = await getUnencryptedRefreshToken();
        // console.log("refreshToken in apiSlice", refreshToken);
        if (refreshToken) {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ refreshToken }),
                    }
                );
                const resultResponse = await response.json();
                // console.log("response", resultResponse);
                if (resultResponse) {
                    // set access token to local storage
                    api.dispatch(setCredentials(resultResponse));
                    // set user data
                    const userResponse = await fetch(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                authorization: `Bearer ${resultResponse?.accessToken}`,
                            },
                        }
                    );
                    const userResult = await userResponse.json();
                    // console.log("userResult", userResult);
                    api.dispatch(setCurrentUser({ ...userResult.data, avatar: getUserAvatar(userResult.data.avatar) }));
                    if (userResult) {
                        api.dispatch(setIsGlobalLoading(false))
                    }
                    result = await baseQuery(args, api, extraOptions);
                } else if (resultResponse.code === 401) {
                    api.dispatch(logout());
                    // console.log("Your session has expired. Please login again.");
                }
            } catch (error) {
                // console.error("Failed to refresh access token", error);
                api.dispatch(logout());
            }
        } else {
            api.dispatch(logout());
            // console.log("Your session has expired. Please login again.");
        }
    }
    return result;
};


export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    tagTypes: [
        "SurveyBox",
        "SurveyMonth",
        'User',
        "Survey",
        'TotalSurvey',
        'Question',
        'Category',
        'Vote',
        'AdminUser',
        'AdminQuestion',
        'AdminTheme',
        'AdminCategory',
        'AdminSurvey',
    ],
    endpoints: (builder) => ({}),
});
