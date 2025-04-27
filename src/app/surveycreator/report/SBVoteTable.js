import React from 'react';
import {Badge, Table} from "flowbite-react";
import Link from "next/link";
import LoadingReportTable from "@/components/loading/surveycreatorloading/LoadingReportTable";
import SBHandlePagination from "@/app/surveycreator/report/SBHandlePagination";
import moment from "moment";

function SBVoteTable({data,isLoading, onSort, onPageChange}) {
    if (isLoading){
        return <LoadingReportTable />
    }

    return (
        <div className={"overflow-x-auto"}>
            <Table className={"overflow-scroll"}>
                <Table.Head>
                    <Table.HeadCell
                        className="w-12"
                    >
                        ID
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Title
                    </Table.HeadCell>
                    <Table.HeadCell className={"whitespace-nowrap"}>
                        Status
                    </Table.HeadCell>
                    <Table.HeadCell>
                       Vote Option
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Create
                    </Table.HeadCell>
                    <Table.HeadCell>
                  <span className="sr-only">
                    Edit
                  </span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    { data && data.list.map((question, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {question.id}
                            </Table.Cell>
                            <Table.Cell>
                                {question.title}
                            </Table.Cell>
                            <Table.Cell className={"flex justify-center"}>
                                <Badge color={question.status ? "success" : "failure"}
                                       className={"!w-4 !h-4 rounded-full"}></Badge>
                            </Table.Cell>
                            <Table.Cell>
                                <small>{question.voteOption}</small>
                            </Table.Cell>
                            <Table.Cell>
                                {moment(question.createdAt).format('YYYY-MM-DD')}
                            </Table.Cell>
                            <Table.Cell className={"flex space-x-5 hidden"}>
                                <Link
                                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                    href="#"
                                >
                                    <p>
                                        Edit
                                    </p>
                                </Link>
                                <Link
                                    className="font-medium text-red-500 hover:underline dark:text-red-400"
                                    href="#"
                                >
                                    <p>
                                        Delete
                                    </p>
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <SBHandlePagination data={data} isLoading={isLoading} onPageChange={onPageChange} />
        </div>
    );
}

export default SBVoteTable;