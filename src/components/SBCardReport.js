import React from 'react';
import {Card} from "flowbite-react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {selectIsGlobalLoading} from "@/store/feature/auth/AuthSlice";
import PublicSignUpLoading from "@/components/loading/PublicSignUpLoading";
import PublicReportLoading from "@/components/loading/PublicReportLoading";

function SbCardReport(props) {

    return (
        <div className="max-w-screen-xl mx-auto px-5 md:px-0 my-32">
            <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-row gap-10 items-center justify-evenly md:pt-32">
                <Card className={"-mt-32 md:-mt-52 sm:col-span-2 dark:bg-gray-900 border-0 shadow-md border-t-4 border-t-blue-700 dark:border-t-blue-400"}
                      data-aos="flip-left"
                      data-aos-easing="ease-out-cubic"
                >
                    <div className="flex flex-col items-center p-2">
                        <Image
                            alt="image"
                            className="mb-3 rounded-full shadow-lg"
                            src="/images/report/chart.png"
                            width={100} height={100}
                            unoptimized
                        />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white uppercase">
                            Chart Report
                        </h5>
                        <p className="text-sm text-center w-40 text-gray-500 dark:text-gray-400">
                            See the results of survey in Chart
                        </p>
                    </div>
                </Card>
                <Card className={"md:-mt-52 dark:bg-gray-900 border-0 shadow-md border-t-4 border-t-red-700 dark:border-t-red-400"}
                      data-aos="flip-left"
                      data-aos-easing="ease-out-cubic"
                >
                    <div className="flex flex-col items-center p-2">
                        <Image
                            alt="image"
                            className="mb-3 rounded-full shadow-lg"
                            src="/images/report/history.png"
                            width={100} height={100}
                            unoptimized
                        />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white uppercase">
                            History
                        </h5>
                        <p className="text-sm text-center w-40 text-gray-500 dark:text-gray-400">
                            User can review the history of survey                        </p>
                    </div>
                </Card>
                <Card className={"md:-mt-52 dark:bg-gray-900 border-0 shadow-md border-t-4 border-t-green-700 dark:border-t-green-400"}
                      data-aos="flip-left"
                      data-aos-easing="ease-out-cubic"
                >
                    <div className="flex flex-col items-center p-2">
                        <Image
                            alt="image"
                            className="mb-3 rounded-full shadow-lg"
                            src="/images/report/export.png"
                            width={100} height={100}
                            unoptimized
                        />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white uppercase">
                            Export
                        </h5>
                        <p className="text-sm text-center w-40 text-gray-500 dark:text-gray-400">
                            Create can export your as PDF or CSV</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default SbCardReport;