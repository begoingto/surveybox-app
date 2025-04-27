import React from 'react';

function MainPageVoteLoading() {
    return (
        <>
            {/* Start Search */}
            <div className="grid grid-cols-2 gap-3 my-5 px-5">
                <div id="searchInput"
                     type="text"
                     className="py-2 bg-gray-200 col-span-2   lg:col-span-1  dark:bg-gray-700  animate-pulse h-12 rounded-md pl-10 focus:outline-none"
                     placeholder="Search..."/>
            </div>
            <div  className={"grid items-center justify-center grid-cols-12 gap-4 px-5 lg:px-5 animate-pulse"}>
                <VoteLoadingItems/>
            </div>

            {/*  End Pagination  */}
        </>
    );
}

export default MainPageVoteLoading;
export const VoteLoadingItems = () => {
    return Array.from({length:5}).map(el => (
        <div key={el}  className= {  " col-span-12 lg:col-span-6 bg-gray-200 md:h-[8.5rem] h-[8.5rem] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"}>
            <div className={"flex justify-center items-center mt-14 gap-3"}>
                <div/>
            </div>
        </div>
    ))
}