import React from 'react';
function SBSCPersonalLoading() {
    return (
        <>
            <div >
                <div className='sm:grid grid-cols-12 gap-10 py-12  px-6'>
                    <div className='col-span-12 md:col-span-4 place-content-center'>
                        <div className="bg-slate-50 dark:bg-gray-800 p-8 rounded-md">
                            <div className={"flex justify-end"}>
                                <div
                                    className={"h-6 w-6 bg-gray-200  dark:bg-gray-700 text-left"}/>

                            </div>
                            <div className="grid  justify-center items-center " >

                                <div
                                     className={"hover:cursor-pointer w-24 h-24 rounded-full animate-pulse relative"}
                                >

                                    <div className={"flex  items-center justify-center absolute top-0 left-0 w-full h-full bg-gray-200  dark:bg-gray-700 bg-opacity-40 z-40 rounded-lg"}>

                                        <div />
                                    </div>
                                    <div id="dropzone-file" />
                                </div>
                                <p className='bg-gray-200  dark:bg-gray-700 w-24 h-4   my-2 text-center'></p>
                            </div>
                        </div>
                        <br/>
                        {/* social media */}
                        <div className="bg-slate-50 dark:bg-gray-800 p-8 rounded-md">
                            <h1 className='text-xl font-medium bg-gray-200   dark:bg-gray-700  w-36 h-6 dark:bg-blue-600'> </h1>
                            <div className='flex items-center mt-5'>
                                <div className="h-5 w-5 mr-3 bg-gray-200  dark:bg-gray-700 dark:text-blue-600"/>
                                <div className={"bg-gray-200 w-36 h-7 bg-gray-200 rounded-lg     dark:bg-gray-700 "}
                                ></div>

                            </div>
                            <div className='flex items-center mt-5'>
                                <div className="h-5 w-5 mr-3 bg-gray-200  dark:bg-gray-700 dark:text-blue-600"/>
                                <div className={"bg-gray-200 w-36 h-7 rounded-lg bg-gray-200  dark:bg-gray-700 "}
                                ></div>

                            </div>
                            <div className='flex items-center mt-5'>
                                <div className="h-5 w-5 mr-3 bg-gray-200  dark:bg-gray-700 dark:text-blue-600"/>
                                <div className={"bg-gray-200 w-36 h-7 rounded-lg bg-gray-200  dark:bg-gray-700 "}
                                ></div>

                            </div>
                            <div className='flex items-center mt-5'>
                                <div className="h-5 w-5 mr-3 bg-gray-200  dark:bg-gray-700 dark:text-blue-600"/>
                                <div className={"bg-gray-200 rounded-lg w-36 h-7 bg-gray-200  dark:bg-gray-700 "}
                                ></div>

                            </div>


                        </div>
                    </div>
                    <div className='col-span-12 md:col-span-8 animate-pulse'>
                        <div className={'bg-slate-50 dark:bg-gray-800 p-8 rounded-md h-full'}>
                            <h1 className='text-xl font-medium bg-gray-200  w-56 h-7 dark:bg-gray-700 dark:text-blue-600'></h1>
                            <div className='grid grid-cols-12 gap-2 '>
                                <div className={"col-span-12 md:col-span-6 "}>
                                    {/* First name*/}
                                    <div className="mb-2 bg-gray-200   dark:bg-gray-700 w-32 h-5 block mt-6">
                                    </div>
                                    <div className={"bg-gray-200     dark:bg-gray-700 w-[355px]  rounded-lg h-9"} ></div>

                                    {/*Gender*/}

                                    <div className="mb-6 block mt-6">
                                        <div className={"bg-gray-200     dark:bg-gray-700 w-24 h-4"} htmlFor="gender" value="Gender"/>
                                    </div>
                                    <div role="group" aria-labelledby="my-radio-group" className={"flex"}>
                                        <div className="flex items-center gap-2">
                                            <div

                                                className="w-6 h-6 bg-gray-200   dark:bg-gray-700 rounded-full border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <div className={"bg-gray-200   dark:bg-gray-700 w-24 h-5 "}></div>
                                        </div>

                                        <div className="flex items-center gap-2 ml-2 ">
                                            <div

                                                className="w-6 h-6 bg-gray-200   dark:bg-gray-700 rounded-full border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <div className={"bg-gray-200   dark:bg-gray-700 w-24 h-5 "}></div>
                                        </div>
                                    </div>
                                    {/*Email*/}
                                    <div className="mb-2 bg-gray-200   dark:bg-gray-700 w-32 h-5 block mt-6">
                                    </div>
                                    <div className={"bg-gray-200     dark:bg-gray-700 w-[355px]  rounded-lg h-9"} ></div>

                                    {/*company*/}
                                    <div className="mb-2 bg-gray-200   dark:bg-gray-700 w-32 h-5 block mt-6">
                                    </div>
                                    <div className={"bg-gray-200     dark:bg-gray-700 w-[355px]  rounded-lg h-9"} ></div>

                                </div>
                                <div className={"col-span-12 md:col-span-6"}>
                                    {/*Last name*/}
                                    <div className="mb-2 bg-gray-200   dark:bg-gray-700 w-32 h-5 block mt-6">
                                    </div>
                                    <div className={"bg-gray-200     dark:bg-gray-700 w-[355px] rounded-lg h-9"} ></div>


                                    {/*Phone number*/}
                                    <div className="mb-2 bg-gray-200   dark:bg-gray-700 w-32 h-5 block mt-6">
                                    </div>
                                    <div className={"bg-gray-200     dark:bg-gray-700 w-[355px] rounded-lg h-9"} ></div>


                                    {/*Address*/}
                                    <div className="mb-2 bg-gray-200   dark:bg-gray-700 w-32 h-5 block mt-6">
                                    </div>
                                    <div className={"bg-gray-200     dark:bg-gray-700 w-[355px] rounded-lg h-9"} ></div>

                                    {/*position*/}
                                    <div className="mb-2 bg-gray-200   dark:bg-gray-700 w-32 h-5 block mt-6">
                                    </div>
                                    <div className={"bg-gray-200     dark:bg-gray-700 w-[355px] rounded-lg h-9"} ></div>

                                </div>
                            </div>
                            <br/>

                            <div className='flex justify-between items-center'>
                                <div
                                    className={"bg-gray-200 rounded-full  dark:bg-gray-700 w-28 h-9"}>
                                    <span className={"px-3   lg:px-8"}></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default SBSCPersonalLoading;