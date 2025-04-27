import React from 'react';

function VoteLoadingIndicator(props) {
    return (
        <div  className="col-span-12 lg:col-span-6 h-full animate-pulse bg-gray-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
            <div className="pb-3">
                <div className="p-3  px-5 flex flex-col gap-2">
                    <div className="flex justify-between mt-5">
                        <div className="h-5 bg-gray-200 rounded dark:bg-gray-700 w-72"></div>
                        <div className="h-5 bg-gray-200 rounded dark:bg-gray-700 w-32"></div>
                    </div>
                </div>
                <div className=" p-3 px-5 flex item  s-center justify-between mt-5 ">
                    <div className="h-5 bg-gray-200 rounded dark:bg-gray-700 w-44"></div>
                    <div className="h-5 bg-gray-200 rounded dark:bg-gray-700 w-44"></div>
                </div>
            </div>
        </div>
    );
}

export default VoteLoadingIndicator;