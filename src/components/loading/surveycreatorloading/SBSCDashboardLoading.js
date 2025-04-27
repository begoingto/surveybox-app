import React from 'react';

function SbscDashboardLoading() {
    return (
        <>
            <div className={"flex my-10 animate-pulse"}>
                <div className={"h-5 w-5 mr-2 bg-gray-200 dark:bg-gray-700"}/>
                <div className={"h-5 w-28 mr-2 bg-gray-200 dark:bg-gray-700"}/>
            </div>

            {/*Card */}
            <div className={"grid grid-cols-1 lg:grid-cols-2 gap-4 animate-pulse"}>
                <div>
                    <div>
                        <div className="flex justify-between bg-gray-200   dark:bg-gray-700 w-full h-36 rounded-2xl">
                            <h5 className="mb-2 ">

                            </h5>
                        </div>
                        <div className="mb-2  text-gray-500 dark:text-gray-400">
                            <p></p>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div className="flex justify-between bg-gray-200   dark:bg-gray-700 w-full h-36 rounded-2xl">
                            <h5 className="mb-2 ">

                            </h5>
                        </div>
                        <div className="mb-2  text-gray-500 dark:text-gray-400">
                            <p></p>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div className="flex justify-between bg-gray-200   dark:bg-gray-700 w-full h-36 rounded-2xl">
                            <h5 className="mb-2 ">

                            </h5>
                        </div>
                        <div className="mb-2  text-gray-500 dark:text-gray-400">
                            <p></p>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div className="flex justify-between bg-gray-200   dark:bg-gray-700 w-full h-36 rounded-2xl">
                            <h5 className="mb-2 ">

                            </h5>
                        </div>
                        <div className="mb-2  text-gray-500 dark:text-gray-400">
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <CardTopLoading />
            </div>
            <LineChartLoading />
        </>
    );
}

export default SbscDashboardLoading;

export const CardTopLoading = () => {
    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full"}>
            <div className="bg-gray-200 dark:bg-gray-700 w-full h-36 rounded-lg animate-pulse"/>
            <div className="bg-gray-200 dark:bg-gray-700 w-full h-36 rounded-lg animate-pulse"/>
            <div className="md:col-span-2 lg:col-span-1 bg-gray-200 dark:bg-gray-700 w-full h-36 rounded-lg animate-pulse"/>
        </div>
    )
}

export const LineChartLoading = () => {
    return (
        <div className="mt-5">
            <div className="mixed-chart w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg" id="chart"></div>
        </div>
    )
}