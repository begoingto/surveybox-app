'use client';
import React from 'react';
import Image from "next/image";
import {Button} from "flowbite-react";
import {IoMdArrowRoundForward} from "react-icons/io";
import OurFeature from "@/app/OurFeature";
import SBAreYouReady from "@/components/SBAreYouReady";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {selectIsGlobalLoading} from "@/store/feature/auth/AuthSlice";
import PublicHomeLoading from "@/components/loading/PublicHomeLoading";
import {useSession} from "next-auth/react";
function SBHomePage() {
    const router = useRouter()
    const {status } = useSession()
    if (status === "loading") {
        return <PublicHomeLoading />
    }
    return (
        <>
            <section className={"px-5 lg:px-0 bg-cover bg-center bg-no-repeat bg-[url('/images/home/bg-vector-home.svg')]"}>
                <div className={"max-w-screen-xs lg:max-w-screen-xl mx-auto px-5 sm:px-0 py-14 md:py-10 lg:py-0"}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                        <div>
                            <div className="max-w-md mx-auto" data-aos="zoom-out-right">
                                <div className={"flex items-center flex-col gap-5 sm:items-start"}>
                                    <h1 className={"uppercase text-blue-800 dark:text-blue-600 font-extrabold text-3xl"}>SurveyBox</h1>
                                    <h3 className={"text-blue-800 dark:text-blue-600 text-2xl opacity-90"}>Collect better data and make better decisions.</h3>
                                    <p className={"opacity-80 text-xl"}>
                                        Our free survey offers various creative themes for your survey. You can also use our theme design to create your own articles.
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
                            <Image unoptimized width={100} height={100} className={"w-full h-full"} src="/images/home/3DVersion/banner-header.png" alt="banner-header.png"/>
                        </div>
                    </div>
                </div>
            </section>

            <section className="my-32">
                <OurFeature />
            </section>

            <section className={"max-w-screen-xl mx-auto px-5 lg:px-0"}>
                <div className="max-w-lg mx-auto text-center py-8 my-8 relative">
                    <div className="w-32 border-2 border-blue-800/50 opacity-90 mx-auto absolute -translate-x-1/2 -translate-y-1/2 top-0 left-1/2"></div>
                    <h1 className={"font-bold uppercase text-2xl text-blue-800 dark:text-blue-600"}>
                        Why Choose SurveyBox ?
                    </h1>
                    <p className={"sm:text-lg md:text-xl lg:text-xls"}>We have four main role  for our feature.</p>
                </div>

                <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 my-10">
                    <div data-aos="zoom-out-right">
                        <Image src={"/images/home/3DVersion/creator.png"} unoptimized width={100} height={100} alt={"feature"} className={"w-full h-full"} />
                    </div>
                    <div className={"self-center"} data-aos="zoom-in-left">
                        <h1 className="text-blue-800 dark:text-blue-600 sm:text-xl lg:text-2xl font-bold capitalize mb-2">Creator</h1>
                        <p className={"sm:text-lg md:text-xl lg:text-xls"}>The administrator is the highest-level user in the platform.
                            They have full control over the platform, including the ability to
                            create and delete users, surveys, and questions. They can also
                            view all survey data and reports. </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10">
                    <div className="self-center " data-aos="zoom-out-right">
                        <h1 className="text-blue-800 dark:text-blue-600 sm:text-xl lg:text-2xl font-bold capitalize mb-2">User</h1>
                        <p className={"sm:text-lg md:text-xl lg:text-xls"}>Users can complete surveys and view survey results. They can also be
                            invited to participate in surveys by the owner.</p>
                    </div>
                    <div data-aos="zoom-in-left">
                        <Image src={"/images/home/3DVersion/user.png"} unoptimized width={100} height={100} alt={"feature"} className={"w-full h-full"} />
                    </div>
                </div>

                <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 my-10">
                    <div data-aos="zoom-out-right">
                        <Image src={"/images/home/3DVersion/guest.png"} unoptimized width={100} height={100} alt={"feature"} className={"w-full h-full"} />
                    </div>
                    <div className="self-center" data-aos="zoom-in-left">
                        <h1 className="text-blue-800 dark:text-blue-600 sm:text-xl lg:text-2xl font-bold capitalize mb-2">Guest</h1>
                        <p className={"sm:text-lg md:text-xl lg:text-xls"}>Guests can view survey results, but they cannot complete surveys. They can also be
                            invited to participate in surveys by the owner. </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10">
                    <div className="self-center" data-aos="zoom-out-right">
                        <h1 className="text-blue-800 dark:text-blue-600  sm:text-xl lg:text-2xl font-bold capitalize mb-2">Administrator</h1>
                        <p className={"sm:text-lg md:text-xl lg:text-xls"}>The administrator is the highest-level user in the platform. They
                            have full control over the platform, including the ability to
                            create and delete users, surveys, and questions. They can also view all survey data
                            and reports. </p>
                    </div>
                    <div className="" data-aos="zoom-in-left">
                        <Image src={"/images/home/3DVersion/Admin.png"} unoptimized width={100} height={100} alt={"feature"} className={"w-full h-full"} />
                    </div>
                </div>

                <div className="max-w-lg mx-auto text-center py-8 my-8 relative">
                    <div className="w-32 border-2 border-blue-800/50 opacity-90 mx-auto absolute -translate-x-1/2 -translate-y-1/2 top-0 left-1/2"></div>
                    <h1 className={"font-bold text-2xl text-blue-800 dark:text-blue-600 uppercase"}>
                        Report
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10">
                    <div className="self-center" data-aos="zoom-out-right">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-blue-800 dark:text-blue-600  sm:text-xl lg:text-2xl font-bold  capitalize">
                                Analyze  with automatic summaries
                            </h1>
                            <p className={"sm:text-lg md:text-xl lg:text-xls"}>See charts with response data update in real-time and open the raw data with CSV or PDF
                                for deeper analysis.</p>
                            <Button pill outline className={"uppercase w-fit mt-3"} onClick={() => router.push("/sign-up")}>
                                <span className="text-base px-5">Get started</span>
                            </Button>
                        </div>
                    </div>
                    <div data-aos="zoom-in-left">
                        <Image src={"/images/home/3DVersion/analytic.png"} unoptimized width={100} height={100} alt={"feature"} className={"w-full h-full"} />
                    </div>
                </div>

                <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 my-10">
                    <div className=" " data-aos="zoom-out-right">
                        <Image src={"/images/home/3DVersion/respone.png"} unoptimized width={100} height={100} alt={"feature"} className={"w-full h-full"} />
                    </div>
                    <div className="self-center" data-aos="zoom-in-left" data-aos-delay="0">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-blue-800 dark:text-blue-600 sm:text-xl lg:text-2xl font-bold capitalize">
                                Create your surveys from anywhere
                            </h1>
                            <p className={"sm:text-lg md:text-xl lg:text-xls"}>Access, create, and edit forms on the go, from screens big and small.
                                Others can respond to your survey from wherever they are, from any mobile device, tablet, or computer.</p>
                            <Button pill outline className={"uppercase w-fit mt-3"} onClick={() => router.push("/sign-up")}>
                                <span className="text-base px-5">Get started</span>
                            </Button>
                        </div>
                    </div>

                </div>
            </section>

            <SBAreYouReady />
        </>
    );
}

export default SBHomePage;