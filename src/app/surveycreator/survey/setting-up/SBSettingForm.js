"use client"
import React, {useEffect, useState} from 'react';
import {Button, Label} from "flowbite-react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {addDays, currentDay, sleep, SUPPORTED_FORMATS, thumbnailDefault} from "@/lib/siteConfig";
import Image from "next/image";
import SbLoadingIndicator from "@/components/SBLoadingIndicator";
import Datepicker from "react-tailwindcss-datepicker";
import {
    useGetSingleSurveyQuery,
    useInsertSurveyMutation,
    useUpdateSurveyMutation
} from "@/store/feature/survey/surveyApiSlice";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {addSurvey, addSurveyQuestions, selectSurvey, setIsLoading} from "@/store/feature/survey/surveySlide";
import LoadingForm from "@/app/surveycreator/survey/setting-up/LoadingForm";
import ToastConfig from "@/components/ToastConfig";
import {getUserAvatar} from "@/lib/fileBase";
import {useRouter} from "next/navigation";
import SBHandleContent from "@/components/surveycreator/SBHandleContent";
import {BiRightArrowAlt, BiSave} from "react-icons/bi";
import {useUploadFileMutation} from "@/store/feature/fileupload/fileapislice";
import {BsArrowLeft} from "react-icons/bs";
import Link from "next/link";


const validationItemSchema = Yup.object({
        title: Yup.string().min(10, "The title field least 10 characters.").max(244,"The value must be less than or equal to 244 characters").required("The title is required."),
    description: Yup.string().min(10, "The description field least 10 characters.").max(244,"The value must be less than or equal to 244 characters").required("The description is required."),
    startDate: Yup.date()
        .required("The start date is required."),
    endDate: Yup.date()
        .required("The end date is required."),
})

function SBSettingForm({params, ...props}) {
    const router = useRouter()
    const { id } = params
    const [insertSurvey] = useInsertSurveyMutation();
    const [updateSurvey] = useUpdateSurveyMutation()
    const dispatch = useDispatch();
    const initSurvey = {
        id: null,
        title: '',
        cover:'',
        description: '',
        startDate: '',
        endDate: '',
        surveyOption: 'REQUIRED',
        msgWelcome: '',
        msgSuccess: '',
        displayQuestion: 'ALL',
        iconSuccess: '🎊',
        iconWelcome: '🎇',
        datepicker: ''
    }

    const {data: res, isLoading, error} = useGetSingleSurveyQuery(id)

    useEffect(() => {
        dispatch(setIsLoading(isLoading))
    },[res, error, dispatch, isLoading])

    if (res && id) {
        const survey = res.data
        dispatch(addSurvey(survey))
        dispatch(addSurveyQuestions(survey?.surveyQuestions || []))
        initSurvey.id = survey.id
        initSurvey.title = survey.title
        initSurvey.cover = survey.cover
        initSurvey.surveyOption = survey.surveyOption
        initSurvey.description = survey.description
        initSurvey.msgWelcome = survey.msgWelcome
        initSurvey.msgSuccess = survey.msgSuccess
        initSurvey.displayQuestion = survey.displayQuestion
        initSurvey.iconSuccess = survey.iconSuccess
        initSurvey.iconWelcome = survey.iconWelcome
        initSurvey.startDate = survey.startDate
        initSurvey.endDate = survey.endDate
    }else{
        dispatch(addSurvey(null))
        dispatch(addSurveyQuestions([]))
    }

    return (
        <SBHandleContent
            isLoading={isLoading}
            error={error}
            disabledErrorCode={400}
            customLoadingContent={<LoadingForm/>}
        >
            <ToastConfig/>
            <Formik
                initialValues={initSurvey}
                validationSchema={validationItemSchema}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    if (values.datepicker !== '') {
                        delete values.datepicker
                    }
                    setTimeout(async () => {
                        if (initSurvey.id === null) {
                            const {data: res} = await insertSurvey(values)
                            if (res.code === 200) {
                                // dispatch(addSurvey(res.data))
                                // dispatch(addSurveyQuestions(res.data.surveyQuestions || []))
                                toast.success("You have been create survey successful.")
                                await sleep(1000)
                                router.push(`/surveycreator/survey/setting-up/${res.data.id}`)
                            }else{
                                toast.error("You have been create survey fail.")
                            }
                        } else {
                            const {data: res} = await updateSurvey({id: values.id, data: values})
                            if (res.code === 200) {
                                dispatch(addSurvey(res.data))
                                dispatch(addSurveyQuestions(res.data.surveyQuestions || []))
                                toast.success("You have been update survey successful.")
                            }else {
                                toast.error("You have been update survey fail.")
                            }
                        }
                        setSubmitting(false)
                        // resetForm()
                    }, 500)
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      setFieldValue,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                  }) => (
                    <Form onSubmit={handleSubmit} className={"flex flex-col gap-5 my-10"}>
                        <div className={"flex flex-col-reverse lg:grid lg:grid-cols-2 lg:gap-5"}>
                            {/*left side*/}
                            <div>
                                <h1 className='text-xl font-medium text-blue-800 dark:text-blue-600 mb-4'>General
                                    Information</h1>
                                <div className={"mb-5"}>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="title"
                                            value="Title"
                                        />
                                    </div>
                                    <Field
                                        name="title"
                                        value={values.title}
                                        className={"block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                                        placeholder="Enter survey title..."
                                    />
                                    <ErrorMessage name="title" component={"p"}
                                                  className="mt-2 text-sm text-red-600 dark:text-red-500"/>

                                </div>
                                <div className={"mb-5"}>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="description"
                                            value="Description"
                                        />
                                    </div>
                                    <Field
                                        size={6}
                                        as={"textarea"}
                                        name="description"
                                        value={values.description}
                                        className={"block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                                        placeholder="Enter survey description..."
                                    />
                                    <ErrorMessage name="description" component={"p"}
                                                  className="mt-2 text-sm text-red-600 dark:text-red-500"/>

                                </div>
                                <div className={"mb-5"}>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="displayQuestion"
                                            value="Display Question"
                                        />
                                    </div>
                                    <Field
                                        as="select"
                                        name="displayQuestion"
                                        value={values.displayQuestion}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value={"ALL"}>All question at once</option>
                                        <option value={"STEP"} disabled>One question at time</option>
                                    </Field>
                                </div>
                                <div className={"mb-5"}>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="surveyOption"
                                            value="Survey response type"
                                        />
                                    </div>
                                    <Field
                                        as="select"
                                        name="surveyOption"
                                        value={values.surveyOption}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value={"ANONYMOUS"}>ANONYMOUS</option>
                                        <option value={"REQUIRED"}>REQUIRED</option>
                                        <option value={"REGISTER"} disabled>REGISTER</option>
                                    </Field>
                                </div>
                                <div className={"mb-5"}>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="datepicker"
                                            value="Start and End Date"
                                        />
                                    </div>
                                    <Field
                                        name="datepicker"
                                        size={4}
                                        values={values}
                                        component={SBDatePicker}
                                    />
                                    <ErrorMessage name="startDate" component={"p"}
                                                  className="mt-2 text-sm text-red-600 dark:text-red-500"/>
                                    <ErrorMessage name="endDate" component={"p"}
                                                  className="mt-2 text-sm text-red-600 dark:text-red-500"/>
                                </div>
                            </div>
                            {/*right side*/}
                            <div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <div className="mb-2 pl-20 block">
                                        <Label
                                            htmlFor="cover"
                                            value="Thumbnail"
                                        />
                                    </div>
                                    <Field
                                        type="file"
                                        name="cover"
                                        completed={isSubmitting}
                                        image={values.cover}
                                        setFieldValue={setFieldValue}
                                        component={ActionFile}
                                    />
                                    {/*<TextInput*/}
                                    {/*    className="mt-6"*/}
                                    {/*    name="url"*/}
                                    {/*    placeholder="Link URLs Here"*/}
                                    {/*    type="url"/>*/}
                                </div>
                            </div>
                        </div>

                        {/*<p className='col-span-2 dark:text-blue-600'>Communicate to your participants at the beginning*/}
                        {/*    and end of your survey.</p>*/}
                        {/*<div className={"grid grid-cols-1 lg:grid-cols-2 gap-5"}>*/}
                        {/*    <div>*/}
                        {/*        <div className={"mb-5"}>*/}
                        {/*            <div className="mb-2 block">*/}
                        {/*                <Label*/}
                        {/*                    htmlFor="msgWelcome"*/}
                        {/*                    value="Welcome Message"*/}
                        {/*                />*/}
                        {/*            </div>*/}
                        {/*            <Field*/}
                        {/*                name="msgWelcome"*/}
                        {/*                defaultValue={values.msgWelcome}*/}
                        {/*                size={4}*/}
                        {/*                as={"textarea"}*/}
                        {/*                className={"block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}*/}
                        {/*                placeholder="Enter welcome message..."*/}
                        {/*            />*/}
                        {/*            /!*<ErrorMessage name="msgWelcome" />*!/*/}
                        {/*        </div>*/}
                        {/*        <div className={"mb-5"}>*/}
                        {/*            <div className="mb-2 block">*/}
                        {/*                <Label*/}
                        {/*                    htmlFor="iconWelcome"*/}
                        {/*                    value="Welcome Icon"*/}
                        {/*                />*/}
                        {/*            </div>*/}
                        {/*            <Field*/}
                        {/*                as="select"*/}
                        {/*                name="iconWelcome"*/}
                        {/*                value={values.iconWelcome}*/}
                        {/*                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"*/}
                        {/*            >*/}
                        {/*                <option value={"🎆"}>❤</option>*/}
                        {/*                <option value={"🎊"}>✨</option>*/}
                        {/*                <option value={"🎇"}>🎊</option>*/}
                        {/*            </Field>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}

                            <div>
                        {/*        <div className={"mb-5"}>*/}
                        {/*            <div className="mb-2 block">*/}
                        {/*                <Label*/}
                        {/*                    htmlFor="msgSuccess"*/}
                        {/*                    value="Congratulation Message"*/}
                        {/*                />*/}
                        {/*            </div>*/}
                        {/*            <Field*/}
                        {/*                name="msgSuccess"*/}
                        {/*                size={4}*/}
                        {/*                as={"textarea"}*/}
                        {/*                defaultValue={values.msgSuccess}*/}
                        {/*                className={"block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}*/}
                        {/*                placeholder="Enter congratulation message..."*/}
                        {/*            />*/}
                        {/*            /!*<ErrorMessage name="msgSuccess" />*!/*/}
                        {/*        </div>*/}
                        {/*        <div className={"mb-5"}>*/}
                        {/*            <div className="mb-2 block">*/}
                        {/*                <Label*/}
                        {/*                    htmlFor="iconSuccess"*/}
                        {/*                    value="Congratulation Icon"*/}
                        {/*                />*/}
                        {/*            </div>*/}
                        {/*            <Field*/}
                        {/*                as="select"*/}
                        {/*                name="iconSuccess"*/}
                        {/*                value={values.iconSuccess}*/}
                        {/*                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"*/}
                        {/*            >*/}
                        {/*                <option value={"🎆"}>❤</option>*/}
                        {/*                <option value={"🎊"}>✨</option>*/}
                        {/*                <option value={"🎇"}>🎊</option>*/}
                        {/*            </Field>*/}
                        {/*        </div>*/}
                                <div className={"flex justify-between m-auto space-x-5"}>
                                    <Link href={"/surveycreator/survey"}
                                          className={"flex items-center text-yellow-300 opacity-75 hover:opacity-100"}>
                                        <BsArrowLeft className={"mr-2"} />
                                        Back
                                    </Link>
                                    <div className={"flex space-x-5"}>
                                        {values.id?(
                                            <Button  pill="true"
                                                     type={"button"}
                                                     color="light"
                                                     className={"uppercase w-fit"}
                                                     onClick={() => router.push(`/surveycreator/survey/question/${values.id}`)}
                                            >
                                                <span>Next</span>
                                                <BiRightArrowAlt className="ml-2 h-5 w-5"/>
                                            </Button>
                                        ):""}
                                        <Button  pill="true"
                                                 disabled={isSubmitting}
                                                 type={"submit"}
                                                 isProcessing={isSubmitting}
                                                 className={"uppercase w-fit"}
                                        >
                                            <BiSave className="mr-2 h-5 w-5" />
                                            <span>{values.id === null ? 'Save' : 'Update'}</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        {/*</div>*/}
                    </Form>
                )}
            </Formik>
        </SBHandleContent>
    );
}

export default SBSettingForm;

function ActionFile({ setFieldValue, form, completed, image, ...props }) {
    const currentSurvey = useSelector(selectSurvey)
    const [previewImg, setPreviewImg] = useState(currentSurvey?.cover || '');
    const [uploadFile,{isLoading: isLoadingFile }] = useUploadFileMutation();
    const handleChangeFile = async (e) => {
        const file = e.target.files[0];
        if (file && SUPPORTED_FORMATS.includes(file.type)) {
            const previewUrl = URL.createObjectURL(file);
            setPreviewImg(getUserAvatar(previewUrl));
            try {
                const { data: response } = await uploadFile(file);
                if (response.code === 200) {
                    const imageUrl = response.data.url;
                    setFieldValue('cover', imageUrl);
                    setPreviewImg(imageUrl)
                    toast.success('Image uploaded successfully!');
                } else if (response.code === 400) {
                    toast.error('Image upload failed. Please try again.');
                }
            } catch (error) {
                toast.error('Image upload failed. Please try again.');
            }
        }
    };
    return (
        <>
            <div className="flex justify-center relative">
                <label htmlFor="cover" className="hover:cursor-pointer">
                    {isLoadingFile ? (
                        <SbLoadingIndicator className="absolute -translate-y-1/2 -translate-x-1/2 top-2/4 left-1/2" />
                    ) : (
                        ''
                    )}
                    <Image
                        unoptimized
                        width={100}
                        height={100}
                        className="w-96 h-52 object-cover rounded border-2 border-blue-700 hover:border-green-700"
                        src={previewImg ? getUserAvatar(previewImg): thumbnailDefault}
                        alt="a large avatar"
                    />
                </label>
            </div>
            <input type="file" id="cover" onChange={handleChangeFile} className="hidden" />
        </>
    );
}

function SBDatePicker({field, form, setFieldValue, values, ...props}) {
    const [value, setValue] = useState({
        startDate: values.startDate ? Date.parse(values.startDate) : new Date(),
        endDate: values.endDate ? Date.parse(values.endDate) : new Date().setMonth(1)
    });

    const handleValueChange = (newValue) => {
        // console.log("newValue:", newValue);
        form.setFieldValue(field.name, newValue);
        setValue(newValue);
        values.startDate = newValue.startDate
        values.endDate = newValue.endDate
    }

    return (
        <Datepicker
            minDate={value.startDate}
            value={value}
            showShortcuts={true}
            readOnly={true}
            configs={{
                shortcuts: {
                    today: {
                        text: "Today",
                        period: {
                            start: currentDay(),
                            end: currentDay()
                        },
                    },
                    weekDays: {
                        text: "1 week",
                        period: {
                            start: currentDay(),
                            end: addDays(currentDay(), 6)
                        },
                    },
                    week2Days: {
                        text: "2 week",
                        period: {
                            start: currentDay(),
                            end: addDays(currentDay(), 13)
                        },
                    },
                    yesterday: "Yesterday",
                    customToday: {
                        text: "Custom Today",
                        period: {
                            start: "2023-07-02",
                            end: "2023-07-02"
                        },
                    },
                    next8Days: {
                        text: "Next 8 days",
                        period: {
                            start: "2023-07-03",
                            end: "2023-07-10"
                        },
                    }
                }
            }}
            onChange={handleValueChange}
        />
    );
}