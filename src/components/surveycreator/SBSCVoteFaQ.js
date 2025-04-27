'use client'
import React, {useState} from 'react';
import Image from "next/image";
import { avatarDefault } from "@/lib/siteConfig";
import {fileImgUrl, getUserAvatar} from "@/lib/fileBase";

function SBSCVoteFaQ({ index,  voteResultSet,formik }) {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleRadioChange = () => {
        formik.setFieldValue('voteResultSetId', voteResultSet?.id);
    };

    return (
        <div className="flex flex-col items-center col-span-6">
            <label
                htmlFor={`default-radio-${index}`}
                className={`cursor-pointer w-full flex flex-col items-center border-2 rounded-lg p-2 ${
                    isFocused || voteResultSet?.id === formik.values.voteResultSetId ? 'border-blue-500' : 'dark:bg-gray-700'
                } dark:bg-gray-700 relative`}
                onFocus={handleFocus}
                onBlur={handleBlur}
                tabIndex={0}
            >
                <div className="absolute top-2 right-2 z-10">
                    <input
                        onChange={handleRadioChange} // Use the custom function to handle radio change
                        id={`default-radio-${index}`}
                        type="radio"
                        name="voteResultSetId"
                        value={voteResultSet?.id}
                        checked={voteResultSet?.id === formik.values.voteResultSetId} // Determine if it should be checked
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>
                <div>
                    <Image
                        className="object-center object-cover rounded-full h-24 w-24"
                        src={voteResultSet?.image !== '' ? fileImgUrl(voteResultSet.image) : avatarDefault.src}
                        alt="photo"
                        width={100}
                        height={100}
                        unoptimized
                    />
                </div>
                <div className="text-center">
                    <p className="my-2 text-sm font-medium text-gray-900 dark:text-white">{voteResultSet?.value}</p>
                </div>
            </label>
        </div>
    );
}

export default SBSCVoteFaQ;