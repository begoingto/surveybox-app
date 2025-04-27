'use client'
import React, { useState } from 'react';
import {Button, Spinner} from "flowbite-react";
import Image from "next/image";
import {useRouter} from "next/navigation";

const DetectNetworkAdmin = ({ onTryAgain }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleTryAgain = async () => {
        setIsLoading(true);
        window.location.reload();
        try {
            await onTryAgain();
            router.push('admin/dashboard');
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 w-full bg-white dark:bg-gray-900 dark:text-white">
            <div className="text-center">
                <div className="inline-flex rounded-full bg-red-100 p-4 dark:bg-gray-700 ">
                    <div className="rounded-full stroke-red-600 bg-red-200 p-4 dark:bg-gray-800">
                        <svg className="w-16 h-16" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                            <g id="System / Wifi_Problem">
                                <path id="Vector" d="M8.34277 14.5898C8.80861 14.0902 9.37187 13.6914 9.9978 13.418C10.6237 13.1445 11.2995 13.0024 11.9826 13C12.6656 12.9976 13.3419 13.1353 13.9697 13.4044C14.5975 13.6734 15.1637 14.0682 15.633 14.5645M6.14941 11.5439C6.89312 10.7464 7.79203 10.1093 8.79091 9.67188C9.7898 9.23441 10.8678 9.00575 11.9583 9M3.22363 8.81649C4.34177 7.61743 5.69376 6.66021 7.19618 6.00391C8.69859 5.3476 10.3198 5.00558 11.9593 5M16 8.99997L18 6.99998M18 6.99998L20 5M18 6.99998L16 5M18 6.99998L20 8.99997M12 19C11.4477 19 11 18.5523 11 18C11 17.4477 11.4477 17 12 17C12.5523 17 13 17.4477 13 18C13 18.5523 12.5523 19 12 19Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                        </svg>
                    </div>
                </div>
                <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px] dark:text-slate-400">
                    No internet connection
                </h1>
                <p className="text-slate-600 mt-5 lg:text-lg dark:text-slate-500">
                    Please check your internet connection and try again.
                </p>
                <div className={"flex text-center items-center justify-center my-4"}>
                    <Button
                        gradientDuoTone="purpleToBlue"
                        pill
                        onClick={handleTryAgain}
                        disabled={isLoading}
                    >
                        {isLoading ? <Spinner size="md" /> : 'Try Again'}
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default DetectNetworkAdmin;
