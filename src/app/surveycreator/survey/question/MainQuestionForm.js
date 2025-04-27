'use client'
import React, {useEffect, useState} from 'react';
import {HiPlusSm} from "react-icons/hi";
import {
    useLazyGetSingleSurveyQuery,
    useUpdateSurveyQuestionsMutation
} from "@/store/feature/survey/surveyApiSlice";
import {
    addSurvey, addSurveyQuestion,
    addSurveyQuestions,
    selectSurveyQuestions,
    setIsLoading
} from "@/store/feature/survey/surveySlide";
import {useDispatch, useSelector} from "react-redux";
import SBModalSelectQuestion from "@/app/surveycreator/survey/question/SBModalSelectQuestion";
import SBModalSelectExistingQuestion from "@/app/surveycreator/survey/question/SBModalSelectExistingQuestion";
import SBHandleContent from "@/components/surveycreator/SBHandleContent";
import SBQuestionLoading from "@/components/loading/SBQuestionLoading";
import {Button, Checkbox, Label, Modal, Select, TextInput} from "flowbite-react";
import {BsEyeFill, BsFillPlusCircleFill, BsFillSendCheckFill, BsShare} from "react-icons/bs";
import {useFormik} from "formik";
import {questionType} from "@/store/feature/question/questionConfig";
import {useGetCategoriesQuery} from "@/store/feature/category/categoryApiSlide";
import QuestionForm from "@/app/surveycreator/survey/question/QuestionForm";
import {useInsertQuestionMutation} from "@/store/feature/question/questionApiSlide";
import * as Yup from "yup";
import ToastConfig from "@/components/ToastConfig";
import {toast} from "react-toastify";
import {
    QuestionPreviewEssay,
    QuestionPreviewMultipleChoice, QuestionPreviewRating, QuestionPreviewYesNo
} from "@/app/surveycreator/survey/question/Utils/QuestionPreview";
import "./survey-question.css"
import {
    QuestionTypeEssay,
    QuestionTypeMultiChoice, QuestionTypeRating,
    QuestionTypeYesNo
} from "@/app/surveycreator/survey/question/Utils/QuestionTypes";
import QuestionModalPreview from "@/app/surveycreator/survey/question/Utils/QuestionModalPreview";
import {useRouter} from "next/navigation";

export default function MainQuestionForm({params}) {
    // Get id from params
    const { id } = params; // id is array
    const surveyId = id[0]; // get survey id from params
    const dispatch = useDispatch();
    const getSurveyQuestionsState = useSelector(selectSurveyQuestions)
    const {data: categories } = useGetCategoriesQuery({skip: true})

    // const [trigger, result, lastPromiseInfo] = useLazyGetExistingQuestionsQuery({ preferCacheValue: true});
    // const [fetchExistingQuestions, { data: resQuestion, error, isError:existEr, isLoading: exitLoading, isFetching: existFetching }] = useLazyGetExistingQuestionsQuery({ preferCacheValue: true});
    // const { data, isError, isLoading: qLoading, isFetching } = result;
    // const { data: res,isLoading,error} = useGetSingleSurveyQuery(surveyId,{ refetchOnMountOrArgChange: true })

    const [fetchSurvey, { data: res, isLoading, error }] = useLazyGetSingleSurveyQuery(id)
    const [updateQuestions, {isLoading: isUpdating}] = useUpdateSurveyQuestionsMutation()

    // Modal add question
    const [oModal, setOModal] = useState(null);
    const [existOrNew, setExistOrNew] = useState(null);
    const [openModal, setOpenModal] = useState(null);
    const [newQuestion, setNewQuestion] = useState(null);
    const [preview, setPreview] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchSurvey(id)
    },[fetchSurvey, id])

    // useEffect(() => {
    //     fetchExistingQuestions({
    //         skip: true
    //     })
    // },[fetchExistingQuestions])

    // useEffect(()=>{
    //     dispatch(addExistingQuestions(resQuestion.data.list))
    // },[dispatch])

    useEffect(() => {
        if (res?.data) {
            dispatch(addSurvey(res.data))
            dispatch(addSurveyQuestions(res.data.surveyQuestions || []))
            dispatch(setIsLoading(false))
        }
    },[dispatch, res])

    useEffect(() => {
        if (existOrNew==='exist') {
            setOpenModal('default')
        } else if (existOrNew==='new') {
            setNewQuestion("default")
        }
    },[existOrNew, oModal])
    useEffect(() => {
        if (!newQuestion){
            setExistOrNew(null)
        }
    },[newQuestion])
    useEffect(() => {
        if(openModal==='default'){
            setExistOrNew(null)
        }
    },[openModal])

    // useEffect(() => {
    //     dispatch(setIsLoading(isLoading))
    //     const survey = res?.data
    //     dispatch(addSurvey(survey))
    //     dispatch(addSurveyQuestions(survey?.surveyQuestions || []))
    //     trigger(1);
    // },[res,error])

    // useEffect(  () => {
    //     if (data && result.status==='fulfilled') {
    //         dispatch(addExistingQuestions(data?.data?.list))
    //     }
    // }, [trigger, result, qLoading, isFetching, data, dispatch])


    const formik = useFormik({
        initialValues: {
            questions: getSurveyQuestionsState || [],
        },
        onSubmit: async (values) => {
            try {
                const {data: res, error} = await updateQuestions({id: surveyId,data: values})
                if (res?.data) {
                    dispatch(addSurveyQuestions(res.data.surveyQuestions))
                    toast.success('Survey questions updated successfully')
                }
                if (error) {
                    toast.error(error.data.errors)
                }
            }catch (e) {
            }
        }
    })

    //
    useEffect(() => {
        formik.setFieldValue('questions', getSurveyQuestionsState)
    },[getSurveyQuestionsState])

    const handleReset = () =>{
        dispatch(addSurveyQuestions([]))
    }

    const handlePublic = () => {
    }
    // const currentSurvey = useSelector(selectSurvey)

    return (
        <SBHandleContent
            isLoading={isLoading}
            error={error}
            customLoadingContent={<SBQuestionLoading />}
        >
            <ToastConfig />
            <section className="xl:px-0 ">
                <div className="flex text-2xl mt-5 md:mt-10 mb-2.5 items-center text-center justify-center dark:text-blue-600">
                    <h1>There are no question for this survey.</h1>
                </div>
                <div className="flex gap-y-2 items-center text-center justify-center">
                    <p>Would you like to create a new question or choose a pre-written template question?</p>
                </div>

                <div className={"flex justify-between mt-5"}>
                    <button type={"button"} className={"text-red-500"} onClick={handleReset}>
                        Reset
                    </button>
                    <div className={"flex space-x-2 md:space-x-5"}>
                        <Button outline
                                size={"sm"}
                                gradientDuoTone="purpleToBlue" onClick={() => setPreview(true)}
                                disabled={getSurveyQuestionsState?.length===0}
                        >
                            <BsEyeFill className={"w-4 h-4 mr-2"} />
                            <small>Preview</small>
                        </Button>
                        <Button outline
                                size={"sm"}
                                gradientDuoTone="purpleToPink" onClick={() => router.push(`/surveycreator/survey/share/${surveyId}`)}
                                disabled={getSurveyQuestionsState?.length===0}
                        >
                            <BsShare className={"w-4 h-4 mr-2"} />
                            <small>Share</small>
                        </Button>
                        <Button outline
                            size={"sm"}
                            gradientDuoTone="greenToBlue"
                            isProcessing={isUpdating}
                            disabled={getSurveyQuestionsState?.length===0 || res?.data?.answers.length>0}
                            onClick={formik.handleSubmit}
                        >
                            <BsFillSendCheckFill className={"text-base"} />
                            <p className={"ml-2"}>Publish</p>
                        </Button>
                    </div>
                </div>

                <button
                    type={"button"}
                    onClick={() => setOModal('pop-up')}
                    className="flex w-full bg-gray-100 items-center justify-center h-20 my-6 rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 dark:text-blue-600 font-bold text-blue-600"
                >
                    <HiPlusSm className="mt-1 mr-2"/>
                    <p>Add New Question</p>
                </button>
            </section>

            <SBModalSelectQuestion oModal={oModal} setOModal={setOModal} setExistOrNew={setExistOrNew}/>
            <SBModalSelectExistingQuestion openModal={openModal} setOpenModal={setOpenModal} />
            <ModalAddNewQuestion newQuestion={newQuestion} setNewQuestion={setNewQuestion} categories={categories?.data?.list} />

            <QuestionForm
                formik={formik}
                categories={categories?.data?.list}
            />

            <QuestionModalPreview
                formik={formik}
                preview={preview}
                setPreview={setPreview}
            />

        </SBHandleContent>
    );
}

function ModalAddNewQuestion({newQuestion,setNewQuestion,categories }) {
    const [insertQuestion,{isLoading, error}] = useInsertQuestionMutation()
    const dispatch = useDispatch()
    const [addMultiple, setAddMultiple] = useState(false)
    const [clearForm, setClearForm] = useState(true)

    const formik = useFormik({
        initialValues: {
            name: "",
            categoryId: 1,
            questionType: questionType.essay,
            answerTemplate: null,
            layout: 6,
            required: false,
            answerOption: 'yes_no',
            answerSet: []
        },
        validationSchema: Yup.object({
            name: Yup.string().min(5, "The question name field least 5 characters.").required("The question name is required."),
        }),
        onSubmit: (values,{resetForm}) => {
            insertQuestion(values).unwrap()
                .then((res) => {
                    // console.log('res',res)
                    dispatch(addSurveyQuestion(res.data))
                    if (clearForm){
                        resetForm()
                    }
                    if (!addMultiple) {
                        setNewQuestion(undefined)
                    }
                })
                .catch((err) => {
                    toast.error(err.data.messages)
                })
            // setNewQuestion(undefined)
        },
    });

    return (
        <Modal show={newQuestion === 'default'} size={"7xl"} onClose={() => setNewQuestion(undefined)} position={"top-center"}>
            <Modal.Header>Add New Question</Modal.Header>
            <Modal.Body className={"!p-0"}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div>
                        <QuestionCreateForm categories={categories} formik={formik} />
                    </div>
                    <div className={"px-5"}>
                        <div className="bg-blue-50 dark:bg-gray-800 p-8 my-5 rounded-lg shadow dark:border dark:border-gray-700">
                            <h1 className={"mb-5 text-lg"}> <sup className={`text-red-600 ${formik.values.required?'inline':'hidden'}`}>*</sup> {formik.values.name}</h1>
                            {(()=>{
                                switch (formik.values.questionType) {
                                    case questionType.essay:
                                        return <QuestionPreviewEssay formik={formik} />
                                    case questionType.multiple_choice:
                                        return <QuestionPreviewMultipleChoice formik={formik} />
                                    case questionType.yes_no:
                                        return (<QuestionPreviewYesNo formik={formik}/>)
                                    case questionType.rating:
                                        return <QuestionPreviewRating formik={formik} />
                                }
                                return <h1>Answer formatter</h1>
                            })()}
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={formik.handleSubmit}
                    isProcessing={isLoading}
                    disabled={isLoading}
                >
                    <BsFillPlusCircleFill className={"mr-2 text-lg"} /> Add Question
                </Button>
                <Button color="gray" onClick={() => setNewQuestion(undefined)}>
                    Cancel
                </Button>
                <div className="flex w-20 space-x-3 items-center">
                    <div className="flex items-center gap-2">
                        <Checkbox id="stay_add" defaultChecked={addMultiple} name={"required"} onChange={(e) =>setAddMultiple(!addMultiple)} />
                        <Label htmlFor="stay_add" className={"whitespace-nowrap"} value={"Add More"}/>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="clear_form" defaultChecked={clearForm} onChange={(e) => setClearForm(!clearForm)} />
                        <Label htmlFor="clear_form" className={"whitespace-nowrap"} value={"Reset Form"}/>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

const QuestionCreateForm = ({categories,formik}) => {
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="bg-blue-50 dark:bg-gray-800 p-8 shadow dark:border dark:border-gray-700">
                <QuestionCreateFormHeader formik={formik} categories={categories} />

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
                        // color={formik.errors.name ? "failure": 'success'}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        placeholder="Enter question name here..."
                        helperText={<p id="outlined_error_help" className="mt-2 text-xs text-red-600 dark:text-red-500"
                        >{formik.errors.name}</p>}
                    />
                </div>
                {/* End Question */}

                <div className="flex items-center sm:justify-between my-3">
                    <div className="flex w-20 items-center">
                        <div className="flex items-center gap-2">
                            <Checkbox id="required" name={"required"} value={formik.values.required} onChange={formik.handleChange} />
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

const QuestionCreateFormHeader = ({formik, categories}) => {
    const handleChangeQuestionType = (e) => {
        formik.setValues({...formik.values, questionType: e.target.value})
        if (formik.values.questionType!==questionType.yes_no){
            formik.setFieldValue('answerSet',[])
        }else if(formik.values.questionType!==questionType.multiple_choice){
            formik.setFieldValue('layout',6)
            formik.setFieldValue('answerOption','single')
        }else{
            formik.setFieldValue('answerSet',[
                {
                    name: 'Yes',
                    img:''
                },
                {
                    name: 'No',
                    img:''
                }
            ])
        }
    }

    return (
        <div className="flex flex-col sm:flex-row justify-between ">
            <div className="max-w-md">
                <div className="mb-2 block ">
                    <Label
                        htmlFor="categories"
                        value="Category"
                    />
                </div>
                <Select
                    id="categories"
                    name="categoryId"
                    value={formik.values.categoryId}
                    onChange={formik.handleChange}
                >
                    {categories?.map((item,index) => (
                        <option key={index} value={item.id}>{item.name}</option>
                    ))}
                </Select>
            </div>
            <div className="max-w-md">
                <div className="mb-2 block">
                    <Label
                        htmlFor="questionsType"
                        value={`Question type`}
                    />
                </div>
                <Select
                    id="questionsType"
                    name="questionsType"
                    onChange={(e) => handleChangeQuestionType(e)}
                    value={formik.values.questionType}
                >
                    {Object.values(questionType).map((item,index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </Select>
            </div>
        </div>
    )
}
