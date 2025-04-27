import React from 'react';
import {Badge, Table} from "flowbite-react";
import {BsFillTrashFill} from "react-icons/bs";
import {FaRegEdit} from "react-icons/fa";

function SbTableAdminThemeCell({theme}) {

    return (
        <>
            <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {theme.id ? theme.id : "None"}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {theme.name}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {theme.createdBy.firstName ? theme.createdBy.firstName  : "None"}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {theme.theme.backgroundColor? theme.theme.backgroundColor : "None"}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {theme.theme.font}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {theme.theme.textColor}
                    </Table.Cell>
                    {/*<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">*/}
                    {/*    <Badge color={survey.status ? "success" : "red"} className={'w-fit h-full'}>*/}
                    {/*        {survey.status ? "Active" : "Inactive"}*/}
                    {/*    </Badge>*/}
                    {/*</Table.Cell>*/}

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


export default SbTableAdminThemeCell;