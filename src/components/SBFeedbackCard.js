import React from 'react';
import Image from "next/image";
import {Rating} from "flowbite-react";
import { getUserAvatar} from "@/lib/fileBase";
function SBFeedbackCard({feedback}) {
    const renderRatingStars = () => {
        if (feedback.rating >= 2) {
            const stars = [];
            for (let i = 0; i < feedback.rating; i++) {
                stars.push(<Rating.Star key={i} filledColor="#FFD700" />);
            }
            return stars;
        } else {
            return null; // No stars rendered for ratings below 4
        }
    };

    const getName = () => {
        if (user?.firstName && user?.lastName) {
            return user.firstName + " " + user?.lastName;
        } else if (user?.firstName) {
            return user?.firstName;
        } else {
            return "Name";
        }
    };
    const user = feedback.feedBackBy
    return (
        <div className={" col-span-12  md:col-span-6  lg:col-span-4"} >
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center space-x-4 ">
                    <div className="flex-shrink-0">
                        <Image
                            className="w-10 h-10 rounded-full object-cover"
                            unoptimized
                            src={getUserAvatar(user.avatar)}
                            width={100}
                            height={100}
                            alt="Neil image"/>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-md  text-blue-800 truncate dark:text-white">
                            {getName()}
                        </h3>
                        <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                            {user?.company ? user?.company :"CSTAD"}</p>
                    </div>

                </div>
                <div className="flex flex-row items-center mt-2  mb-2  justify-center">
                    {feedback.rating >=2 && <Rating value={feedback.rating}>{renderRatingStars()}</Rating>}
                </div>
                <p className=" text-center text-xs font-normal text-gray-500 dark:text-gray-400">
                    {feedback.description ? feedback.description :"not found"}</p>
            </div>

        </div>
    );
}
export default SBFeedbackCard;