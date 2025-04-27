'use client'
import React from 'react';
import {Checkbox, Label} from "flowbite-react";
import {BsFillCCircleFill, BsFillQuestionCircleFill} from "react-icons/bs";
import {FaUserCog} from "react-icons/fa";

function ExistingQuestionItemCheck({question,questionsChecked,setQuestionsCheck}) {
    const handleCheck = (e) => {
        if (questionsChecked){
            const existed = questionsChecked.find((item) => item.id === question.id)
            if(e.target.checked && existed===undefined){
                setQuestionsCheck([...questionsChecked, question])
            }else{
                setQuestionsCheck(questionsChecked.filter((item) => item.id !== question.id))
            }
        }else {
            setQuestionsCheck([question])
        }
    }
    return (
        <>
            <Label htmlFor={`question-${question.id}`} className="hover:cursor-pointer">
                <div className="flex items-center gap-2 py-3 sm:py-4 px-2">
                    <Checkbox
                        id={`question-${question.id}`}
                        checked={questionsChecked ? (questionsChecked.find((item) => item.id === question.id) !== undefined): false}
                        onChange={handleCheck}
                    />
                    <div className={"w-full"}>
                        <div className="flex items-center space-x-4">
                            <div className="shrink-0">
                                <BsFillQuestionCircleFill className={"h-10 w-10"} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-xs lg:text-base font-medium text-gray-900 dark:text-white">
                                    {question.id}. {question.name}
                                </p>
                                <p className="truncate text-sm text-gray-500 dark:text-gray-400 flex gap-3">
                                    <span className={"flex items-center gap-2"}>
                                        <FaUserCog /> {question.user ? question.user.firstName + ' ' + question.user.lastName : 'Anonymous'}
                                    </span> |
                                    <span className={"flex items-center gap-2"}>
                                        <BsFillCCircleFill /> {question.category ? question.category.name : 'Uncategorized'}
                                    </span>
                                </p>
                            </div>
                            <div className="inline-flex items-center text-xs font-semibold text-gray-900 dark:text-white">
                                {question.questionType}
                            </div>
                        </div>
                    </div>
                </div>
            </Label>
        </>
    );
}

export default ExistingQuestionItemCheck;