import React from 'react';
import {Button} from "flowbite-react";

function SbTotalFooter(props) {
    const totalUnAnswer =props.totalUnAnswer || 0;
    const totalAnswer= props.totalAnswer || 0;
    return (
        <section>
            <hr className="h-1 my-8 bg-gray-300 border-0  dark:bg-gray-700"/>
            <div className="grid grid-cols-3">
                <div className="text-left">
                    Unanswered: {totalUnAnswer}
                </div>
                <div className="text-left">
                    Answered: {totalAnswer}
                </div>
                <div >
                    <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        View Detail
                    </button>
                </div>
            </div>
        </section>
    );
}

export default SbTotalFooter;