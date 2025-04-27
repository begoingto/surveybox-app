import React from 'react';
import {Table} from "flowbite-react";

function LoadingReportTable({rows = 10,column = 5 }) {
    return (
        <Table>
            <Table.Head>
                {Array.from(Array(column).keys()).map((item, index) => (
                    <Table.HeadCell key={index}>
                        <div className={" h-5 w-full bg-gray-200 dark:bg-gray-600 animate-pulse"}></div>
                    </Table.HeadCell>
                ))}
            </Table.Head>
            <Table.Body className="divide-y">
                <LoadingTableRows rows={rows} column={column}/>
            </Table.Body>
        </Table>
    );
}

export default LoadingReportTable;

export const LoadingTableRows = ({rows=10,column = 5}) => {
    return Array.from(Array(rows).keys()).map((item, index) => (
        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            {Array.from(Array(column).keys()).map((item, index) => (
                <Table.Cell key={index}>
                    <div className={"h-5 w-full bg-gray-200 dark:bg-gray-700 animate-pulse"}></div>
                </Table.Cell>
            ))}
        </Table.Row>
    ));
}