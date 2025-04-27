'use client'
import React, {useEffect} from 'react';
import { Badge, Card } from 'flowbite-react';
import Image from 'next/image';
import { avatarDefault } from '@/lib/siteConfig';
import {
    useGetVoteResponseByIdQuery,
    useLazyGetSingleVoteQuery,
} from '@/store/feature/vote/voteApiSlice';
import VoteChart from "@/app/surveycreator/vote/result/VoteChart";
import { getUserAvatar } from "@/lib/fileBase";
import {useDispatch} from "react-redux";
import {addVote, addVoteResultSets} from "@/store/feature/vote/voteSlice";
import {addSurvey, addSurveyQuestions, setIsLoading} from "@/store/feature/survey/surveySlide";
import SBHandleContent from "@/components/surveycreator/SBHandleContent";
import {TableVoteUser} from "@/app/surveycreator/vote/result/TableVoteUser";

function VResult({ params }) {
    const { id } = params;
    const dispatch = useDispatch()
    const { data: res, isLoading, isError } = useGetVoteResponseByIdQuery(id);
    const [fetchVotes, {data: vote,isFetching,error}] = useLazyGetSingleVoteQuery(id)

    useEffect(() => {
        fetchVotes(id)
    }, [fetchVotes, id]);
    useEffect(() => {
        if (vote?.data) {
            dispatch(addVote(vote?.data))
        }
    }, [dispatch, vote]);
    


    const votingResponse = res?.data; // Access the fetched voting response directly
    const totalVoteCount = votingResponse?.result?.reduce((total, item) => total + (item?.voteCount || 0), 0) || 0;
    const totalParticipants = totalVoteCount + (votingResponse?.result?.[0]?.voteCount || 0);

    return (
        <SBHandleContent
            isLoading={isLoading || isFetching}
            error={error}
        >
            <div key={votingResponse?.voteId} className="mt-10">
                <div className="relative">
                    <Badge className="absolute top-0 right-0 m-2">{votingResponse?.voteId} </Badge>
                    <Card className="mt-5 border-0">
                        <div className={"text-start text-base font-medium text-gray-900 truncate dark:text-white"}>
                            <h1 className={"text-xl font-semibold text-gray-900 dark:text-white uppercase"}>Vote Title</h1>
                            <p className="mb-5 dark:text-gray-400 text-lg my-2">{votingResponse?.title}</p>

                        </div>
                        <div className="relative">
                            <div className="grid gap-8 lg:gap-16 grid-cols-2 !static">
                                {votingResponse?.result?.map((resultItem, index) => (
                                    <div key={index} className="text-center text-gray-500 dark:text-gray-400">
                                        <div className="mx-auto mb-4 w-24 h-24 lg:w-36 lg:h-36 rounded-full md:w-28 md:h-28">
                                            <Image
                                                unoptimized
                                                width={100}
                                                height={100}
                                                src={resultItem?.image ? getUserAvatar(resultItem?.image) : avatarDefault?.src}
                                                alt="avatar"
                                                className="object-center object-cover mx-auto mb-4 w-24 h-24 lg:w-36 lg:h-36 rounded-full md:w-28 md:h-28"
                                            />
                                        </div>
                                        <p className="flex justify-center">{resultItem?.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <VoteChart chartData={votingResponse?.result} />
                            </div>
                            <div>
                                <ul className="divide-y divide-gray-200 dark:divide-gray-700 p-5">
                                    <li className="pb-2">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-1">
                                                <p className="text-base text-start font-medium text-gray-900 truncate dark:text-white">
                                                    Vote Answer
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                Total
                                            </div>
                                        </div>
                                    </li>
                                    {votingResponse?.result?.map((item, i) => (
                                        <li className="py-3" key={i}>
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-1">
                                                    <p className="text-base text-start font-medium text-gray-900 truncate dark:text-white">
                                                        {i+1}. {item?.value}
                                                    </p>
                                                </div>
                                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    {item?.votePercentage?.toFixed(2)}%
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                    <div>
                                        {votingResponse?.result?.map((resultItem, index) => (
                                            <div key={index} className="text-center text-gray-500 dark:text-gray-400 my-4">
                                                <p className="flex text-right">
                                                    {resultItem?.value} Total Vote: {resultItem?.voteCount}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </ul>
                            </div>
                        </div>
                        <p className="mb-5 dark:text-gray-400 text-lg">
                            Total Vote: {totalVoteCount} (from {totalParticipants} participants)
                        </p>
                    </Card>
                </div>
            </div>
            <div className={"mt-5"}>
                <TableVoteUser votingResponse={res?.data}/>
            </div>
        </SBHandleContent>
    );
}

export default VResult;
