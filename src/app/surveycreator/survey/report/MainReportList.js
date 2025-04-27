'use client'
import React, {useEffect, useState} from 'react';
import {Accordion, Button, Card} from "flowbite-react";
import {FaFilePdf} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {addSurvey, addSurveyQuestions, selectSurvey, setIsLoading} from "@/store/feature/survey/surveySlide";
import {BiCollapseVertical} from "react-icons/bi";
import {VscUngroupByRefType} from "react-icons/vsc";
import {questionType} from "@/store/feature/question/questionConfig";
import {
    AccordionContentEssay,
    AccordionContentMultipleChoice, AccordionContentRating, AccordionContentYesNo
} from "@/components/surveycreator/surveys/Utils/ReportUtils";
import {useGetSingleSurveyQuery} from "@/store/feature/survey/surveyApiSlice";
import LoadingIndicator from "@/app/sign-in/components/LoadingIndicator";
import SBHandleContent from "@/components/surveycreator/SBHandleContent";
import SBSurveyReportLoading from "@/components/loading/surveycreatorloading/SBSurveyReportLoading";
import {TfiReload} from "react-icons/tfi";
import {useRouter} from "next/navigation";


function MainReportList({params}) {
    const router = useRouter()
    const dispatch = useDispatch()
    const [pollingInterval, setPollingInterval] = useState(null)
    const [isPolling, setIsPolling] = useState(false)
    const { id } = params
    // const [fetchSurvey, { data: res, isLoading, isFetching, error }] = useLazyGetSingleSurveyQuery(id)
    const {data: res, isLoading, isFetching, error} = useGetSingleSurveyQuery(id, {...pollingInterval})
    const currentSurvey = useSelector(selectSurvey)
    const [collapseAll, setCollapseAll] = useState(false)
    const [allwaysOpen, setAllwaysOpen] = useState(true)
    const totalReport = currentSurvey?.answers.length
    const active= "dark:!bg-gray-700 dark:!text-white"

    // useEffect(() => {
    //     fetchSurvey(id)
    // },[fetchSurvey, id])

    useEffect(() => {
        if (res?.data) {
            dispatch(addSurvey(res.data))
            dispatch(addSurveyQuestions(res.data.surveyQuestions || []))
            dispatch(setIsLoading(false))
        }
    },[dispatch, res])

    return (
        <SBHandleContent
            isLoading={isLoading || isFetching}
            error={error}
            customLoadingContent={<SBSurveyReportLoading />}
        >
            <div className={"mt-5 md:mt-10 flex flex-col space-y-2 sm:flex-row sm:space-y-0 justify-between"}>
                <div>
                    <Button.Group>
                        <Button
                            color="gray"
                            size={"sm"}
                            onClick={() => setCollapseAll(!collapseAll)}
                            className={collapseAll ? active : ""}
                        >
                            <BiCollapseVertical className="mr-3 h-4 w-4" />
                            <p className={"text-xs"}>
                                Collapse All
                            </p>
                        </Button>
                        <Button
                            color="gray"
                            size={"sm"}
                            onClick={() => setAllwaysOpen(!allwaysOpen)}
                            className={allwaysOpen ? active : ""}
                        >
                            <VscUngroupByRefType className="mr-3 h-4 w-4" />
                            <p className={"text-xs"}>
                                All ways Open
                            </p>
                        </Button>
                        <Button
                            color="gray"
                            size={"sm"}
                            onClick={() => {
                                setIsPolling(!isPolling)
                                setPollingInterval(isPolling ? null : {pollingInterval: 8000})
                            }}
                            className={isPolling ? active : ""}
                        >
                            <TfiReload className={`mr-3 h-4 w-4 ${isPolling?"animate-spin":""}`} />
                            <p className={"text-xs"}>
                                Polling
                            </p>
                        </Button>
                    </Button.Group>
                </div>
                <div>
                    <Button
                        color="light"
                        outline
                        disabled
                        size={"sm"}
                    >
                        <FaFilePdf className={"h-4 w-4 mr-2"}/>
                        <p>Export PDF</p>
                    </Button>
                </div>
            </div>

            {isLoading ? <LoadingIndicator /> : (totalReport > 0 ? (
                <Accordion flush={false} alwaysOpen={allwaysOpen} collapseAll={collapseAll} className="mt-6 text-center">
                    {currentSurvey?.answers?.map((question, i) => (
                        <Accordion.Panel key={i}>
                            <Accordion.Title>
                                {question.id}. {question.name}
                            </Accordion.Title>
                            <Accordion.Content className={"px-2 lg:px-5"}>
                                {(() => {
                                    switch (question.questionType) {
                                        case questionType.essay:
                                            return <AccordionContentEssay survey={currentSurvey} question={question}/>
                                        case questionType.yes_no:
                                            return <AccordionContentYesNo survey={currentSurvey} question={question}/>
                                        case questionType.rating:
                                            return <AccordionContentRating survey={currentSurvey} question={question} />
                                        case questionType.multiple_choice:
                                            return <AccordionContentMultipleChoice question={question} survey={currentSurvey}/>
                                        default:
                                            return <h1>Any type</h1>
                                    }
                                })()}
                            </Accordion.Content>
                        </Accordion.Panel>
                    ))}
                </Accordion>
            ) : (
                <Card>
                    <p className={"text-center text-red-500"}>Report doesn&apos;t exist.</p>
                </Card>
            ))}
        </SBHandleContent>
    );
}

export default MainReportList;