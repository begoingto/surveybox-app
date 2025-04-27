'use client'
import React, {useState} from 'react';
import {Avatar, Button, Card, Tooltip} from "flowbite-react";
import {BsFacebook,BsTelegram, BsTwitter} from "react-icons/bs";
import {FaRegCopy} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {notFound} from "next/navigation";
import LoadingIndicator from "@/app/sign-in/components/LoadingIndicator";
import {fileImgUrl} from "@/lib/fileBase";
import {addVote, selectVote, setIsLoading} from "@/store/feature/vote/voteSlice";
import {useGetSingleVoteQuery} from "@/store/feature/vote/voteApiSlice";
import {toast} from "react-toastify";
import {useCopyToClipboard} from "usehooks-ts";
import ToastConfig from "@/components/ToastConfig";
import {FacebookShareButton, TelegramShareButton, TwitterShareButton} from "react-share";
function SBShare({params}) {
    const { id } = params
    const dispatch = useDispatch();
    const [value, copy] = useCopyToClipboard()
    const { data: res,isLoading,isError} = useGetSingleVoteQuery(id)
    const [vote, setVote] = useState(useSelector(selectVote));
    const [openModal, setOpenModal] = useState(null);

    if (isError && id){
        return notFound();
    }

    // check if survey is null or survey id not equal id from params
    if (!vote && vote?.id!==id){
        dispatch(setIsLoading(isLoading))
        if (isLoading){
            return <LoadingIndicator />
        }
        if (res){
            const data = res.data
            setVote(data)
            dispatch(addVote(vote))
            if (data.addVote===null){
                dispatch(addVote([]))
            }else {
                dispatch(addVote(data.voteResultSets))
            }
        }else{
            dispatch(addVote(null))
        }
        dispatch(setIsLoading(isLoading))
    }else{
        dispatch(setIsLoading(false))
    }
    return (
        <>
            <ToastConfig />
            <section className={"max-w-3xl mx-auto border-0"}>
                <Card className={"mt-5 border-0"}>
                    <h2 className={"font-bold text-blue-800 dark:text-blue-600 text-xl text-center"}>SurveyBox URLs</h2>
                    <p className="mb-5 dark:text-gray-400">
                        Share your referral URL with your audience to earn the vote
                    </p>
                    <div className="flex gap-4 flex-col md:flex-row items-center">
                        <div>
                            <p className="font-medium lg:inline">Link Urls: </p>
                        </div>
                        <Button.Group>
                            <input
                                readOnly
                                type="text"
                                defaultValue={`${process.env.NEXT_PUBLIC_APP_URL}/vote/response/${vote?.uuid}`}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:w-96"
                            />
                            <div className={"relative"}>
                                <Tooltip
                                    content="Copied"
                                    trigger="click"
                                >
                                    <button type="button"
                                            onClick={() => copy(`${process.env.NEXT_PUBLIC_APP_URL}/vote/response/${vote?.uuid}`)}
                                            className="text-white bg-blue-700 h-full hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-tr-lg rounded-br-lg">
                                        <FaRegCopy className={"my-2"}  />
                                    </button>
                                </Tooltip>
                            </div>
                        </Button.Group>
                    </div>
                    <p className="mb-5 dark:text-gray-400 text-center">
                        Share your referral URL with your audience to earn the vote
                    </p>
                    <div>
                        <Avatar
                            img={fileImgUrl(vote?.qrCode)}
                            size="2xl"
                        />
                    </div>
                    <div className={"gap-4 flex flex-row items-center"}>
                        <p className="dark:text-gray-400 text-sm ">
                            Share with social:
                        </p>
                        <FacebookShareButton
                            url={`${process.env.NEXT_PUBLIC_APP_URL}/vote/response/${vote?.uuid}`}
                            quote={"SurveyBox"}
                        >
                            <BsFacebook size={"1.5rem"} className={"text-blue-700"}/>
                        </FacebookShareButton>
                        <TwitterShareButton
                            url={`${process.env.NEXT_PUBLIC_APP_URL}/vote/response/${vote?.uuid}`}
                            quote={"SurveyBox"}
                        >
                            <BsTwitter size={"1.5rem"} className={"text-blue-400"}/>
                        </TwitterShareButton>
                        <TelegramShareButton
                            url={`${process.env.NEXT_PUBLIC_APP_URL}/vote/response/${vote?.uuid}`}
                            quote={"SurveyBox"}
                        >
                            <BsTelegram size={"1.5rem"} className={"text-blue-500"}/>
                        </TelegramShareButton>
                    </div>
                </Card>
            </section>
        </>
    );

}

export default SBShare;