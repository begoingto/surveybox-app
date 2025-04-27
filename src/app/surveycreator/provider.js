"use client"
import { Provider } from "react-redux";
import store from '../../store/store'
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {getUnencryptedRefreshToken} from "@/lib/cryptography";

export default function Providers({ children }) {
    const router = useRouter();
    useEffect(() => {
        async function checkSession() {
            const session = await getUnencryptedRefreshToken();
            if (!session) {
                router.push("/");
            }
        }
        checkSession();
    }, [router]);
    return <Provider store={store}>
        {children}
    </Provider>;
}
