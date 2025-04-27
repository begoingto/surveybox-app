import React from 'react';

function SBQuestionLoadingItem() {
    return (
        <div className="bg-blue-50 dark:bg-gray-800 p-8 my-5 rounded-lg shadow dark:border dark:border-gray-700 animate-pulse">
            <div className="flex flex-col sm:flex-row justify-between">
                {/* Start Category */}
                <div
                    className="max-w-md"
                    id="select"
                >
                    <div className="mb-2 block ">
                        <div className="w-32 h-7 bg-gray-200 rounded dark:bg-gray-700"></div>
                    </div>
                    <div className="w-44 h-10 bg-gray-200 rounded dark:bg-gray-700"></div>
                </div>

                {/* End Category */}

                {/* Start Choose Question type */}

                <div
                    className="max-w-md"
                    id="select"
                >
                    <div className="mb-2 block">
                        <div className="w-32 h-7 bg-gray-200 rounded dark:bg-gray-700"></div>
                    </div>
                    <div className="w-44 h-10 bg-gray-200 rounded dark:bg-gray-700"></div>
                </div>

                {/* End Choose Question type */}
            </div>

            {/* Start question */}

            <div
                className="my-4"
                id="select"
            >
                <div className="mb-2 block">
                    <div className="w-32 h-7 bg-gray-200 rounded dark:bg-gray-700"></div>
                </div>
                <div className="w-full h-10 bg-gray-200 rounded dark:bg-gray-700"></div>
            </div>

            {/* End Question */}

            {/* Start answer */}

            <div
                className=""
                id="textarea"
            >
                <div className="mb-2 block">
                    <div className="w-32 h-7 bg-gray-200 rounded dark:bg-gray-700"></div>
                </div>
                <div className="w-full h-20 bg-gray-200 rounded dark:bg-gray-700"></div>
            </div>

            {/*  End answer */}

            {/* Start required , copy and delete button */}

            <div className="flex items-center sm:justify-between mt-10 mb-3">
                <div className="w-44 h-7 bg-gray-200 rounded dark:bg-gray-700"></div>
                <div className="flex w-56 items-end justify-end gap-x-4">
                    <div className="w-20 h-7 bg-gray-200 rounded dark:bg-gray-700"></div>
                    <div className="w-20 h-7 bg-gray-200 rounded dark:bg-gray-700"></div>
                    <div className="w-20 h-7 bg-gray-200 rounded dark:bg-gray-700"></div>
                    <div className="w-20 h-7 bg-gray-200 rounded dark:bg-gray-700"></div>
                </div>
            </div>
            <hr className="text-gray-600"/>
            {/* End required , copy and delete button */}
        </div>
    );
}

export default SBQuestionLoadingItem;