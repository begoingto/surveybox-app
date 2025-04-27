'use client'
import React, {useEffect} from 'react';
import SBGoogleButton from "@/components/SBGoogleButton";
import Image from "next/image";
import SignUpForm from "@/app/sign-up/components/SignUpForm";
import PublicSignUpLoading from "@/components/loading/PublicSignUpLoading";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

function SbSignUp() {
    const {data: session,status } = useSession()

    useEffect(() => {
        if (session) {
            redirect("/")
        }
    }, [session, status]);

    if (status === "loading") {
        return <PublicSignUpLoading />
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:h-[90vh] 2xl:gap-24 items-center ">
            <div className="mb-6 lg:mb-0">
                <div className="space-y-4 md:space-y-6">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-800 text-center dark:text-blue-100 mb-3">
                        Register Account
                    </h1>
                    <SBGoogleButton />
                    <div className="flex items-center justify-center">
                        <hr className="h-px w-full my-1 bg-gray-200 border-0 dark:bg-gray-700"/>
                        <span
                            className="absolute uppercase font-medium text-blue-800 px-3 bg-white dark:text-white dark:bg-gray-900">or</span>
                    </div>
                    <SignUpForm/>
                </div>
            </div>
            <div>
                <Image className={"w-full"} unoptimized width={100} height={100}
                       src="/images/register/register3D.png" alt="register_image"/>
            </div>
        </div>
    );
}

export default SbSignUp;