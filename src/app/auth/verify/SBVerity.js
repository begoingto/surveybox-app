'use client'
import React, { useEffect } from 'react';
import { Button } from 'flowbite-react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useRouter, useSearchParams } from 'next/navigation';
import {useVerifyEmailMutation} from "@/store/feature/auth/authApiSlice";
import NotFound from "@/app/[...not-found]/page";
import {setEmail} from "@/store/feature/personalInfo/personalInfoSlice";
import {useDispatch} from "react-redux";

const SBVerify = () => {
    const router = useRouter();
    const queries = useSearchParams();
    const email = queries.get('email');
    const verifyCode = queries.get('verifyCode');
    const dispatch = useDispatch();
    const [verifyEmail, { data, error }] = useVerifyEmailMutation();

    useEffect(() => {
        verifyEmail({ email, verifiedCode: verifyCode });
    }, [email, verifyCode, verifyEmail]);
    if (error) {
        return <NotFound />
    }
    if (data) {
        dispatch(setEmail({email: data.data}))
    }
    return (
        <section className="max-w-screen-xl mx-auto px-5 xl:px-0">
            <div className="flex flex-col h-screen gap-y-2 items-center justify-center">
                <BsFillCheckCircleFill className="text-8xl text-blue-700" />
                <h1 className="text-2xl font-bold tracking-tight text-blue-700 text-center dark:text-blue-100 capitalize">
                    Verified successfully
                </h1>
                <p className="tracking-tight text-gray-500 text-center dark:text-blue-300">
                    Welcome to SurveyBox, please click the button below to fill in your Information
                </p>
                <Button className="w-20 my-4" pill onClick={() => router.push('/sign-in')}>
                    Next
                </Button>
            </div>
        </section>
    );
};
export default SBVerify;
