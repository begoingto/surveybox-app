"use client"
import React from 'react';
import {Button} from "flowbite-react";
import {IoMdArrowRoundForward} from "react-icons/io";
import Image from "next/image";
import SbCardReport from "@/components/SBCardReport";
import SBCardDataConcluding from "@/components/SBCardDataConcluding";
import {useRouter} from "next/navigation";
import PublicReportLoading from "@/components/loading/PublicReportLoading";
import {useSession} from "next-auth/react";

function SBReport () {
    const router = useRouter()
    const {status } = useSession()
    if (status === "loading") {
        return <PublicReportLoading />
    }
    return (
        <>
            <section className={"my-10 max-w-screen-xs lg:max-w-screen-xl mx-auto px-5 lg:px-0 py-14 md:py-10 lg:py-0"}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div data-aos="zoom-out-right">
                        <div className="max-w-md mx-auto">
                            <div className={"flex items-center flex-col gap-5 sm:items-start"}>
                                <h1 className={"uppercase text-blue-800 dark:text-blue-600 font-extrabold text-3xl"}>report</h1>

                                <p className={"opacity-80 text-lg sm:text-center md:text-left lg:text-left xl:text-left sm:text-lg md:text-xl lg:text-xls"}>
                                    A survey report is a type of report that presents the results of a survey. It provides the result with the analyzed data as donut bars or graphs after the respondent has done their survey or voted.
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
                               src="/images/report/3DVersion/report2.png" alt="report.png"/>
                    </div>
                </div>
            </section>
            <section className={"h-full bg-cover bg-center bg-fixed"}>
                <div className="bg-cyan-900 relative mt-40">
                    <div className={" max-w-screen-xl mx-auto pb-48 "}>
                        <SbCardReport/>
                        <SBCardDataConcluding/>
                    </div>
                </div>
            </section>

            {/*Section for chart reports*/}
            <section className={"my-10 max-w-screen-xs lg:max-w-screen-xl mx-auto px-5 lg:px-0 py-14 md:py-10 lg:py-0"}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div data-aos="zoom-out-right">
                        <div className="max-w-md mx-auto">
                            <div className={"flex  flex-col gap-5 sm:items-start"}>
                                <h1 className="text-blue-800 dark:text-blue-600 sm:text-xl lg:text-2xl font-bold capitalize">
                                    chart report
                                </h1>
                                <p className={"sm:text-lg md:text-xl lg:text-xls"}>
                                    Chart report is to present data in a way that is easy to understand and interpret, allowing the audience to quickly identify trends and make informed decisions based on the data.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={"order-1"} data-aos="zoom-in-left">
                        <Image unoptimized width={100} height={100} className={"w-full h-full"}
                               src="/images/report/3DVersion/chartreport.png" alt="report.png"/>
                    </div>
                </div>
                <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 my-10">
                    <div className=" " data-aos="zoom-out-right">
                        <Image src={"/images/report/3DVersion/history.png"} unoptimized width={100} height={100} alt={"feature"} className={"w-full h-full"} />
                    </div>
                    <div className="self-center" data-aos="zoom-in-left">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-blue-800 dark:text-blue-600 sm:text-xl lg:text-2xl font-bold capitalize">
                                history report
                            </h1>
                            <p className={"sm:text-lg md:text-xl lg:text-xls"}>
                                All surveys or votes, and each report, will be kept as a history for the owner. The owner can find history reports and compare monthly data.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/*    This section for History report*/}
        </>

    );
};

export default SBReport;