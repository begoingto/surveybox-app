import React from 'react';
import {Table} from "flowbite-react";
import Link from "next/link";
import SBHandlePagination from "@/app/surveycreator/report/SBHandlePagination";
import LoadingReportTable from "@/components/loading/surveycreatorloading/LoadingReportTable";

function SbQuestionTable({data,isLoading, onSort, onPageChange}) {

    if (isLoading) return <LoadingReportTable rows={15} />

    return (
        <>
            <div className={"overflow-x-auto"}>
                <Table className={"overflow-scroll"}>
                    <Table.Head>
                        <Table.HeadCell
                            className="w-12"
                        >
                            ID
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Question
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Question Type
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Required
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Category
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
                                    {question.name}
                                </Table.Cell>
                                <Table.Cell>
                                    <small>{question.questionType}</small>
                                </Table.Cell>
                                <Table.Cell>
                                    <small>{question.required?'required':'optional'}</small>
                                </Table.Cell>
                                <Table.Cell>
                                    {question.category ? question.category.name : null}
                                </Table.Cell>
                                <Table.Cell className={"flex space-x-5"}>
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
            </div>
            <SBHandlePagination data={data} defaultPerPage={15} isLoading={isLoading} onPageChange={onPageChange} />
        </>
    );
}

export default SbQuestionTable;