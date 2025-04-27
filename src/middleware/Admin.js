import React, {useEffect} from 'react';
import {setCredentials, setCurrentUser} from "@/store/feature/auth/AuthSlice";
import {useSession} from "next-auth/react";
import {usePathname, useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {useLazyGetUserQuery} from "@/store/feature/user/UserSlice";

function Admin({children}) {
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
                    router.push("/")
                    break;
            }
            if (session.user) {
                try {
                    const {authMeDto, accessToken, refreshToken} = JSON.parse(session.user.image)
                    dispatch(setCredentials({accessToken, refreshToken}))
                    fetchCurrentUser().then(res => {
                        const { data, isSuccess } = res
                        if (isSuccess){
                            dispatch(setCurrentUser(data.data))
                            const roles = authMeDto.roles.map(role => role.name)
                            if (!roles.includes("ADMIN")){
                                router.push("/surveycreator/dashboard")
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
                case "admin":
                    router.push("/")
                    break;
            }
        }

    }, [session,status]);
    return children;
}

export default Admin;