'use client';
import React from 'react';
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Autoplay, Pagination} from "swiper";
import "../app/feature/style.css"
import data from '../app/feature/FeatureData.json'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import PublicFeatureLoading from "@/components/loading/PublicFeatureLoading";
import {useSession} from "next-auth/react";

function SBFeature() {
    const {status } = useSession();
    if (status=== "loading") {
        return <PublicFeatureLoading/>
    }
    return (
        <>
            <section>
                <header>
                    <div className={"container-img "}>
                        <div data-aos="fade-down"
                             data-aos-easing="linear">
                            <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">SurveyBOX</h1>
                                <p className="mb-8 text-lg font-normal text-white lg:text-xl sm:px-16 lg:px-48">It
                                    offers a variety of features, including a wide range of question types, survey
                                    distribution options, and detailed analytics.</p>
                            </div>
                        </div>
                    </div>
                </header>
                <div className={"max-w-screen-xl mx-auto px-5 xl:px-0"}>
                    <div className="max-w-lg mx-auto text-center py-8 my-8 relative">
                        <h1 className={"font-bold uppercase text-2xl text-blue-800 dark:text-blue-600"}>
                            Our Feature
                        </h1>
                    </div>
                </div>
                <section
                    className={"my-10 max-w-screen-xs lg:max-w-screen-xl mx-auto px-5 sm:px-0 py-14 md:py-10 lg:py-0"}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                        <div data-aos="zoom-out-right">
                            <div className="max-w-md mx-auto">
                                <div className={"flex flex-col gap-5 sm:items-start"}>
                                    <h1 className="text-blue-800 dark:text-blue-600 sm:text-xl lg:text-2xl font-bold capitalize">
                                        Category
                                    </h1>
                                    <p className={"sm:text-lg md:text-xl lg:text-xls"}>
                                        A category is a group of survey answers and question suggestions. categories
                                        such as education, banking, events, markets, employees, subjects, and others.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={"order-1"} data-aos="zoom-in-left">
                            <Image unoptimized width={100} height={100} className={"w-full h-full"}
                                   src="/images/feature/3DVersion/category.png" alt="report.png"/>
                        </div>
                    </div>
                    <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 my-10">
                        <div className=" " data-aos="zoom-out-right">
                            <Image src={"/images/feature/3DVersion/question.png"} unoptimized width={100} height={100}
                                   alt={"feature"} className={"w-full h-full"}/>
                        </div>
                        <div className="self-center" data-aos="zoom-in-left">
                            <div className="flex flex-col gap-3">
                                <h1 className="text-blue-800 dark:text-blue-600 sm:text-xl lg:text-2xl font-bold capitalize">
                                    Question
                                </h1>
                                <p className={"sm:text-lg md:text-xl lg:text-xls"}>
                                    We provide many kinds of many suggested questions for users based on the category.
                                    They can add any question to their template and can create questions on their own.
                                    The popularity questions will be listed at the top for users.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                        <div data-aos="zoom-out-right">
                            <div className="max-w-md mx-auto">
                                <div className={"flex  flex-col gap-5 sm:items-start"}>
                                    <h1 className="text-blue-800 dark:text-blue-600 sm:text-xl lg:text-2xl font-bold capitalize">
                                        Report
                                    </h1>
                                    <p className={"sm:text-lg md:text-xl lg:text-xls"}>
                                        Indicate the specific results for the survey or vote creators. Each report will
                                        be kept as history and the owner of the survey or vote can compare those results
                                        histories together anytime.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={"order-1"} data-aos="zoom-in-left">
                            <Image unoptimized width={100} height={100} className={"w-full h-full"}
                                   src="/images/feature/3DVersion/report.png" alt="report.png"/>
                        </div>
                    </div>
                    <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 my-10">
                        <div className=" " data-aos="zoom-out-right">
                            <Image src={"/images/feature/3DVersion/vote.png"} unoptimized width={100} height={100}
                                   alt={"feature"} className={"w-full h-full"}/>
                        </div>
                        <div className="self-center" data-aos="zoom-in-left">
                            <div className="flex flex-col gap-3">
                                <h1 className="text-blue-800 dark:text-blue-600 sm:text-xl lg:text-2xl font-bold capitalize">
                                    Vote
                                </h1>
                                <p className={"sm:text-lg md:text-xl lg:text-xls"}>
                                    Create vote in seconds to collect data from the respondent as choice. It is a great
                                    feature make the vote creator easy to add options and take less time.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-8 px-5 mx-auto max-w-screen-xl text-center lg:py-16 xl:px-0">
                    <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
                        <h2 className="mb-4 text-3xl tracking-tight font-medium text-blue-800 dark:text-blue-600">We
                            Offer Many Category Types
                        </h2>
                    </div>
                    <div className="relative">
                        <Swiper
                            // install Swiper modules
                            modules={[Pagination, A11y, Autoplay]}
                            breakpoints={{
                                "@0.00": {
                                    slidesPerView: 1,
                                },
                                "@1.00": {
                                    slidesPerView: 3,
                                }
                            }}
                            loop={true}
                            grabCursor={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            pagination={{clickable: true}}
                            className='grid gap-8 lg:gap-16 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 !static'>
                            {data.map(user => (
                                <SwiperSlide key={user.id}>
                                    <div className='text-center text-gray-500 dark:text-gray-400'>
                                        <div
                                            className='mx-auto mb-4 w-24 h-24 lg:w-36 lg:h-36 rounded-full md:w-28 md:h-28'>
                                            <Image unoptimized width={100} height={100}
                                                   src={user.image ? user.image : "/image/member_theam/mich.png"} alt=''
                                                   className='mx-auto mb-4 w-24 h-24 lg:w-36 lg:h-36 rounded-full md:w-28 md:h-28'/>
                                        </div>
                                        <h5 className="flex justify-center">{user.username}</h5>
                                        <p className='user-title'>
                                            <i>{user.title}</i>
                                        </p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>
            </section>
        </>
    );
}

export default SBFeature;