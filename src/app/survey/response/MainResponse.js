'use client'
import React, {useEffect, useState} from 'react';
import {InputRadioAndCheckboxPreview} from "@/components/Utils";
import {useFormik, useFormikContext} from "formik";
import {questionType} from "@/store/feature/question/questionConfig";
import {Alert, Button, Card, Label, Textarea, TextInput} from "flowbite-react";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchSurveyQuestions,
    selectResError,
    selectResponseSurveyQuestions,
    selectResStatus
} from "@/store/feature/response/response";
import moment from "moment";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {
    addValidates, removeValidateByQuestionId,
    selectSubSurveyError,
    selectSubSurveyStatus, selectValidatesSurvey,
    submitSurveyQuestions
} from "@/store/feature/response/surveySubmitResponse";
import SBHandleContent from "@/components/surveycreator/SBHandleContent";
import {HiInformationCircle} from "react-icons/hi2";
import SbHandleThemeMode from "@/components/SBHandleThemeMode";
import {fileImgUrl} from "@/lib/fileBase";

function MainResponse({params}) {
    const {uuid} = params
    const dispatch = useDispatch();
    const currentSurvey = useSelector(selectResponseSurveyQuestions);
    const status = useSelector(selectResStatus);
    const error = useSelector(selectResError)
    const router = useRouter()
    const submitStatus = useSelector(selectSubSurveyStatus)
    const submitError = useSelector(selectSubSurveyError)
    const now = moment().format('YYYY-MM-DD')
    const validating = useSelector(selectValidatesSurvey)
    const [valid, setValid] = useState(true)


    useEffect(() => {
        dispatch(fetchSurveyQuestions({uuid}));
    },[dispatch, uuid])


    const formik = useFormik({
        initialValues: {
            surveyId: currentSurvey?.id,
            username: null,
            email: null,
            answers: currentSurvey?.surveyQuestions
        },
        onSubmit: (values,{setSubmitting}) => {
            if (validating.length > 0) {
                setSubmitting(false)
                setValid(false)
            }else {
                dispatch(submitSurveyQuestions({id:currentSurvey?.id,data: values}))
                setTimeout(() => {
                    setSubmitting(false)
                    router.push(`/survey/success?uuid=${uuid}`)
                }, 1500)
            }
        }
    })

    // useEffect(() => {
    //     if (submitStatus==='success') {
    //         // router.push(`/survey/success?uuid=${uuid}`)
    //     }
    // },[router, submitStatus])


    useEffect(() => {
        if (currentSurvey) {
            formik.setFieldValue('surveyId', currentSurvey.id)
            formik.setFieldValue('answers', currentSurvey.surveyQuestions)
            const validates = currentSurvey.surveyQuestions.map((q,i) => {
                return {
                    id: q.id,
                    required: q.required,
                    message: `This question ${i+1} is required`
                }
            }).filter(q => q.required)
            dispatch(addValidates(validates))
        }
    },[currentSurvey])

    return (
        <SBHandleContent
            isLoading={status==='loading' || status==='idle'}
            error={error}
            customLoadingContent={<Loading/>}
        >
            <section className={`max-w-3xl mx-auto p-2 rounded bg-gray-100 dark:bg-gray-900 bg-opacity-40 dark:bg-opacity-40 h-[100vh] overflow-auto space-y-5 scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-rounded-full`}>
                <Card className={"!shadow-none !border-0 relative !m-0"}
                      renderImage={() => {
                          return (<Image
                              width={100}
                              unoptimized
                              className={"w-full h-32 object-cover object-center rounded-t-lg"}
                              height={100}
                              src={currentSurvey?.cover? fileImgUrl(currentSurvey?.cover) : `/images/survey/${currentSurvey?.surveyOption?.toLowerCase()}.png`}
                              alt={"cover"}
                          />)
                      }}
                >
                    <div className={"text-center"}>
                        <h1 className="text-blue-800 dark:text-blue-50 text-2xl font-medium capitalize mb-2">
                            {currentSurvey?.title || "Survey Title"}
                        </h1>
                        <p className="text-base leading-relaxed dark:text-gray-300">
                            Hi! Would you mind taking 2 minutes to complete this form? It would be great if you can submit your response by {moment().format("LL")}. Thank you!
                        </p>
                    </div>
                    <div className="absolute bottom-0 right-0">
                        <SbHandleThemeMode />
                    </div>
                </Card>

                {!moment(now).isBefore(currentSurvey?.endDate) && (
                    <Alert
                        color="failure"
                        icon={HiInformationCircle}
                    >
                  <span>
                    <p>
                      <span className="font-medium">
                        Survey!&nbsp;
                      </span>
                      This survey is expired
                    </p>
                  </span>
                    </Alert>
                )}

                {!currentSurvey?.status && (
                    <Alert
                        color="failure"
                        icon={HiInformationCircle}
                    >
                  <span>
                    <p>
                      <span className="font-medium">
                        Survey!&nbsp;
                      </span>
                      This survey is inactive
                    </p>
                  </span>
                    </Alert>
                )}



                {currentSurvey?.status && moment(now).isBefore(currentSurvey?.endDate) && (
                    <form onSubmit={formik.handleSubmit}>

                        <div className='flex flex-col space-y-5'>

                            {currentSurvey?.surveyOption==='REQUIRED'?(
                                <div className='dark:bg-gray-800 bg-gray-100 w-full p-5 md:p-10 rounded-lg'>

                                    <p className='mb-5 text-base'>The Survey is require you name and email, please input the blank field below.</p>

                                    <div>
                                        <div className="mb-2 block">
                                            <Label
                                                htmlFor="username"
                                                value="Your Name"
                                            />
                                        </div>
                                        <TextInput
                                            id="username"
                                            helperText={submitError?"Please input your name":null}
                                            color={submitError?"failure":"gray"}
                                            placeholder="Enter your full name"
                                            type="text"
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label
                                                htmlFor="email"
                                                value="Your email"
                                            />
                                        </div>
                                        <TextInput
                                            id="email"
                                            helperText={submitError?"Please input your email":null}
                                            color={submitError?"failure":"gray"}
                                            placeholder="Enter your real email"
                                            type="email"
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                </div>
                            ): null}

                            {formik.values.answers?.map((question, i) => <QuestionItem
                                formik={formik}
                                key={i}
                                index={i}
                                question={question}
                            />)}

                        </div>

                        <div className={"mt-3"}>
                            {submitError?(
                                <Alert
                                    color="failure"
                                >
                                    <ul>
                                        {submitError?.errors?.map((err, i) => console.log(submitError?.errors)
                                            // <li key={i} className={"list-disc"}>{err.message}</li>
                                        )}
                                    </ul>
                                </Alert>
                            ):null}
                        </div>

                        {validating.length>0 && !valid && (
                            <Alert
                                color="failure"
                            >
                          <span>
                              <ul className="p-0 m-0 space-y-1 list-disc list-inside">
                                  {validating.map((err, i) => <li key={i} className={"list-disc"}>{err.message}</li>)}
                              </ul>
                          </span>
                            </Alert>
                        )}


                        <Button
                            color={"success"}
                            gradientDuoTone="greenToBlue"
                            type={"submit"}
                            className={"my-5 uppercase w-full"}
                            disabled={formik.isSubmitting || 'loading'===submitStatus}
                            isProcessing={formik.isSubmitting || 'loading'===submitStatus}
                        >
                            Submit
                        </Button>
                    </form>
                )}
            </section>
        </SBHandleContent>

    );
}

export default MainResponse;

const QuestionItem = ({question,index, formik}) => {
    return (
        <div className='dark:bg-gray-800 bg-gray-100 w-full p-5 md:p-10 rounded-lg'>

            <h1 className='mb-5 text-xl'>
                {index+1}. {question.required? <sup className={"text-red-500"}>*</sup> : ''} {question.name}
            </h1>

            {(() => {
                switch (question.questionType) {
                    case questionType.essay:
                        return <EssayQuestion question={question} formik={formik} index={index}/>
                    case questionType.yes_no:
                        return <YesNoQuestion question={question} formik={formik} index={index}/>
                    case questionType.multiple_choice:
                        return <MultipleChoiceQuestion question={question} formik={formik} index={index}/>
                    case questionType.rating:
                        return <RatingQuestion question={question} formik={formik} index={index}/>
                    default:
                        return <p className={"!text-yellow-300"}>Default Not exist</p>
                }
            })()}
        </div>
    )
}

const EssayQuestion = ({question, formik, index}) => {
    const [answer, setAnswer] = useState('')
    const dispatch = useDispatch()
    // const valid = useSelector(selectValidatesSurveyByQuestionId(question.id))

    const handleAnswerInput = (e) => {
        if (question.required){
            dispatch(removeValidateByQuestionId(question))
        }
        setAnswer(e.target.value)
        formik.setFieldValue(`answers.${index}.answerSet`, e.target.value)
    }

    return (
        <>
            <Textarea
                className={"resize-none"}
                id="answer"
                placeholder="Text answer here..."
                rows={4}
                onChange={handleAnswerInput}
            />
        </>
    )
}

const MultipleChoiceQuestion = ({question, formik, index}) => {
    const [answer, setAnswer] = useState([])
    const dispatch = useDispatch()

    const handleChange = (e) => {
        if (question.required){
            dispatch(removeValidateByQuestionId(question))
        }
        if (question.answerOption==='single'){
            setAnswer(e.target.value)
            const answerSets = question.answerSet.map((item, indexItem) => {
                if(indexItem === Number(e.target.value)){
                    return {
                        ...item,
                        answered: true
                    }
                }
                return {
                    ...item,
                    answered: false
                }
            })
            formik.setFieldValue(`answers.${index}.answerSet`,answerSets)
        }else{
            let updatedList = [...answer];
            if (e.target.checked) {
                updatedList = [...answer, e.target.value];
            } else {
                updatedList.splice(answer.indexOf(e.target.value), 1);
            }
            setAnswer(updatedList);
            const answerSets = question.answerSet.map((item, indexItem) => {
                if(updatedList.includes(indexItem.toString())){
                    return {
                        ...item,
                        answered: true
                    }
                }
                return {
                    ...item,
                    answered: false
                }
            })
            formik.setFieldValue(`answers.${index}.answerSet`,answerSets)
        }
    }

    return (
        <div className={"grid grid-cols-12 gap-3"}>
            {question.answerSet?.map((item, i) =>(
                <div key={i} className={`col-span-12 sm:col-span-6 md:col-span-${formik.values.answers[index].layout}`}>
                    <div className="flex items-center gap-2 my-2 w-full">
                        <InputRadioAndCheckboxPreview
                            type={question.answerOption==='single'?'radio':'checkbox'}
                            name={'item_'+index}
                            id={`item-${i}-${index}`}
                            // defaultChecked={i===0}
                            value={i}
                            onChange={handleChange}
                            label={item.name}
                        />
                    </div>
                </div>

            ))}
        </div>
    )
}

const RatingQuestion = ({question, formik, index}) => {
    const dispatch = useDispatch()
    const handleChange = (e) => {
        if (question.required){
            dispatch(removeValidateByQuestionId(question))
        }
        const answerSets = question.answerSet.map((item, indexItem) => {
            if(indexItem === Number(e.target.value)){
                return {
                    ...item,
                    answered: true
                }
            }
            return {
                ...item,
                answered: false
            }
        })
        formik.setFieldValue(`answers.${index}.answerSet`,answerSets)
    }

    return (
        <div className={"grid grid-cols-12 gap-3"}>
            {question.answerSet?.map((item, i) =>(
                <div key={i} className={`col-span-12 sm:col-span-6 md:col-span-${formik.values.answers[index].layout}`}>
                    <div className="flex items-center gap-2 my-2 w-full">
                        <InputRadioAndCheckboxPreview
                            type={'radio'}
                            name={'rating_'+index}
                            id={`rating_${i}_${index}`}
                            defaultValue={i}
                            onChange={handleChange}
                            label={item.name}
                        />
                    </div>
                </div>

            ))}
        </div>
    )
}

const YesNoQuestion = ({question, formik, index}) => {
    const [answer, setAnswer] = useState(null)
    const dispatch = useDispatch()

    const handleChange= (e) => {
        if (question.required){
            dispatch(removeValidateByQuestionId(question))
        }
        setAnswer(e.target.value)
        const answerSets = question.answerSet.map((item, indexItem) => {
            if(item.name === e.target.value){
                return {
                    ...item,
                    answered: true
                }
            }
            return {
                ...item,
                answered: false
            }
        })
        formik.setFieldValue(`answers.${index}.answerSet`,answerSets)
    }

    return (
        <div className={"grid grid-cols-12 gap-3"}>
            {question.answerSet?.map((item, i) =>(
                <div key={i} className={`col-span-12 sm:col-span-6 md:col-span-${formik.values.answers[index].layout}`}>
                    <div className="flex items-center gap-2 my-2 w-full">
                        <InputRadioAndCheckboxPreview
                            type={'radio'}
                            // defaultChecked={i===0}
                            name={`YesNoAnswer${index}`}
                            id={`yesno-${i}-${index}`}
                            value={item.name}
                            onChange={handleChange}
                            label={item.name}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

const Loading = () => {
    return (
        <section className={"max-w-3xl mx-auto p-2 rounded bg-gray-100 dark:bg-gray-900 bg-opacity-40 dark:bg-opacity-40 h-[100vh] overflow-auto space-y-5 scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-rounded-full"}>

            <div className='flex flex-col space-y-5 lg:space-y-10'>
                {Array.from({length: 5}).map((_, i) => (
                    <div key={i} className='dark:bg-gray-600 bg-gray-200 rounded-lg w-full p-3 md:p-10'>
                        <div className='h-8 dark:bg-gray-800 bg-gray-100 rounded-lg w-full animate-pulse'></div>
                        <div className={"mt-10 mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"}>
                            <div className='h-8 dark:bg-gray-800 bg-gray-100 rounded-lg w-full animate-pulse'></div>
                            <div className='h-8 dark:bg-gray-800 bg-gray-100 rounded-lg w-full animate-pulse'></div>
                            <div className='h-8 dark:bg-gray-800 bg-gray-100 rounded-lg w-full animate-pulse'></div>
                            <div className='h-8 dark:bg-gray-800 bg-gray-100 rounded-lg w-full animate-pulse hidden lg:block'></div>
                            <div className='h-8 dark:bg-gray-800 bg-gray-100 rounded-lg w-full animate-pulse hidden lg:block'></div>
                            <div className='h-8 dark:bg-gray-800 bg-gray-100 rounded-lg w-full animate-pulse hidden lg:block'></div>
                            <div className='h-8 dark:bg-gray-800 bg-gray-100 rounded-lg w-full animate-pulse hidden lg:block'></div>
                            <div className='h-8 dark:bg-gray-800 bg-gray-100 rounded-lg w-full animate-pulse hidden lg:block'></div>
                            <div className='h-8 dark:bg-gray-800 bg-gray-100 rounded-lg w-full animate-pulse hidden lg:block'></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}