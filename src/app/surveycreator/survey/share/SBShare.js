"use client"
import React, {useState} from 'react';
import {Avatar, Button, Card, Tooltip} from "flowbite-react";
import {BsFacebook,BsTelegram, BsTwitter} from "react-icons/bs";
import {FaRegCopy} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {useGetSingleSurveyQuery} from "@/store/feature/survey/surveyApiSlice";
import {addSurvey, addSurveyQuestions, selectSurvey, setIsLoading} from "@/store/feature/survey/surveySlide";
import {notFound} from "next/navigation";
import LoadingIndicator from "@/app/sign-in/components/LoadingIndicator";
import {fileImgUrl} from "@/lib/fileBase";
import {useCopyToClipboard} from "usehooks-ts";
import ToastConfig from "@/components/ToastConfig";
import {FacebookShareButton, TelegramShareButton, TwitterIcon, TwitterShareButton} from "react-share";
function SBShare({params}) {
    const { id } = params
    const dispatch = useDispatch();
    const [value, copy] = useCopyToClipboard()
    const { data: res,isLoading,isError} = useGetSingleSurveyQuery(id)
    const [survey, setSurvey] = useState(useSelector(selectSurvey));
    // check when get survey from api not found
    if (isError && id){
        return notFound();
    }

    // check if survey is null or survey id not equal id from params
    if (!survey && survey?.id!==id){
        dispatch(setIsLoading(isLoading))
        if (isLoading){
            return <LoadingIndicator />
        }
        if (res){
            const data = res.data
            setSurvey(data)
            dispatch(addSurvey(data))
            if (data.surveyQuestions===null){
                dispatch(addSurveyQuestions([]))
            }else {
                dispatch(addSurveyQuestions(data.surveyQuestions))
            }
        }else{
            dispatch(addSurvey(null))
        }
        dispatch(setIsLoading(isLoading))
    }else{
        dispatch(setIsLoading(false))
    }
    return (
        <>
            <ToastConfig />
            <section>
                <Card className={"mt-5 border-0"}>
                    <h2 className={"font-bold text-blue-800 dark:text-blue-600 text-xl text-center"}>SurveyBox URLs</h2>
                    <p className="mb-5 dark:text-gray-400">
                        Share your referral URL with your audience to earn the survey
                    </p>
                    <div className="flex gap-4 flex-col md:flex-row items-center">
                        <div>
                            <p className="font-medium lg:inline">Link Urls: </p>
                        </div>
                        <Button.Group>
                            <input
                                readOnly
                                type="text"
                                defaultValue={`${process.env.NEXT_PUBLIC_APP_URL}/survey/response/${survey?.uuid}`}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:w-96"
                            />
                            <div className={"relative"}>
                                <Tooltip
                                    content="Copied"
                                    trigger="click"
                                >
                                    <button type="button"
                                            onClick={() => copy(`${process.env.NEXT_PUBLIC_APP_URL}/survey/response/${survey?.uuid}`)}
                                            className="text-white bg-blue-700 h-full hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-tr-lg rounded-br-lg">
                                        <FaRegCopy className={"my-2"} />
                                    </button>
                                </Tooltip>
                            </div>
                        </Button.Group>
                    </div>
                    <div className={"gap-4 flex flex-row items-center"}>
                        <p className="dark:text-gray-400 text-sm ">
                            Share with social:
                        </p>
                        <FacebookShareButton
                            url={`${process.env.NEXT_PUBLIC_APP_URL}/survey/response/${survey?.uuid}`}
                            quote={"SurveyBox"}
                        >
                            <BsFacebook size={"1.5rem"} className={"text-blue-700"}/>
                        </FacebookShareButton>
                        <TwitterShareButton
                            url={`${process.env.NEXT_PUBLIC_APP_URL}/survey/response/${survey?.uuid}`}
                            quote={"SurveyBox"}
                        >
                            <BsTwitter size={"1.5rem"} className={"text-blue-400"}/>
                        </TwitterShareButton>
                        <TelegramShareButton
                            url={`${process.env.NEXT_PUBLIC_APP_URL}/survey/response/${survey?.uuid}`}
                            quote={"SurveyBox"}
                        >
                            <BsTelegram size={"1.5rem"} className={"text-blue-500"}/>
                        </TelegramShareButton>
                    </div>
                    <div>
                        <p className={"text-center"}>Scan QR code</p>
                        <Avatar
                            img={fileImgUrl(survey?.qrCode)}
                            size="2xl"
                        />
                    </div>
                </Card>
            </section>
        </>
    );

}

export default SBShare;