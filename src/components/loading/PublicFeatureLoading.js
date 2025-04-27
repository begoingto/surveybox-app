import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Autoplay, Pagination} from "swiper";
import data from "@/app/feature/FeatureData.json";

function PublicFeatureLoading() {
    return (
        <>
            <section>
                <header>
                    <div className={"container-img-loading "}>
                        <div>
                            <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56 animate-pulse">
                                <div className={"justify-center flex"}>
                                    <div className="mb-4  tracking-tight leading-none w-56 h-10 rounded bg-gray-200  dark:bg-gray-700"></div>

                                </div>
                                <div className={"justify-center flex"}>
                                    <div className="mb-8 w-96 h-3 bg-gray-200 rounded dark:bg-gray-700">
                                       </div>
                                </div>
                                <div className={"justify-center flex"}>
                                    <div className="mb-8 w-96 h-3 bg-gray-200 rounded dark:bg-gray-700">
                                        </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </header>
                <div className={"max-w-screen-xl mx-auto px-5 xl:px-0"}>
                    <div className="max-w-lg mx-auto justify-center flex py-8 my-8 relative">
                        <div className={"w-56 h-9 bg-gray-200 rounded dark:bg-gray-700"}>

                        </div>
                    </div>
                </div>


                {/*4*/}
                <section
                    className={"px-5 lg:px-0 bg-cover bg-center bg-no-repeat "}>
                    <div className={"max-w-screen-xs lg:max-w-screen-xl mx-auto px-5 sm:px-0 py-14 md:py-36"}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center animate-pulse">
                            <div>
                                <div className="max-w-md mx-auto">
                                    <div className={"flex items-center flex-col gap-5 sm:items-start"}>
                                        <div className="w-44 h-10 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        <div className="w-full h-7 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        <div className="flex gap-5">
                                            <div className="w-52 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                            <div className="w-36 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"order-1"}>
                                <div
                                    className="flex items-center justify-center w-full h-96 bg-gray-300 rounded dark:bg-gray-700">
                                    <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg"
                                         aria-hidden="true"
                                         fill="currentColor" viewBox="0 0 640 512">
                                        <path
                                            d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*5*/}
                <section
                    className={"px-5 lg:px-0 bg-cover bg-center bg-no-repeat "}>
                    <div
                        className={"max-w-screen-xs  lg:max-w-screen-xl mx-auto px-5 sm:px-0 py-14 md:py-36 animate-pulse"}>
                        <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 my-10">
                            <div>
                                <div
                                    className=" items-center justify-center w-full h-96 bg-gray-300 rounded dark:bg-gray-700">
                                    <div
                                        className=" flex items-center justify-center w-full h-96 bg-gray-300 rounded dark:bg-gray-700">
                                        <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg"
                                             aria-hidden="true"
                                             fill="currentColor" viewBox="0 0 640 512">
                                            <path
                                                d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="self-center ">
                                <div className="max-w-md mx-auto ">
                                    <div className={"flex items-center flex-col gap-5 sm:items-start"}>
                                        <div className="w-44 h-10 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        <div className="flex gap-5">
                                            <div className="w-52 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                            <div className="w-36 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*4*/}
                <section
                    className={"px-5 lg:px-0 bg-cover bg-center bg-no-repeat "}>
                    <div className={"max-w-screen-xs lg:max-w-screen-xl mx-auto px-5 sm:px-0 py-14 md:py-36"}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center animate-pulse">
                            <div>
                                <div className="max-w-md mx-auto">
                                    <div className={"flex items-center flex-col gap-5 sm:items-start"}>
                                        <div className="w-44 h-10 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        <div className="w-full h-7 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        <div className="flex gap-5">
                                            <div className="w-52 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                            <div className="w-36 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"order-1"}>
                                <div
                                    className="flex items-center justify-center w-full h-96 bg-gray-300 rounded dark:bg-gray-700">
                                    <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg"
                                         aria-hidden="true"
                                         fill="currentColor" viewBox="0 0 640 512">
                                        <path
                                            d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*5*/}
                <section
                    className={"px-5 lg:px-0 bg-cover bg-center bg-no-repeat "}>
                    <div
                        className={"max-w-screen-xs  lg:max-w-screen-xl mx-auto px-5 sm:px-0 py-14 md:py-36 animate-pulse"}>
                        <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 my-10">
                            <div>
                                <div
                                    className=" items-center justify-center w-full h-96 bg-gray-300 rounded dark:bg-gray-700">
                                    <div
                                        className=" flex items-center justify-center w-full h-96 bg-gray-300 rounded dark:bg-gray-700">
                                        <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg"
                                             aria-hidden="true"
                                             fill="currentColor" viewBox="0 0 640 512">
                                            <path
                                                d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="self-center ">
                                <div className="max-w-md mx-auto ">
                                    <div className={"flex items-center flex-col gap-5 sm:items-start"}>
                                        <div className="w-44 h-10 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        <div className="flex gap-5">
                                            <div className="w-52 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                            <div className="w-36 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-8 px-5 mx-auto max-w-screen-xl text-center lg:py-16 xl:px-0">
                    <div className={"max-w-screen-xl mx-auto px-5 xl:px-0"}>
                        <div className="max-w-lg mx-auto justify-center flex py-8 my-8 relative">
                            <div className={"w-72 h-9 bg-gray-200 rounded dark:bg-gray-700"}>

                            </div>
                        </div>
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
                                            className='mx-auto mb-4 justify-center flex w-24 h-24 lg:w-36 lg:h-36 rounded-full md:w-28 md:h-28'>
                                            <div className={"w-24 h-24 rounded-full bg-gray-200  dark:bg-gray-700"}></div>
                                        </div>
                                        <div className="flex justify-center ">
                                            <div className='user-title w-56 h-9 bg-gray-200 rounded dark:bg-gray-700'>

                                            </div>
                                        </div>

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

export default PublicFeatureLoading;