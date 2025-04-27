'use client'
import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
export const TableVoteUser = ({votingResponse}) => {
    const dispatch = useDispatch();
    const [resultItems, setResultItems] = useState([]);
    useEffect(() => {
        if (votingResponse) {
            const groupArrayObject = votingResponse?.result?.reduce((group, arr) => {
                const { voteResultId } = arr;
                group[voteResultId] = group[voteResultId] ?? [];
                group[voteResultId].push(arr);
                return group;
            }, {});
            setResultItems(groupArrayObject);
        }
    }, [dispatch, votingResponse]);
    return (
        <>
            <div  className={"overflow-x-auto mt-5"}>
                <Table>
                    <Table.Head className="w-full font-normal bg-blue-300">
                        {votingResponse?.result?.map((resultItem, index) => (
                            <Table.HeadCell
                                key={index}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell>
                                    <p className={"text-base"}>{resultItem?.value}</p>
                                </Table.Cell>
                            </Table.HeadCell>
                        ))}
                    </Table.Head>
                    <Table.Body className="divide-y">
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            {Object.values(resultItems).map((items, index) => (
                                <Table.Cell key={index} className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    <div className="flex flex-wrap">
                                        {items.map((result, i) => (
                                            <UserInfo key={i} result={result} />
                                        ))}
                                    </div>
                                </Table.Cell>
                            ))}
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>

        </>
    );
};
// const UserInfo = ({ result }) => {
//     // Split the usernames string into an array
//     const usernamesArray = result?.usernames.split(",") || [];
//     // Join the elements of the array with a comma
//     const formattedUsernames = usernamesArray.join(", ");
//     return (
//         <span className={"px-2 shadow-md w-fit dark:bg-gray-700 inline-block rounded-lg mx-2"}>
//       <h1 className={"font-bold text-sm text-center"}>{formattedUsernames}</h1>
//             {/*<small>{result?.email}</small>*/}
//     </span>
//     );
// };
const UserInfo = ({ result }) => {
    const usernamesString = result?.usernames || '';
    const usernamesArray = usernamesString.split(',').map((username) => username.trim());
    if (!Array.isArray(usernamesArray)) {
        return <p>No usernames available.</p>;
    }
    return (
        <span className={"px-2 shadow-md w-fit dark:bg-gray-700 inline-block rounded-lg mx-2"}>
        <div>
            {usernamesArray.map((username, index) => (
                <p key={index}>
                    {index + 1}. {username}
                </p>
            ))}
        </div>
             </span>
    );
};