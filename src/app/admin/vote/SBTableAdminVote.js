import React from 'react';
import {Badge, Table} from "flowbite-react";
import {BsFillTrashFill} from "react-icons/bs";
import {FaRegEdit} from "react-icons/fa";
import {LoadingTableRows} from "@/components/loading/surveycreatorloading/LoadingReportTable";

function SbTableAdminVote({vote,isLoading}) {

    if (isLoading) return <LoadingTableRows />
    
    return (
        <>
            <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {vote.id ? vote.id : "None"}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {vote.title ? vote.title: "None"}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {vote.voteOption ? vote.voteOption : "None"}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {vote.choosing? vote.choosing : "None"}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {vote.user.firstName}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        <Badge color={vote.status ? "success" : "red"} className={'w-fit h-full'}>
                            {vote.status ? "Active" : "Inactive"}
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
            </Table.Body>

        </>
    );
}

export default SbTableAdminVote;