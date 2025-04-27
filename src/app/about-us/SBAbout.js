'use client'
import React from 'react';
import Image from "next/image";
import vector from "../../../public/images/about/vector.png"
import mission from "../../../public/images/about/mission.png"
import vision from "../../../public/images/about/vision.png"
import {AiOutlineCheckCircle} from "react-icons/ai";
import {Button} from "flowbite-react";

function SbAbout() {

    return (

        <section>
            <section
                className="bg-center bg-no-repeat bg-[url('/images/about/banner.png')] bg-cover bg-gray-400 bg-blend-multiply">
                <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56"
                     data-aos="fade-down"
                     data-aos-easing="linear"
                >
                    <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-white md:text-4xl lg:text-5xl">About Us</h1>
                    <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                        Our survey platform is a powerful tool that can help you collect data from your target audience. With our platform,
                        you can create surveys in minutes, distribute them to your audience, and collect data in real
                        time.
                    </p>
                </div>
            </section>
            <section className={"my-10 max-w-screen-xs lg:max-w-screen-xl mx-auto px-5 lg:px-0 py-14 md:py-10 lg:py-0"}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div data-aos="zoom-out-right">
                        <div className="max-w-md mx-auto">
                            <div className={"flex  flex-col gap-5 sm:items-start"}>
                                <h1 className="text-blue-800 dark:text-blue-600 sm:text-xl lg:text-2xl font-bold capitalize">
                                    Who are we?
                                </h1>
                                <p className={"sm:text-lg md:text-xl lg:text-xls text-left"}>
                                    SurveyBox is a modern online survey service developed in 2023 by Institute of Science and Technology Advanced Development students, enabling users to create, distribute, and analyze surveys for data-driven decision-making.
                                </p>
                            </div>
                            <div className='flex justify-center mt-5'>
                                <Button pill onClick={() => router.push("/sign-up")} className={"w-fit"}>
                                    <span className={"px-3 lg:px-8"}>JOIN US</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={"order-1"} data-aos="zoom-in-left">
                        <Image className="lg:w-full lg:h-full md:w-3/4 md:h-3/4" src={vector}
                               alt="office content 1" priority />
                    </div>
                </div>
            </section>

            <section className={"my-10 max-w-screen-xs lg:max-w-screen-xl mx-auto px-5 lg:px-0 py-14 md:py-10 lg:py-0"}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div data-aos="zoom-out-right">
                        <div className="max-w-md mx-auto">
                            <div className={"flex  flex-col gap-5 sm:items-start"}>
                                <h1 className="text-blue-800 dark:text-blue-600 sm:text-xl lg:text-2xl font-bold capitalize">
                                    Our Mission
                                </h1>
                                <p className={"sm:text-lg md:text-xl lg:text-xls text-left"}>
                                    SurveyBox mission is to offer a user-friendly and secure survey platform that empowers users to gather valuable insights and make data-driven decisions. We prioritize exceptional customer support and maintain high standards of security and privacy.
                                </p>
                                {/*<div>*/}
                                {/*    <div className='flex items-center'>*/}
                                {/*        <div>*/}
                                {/*            <AiOutlineCheckCircle className="h-8 w-8 text-green-300"/>*/}
                                {/*        </div>*/}
                                {/*        <p className='px-3'>*/}
                                {/*            Posting to social media, blogs, and messengers*/}
                                {/*        </p>*/}
                                {/*    </div>*/}
                                {/*    <div className='flex items-center'>*/}
                                {/*        <div>*/}
                                {/*            <AiOutlineCheckCircle className="h-8 w-8 text-green-300"/>*/}
                                {/*        </div>*/}
                                {/*        <p className='px-3'>*/}
                                {/*            Survey ,Report ,Analytic*/}
                                {/*        </p>*/}
                                {/*    </div>*/}
                                {/*    <div className='flex items-center'>*/}
                                {/*        <div>*/}
                                {/*            <AiOutlineCheckCircle className="h-8 w-8 text-green-300"/>*/}
                                {/*        </div>*/}
                                {/*        <p className='px-3'>*/}
                                {/*            The Future*/}
                                {/*        </p>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                    <div className={"order-1"} data-aos="zoom-in-left">
                        <Image className="lg:w-full lg:h-full md:w-3/4 md:h-3/4" src={mission}
                               alt="office content 1" priority />
                    </div>
                </div>
                <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 my-10">
                    <div data-aos="zoom-out-right">
                        <Image src={vision} unoptimized width={100} height={100} alt={"feature"} className={"w-full h-full"} />
                    </div>
                    <div className={"self-center"} data-aos="zoom-in-left">
                        <h1 className="text-blue-800 dark:text-blue-600 sm:text-xl lg:text-2xl font-bold capitalize">Our Vision</h1>
                        <p className={"sm:text-lg md:text-xl lg:text-xls mt-4"}>
                            SurveyBox vision is Leading the way in online survey tools with innovation and customization to meet user needs. We aim to make surveying accessible, efficient, and foster a community of excellence for better decisions and success.
                        </p>
                    </div>
                </div>
            </section>
        </section>
    );
}

export default SbAbout;