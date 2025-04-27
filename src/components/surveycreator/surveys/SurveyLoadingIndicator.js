import React, {createElement} from 'react';

export function LoadingItem() {
    return createElement(
        'div',
        {
            className: 'h-full animate-pulse bg-gray-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'
        },
        (
            <>
                <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded rounded-b-none dark:bg-gray-700">
                    <svg className="w-full h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg"
                         aria-hidden="true" fill="currentColor" viewBox="0 0 640 512">
                        <path
                            d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/>
                    </svg>
                </div>
                <div className="pb-3">
                    <div className="p-3 flex flex-col gap-2">
                        <div className="h-7 bg-gray-200 rounded dark:bg-gray-700 w-full"></div>
                        <div className="h-7 bg-gray-200 rounded dark:bg-gray-700 w-full"></div>
                        <div className="flex justify-between">
                            <div className="h-5 bg-gray-200 rounded dark:bg-gray-700 w-32"></div>
                            <div className="h-5 bg-gray-200 rounded dark:bg-gray-700 w-14"></div>
                        </div>
                    </div>
                    <div className="px-6 py-4 flex items-center justify-between border-t border-t-gray-400 border-b border-b-gray-400">
                        <div className="h-5 bg-gray-200 rounded dark:bg-gray-700 w-32"></div>
                        <div className="h-5 bg-gray-200 rounded dark:bg-gray-700 w-14"></div>
                    </div>
                </div>

                <div className="p-3 flex items-center justify-center gap-x-6 text-gray-500">
                    <div className="h-5 w-5 bg-gray-200 rounded dark:bg-gray-700"></div>
                    <div className="h-5 w-5 bg-gray-200 rounded dark:bg-gray-700"></div>
                    <div className="h-5 w-5 bg-gray-200 rounded dark:bg-gray-700"></div>
                    <div className="h-5 w-5 bg-gray-200 rounded dark:bg-gray-700"></div>
                    <div className="h-5 w-5 bg-gray-200 rounded dark:bg-gray-700"></div>
                </div>
            </>
        )
    );
}

function SurveyLoadingIndicator({count=8}) {
    return (
        <section className={"px-5 xl:px-0 mt-5"}>
            <div className="h-10 bg-gray-200 rounded dark:bg-gray-700 w-60"></div>
            <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"/>
            <div className={'grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6'}>
                {[...Array(count).keys()].map(el => <LoadingItem key={el} />)}
            </div>
        </section>
    );
}

export default SurveyLoadingIndicator;