'use client';
import React from 'react';
import {FaEnvelope, FaFacebookF, FaLinkedin, FaTwitter} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import PublicFooterLoading from "@/components/loading/PublicFooterLoading";
import {useSession} from "next-auth/react";


function SBFooter() {
    const {status } = useSession()
    if (status === "loading") {
        return <PublicFooterLoading />
    }
    return (
        <>
            <footer className={"py-20 px-5"}>
                <div className="bottom-0 mx-auto max-w-screen-xl lg:py-1 ">
                    <div className="grid grid-cols-12 gap-4  ">
                        <div className="col-span-12 sm:col-span-3 self-center">
                            <div className="flex flex-col items-center">
                                <Image unoptimized src="/surveybox-logo.png" alt="Surveybox Logo" width={100}  height={100}/>
                                <h3 className="font-extrabold  whitespace-nowrap text-xl text-blue-800 uppercase">surveybox</h3>
                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-9">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 lg:grid-cols-4 justify-evenly ">
                                <div className={"text-center sm:text-left"}>
                                    <h2 className="mb-6 text-md font-semibold text-gray-900 uppercase dark:text-white">Feature</h2>
                                    <ul className="text-gray-600 dark:text-gray-400 font-medium text-md">
                                        <li className="mb-2">
                                            <Link href={"/sign-up"} className="hover:underline hover:text-blue-800">Survey</Link>
                                        </li>
                                        <li  className="mb-2">
                                            <Link href={"/votes"} className="hover:underline">Vote
                                            </Link>
                                        </li>
                                        <li   className="mb-2">
                                            <Link href={"/feedback"} className="hover:underline">Feedback</Link>
                                        </li>
                                        <li  className="mb-2">
                                            <Link href={"/report"} className="hover:underline">Analytics Report
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className={"text-center sm:text-left"}>
                                    <h2 className="mb-6 text-md font-semibold text-gray-900 uppercase dark:text-white">SERVICE</h2>
                                    <ul className="text-gray-600 dark:text-gray-400 font-medium text-md">
                                        <li className="mb-2">
                                            <Link href={"/votes"} className="hover:underline">Voting</Link>
                                        </li>
                                        <li  className="mb-2">
                                            <Link href={"/sign-up"} className="hover:underline"> Theme
                                            </Link>
                                        </li>
                                        <li   className="mb-2">
                                            <Link href={"/sign-up"} className="hover:underline">Question Type
                                            </Link>
                                        </li>
                                        <li  className="mb-2">
                                            <Link href={"/sign-up"} className="hover:underline">Existing Question

                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className={"text-center sm:text-left"}>
                                    <h2 className="mb-6 text-md font-semibold text-gray-900 uppercase dark:text-white">CATEGORY</h2>
                                    <ul className="text-gray-600 dark:text-gray-400 font-medium text-md">
                                        <li className="mb-2">
                                            <Link href={"/sign-up"} className="hover:underline">Report chart</Link>
                                        </li>
                                        <li  className="mb-2">
                                            <Link href={"/sign-up"} className="hover:underline"> History survey
                                            </Link>
                                        </li>
                                        <li   className="mb-2">
                                            <Link href={"/sign-up"} className="hover:underline">Setting up survey
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className={"text-center sm:text-left"}>
                                    <h2 className="mb-6 text-md font-semibold text-gray-900 uppercase dark:text-white">CONTACT US</h2>
                                    <ul className="text-gray-600 dark:text-gray-400 font-medium text-md">
                                        <li className="mb-2">
                                            <Link href="https://www.facebook.com/profile.php?id=100094602653241"
                                               className="inline-flex items-center">
                                                <FaFacebookF  className={"text-blue-600 text-xl mr-2"}/> Facebook
                                            </Link>
                                        </li>
                                        <li className="mb-2">
                                            <Link href="#"
                                               className="inline-flex items-center">
                                                <FaTwitter  className={"text-blue-400 text-xl mr-2"}/> Twitter
                                            </Link>
                                        </li>
                                        <li className="mb-2">
                                            <Link href="#"
                                               className="inline-flex items-center">
                                                <FaLinkedin  className={"text-black-400 text-xl mr-2"}/> Linkin
                                            </Link>
                                        </li>
                                        <li className="mb-2">
                                            <Link href="mailto:surveybox.services@gmail.com" className="inline-flex items-center">
                                                <FaEnvelope className="text-black-400 text-xl mr-2" />
                                                surveybox.services@gmail.com
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <hr/>
            <p className={"py-3 text-center"}>
                © 2023 SurveyBox | . All rights reserved.
            </p>
        </>
    );
}

export default SBFooter;