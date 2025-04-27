'use client'
import React, {createElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useGetSingleSurveyQuery} from "@/store/feature/survey/surveyApiSlice";
import {addSurvey, addSurveyQuestions, selectSurvey, setIsLoading} from "@/store/feature/survey/surveySlide";
import SBHandleContent from "@/components/surveycreator/SBHandleContent";
import {useFormik} from "formik";
import {Button, Card, DarkThemeToggle} from "flowbite-react";
import {questionType} from "@/store/feature/question/questionConfig";
import {
    QuestionPreviewEssay,
    QuestionPreviewMultipleChoiceArray, QuestionPreviewRatingArray, QuestionPreviewYesNoArray
} from "@/app/surveycreator/survey/question/Utils/QuestionPreview";
import Image from "next/image";
import moment from "moment/moment";
import './cus-theme.css'
import {
    DesktopMockup,
    LaptopMockup,
    PhoneMockup,
    TabletMockup
} from "@/components/surveycreator/surveys/SBDeviceMockups";
import {HiMiniComputerDesktop, HiMiniDevicePhoneMobile} from "react-icons/hi2";
import {BsFillLaptopFill, BsFillTabletFill} from "react-icons/bs";

function MainThemeContent({params}) {
    const { id } = params
    const dispatch = useDispatch()
    const {data: res, isLoading, isFetching, error} = useGetSingleSurveyQuery(id)
    const currentSurvey = useSelector(selectSurvey)
    const [device, setDevice] = useState('phone')

    useEffect(() => {
        if (res?.data) {
            dispatch(addSurvey(res.data))
            dispatch(addSurveyQuestions(res.data.surveyQuestions || []))
            dispatch(setIsLoading(false))
        }
    },[dispatch, res])



    const formik = useFormik({
        initialValues: {
            questions: currentSurvey?.surveyQuestions || [],
        },
    })


    return (
        <SBHandleContent
            isLoading={isLoading || isFetching}
            error={error}
        >
            <section class="py-5">
                {/*<DrawerRightTheme />*/}

                <Button.Group className={"justify-center w-full mb-5"}>
                    <Button
                        color={device==='phone' ? "dark" : "gray"}
                        size={"sm"}
                        onClick={() => setDevice('phone')}
                    >
                        <HiMiniDevicePhoneMobile className="h-8 w-8" />
                    </Button>
                    <Button
                        color={device==='tablet' ? "dark" : "gray"}
                        size={"sm"}
                        onClick={() => setDevice('tablet')}
                    >
                        <BsFillTabletFill className="h-8 w-8" />
                    </Button>
                    <Button
                        color={device==='laptop' ? "dark" : "gray"}
                        size={"sm"}
                        onClick={() => setDevice('laptop')}
                    >
                        <BsFillLaptopFill className="h-8 w-8" />
                    </Button>
                    {/*<Button*/}
                    {/*    color={device==='desktop' ? "dark" : "gray"}*/}
                    {/*    size={"sm"}*/}
                    {/*    onClick={() => setDevice('desktop')}*/}
                    {/*>*/}
                    {/*    <HiMiniComputerDesktop className={`h-8 w-8 `} />*/}
                    {/*</Button>*/}
                </Button.Group>

                <CreateThemeDevice device={device} content={<ThemeContent formik={formik} currentSurvey={currentSurvey} />} />
            </section>
        </SBHandleContent>
    );
}

export default MainThemeContent;

const DrawerRightTheme = ({children}) => {
    return (
        <>
            <div id="drawer-right-example" className="fixed top-16 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white shadow-md w-80 dark:bg-gray-800 lg:transform-none" tabIndex="-1" aria-labelledby="drawer-right-label">
                <h5 id="drawer-right-label" className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"><svg className="w-4 h-4 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>Theme Survey Response</h5>
                <p>coming soon..</p>
            </div>
        </>
    )
}

const CreateThemeDevice = ({device,content}) => {
    switch (device) {
        case 'tablet':
            return <TabletMockup content={content} />;
        case 'phone':
            return <PhoneMockup content={content} />;
        case 'laptop':
            return <LaptopMockup content={content} />;
        case 'desktop':
            return <DesktopMockup content={content} />;
        default:
            return <div>Invalid mockup</div>;
    }
}

const ThemeContent = ({formik,currentSurvey}) => {
    return (
        <section className={`max-w-xs mx-auto p-2 rounded bg-gray-100 dark:bg-gray-900 bg-opacity-40 dark:bg-opacity-40 h-full overflow-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-rounded-full theme-content`}>
            <Card className={"!shadow-none !border-0 relative !m-0"}
                  renderImage={() => {
                      return (<Image
                          width={100}
                          unoptimized
                          className={"w-full h-32 object-cover object-center rounded-t-lg"}
                          height={100}
                          src={`/images/survey/${currentSurvey?.surveyOption?.toLowerCase()}.png`}
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
                    <DarkThemeToggle />
                </div>
            </Card>

            {formik.values.questions?.map((question, index) => (
                <div key={index} className="bg-blue-50 dark:bg-gray-800 p-8 rounded-lg shadow dark:border dark:border-gray-700">
                    <h1 className={"mb-5 text-lg"}>
                        <sup className={`text-red-600 ${formik.values.questions[index].required?'inline':'hidden'}`}>*</sup>
                        {formik.values.questions[index].name}
                    </h1>
                    {(()=>{
                        switch (question.questionType) {
                            case questionType.essay:
                                return <QuestionPreviewEssay />
                            case questionType.multiple_choice:
                                return <QuestionPreviewMultipleChoiceArray formik={formik} index={index} />
                            case questionType.yes_no:
                                return <QuestionPreviewYesNoArray formik={formik} index={index}/>
                            case questionType.rating:
                                return <QuestionPreviewRatingArray index={index} formik={formik}/>
                        }
                        return <h1>Answer formater</h1>
                    })()}
                </div>
            ))}

            <Button
                color={"success"}
                gradientDuoTone="greenToBlue"
                type={"submit"}
                className={"my-5 uppercase w-full"}
                disabled={formik.isSubmitting}
                isProcessing={formik.isSubmitting}
            >
                Submit
            </Button>
        </section>
    )
}