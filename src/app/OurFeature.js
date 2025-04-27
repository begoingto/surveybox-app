import React, {useRef, useState} from 'react';
import {Swiper, SwiperSlide, useSwiperSlide} from "swiper/react";
import {Autoplay, EffectCards, Navigation} from "swiper";

import 'swiper/css';
import 'swiper/css/effect-cards';
import "swiper/css/pagination";

function OurFeature() {
    const swiperRef = useRef();
    const [active,setActive] = useState(0)

    const images =[
        "/images/home/our-feature/report.jpg",
        "/images/home/our-feature/questions.png",
        "/images/home/our-feature/survey.png",
        "/images/home/our-feature/theme.jpg",
        "/images/home/our-feature/unsplash.png",
    ]

    const paginates = []

    for (let i=0;i<images.length;i++){
        paginates.push(<li key={i} onClick={() => swiperRef.current.slideTo(i)} className={"h-2 w-2 md:h-3 md:w-3 rounded-full hover:cursor-pointer " + (active===i?"bg-green-400 dark:bg-green-500":"bg-blue-800 dark:bg-blue-600")}></li>)
    }

    return (
        <>
            <div className="max-w-lg mx-auto text-center py-8 my-8 relative">
                <div className="w-32 border-2 border-blue-800/50 opacity-90 mx-auto absolute -translate-x-1/2 -translate-y-1/2 top-0 left-1/2"></div>
                <h1 className={"font-bold uppercase text-2xl text-blue-800 dark:text-blue-600"}>
                    Our Feature
                </h1>
            </div>
            <div className={"max-w-xl mx-auto"}>
                <Swiper
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    effect={"cards"}
                    grabCursor={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    modules={[EffectCards,Navigation,Autoplay]}
                    className="w-64 h-40 sm:w-72 sm:h-56 md:h-80 md:w-full lg:h-80"
                    onSlideChange={(swiper) => {
                        setActive(swiper.activeIndex)
                    }}
                >
                    {images.map((img,i) => {
                        return(
                            <SwiperSlide
                                key={i}
                                className={"bg-center bg-no-repeat bg-cover !max-w-80 md:!max-w-2xl rounded-lg"}
                                style={{backgroundImage: `url('${img}')`}
                                }></SwiperSlide>
                        )
                    })}

                    <div className="flex items-center justify-center mt-3">
                        <div>
                            <ul className={"flex gap-3"}>
                                {paginates}
                            </ul>
                        </div>
                    </div>
                </Swiper>
            </div>
        </>

    );
}

export default OurFeature;