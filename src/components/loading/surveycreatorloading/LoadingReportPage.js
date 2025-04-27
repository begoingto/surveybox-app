import React from 'react';
import {Card, Table, Tabs} from "flowbite-react";
import {BsPatchCheckFill} from "react-icons/bs";
import {FaClipboardList} from "react-icons/fa";

function LoadingReportPage() {
    return (
        <>
            <Tabs.Group
                aria-label="Default tabs"
                style="default"
            >
                <Tabs.Item
                    title={<div className={"bg-gray-200 dark:bg-gray-700 w-10 md:w-20 lg:w-36 h-6 animate-pulse"}></div>}
                >
                    <Card>
                        <h1 className="bg-gray-200 dark:bg-gray-700 w-36 h-6 animate-pulse"></h1>
                        <div className={"overflow-x-auto"}>
                            <Table>
                                <Table.Head>
                                    <Table.HeadCell
                                        className="w-12"
                                    >
                                        <div className={"w-9 h-4 bg-gray-200 dark:bg-gray-600 "}></div>
                                    </Table.HeadCell>
                                    <Table.HeadCell>
                                        <div className={"w-9 h-4 bg-gray-200 dark:bg-gray-600 "}></div>
                                    </Table.HeadCell>
                                    <Table.HeadCell>
                                        <div className={"w-24 h-4 bg-gray-200 dark:bg-gray-600 "}></div>
                                    </Table.HeadCell>
                                    <Table.HeadCell>
                                        <div className={"w-24 h-4 bg-gray-200 dark:bg-gray-600 "}></div>
                                    </Table.HeadCell>
                                    <Table.HeadCell>
                                        <div className={"w-28 h-4 bg-gray-200 dark:bg-gray-600 "}></div>
                                    </Table.HeadCell>
                                    <Table.HeadCell>
                                  <span className="sr-only">
                                    Edit
                                  </span>
                                    </Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    {Array.from({length: 10}).map((item,index) => (
                                        <Table.Row key={index}  className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                <div className={"h-5 w-24 bg-gray-200 dark:bg-gray-700"}></div>
                                            </Table.Cell>
                                            <Table.Cell className={"truncate"}>
                                                <div className={"h-5 w-48 bg-gray-200 dark:bg-gray-700"}></div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <div className={"h-5 w-24 bg-gray-200 dark:bg-gray-700"}></div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <div className={"h-5 w-24 bg-gray-200 dark:bg-gray-700"}></div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <div className={"h-5 w-24 bg-gray-200 dark:bg-gray-700"}></div>
                                            </Table.Cell>
                                            <Table.Cell className={"flex space-x-5"}>
                                                <div className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                    <div className={"h-5 w-12 bg-gray-200 dark:bg-gray-700"}></div>
                                                </div>
                                                <div className="font-medium text-red-500 hover:underline dark:text-red-400">
                                                    <div className={"h-5 w-12 bg-gray-200 dark:bg-gray-700"}></div>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </div>
                    </Card>
                </Tabs.Item>
                <Tabs.Item
                    disabled
                    title={<div className={"bg-gray-200 dark:bg-gray-700 w-10 md:w-20 lg:w-36 h-6 animate-pulse"}></div>}
                >
                </Tabs.Item>
                <Tabs.Item
                    disabled
                    title={<div className={"bg-gray-200 dark:bg-gray-700 w-10 md:w-20 lg:w-36 h-6 animate-pulse"}></div>}
                >
                </Tabs.Item>
                <Tabs.Item
                    disabled
                    title={<div className={"bg-gray-200 dark:bg-gray-700 w-10 md:w-20 lg:w-36 h-6 animate-pulse"}></div>}
                >
                </Tabs.Item>
                <Tabs.Item
                    disabled
                    title={<div className={"bg-gray-200 dark:bg-gray-700 w-10 md:w-20 lg:w-36 h-6 animate-pulse"}></div>}
                >
                </Tabs.Item>
            </Tabs.Group>
        </>
    );
}

export default LoadingReportPage;