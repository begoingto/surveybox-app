import {Button, Table} from "flowbite-react";
import React from "react";
import SBDonutChart from "@/app/surveycreator/survey/report/SBDonutChart";
import SBRowsBarChart from "@/components/surveycreator/surveys/Utils/SBYesNoReport";
import SBPagination from "@/components/surveycreator/surveys/Utils/SBPagination";
import {BiSolidLeftArrow, BiSolidRightArrow} from "react-icons/bi";


export const AccordionContentEssay = ({survey,question}) => {
    const tableRows = question.answerSet.map((item, i) => (
        <Table.Row
            key={i}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
        >
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <p>ANONYMOUS</p>
            </Table.Cell>
            <Table.Cell>{typeof(item)==='string' ? item : JSON.stringify(item)}</Table.Cell>
        </Table.Row>
    ));

    const {
        data,
        handleResultsNumber,
        handleNextPage,
        hasNextPage,
        handlePrevPage,
        total
    } = SBPagination({ initData: question.answerSet });

    return (
        <>
            <Table>
                <Table.Head className="w-full font-normal bg-blue-300">
                    <Table.HeadCell>User</Table.HeadCell>
                    <Table.HeadCell>Answer</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {data.map((item, i) => {
                        switch (survey.surveyOption) {
                            case 'REQUIRED':
                                return (
                                    <Table.Row
                                        key={i}
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            <p className={"uppercase"}>{item?.user?.username}</p>
                                            <small>{item?.user?.email}</small>
                                        </Table.Cell>
                                        <Table.Cell>{item?.answer}</Table.Cell>
                                    </Table.Row>
                                )
                        }

                        return (
                            <Table.Row
                                key={i}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    <p>ANONYMOUS</p>
                                </Table.Cell>
                                <Table.Cell>{typeof(item)==='string' ? item : JSON.stringify(item)}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            <div className={"flex justify-end gap-2 items-center text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-white border-t-2 border-gray-400"}>
                <select
                        className={"dark:bg-gray-800 bg-white border-0 text-gray-900 text-sm rounded-lg focus:ring-0 block dark:border-gray-800 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-0"}
                        onChange={e => handleResultsNumber(e.target.value)}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value={total}>All</option>
                </select>
                {/*<Button.Group>*/}
                {/*    <Button size={"xs"} onClick={handlePrevPage}>*/}
                {/*        <BiSolidLeftArrow />*/}
                {/*    </Button>*/}
                {/*    <Button size={"xs"} onClick={handleNextPage} disabled={!hasNextPage}>*/}
                {/*        <BiSolidRightArrow />*/}
                {/*    </Button>*/}
                {/*</Button.Group>*/}
            </div>
        </>

    )
}

export const AccordionContentMultipleChoice = ({survey,question}) => {
    const chartData = question.answerSet.map((item, i) => {
        return {
            name: item.name,
            value: Number(item.percentage.toFixed(2))
        }
    })
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SBDonutChart data={chartData} />
                <div>
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        <li className="pb-2">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1">
                                    <p className="text-base text-start font-medium text-gray-900 truncate dark:text-white">
                                        Subject
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    Total
                                </div>
                            </div>
                        </li>
                        {question.answerSet.map((item, i) => (
                            <li className="py-3" key={i}>
                                <div className="flex items-center space-x-4">
                                    <div className="flex-1">
                                        <p className="text-base text-start font-medium text-gray-900 truncate dark:text-white">
                                            {item.name}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        {item.percentage.toFixed(2)}%
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export const AccordionContentYesNo = ({survey,question}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <SBRowsBarChart data={question.answerSet} />
            </div>
            <div className={"self-center"}>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="pb-2">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1">
                                <p className="text-base text-start font-medium text-gray-900 truncate dark:text-white">
                                    {question.answerSet[0].name}
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                {question.answerSet[0].percentage.toFixed(2)}%
                            </div>
                        </div>
                    </li>
                    <li className="pb-2">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1">
                                <p className="text-base text-start font-medium text-gray-900 truncate dark:text-white">
                                    {question.answerSet[1].name}
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                {question.answerSet[1].percentage.toFixed(2)}%
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export const AccordionContentRating = ({survey,question}) => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <SBRowsBarChart data={question.answerSet} />
                </div>
                <div>
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        <li className="pb-2">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1">
                                    <p className="text-base text-start font-medium text-gray-900 truncate dark:text-white">
                                        Subject
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    Total
                                </div>
                            </div>
                        </li>
                        {question.answerSet.map((item, i) => (
                            <li className="py-3" key={i}>
                                <div className="flex items-center space-x-4">
                                    <div className="flex-1">
                                        <p className="text-base text-start font-medium text-gray-900 truncate dark:text-white">
                                            {i+1}. {item.name}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        {item.percentage.toFixed(2)}%
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}