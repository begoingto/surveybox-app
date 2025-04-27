"use client"
import PublicFeedbackLoading from "@/components/loading/PublicFeedbackLoading";
import SBFeedbackCard from "@/components/SBFeedbackCard";
import { Button } from "flowbite-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

function SBFeedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const router = useRouter();
    const { status } = useSession()

    useEffect(() => {
        // Fetch the API data
        fetch(process.env.NEXT_PUBLIC_BASE_URL + '/public-feedbacks')
            .then((response) => response.json())
            .then((data) => {

                const filteredFeedbacks = data.data.filter((feedback) => feedback.rating >= 2);
                setFeedbacks(filteredFeedbacks);
            })
            .catch((error) => {
                // console.error('Error fetching feedbacks:', error);
            });
    }, []);


    if (status === "loading") {
        return <PublicFeedbackLoading />
    }
    return (
        <>
            <div className={"relative"}>
                <div className={"bg-no-repeat bg-cover"} style={{ backgroundImage: "url('/images/feedback/background.png')" }}
                    data-aos="fade-down"
                    data-aos-easing="linear"
                >
                    <div className="max-w-screen-xl mx-auto px-5 lg:px-0 py-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 ">
                            <div className="self-center">
                                <div className={"flex flex-col justify-center items-center text-left text-white "}>
                                    <div>
                                        <h1 className={" opacity-80 text-center dark:text-white sm:text-lg md:text-xl lg:text-xls"}>
                                            Define feedback survey objectives, gather specific information, assess product/service areas effectively.
                                        </h1>

                                        <div className={"flex justify-center mt-10 gap-5"}>
                                            <Button pill
                                                outline
                                                gradientDuoTone="purpleToPink"
                                                onClick={() => router.push("/sign-up")}
                                                data-aos="zoom-in-right"
                                            >
                                                <span className={"px-3 lg:px-8 uppercase"}>
                                                    Subscribe
                                                </span>
                                            </Button>
                                            <Button
                                                pill outline
                                                gradientDuoTone="greenToBlue"
                                                data-aos="zoom-in-left"
                                            >
                                                <span className={"px-3 lg:px-8 uppercase"}
                                                    onClick={() => router.push("/sign-up")}
                                                >Sign Up</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Image width={100} height={100} className={"w-full h-full"} src="/images/feedback/3DVersion/feedback.png" unoptimized alt="picfeedback" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"max-w-screen-xl mx-auto px-5 lg:px-0"}>
                <h3 className={"mt-10 text-blue-800 font-bold font-lg text-center text-3xl dark:text-blue-600"}>Here&apos;s what people say about us</h3>
                <div className={" my-10 flex justify-center"}>
                    <h1 className={"max-w-3xl text-center sm:text-lg md:text-xl lg:text-xls"}>
                        Feedback is a way to communicate your thoughts and feelings about a product, service, or experience.
                        It&apos;s important for us to receive feedback in order to make improvements and ensure our customers
                        have the best experience possible.
                    </h1>
                </div>
                <div className="grid grid-cols-12 gap-5  ">
                    {feedbacks.map((feedback, i) => {
                        return <SBFeedbackCard
                            key={i}
                            feedback={feedback}
                        />;
                    })}
                </div>

            </div>
        </>

    );
};

export default SBFeedback;
