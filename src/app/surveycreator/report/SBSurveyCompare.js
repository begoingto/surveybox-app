'use client'
import React, {useEffect, useState} from 'react';
import {Accordion, Avatar, Badge, Card, Label, Select} from "flowbite-react";
import {useGetSurveyQuery, useLazyGetSurveyQuery} from "@/store/feature/survey/surveyApiSlice";
import {BsArrowLeft} from "react-icons/bs";
import Link from "next/link";
import AsyncSelect from "react-select/async";
import SBHandleContent from "@/components/surveycreator/SBHandleContent";
import {questionType} from "@/store/feature/question/questionConfig";
import {
    AccordionContentEssay, AccordionContentMultipleChoice,
    AccordionContentRating,
    AccordionContentYesNo
} from "@/components/surveycreator/surveys/Utils/ReportUtils";
import {fileImgUrl} from "@/lib/fileBase";

function SbSurveyCompare() {
    const {data: res, isLoading, isFetching, error} = useGetSurveyQuery({
        page: 1,
        limit: 10,
        filters: {
            sortBy: 'title',
            sortDirection: 'ASC'
        }
    })
    const [survey1, setSurvey1] = useState(null)
    const [survey2, setSurvey2] = useState(null)



    return (
        <SBHandleContent
            isLoading={isLoading || isFetching}
            error={error}
            customLoadingContent={<LoadingCompares />}
        >
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 mt-5"}>
                <div className="md:col-span-2 relative">
                    <Link href={"/surveycreator/report"}
                          className={"flex items-center text-yellow-300 opacity-75 hover:opacity-100 md:absolute md:top-0 md:left-0"}>
                        <BsArrowLeft className={"mr-2"} />
                        Back
                    </Link>
                    <h1 className={"text-center text-2xl font-bold uppercase text-cyan-500"}>
                        Compare Survey Form
                    </h1>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="survey1"
                            value="Select Survey Object:"
                        />
                    </div>
                    <SelectSurvey setSurvey1={setSurvey1} data={res?.data?.list} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="survey2"
                            value="Select Survey Object:"
                        />
                    </div>
                    <SelectSurvey setSurvey2={setSurvey2} data={res?.data?.list} />
                </div>
                <div>
                    {survey1 ? <ShowSurveyInfo survey={survey1} /> : null}
                </div>
                <hr className={"md:hidden"}/>
                <div>
                    {survey2 ? <ShowSurveyInfo survey={survey2} /> : null}
                </div>
                <div>
                    {survey1 ? <SurveyReportResult survey={survey1} /> : (
                        <p className={"border-2 border-gray-200 border-dashed rounded p-4 text-center opacity-75 text-red-500"}>
                            Please select survey to compare
                        </p>
                    )}

                </div>
                <div>
                    {survey2 ? <SurveyReportResult survey={survey2} /> : (
                        <p className={"border-2 border-gray-200 border-dashed rounded p-4 text-center opacity-75 text-red-500"}>
                            Please select survey to compare
                        </p>
                    )}
                </div>
            </div>
        </SBHandleContent>
    );
}

export default SbSurveyCompare;

const LoadingCompares = () =>{
    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 animate-pulse"}>
            <div className="w-full h-10 bg-gray-200 rounded dark:bg-gray-700"></div>
            <div className="w-full h-10 bg-gray-200 rounded dark:bg-gray-700"></div>
            <div className="w-full h-[100vh] bg-gray-200 rounded dark:bg-gray-700"></div>
            <div className="w-full h-[100vh] bg-gray-200 rounded dark:bg-gray-700"></div>
        </div>
    )
}

const SelectSurvey = ({data,...props}) => {
    const [search, setSearch] = useState("")
    const [selectedValue, setSelectedValue] = useState(null)
    const [fetchSurvey, { data: res, isLoading, isFetching, error }] = useLazyGetSurveyQuery({ skip: true});
    const [surveys, setSurveys] = useState(data)

    useEffect(() => {
        if(search){
            fetchSurvey({
                page: 1,
                limit: 10,
                filters: {
                    title: search,
                    sortBy: 'id',
                    sortDirection: 'desc'
                }
            })
            if (res){
                setSurveys(res.data.list)
            }
        }
    }, [fetchSurvey, res, search]);

    const promiseOptions = () => new Promise((resolve) => {
            setTimeout(() => {
                resolve(surveys);
            }, 500);
        });

    const handleLabelOption = (option) => {
        return (
            <div className={"flex justify-between items-center"}>
                <p>{option.id}. {option.title}</p>
                <span className={"text-xs"}>{option.startDate} to {option.endDate}</span>
            </div>
        )
    }

    const handleOnFocus = () => {
        fetchSurvey({
            page: 1,
            limit: 10,
            filters: {
                sortBy: 'id',
                sortDirection: 'ASC'
            }
        })
        if (res){
            setSurveys(res.data.list)
        }
    }

    const handleOnMenuClose = () => {
        if (props.setSurvey1){
            props.setSurvey1(selectedValue)
        }
        if (props.setSurvey2){
            props.setSurvey2(selectedValue)
        }
    }

    return (
        <>
            <AsyncSelect
                className="begoingto-react-select"
                isLoading={isLoading}
                cacheOptions
                isClearable
                defaultOptions
                inputValue={search}
                onInputChange={setSearch}
                value={selectedValue}
                onMenuClose={handleOnMenuClose}
                onFocus={handleOnFocus}
                loadOptions={promiseOptions}
                getOptionLabel={handleLabelOption}
                getOptionValue={(option) => option.id}
                onChange={(e) => setSelectedValue(e)}
            />
        </>
    )
}


const SurveyReportResult = ({survey}) => {
    return (
        <>
            <Accordion flush={false} alwaysOpen={true} collapseAll={false} className="mt-6 text-center">
                {survey.answers.map((question, i) => (
                    <Accordion.Panel key={i}>
                        <Accordion.Title>
                            {question.id}. {question.name}
                        </Accordion.Title>
                        <Accordion.Content>
                            {(() => {
                                switch (question.questionType) {
                                    case questionType.essay:
                                        return <AccordionContentEssay survey={survey} question={question}/>
                                    case questionType.yes_no:
                                        return <AccordionContentYesNo survey={survey} question={question}/>
                                    case questionType.rating:
                                        return <AccordionContentRating survey={survey} question={question} />
                                    case questionType.multiple_choice:
                                        return <AccordionContentMultipleChoice question={question} survey={survey}/>
                                    default:
                                        return <h1>Any type</h1>
                                }
                            })()}
                        </Accordion.Content>
                    </Accordion.Panel>
                ))}
            </Accordion>
        </>
    )
}

const ShowSurveyInfo = ({survey}) => {
    return (
        <Card className={"text-center flex flex-col space-y-2"}>
            <h1 className={"font-medium text-xl"}>ID: {survey?.id}</h1>
            <h1 className={"font-medium text-xl"}>{survey?.title}</h1>
            <p className={"flex justify-center items-center"}>
                <span>Status:</span>
                <Badge color={survey?.status?"info":"failure"} className={"rounded-full px-3 ml-2"}>
                    {survey?.status?"Active":"Inactive"}
                </Badge>
            </p>
            <p>Schedule: {survey?.startDate} to {survey?.endDate}</p>
            <p>Survey Option: {survey?.surveyOption}</p>
            <p>total Question: {survey?.surveyQuestions.length}</p>
        </Card>
    )
}