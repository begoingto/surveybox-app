"use client"
import React from 'react';
import Image from "next/image";
import SbAreYouReady from "@/components/SBAreYouReady";
import {Button} from "flowbite-react";
import {IoMdArrowRoundForward} from "react-icons/io";
import {useRouter} from "next/navigation";
import PublicVoteLoading from "@/components/loading/PublicVoteLoading";
import {useSession} from "next-auth/react";


function SBVote () {
    const router = useRouter()
    const {status } = useSession()
    if (status === "loading") {
        return <PublicVoteLoading />
    }
    return (
        <>
            <section className={"my-10 max-w-screen-xs lg:max-w-screen-xl mx-auto px-5 lg:px-0 py-14 md:py-10 lg:py-0"}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div data-aos="zoom-out-right">
                        <div className="max-w-md mx-auto">
                            <div className={"flex items-center flex-col gap-5 sm:items-start"}>
                                <h1 className={"uppercase text-blue-800 dark:text-blue-600 font-extra-bold text-3xl"}>Voting form</h1>

                                <p className={"opacity-80 text-lg sm:text-center md:text-left lg:text-left xl:text-left sm:text-lg md:text-xl lg:text-xls"}>
                                    Have templates vote, and the owner can create votes or use the template vote that has been provided and edit votes. You will need to design the voting form.
                                </p>
                                <div className="flex gap-3">
                                    <Button
                                        pill
                                        outline
                                        className={"uppercase"}
                                        onClick={() => router.push("/sign-up")}
                                    >
                                            <span className="text-base px-5 flex items-center gap-2">
                                                Get started
                                                <IoMdArrowRoundForward className="h-5 w-5" />
                                            </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"order-1"} data-aos="zoom-in-left">
                        <Image unoptimized width={100} height={100} className={"w-full h-full"}
                               src="/images/vote/3DVersion/voting.png" alt="report.png"/>
                    </div>
                </div>
            </section>
            <section className={"max-w-screen-xl mx-auto px-5 lg:px-0"}>

                {/* why choose us */}
                <div className="text-center  leading-loose">
                    <h1 className="text-3xl text-blue-800 dark:text-blue-600 font-bold mb-5">
                        Why choose us ?
                    </h1>
                    <p className={"sm:text-lg md:text-xl lg:text-xls"}>We take democracy seriously. <br />
                        Find out why our clients consistently rely on us for their election needs.
                    </p>
                </div>

                {/* small icon & text */}

                <div className="grid gap-8 lg:gap-24 grid-cols-2 md:grid-cols-3 my-24"
                     data-aos="fade-up"
                     data-aos-anchor-placement="bottom-bottom"
                >
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <Image className="mx-auto mb-4 w-28 h-28 rounded-full" src="/images/vote/secure.png" alt="Helene Avatar" width={100} height={100} unoptimized/>
                        <h3 className="mb-1 racking-tight lg:text-xl text-blue-800 dark:text-blue-600">
                            <a href="#">Secure and Reliable</a>
                        </h3>
                    </div>
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <Image className="mx-auto mb-4 w-28 h-28 rounded-full" src="/images/vote/flexible.png" alt="Helene Avatar" width={100} height={100} unoptimized/>
                        <h3 className="mb-1 racking-tight lg:text-xl text-blue-800 dark:text-blue-600">
                            <a href="#">Flexible and Simple to Use</a>
                        </h3>
                    </div>
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <Image className="mx-auto mb-4 w-28 h-28 rounded-full" src="/images/vote/industry.png" alt="Helene Avatar" width={100} height={100} unoptimized/>
                        <h3 className="mb-1 racking-tight lg:text-xl text-blue-800 dark:text-blue-600">
                            <a href="#">Industry-Specific Expertise</a>
                        </h3>
                    </div>
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <Image className="mx-auto mb-4 w-28 h-28 rounded-full" src="/images/vote/union.png" alt="Helene Avatar" width={100} height={100} unoptimized/>
                        <h3 className="mb-1 racking-tight lg:text-xl text-blue-800 dark:text-blue-600">
                            <a href="#">Union Elections</a>
                        </h3>
                    </div>
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <Image className="mx-auto mb-4 w-28 h-28 rounded-full" src="/images/vote/coperative.png" alt="Helene Avatar" width={100} height={100} unoptimized/>
                        <h3 className="mb-1 racking-tight lg:text-xl text-blue-800 dark:text-blue-600">
                            <a href="#">Cooperative Elections</a>
                        </h3>
                    </div>
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <Image className="mx-auto mb-4 w-28 h-28 rounded-full" src="/images/vote/education.png" alt="Helene Avatar" width={100} height={100} unoptimized/>
                        <h3 className="mb-1 racking-tight lg:text-xl text-blue-800 dark:text-blue-600">
                            <a href="#">Education Elections</a>
                        </h3>
                    </div>
                </div>
            </section>

            {/* box */}
            <SbAreYouReady/>
        </>

    );
};

export default SBVote;