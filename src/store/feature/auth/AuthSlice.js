import {removeRefreshToken, secureRefreshToken} from "@/lib/cryptography";
import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    user: null,
    accessToken: null,
    roles: [],
    isGlobalLoading: true,
    loadingLogout: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.accessToken = action.payload.accessToken;
            // store refresh token in secure way
            secureRefreshToken(action.payload.refreshToken);
        },
        setCurrentUser: (state, action) => {
            state.user = action.payload;
        },
        setUserRoles: (state, action) => {
            state.roles = action.payload;
        },
        setIsGlobalLoading: (state, action) => {
            state.isGlobalLoading = action.payload;
        },
        setLoadingLogout: (state, action) => {
            state.loadingLogout = action.payload;
        },
        logout: (state) => {
            state.user = "";
            state.accessToken = null;
            removeRefreshToken()
        },
    },
});

export const {
    setCredentials,
    logout,
    setCurrentUser,
    setUserRoles,
    setIsGlobalLoading,
    setLoadingLogout
} = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state) => state?.auth.user;
export const selectCurrentAccessToken = (state) => state?.auth.accessToken;
export const selectUserRoles = (state) => state.auth.roles;

export const selectIsGlobalLoading = (state) => state.auth.isGlobalLoading;
export const selectLoadingLogout = state => state.auth.loadingLogout