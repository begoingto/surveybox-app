import React from 'react';
import {Button, Checkbox, Label,  Select} from "flowbite-react";
import {questionType} from "@/store/feature/question/questionConfig";
import {MdContentCopy} from "react-icons/md";
import {RiDeleteBin6Line} from "react-icons/ri";
import {BsFillCheckCircleFill} from "react-icons/bs";
import {removeSurveyQuestion} from "@/store/feature/survey/surveySlide";
import {useDispatch} from "react-redux";
import {
    QuestionTypeEssay,
    QuestionTypeMultiChoiceArray, QuestionTypeRatingArray,
    QuestionTypeYesNoArray
} from "@/app/surveycreator/survey/question/Utils/QuestionTypes";
import QuestionSuggestions from "@/app/surveycreator/survey/question/Utils/QuestionSuggestions";
import QuestionButtons from "@/app/surveycreator/survey/question/Utils/QuestionButtons";

function QuestionForm({ formik, categories }) {
    const dispatch = useDispatch()
    // const getSurveyQuestionsState = useSelector(selectSurveyQuestions)

    const handleCopy = (question) => {
    }
    const handleEdit = (question) => {
    }
    const handleDelete = (question) => {
        dispatch(removeSurveyQuestion(question))
    }
    const handleSave = (question) => {
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                {formik.values.questions?.map((question, index) => (
                    <div key={index}>
                        <div className="bg-cyan-50 dark:bg-gray-800 p-3 lg:p-8 my-5 rounded-lg shadow dark:border dark:border-gray-700 relative overflow-hidden">
                            {/* Question Id */}
                            <small className={"absolute top-0 left-0 bg-cyan-100 dark:bg-cyan-600 p-2 rounded-br-lg"}>{question.id}</small>

                            <QuestionFormHeader formik={formik} question={question} categories={categories} index={index} />

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
                                <div className={"p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"}>
                                    {(() => {
                                        switch (question.questionType) {
                                            case questionType.essay:
                                                return (<QuestionTypeEssay formik={formik} />)
                                            case questionType.multiple_choice:
                                                return (<QuestionTypeMultiChoiceArray formik={formik} index={index} />)
                                            case questionType.yes_no:
                                                return (<QuestionTypeYesNoArray formik={formik} index={index} />)
                                            case questionType.rating:
                                                return (<QuestionTypeRatingArray formik={formik} index={index} />)
                                        }
                                    })()}
                                </div>
                            </div>

                            {/*  End answer */}

                            {/* Start required , copy and delete button */}
                            <QuestionButtons question={question} handleDelete={handleDelete} />
                            <hr className="text-gray-600"/>
                            {/* End required , copy and delete button */}
                        </div>
                    </div>
                ))}
            </form>
        </>
    );
}

export default QuestionForm;


const QuestionFormHeader = ({formik,question, categories, index }) => {
    // console.log('QuestionFormHeader: ',question)
    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between ">
                {/* Start Category */}
                <div
                    className="max-w-md"
                >
                    <div className="mb-2 block ">
                        <Label
                            htmlFor={`category-${index}`}
                            value="Category"
                        />
                    </div>
                    <Select
                        id={`category-${index}`}
                        name="category"
                        disabled
                        value={question.categoryId}
                    >
                        {categories?.map((item,index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))}
                    </Select>
                </div>

                {/* End Category */}

                {/* Start Choose Question type */}

                <div
                    className="max-w-md"
                >
                    <div className="mb-2 block">
                        <Label
                            htmlFor={`questionsType${index}`}
                            value="Question type"
                        />
                    </div>
                    <Select
                        id={`questionsType${index}`}
                        name="questionsType"
                        disabled
                        value={question.questionType}
                    >
                        {Object.values(questionType).map((item,index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </Select>
                </div>

                {/* End Choose Question type */}
            </div>

            {/* Start question */}

            <div
                className="my-4"
            >
                <div className="mb-2 block">
                    <Label
                        htmlFor={`question-${index}`}
                        value="Question"
                    />
                </div>
                <QuestionSuggestions formik={formik} index={index} question={question} />
            </div>
            {/* End Question */}
            <div className="flex w-20 items-center my-5">
                <div className="flex items-center gap-2 hover:cursor-pointer">
                    <Checkbox
                        id={`required-${index}`}
                        // defaultValue={formik.values.questions[index].required}
                        checked={formik.values.questions[index].required}
                        onChange={(e) => formik.setFieldValue(`questions.${index}.required`, e.target.checked)}
                    />
                    <Label htmlFor={`required-${index}`}>
                        Required
                    </Label>
                </div>
            </div>

            {/* Start answer */}
        </>
    )
}