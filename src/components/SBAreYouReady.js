'use client'
import React from 'react';
import {Button} from "flowbite-react";
import {HiOutlineArrowRight} from "react-icons/hi";
import {useRouter} from "next/navigation";

function SbAreYouReady({bg}) {
    const router = useRouter()
    return (
        <section
            style={{backgroundImage: `url(${bg ? bg : "/images/home/bg-fixed.jpg"})`}}
            className={"h-full bg-cover bg-center bg-fixed"}>
            <div className="bg-gray-900 bg-opacity-80 text-white">
                <div className="max-w-screen-xl flex flex-col space-y-4 mx-auto py-48 text-center items-center">
                    <h1 className={"text-2xl md:text-4xl font-medium uppercase"}>Are You Ready</h1>
                    <p className={"text-xl md:text-2xl capitalize"}>The Special feature is Waiting you</p>
                    <Button className={"w-fit"}
                            pill
                            onClick={() => router.push("/sign-up")}
                    >
                        JOIN WITH US NOW
                        <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default SbAreYouReady;