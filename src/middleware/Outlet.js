'use client'
import {useSession} from "next-auth/react";
import {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {setCredentials, setCurrentUser} from "@/store/feature/auth/AuthSlice";



export default function Outlet({ children }) {
    const {data: session, status} = useSession()
    const router = useRouter()
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
                    dispatch(setCurrentUser(authMeDto))
                    const roles = authMeDto.roles.map(role => role.name)
                    if (roles.includes("ADMIN")){
                        router.push("/admin/dashboard")
                    }else {
                        if (authMeDto.firstLogin) {
                            router.push("/surveycreator/dashboard");
                        } else {
                            router.push("/personal-info/step-1");
                        }
                    }
                }catch (e) {
                    throw new Error("Invalid session")
                }
            }
        }

    }, [dispatch, paths, router, session, status]);

    return children;
}

