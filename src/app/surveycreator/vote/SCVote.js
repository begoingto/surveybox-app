import React from 'react';
import {Badge, Card} from "flowbite-react";
import Link from "next/link";
import moment from "moment";
import SBButtonNavigationVote from "@/components/surveycreator/vote/SBButtonNavigationVote";

function ScVote({vote}) {
    const voteStatus = vote.status;

    return (
        <div className={"col-span-12 lg:col-span-6 "}>
            <Link href={`/surveycreator/vote/setting-up/${vote.id}`}>
                <Card className={"hover:bg-gray-50 hover:cursor-pointer transform hover:scale-95 transition-transform duration-300 ease-in-out"}>
                    <div className="flex justify-between">
                        <h5 className="mb-2 text-lg font-medium text-gray-600 dark:text-white">
                            {vote.title ? vote.title : " Undefined title"}
                        </h5>

                        <Badge color={voteStatus ? 'info' : 'danger'} size="sm">
                            <p className={"text-xs"} style={{ color: voteStatus ? 'green' : 'red' }}>
                                {voteStatus ? 'Active' : 'Inactive'}
                            </p>
                        </Badge>
                    </div>
                    <div className="flex justify-between">
                        <div className="mb-2  text-gray-500 dark:text-gray-400">
                            <p className={"text-sm"}>Created: {vote.createAt ? moment(vote.createAt).format('YYYY-MM-DD') : 'null'}</p>
                        </div>
                        <div className="mb-2  text-gray-500 dark:text-gray-400">
                            <p className={"text-sm"}>Answer Type: { vote.voteOption ? vote.voteOption :"null"} </p>
                        </div>
                        <div className="mb-2  text-gray-500 dark:text-gray-400">
                            <SBButtonNavigationVote vote={vote} />
                        </div>
                    </div>

                </Card>

            </Link>

        </div>
    );
}

export default ScVote;