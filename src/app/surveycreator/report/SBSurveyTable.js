'use client'
import React, {useEffect, useState} from 'react';
import {Badge, Pagination, Table} from "flowbite-react";
import Link from "next/link";
import LoadingIndicator from "@/app/sign-in/components/LoadingIndicator";
import {LuArrowDownAZ, LuArrowUpAZ, LuArrowUpZA} from "react-icons/lu";
import SBHandlePagination from "@/app/surveycreator/report/SBHandlePagination";
import LoadingReportTable from "@/components/loading/surveycreatorloading/LoadingReportTable";
import {IoSettingsSharp} from "react-icons/io5";
import SbButtonsNavigation from "@/components/surveycreator/surveys/Utils/SBButtonsNavigation";

function SbQuestionTable({data,isLoading,onSort,onPageChange}) {
    const [asc, setAsc] = useState(true)

    if (isLoading) return <LoadingReportTable />

    return (
        <>
            <div className={"overflow-x-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-100 scrollbar-rounded-full"}>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell
                            className="w-12"
                        >
                            ID
                        </Table.HeadCell>
                        <Table.HeadCell className="w-56 hover:cursor-pointer"
                                        onClick={() => {
                                            onSort('title', asc ? 'ASC' : 'DESC')
                                            setAsc(!asc)
                                        }}
                        >
                            <div className={"flex justify-between"}>
                                <span>Title</span>
                                <div className={"flex"}>
                                    {asc ? <LuArrowDownAZ /> : <LuArrowUpZA />}
                                </div>
                            </div>
                        </Table.HeadCell>
                        <Table.HeadCell className={"whitespace-nowrap"}>
                            Status
                        </Table.HeadCell>
                        <Table.HeadCell className={"whitespace-nowrap"}>
                            Survey Option
                        </Table.HeadCell>
                        <Table.HeadCell className={"whitespace-nowrap"}>
                            Start & End Date
                        </Table.HeadCell>
                        {/*<Table.HeadCell className={"whitespace-nowrap"}>*/}
                        {/*    Total Questions*/}
                        {/*</Table.HeadCell>*/}
                        <Table.HeadCell>
                          <span className="sr-only">
                            Edit
                          </span>
                        </Table.HeadCell>
                    </Table.Head>
                    {isLoading ? <LoadingIndicator /> : (
                        <Table.Body className="divide-y">
                            { data && data.list.map((item, index) => (
                                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>
                                        {item.id}
                                    </Table.Cell>
                                    <Table.Cell className={"truncate whitespace-nowrap font-medium text-gray-900 dark:text-white"}>
                                        {item.title}
                                    </Table.Cell>
                                    <Table.Cell className={"flex justify-center"}>
                                        <Badge color={item.status ? "success" : "failure"}
                                               className={"!w-4 !h-4 rounded-full"}></Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <small>{item.surveyOption}</small>
                                    </Table.Cell>
                                    <Table.Cell className={"whitespace-nowrap"}>
                                        {item.startDate} - {item.endDate}
                                    </Table.Cell>
                                    {/*<Table.Cell>*/}
                                    {/*    {item.surveyQuestions?.length || 0}*/}
                                    {/*</Table.Cell>*/}
                                    <Table.Cell className={"flex space-x-5"}>
                                        <SbButtonsNavigation survey={item}/>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    )}
                </Table>
            </div>
            <SBHandlePagination data={data} isLoading={isLoading} onPageChange={onPageChange} />
        </>
    );
}

export default SbQuestionTable;