"use client"
import Image from 'next/image'
import { Button } from "flowbite-react";
import React from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import {useRouter} from "next/navigation";

function NotFound() {
    const router = useRouter();

    return (
        <section className={"px-5 py-14 lg:px-0 bg-cover bg-center bg-no-repeat bg-[url('/images/not-found/error.png')]"}>
            <div className={"max-w-screen-xs lg:max-w-screen-xl mx-auto px-5 sm:px-0 py-14 md:py-10 lg:py-0"}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div>
                        <div className="max-w-md mx-auto">
                            <div className={"flex items-center flex-col gap-5 sm:items-start"}>
                                <h3 className={"text-blue-800 dark:text-white text-2xl opacity-90 font-bold"}>Page Not Found..!</h3>
                                <p className={"opacity-80"}>
                                    Sorry! This page is not found..!
                                </p>
                                <div className="flex gap-3">
                                    <Button
                                        pill
                                        outline
                                        className={"uppercase bg-blue-700"} onClick={()=> router.push("/")}>

                                        <span className="text-base px-5 flex items-center gap-2">
                                                Go Back
                                                <IoMdArrowRoundForward className="h-5 w-5"  />
                                            </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"order-1"}>
                        <Image width={100} height={100} unoptimized className={"w-full h-full"} src="/images/not-found/404.png" alt="error image" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NotFound;