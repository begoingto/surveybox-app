"use client"
import React, {useEffect} from 'react';
import {Button, Checkbox, Label, Modal, Radio, Select, TextInput} from "flowbite-react";
import {questionType} from "@/store/feature/question/questionConfig";
import {
    QuestionPreviewEssay,
    QuestionPreviewMultipleChoice, QuestionPreviewYesNo
} from "@/app/surveycreator/survey/question/Utils/QuestionPreview";
import {BsFillPlusCircleFill} from "react-icons/bs";
import {
    QuestionTypeEssay,
    QuestionTypeMultiChoice, QuestionTypeRating,
    QuestionTypeYesNo
} from "@/app/surveycreator/survey/question/Utils/QuestionTypes";
import {useGetCategoriesQuery} from "@/store/feature/category/categoryApiSlide";
import {useFormik} from "formik";
import {addSurveyQuestion, addSurveyQuestions, selectSurveyQuestions} from "@/store/feature/survey/surveySlide";
import {toast} from "react-toastify";
import {useInsertQuestionMutation} from "@/store/feature/question/questionApiSlide";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import SBHandleContent from "@/components/surveycreator/SBHandleContent";
import ToastConfig from "@/components/ToastConfig";
import {useRouter} from "next/navigation";

function Page(props) {
    const {data: res,isLoading,error} = useGetCategoriesQuery({_page:1,_limit:30})
    const router = useRouter()
    const getSurveyQuestionsState = useSelector(selectSurveyQuestions)
    const [insertQuestion] = useInsertQuestionMutation()
    const dispatch = useDispatch()
    const categories =res?.data.list
    const formik = useFormik({
        initialValues: {
            name: "",
            categoryId: 1,
            questionType: questionType.essay,
            answerTemplate: "",
            layout: 6,
            required: false,
            answerOption: '',
            answerSet: []
        },
        validationSchema: Yup.object({
            name: Yup.string().min(5, "The question name field least 5 characters.").required("The question name is required."),
        }),
        onSubmit:( values,{setSubmitting,resetForm}) => {
            insertQuestion(values).unwrap()
                .then((res) => {
                    dispatch(addSurveyQuestion(res.data))
                    setSubmitting(false)
                    toast.success("Insert! Successfully")
                    resetForm()
                    // setNewQuestion(undefined)
                })
                .catch((err) => {
                    toast.error(err.data.messages)
                })
        },
    });
    return (
        <>
            <ToastConfig/>
            <SBHandleContent
                isLoading={isLoading}
                error={error}
            >
                <div className={"p-4"}>
                    <h1 className={"text-xl"}>Add New Question</h1>
                </div>

                <div className={"!p-0"}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div className={"col-span-2"}>
                            <QuestionCreateFormAdmin categories={categories} formik={formik} />
                        </div>
                        {/*<div className={"px-5"}>*/}
                        {/*    <div className="bg-blue-50 dark:bg-gray-800 p-8 my-5 rounded-lg shadow dark:border dark:border-gray-700">*/}
                        {/*        <h1 className={"mb-5 text-lg"}> <sup className={`text-red-600 ${formik.values.required?'inline':'hidden'}`}>*</sup> {formik.values.name}</h1>*/}
                        {/*        {(()=>{*/}
                        {/*            switch (formik.values.questionType) {*/}
                        {/*                case questionType.essay:*/}
                        {/*                    return <QuestionPreviewEssay formik={formik} />*/}
                        {/*                case questionType.multiple_choice:*/}
                        {/*                    return <QuestionPreviewMultipleChoice formik={formik} />*/}
                        {/*                case questionType.yes_no:*/}
                        {/*                    return (<QuestionPreviewYesNo formik={formik}/>)*/}
                        {/*            }*/}
                        {/*            return <h1>Answer formater</h1>*/}
                        {/*        })()}*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <Button
                                onClick={formik.handleSubmit}
                                isProcessing={formik.isSubmitting}
                                disabled={formik.isSubmitting}
                            >
                                <BsFillPlusCircleFill className={"mr-2 text-lg"}/> Add Question
                            </Button>
                            <Button color="gray" onClick={() => router.back()}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>

            </SBHandleContent>
        </>
    )
}
export default Page;


const QuestionCreateFormAdmin = ({categories, formik}) => {
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="bg-blue-50 dark:bg-gray-800 p-8 shadow dark:border dark:border-gray-700">
                <QuestionCreateFormHeaderAdmin formik={formik} categories={categories}/>
                {/* Start question */}
                <div
                    className="my-4"
                    id="select"
                >
                    <div className="mb-2 block">
                        <Label
                            htmlFor="quesion"
                            value="Question"
                        />
                    </div>

                    <TextInput
                        id="quesion"
                        name="name"
                        value={formik.values.name}
                        color={formik.errors.name ? "failure" : 'success'}
                        onChange={formik.handleChange}
                        placeholder="Enter question name here..."
                    />

                    <p id="outlined_error_help"
                       className="mt-2 text-xs text-red-600 dark:text-red-500"
                    >
                        {formik.errors.name}
                    </p>

                </div>
                {/* End Question */}

                <div className="flex items-center sm:justify-between my-3">
                    <div className="flex w-20 items-center">
                        <div className="flex items-center gap-2">
                            <Checkbox id="required" name={"required"} value={formik.values.required}
                                      onChange={formik.handleChange}/>
                            <Label htmlFor="required">
                                Required
                            </Label>
                        </div>
                    </div>
                </div>

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
                            switch (formik.values.questionType) {
                                case questionType.essay:
                                    return (<QuestionTypeEssay formik={formik} />)
                                case questionType.multiple_choice:
                                    return (<QuestionTypeMultiChoice formik={formik} />)
                                case questionType.yes_no:
                                    return (<QuestionTypeYesNo formik={formik} />)
                                case questionType.rating:
                                    return (<QuestionTypeRating formik={formik} />)
                            }
                        })()}
                    </div>
                </div>

                {/*  End answer */}
            </div>
        </form>
    );
};
const QuestionCreateFormHeaderAdmin = ({formik, categories}) => {

    useEffect(() => {
        if (formik.values.questionType === questionType.yes_no) {
            formik.setFieldValue('answerSet', [
                {
                    name: 'Yes',
                    img: ''
                },
                {
                    name: 'No',
                    img: ''
                }
            ])
        }
    }, [formik.values.questionType])

    return (
        <div className="flex flex-col sm:flex-row justify-between ">
            <div
                className="max-w-md"
                id="select"
            >
                <div className="mb-2 block ">
                    <Label
                        htmlFor="categories"
                        value="Category"
                    />
                </div>
                <Select
                    id="categories"
                    name="categoryId"
                    className={"w-44"}
                    onChange={formik.handleChange}
                >
                    {categories?.map((item, index) => (
                        <option key={index} value={item.id}>{item.name}</option>
                    ))}
                </Select>
            </div>
            <div
                className="max-w-md"
                id="select"
            >
                <div className="mb-2 block">
                    <Label
                        htmlFor="questionsType"
                        value={`Question type`}
                    />
                </div>
                <Select
                    id="questionsType"
                    name="questionsType"
                    onChange={(e) => formik.setValues({...formik.values, questionType: e.target.value})}
                    value={formik.values.questionType}
                >
                    {Object.values(questionType).map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </Select>
            </div>
        </div>
    )
}
