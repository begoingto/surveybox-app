import React from 'react';

function LoadingForm() {
    return (
        <div className={"flex flex-col gap-10 my-10"}>
            {/*left side*/}
            <div className={"flex flex-col-reverse lg:grid lg:grid-cols-2 lg:gap-10"}>
                <div>
                    <div className="h-5 bg-gray-300 rounded dark:bg-gray-600 w-2/4 mb-4"></div>
                    <div className={"mb-5"}>
                        <div className="mb-2 block">
                            <div className="h-5 bg-gray-200 rounded dark:bg-gray-700 w-32"></div>
                        </div>
                        <div className="h-16 bg-gray-200 w-full rounded dark:bg-gray-700"></div>
                    </div>
                    <div className={"mb-5"}>
                        <div className="mb-2 block">
                            <div className="h-5 bg-gray-200 rounded dark:bg-gray-700 w-32"></div>
                        </div>
                        <div className="h-8 bg-gray-200 w-full rounded dark:bg-gray-700"></div>
                    </div>
                    <div className={"mb-5"}>
                        <div className="mb-2 block">
                            <div className="h-5 bg-gray-200 rounded dark:bg-gray-700 w-32"></div>
                        </div>
                        <div className="h-8 bg-gray-200 w-full rounded dark:bg-gray-700"></div>
                    </div>
                    <div className={"mb-5"}>
                        <div className="mb-2 block">
                            <div className="h-5 bg-gray-200 rounded dark:bg-gray-700 w-32"></div>
                        </div>
                        <div className="h-8 bg-gray-200 w-full rounded dark:bg-gray-700"></div>
                    </div>
                </div>
                {/*right side image*/}
                <div>
                <div className="relative z-0 w-full mb-6 group">
                    <div className="mb-2 block">
                        <div className="h-5 bg-gray-200 rounded dark:bg-gray-700 w-32"></div>
                    </div>
                    <div
                        className="flex items-center justify-center w-full h-52 bg-gray-300 rounded dark:bg-gray-700">
                        <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                             fill="currentColor" viewBox="0 0 640 512">
                            <path
                                d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/>
                        </svg>
                    </div>
                    <div className="h-8 bg-gray-200 w-full rounded dark:bg-gray-700 mt-3"></div>
                    <div className="h-8 bg-gray-200 w-44 rounded dark:bg-gray-700 mt-3"></div>
                </div>
            </div>
            </div>
            {/*<div className="h-5 bg-gray-300 rounded dark:bg-gray-600 lg:w-3/5 mb-4"></div>*/}

            {/*<div className={"grid grid-cols-1 lg:grid-cols-2 gap-10"}>*/}
                {/*<div>*/}
                {/*    <div className={"mb-5"}>*/}
                {/*        <div className="mb-2 block">*/}
                {/*            <div className="h-5 bg-gray-200 rounded dark:bg-gray-700 w-32"></div>*/}
                {/*        </div>*/}
                {/*        <div className="h-16 bg-gray-200 w-full rounded dark:bg-gray-700"></div>*/}
                {/*    </div>*/}
                {/*    <div className={"mb-5"}>*/}
                {/*        <div className="mb-2 block">*/}
                {/*            <div className="h-5 bg-gray-200 rounded dark:bg-gray-700 w-32"></div>*/}
                {/*        </div>*/}
                {/*        <div className="h-8 bg-gray-200 w-full rounded dark:bg-gray-700"></div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div>
                    {/*<div className={"mb-5"}>*/}
                    {/*    <div className="mb-2 block">*/}
                    {/*        <div className="h-5 bg-gray-200 rounded dark:bg-gray-700 w-32"></div>*/}
                    {/*    </div>*/}
                    {/*    <div className="h-16 bg-gray-200 w-full rounded dark:bg-gray-700"></div>*/}
                    {/*</div>*/}
                    {/*<div className={"mb-5"}>*/}
                    {/*    <div className="mb-2 block">*/}
                    {/*        <div className="h-5 bg-gray-200 rounded dark:bg-gray-700 w-32"></div>*/}
                    {/*    </div>*/}
                    {/*    <div className="h-8 bg-gray-200 w-full rounded dark:bg-gray-700"></div>*/}
                    {/*</div>*/}
                    <div className={"flex justify-end m-auto"}>
                        <div className="h-10 bg-gray-200 w-32 rounded-full dark:bg-gray-700"></div>
                    </div>
                </div>
            {/*</div>*/}
        </div>
    );
}

export default LoadingForm;