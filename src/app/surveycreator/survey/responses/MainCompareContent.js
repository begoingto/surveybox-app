'use client'
import React, {useEffect, useState} from 'react';
import {useLazyGetSurveyResponseQuery} from "@/store/feature/survey/surveyApiSlice";
import SBHandleContent from "@/components/surveycreator/SBHandleContent";
import {Checkbox, Table} from "flowbite-react";
import {questionType} from "@/store/feature/question/questionConfig";

function MainCompareContent({params}) {
    const {id} = params
    const [fetchResponses, { data: res, isLoading, isFetching, error }] = useLazyGetSurveyResponseQuery(id)
    const [firstResponse, setFirstResponse] = useState([])

    useEffect(() => {
        fetchResponses(id)
    }, [fetchResponses, id]);

    useEffect(() => {
        if (res?.data) {
            setFirstResponse(res.data.list[0].answers?.map(q => {
                return {
                    id: q.id,
                    type: q.questionType,
                    answer: q.answerSet
                }
            }))
        }
    }, [res]);

    const responseList=res?.data

    return (
        <SBHandleContent
        isLoading={isLoading}
        error={error}
        >
            <div className={"overflow-x-auto mt-5"}>
                <Table>
                    <Table.Head>
                        <Table.HeadCell className={"border-r border-red-600 whitespace-nowrap text-center"}>
                            Question Type
                        </Table.HeadCell>
                        <Table.HeadCell className={"border-r border-red-600 whitespace-nowrap"}>
                            Answer Result
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {responseList && responseList.list.map((question, index) => (
                            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800 border-0">
                                <Table.Cell className={"p-0"}>
                                    {question.answers.map((answer, answerIndex) => (
                                        <Table.Row key={answerIndex} className="bg-white dark:border-gray-700 dark:bg-gray-800 border">
                                            <Table.Cell className={"whitespace-nowrap"}>
                                                {answer.name}
                                            </Table.Cell>
                                            <Table.Cell className={"whitespace-nowrap"}>
                                                {answer.questionType}
                                            </Table.Cell>
                                            <Table.Cell className={"p-0"}>
                                                {(()=>{
                                                    switch (answer.questionType) {
                                                        case questionType.essay:
                                                            return (<p className={"uppercase"}>String</p>)
                                                        case questionType.multiple_choice:
                                                        case questionType.rating:
                                                        case questionType.yes_no:
                                                            return answer.answerSet.map((an, anIndex) => (
                                                                <Table.Row key={anIndex} className="bg-white dark:border-gray-700 dark:bg-gray-800 border w-52">
                                                                    <Table.Cell className={"whitespace-nowrap dark:border-gray-700 dark:bg-gray-800 border capitalize w-52"}>
                                                                        {an.name}
                                                                    </Table.Cell>
                                                                </Table.Row>
                                                            ))
                                                    }
                                                })()}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Cell>
                                <Table.Cell className={"p-0 w-full"}>
                                    {question.answers.map((answer, answerIndex) => (
                                        <>
                                            {(()=>{
                                                switch (answer.questionType) {
                                                    case questionType.essay:
                                                        return (
                                                            <Table.Row>
                                                                <Table.Cell className={"whitespace-nowrap"}>
                                                                    {typeof(answer.answerSet)==='string' ? answer.answerSet : JSON.stringify(answer.answerSet)}
                                                                </Table.Cell>
                                                            </Table.Row>
                                                        )
                                                    case questionType.multiple_choice:
                                                    case questionType.rating:
                                                    case questionType.yes_no:
                                                        return answer.answerSet.map((an, anIndex) => (
                                                            <Table.Row key={anIndex} className="bg-white dark:border-gray-700 dark:bg-gray-800 border-0 w-72">
                                                                <Table.Cell className={"whitespace-nowrap dark:border-gray-700 dark:bg-gray-800 border capitalize w-72"}>
                                                                    <Checkbox
                                                                        id={`item-${index}-${answerIndex}-${anIndex}`}
                                                                        checked={an.answered}
                                                                        disabled
                                                                    />
                                                                </Table.Cell>
                                                            </Table.Row>
                                                        ))
                                                }
                                            })()}
                                        </>
                                    ))}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </SBHandleContent>
    );
}

export default MainCompareContent;