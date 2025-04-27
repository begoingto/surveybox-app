import React from "react";

export const TabletMockup = ({content, className, ...props}) => {
    return (
        <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[454px] max-w-[341px] md:h-[682px] md:max-w-[512px]">
            <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
            <div className={`rounded-[2rem] overflow-hidden h-[426px] md:h-[654px] bg-white dark:bg-gray-800 bg-[url('${ props.bgImg ? props.bgImg : '/images/response/table-note.jpg' }')] bg-no-repeat bg-cover`}>
                {content}
            </div>
        </div>
    )
}

export const PhoneMockup = ({content, className, ...props}) => {
    return (
        <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
            <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
            <div className={`rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800 bg-[url('${ props.bgImg ? props.bgImg : '/images/response/table-note.jpg' }')] bg-no-repeat bg-cover`}>
                {content}
            </div>
        </div>
    )
}

export const LaptopMockup = ({content, className, ...props}) => {
    return (
        <>
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
                <div className={`rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800 bg-[url('${ props.bgImg ? props.bgImg : '/images/response/table-note.jpg' }')] bg-no-repeat bg-cover`}>
                    {content}
                </div>
            </div>
            <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
            </div>
        </>
    )
}

export const DesktopMockup = ({content, className, ...props}) => {
    return (
        <>
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[16px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
                <div className={`rounded-xl overflow-hidden h-[140px] md:h-[262px] bg-[url('${ props.bgImg ? props.bgImg : '/images/response/table-note.jpg' }')] bg-no-repeat bg-cover`}>
                    {content}
                </div>
            </div>
            <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl h-[24px] max-w-[301px] md:h-[42px] md:max-w-[512px]"></div>
            <div className="relative mx-auto bg-gray-800 rounded-b-xl h-[55px] max-w-[83px] md:h-[95px] md:max-w-[142px]"></div>
        </>
    )
}