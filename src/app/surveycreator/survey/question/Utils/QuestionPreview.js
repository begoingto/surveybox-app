import React from 'react';
import {Checkbox, Label, Radio, Textarea} from "flowbite-react";
import {InputRadioAndCheckboxPreview} from "@/components/Utils";

export function QuestionPreviewEssay({formik}) {
    return (
        <div
            className=""
            id="textarea"
        >
            <div className="mb-2 block">
                <Label
                    htmlFor="answer"
                    value="Answer"
                />
            </div>
            <Textarea
                id="answer"
                placeholder="Text answer here..."
                disabled
                rows={4}
            />
        </div>
    );
}

export const QuestionPreviewMultipleChoice = ({formik}) => {
    return (
        <div className={"col-span-12"}>
            <div className={"grid grid-cols-12"}>
                {formik.values.answerSet.map((item, index) =>(
                    <div key={index} className={`col-span-12 lg:col-span-${formik.values.layout}`}>
                        <div className="flex items-center gap-2 my-2 w-full">
                            {formik.values.answerOption==='single'? (
                                <Radio
                                    id={`pra${index}`}
                                    name="anItem"
                                    defaultValue={item.name}
                                />
                            ) : (<Checkbox id={`pch${index}`} name="anItem" defaultValue={item.name} />)}

                            <Label
                                htmlFor={formik.values.answerOption==='single' ? `pra${index}` : `pch${index}`}
                                value={item.name ? item.name : `value ${index+1}`}
                            />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export const QuestionPreviewMultipleChoiceArray = ({formik,index}) => {
    // console.log('QuestionPreviewMultipleChoiceArray :',formik.values.questions[index])
    return (
        <div className={"col-span-12"}>
            <div className={"grid grid-cols-12 gap-3"}>
                {formik.values.questions[index]?.answerSet.map((item, i) =>(
                    <div key={i} className={`col-span-12 lg:col-span-${formik.values.questions[index].layout}`}>
                        <div className="flex items-center gap-2 my-2 w-full">
                            <InputRadioAndCheckboxPreview
                                type={formik.values.questions[index].answerOption==='single' ? "radio": "checkbox"}
                                id={formik.values.questions[index].answerOption==='single' ? `pra${i}`: `pch${i}`}
                                name={"anItem"}
                                label={item.name}
                            />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}


export const QuestionPrevMultipleChoice = ({question}) => {
    return (
        <div className={"col-span-12"}>
            <div className={"grid grid-cols-12"}>
                {question.answerSet.map((item, index) =>(
                    <div key={index} className={`col-span-${question.layout}`}>
                        <div className="flex items-center gap-2 my-2 w-full">
                            {question.answerOption==='single'? (
                                <Radio
                                    id={`pra-${question.id}-${index}`}
                                    name="anItem"
                                    defaultValue={item.name}
                                />
                            ) : (<Checkbox id={`pch-${question.id}-${index}`} name="anItem" defaultValue={item.name} />)}

                            <Label
                                htmlFor={question.answerOption==='single' ? `pra-${question.id}-${index}` : `pch-${question.id}-${index}`}
                                value={item.name ? item.name : `value ${index+1}`}
                            />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export const QuestionPreviewYesNo = ({formik}) => {
    return (
        <div className={"flex gap-5"}>
            <div className="flex items-center gap-2">
                <Radio
                    id={`an-true-${formik.values.answerOption}`}
                    name="answerOption"
                    defaultValue={formik.values.answerOption==='yes_no'? 'Yes': 'True'}
                />
                <label className={"text-lg"} htmlFor={`an-true-${formik.values.answerOption}`}>
                    {formik.values.answerOption==='yes_no'? 'Yes': 'True'}
                </label>
            </div>
            <div className="flex items-center gap-2">
                <Radio
                    id={`an-false-${formik.values.answerOption}`}
                    name="answerOption"
                    defaultValue={formik.values.answerOption==='yes_no'? 'no': 'false'}
                />
                <label className={"text-lg"} htmlFor={`an-false-${formik.values.answerOption}`}>
                    {formik.values.answerOption==='yes_no'? 'No': 'False'}
                </label>
            </div>
        </div>
    )
}

export const QuestionPreviewYesNoArray = ({index,formik}) => {
    return (
        <div className={"grid grid-cols-12 gap-3"}>
            {formik.values.questions[index].answerSet.map((item, i) =>(
                <div key={i} className={`col-span-12 sm:col-span-6 md:col-span-${formik.values.questions[index].layout}`}>
                    <div className="flex items-center gap-2 my-2 w-full">
                        <InputRadioAndCheckboxPreview
                            type={'radio'}
                            name={`YesNoAnswer_${index}`}
                            id={`yesno-${i}-${index}`}
                            value={item.name}
                            label={item.name}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export const QuestionPreviewRating = ({formik}) => {
    return (
        <div className={"col-span-12"}>
            <div className={"grid grid-cols-12"}>
                {formik.values.answerSet.map((item, index) =>(
                    <div key={index} className={`col-span-12 lg:col-span-${formik.values.layout}`}>
                        <div className="flex items-center gap-2 my-2 w-full">
                            <Radio
                                id={`rating_${index}`}
                                name="anItem"
                                defaultValue={item.name}
                            />
                            <Label
                                htmlFor={`rating_${index}`}
                                value={item.name ? item.name : `value ${index+1}`}
                            />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export const QuestionPreviewRatingArray = ({formik,index}) => {
    return (
        <div className={"col-span-12"}>
            <div className={"grid grid-cols-12 gap-3"}>
                {formik.values.questions[index]?.answerSet.map((item, i) =>(
                    <div key={i} className={`col-span-12 lg:col-span-${formik.values.questions[index].layout}`}>
                        <div className="flex items-center gap-2 my-2 w-full">
                            <InputRadioAndCheckboxPreview
                                type={"radio"}
                                id={`rating_${i}_${index}`}
                                name={`anItem_${index}`}
                                label={item.name}
                            />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
