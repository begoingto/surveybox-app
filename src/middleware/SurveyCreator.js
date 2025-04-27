import React, {useEffect} from 'react';
import {usePathname, useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {useDispatch} from "react-redux";
import {setCredentials, setCurrentUser} from "@/store/feature/auth/AuthSlice";
import {useLazyGetUserQuery} from "@/store/feature/user/UserSlice";

function SurveyCreator({children}) {
    const [fetchCurrentUser] = useLazyGetUserQuery()
    const router = useRouter()
    const {data: session, status} = useSession()
    const dispatch = useDispatch()
    const pathname = usePathname()
    const paths = pathname.split("/").filter(el => el!=="")

    useEffect(() => {
        if (session) {
            switch (paths[0]) {
                case "sign-in":
                case "sign-up":
                    router.push("/surveycreator/dashboard")
                    break;
            }
            if (session.user){
                try {
                    const {authMeDto, accessToken, refreshToken} = JSON.parse(session.user.image)
                    dispatch(setCredentials({accessToken, refreshToken}))
                    fetchCurrentUser().then(res => {
                        const { data, isSuccess } = res
                        if (isSuccess){
                            dispatch(setCurrentUser(data.data))
                            const roles = authMeDto.roles.map(role => role.name)
                            if (!roles.includes("SURVEY_CREATOR")){
                                router.push("/admin/dashboard")
                            }
                        }
                    })
                }catch (e){
                    throw new Error("Invalid session")
                }
            }
        }

        if (status === "unauthenticated"){
            switch (paths[0]) {
                case "surveycreator":
                    router.push("/")
                    break;
            }
        }
    }, [session]);

    return children;
}

export default SurveyCreator;