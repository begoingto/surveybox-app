"use client"
import React from 'react';
import {Badge, Table} from "flowbite-react";
import {FaRegEdit} from "react-icons/fa";
import {BsFillTrashFill} from "react-icons/bs";
import SBHandlePagination from "@/app/surveycreator/report/SBHandlePagination";
import {LoadingTableRows} from "@/components/loading/surveycreatorloading/LoadingReportTable";
function SbTableAdminSurveyCell({data,onPageChange,isLoading}) {
    return (
        <>
            <Table hoverable>
                {/* header row */}
                <Table.Head>
                    <Table.HeadCell>id</Table.HeadCell>
                    <Table.HeadCell>Title</Table.HeadCell>
                    <Table.HeadCell>Survey-Option</Table.HeadCell>
                    <Table.HeadCell>created-By</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Active</Table.HeadCell>
                </Table.Head>
                <Table.Body >
                    { isLoading ? <LoadingTableRows column={6} /> : data.list.map((survey, index) => (
                    <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {survey.id ? survey.id : "None"}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {survey.title}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {survey.surveyOption ? survey.surveyOption : "None"}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {survey?.createdBy?.firstName}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <Badge color={survey.status ? "success" : "red"} className={'w-fit h-full'}>
                                {survey.status ? "Active" : "Inactive"}
                            </Badge>
                        </Table.Cell>
                        <Table.Cell>
                            <div className={'flex gap-4'}>
                                <button><BsFillTrashFill/></button>
                                <button>
                                    <FaRegEdit/>
                                </button>
                            </div>
                        </Table.Cell>
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <SBHandlePagination data={data} onPageChange={onPageChange} />
        </>
    );
}

export default SbTableAdminSurveyCell;