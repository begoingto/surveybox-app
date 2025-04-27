import React, {useEffect, useState} from 'react';
import {Button, Modal, Tooltip} from "flowbite-react";
import Link from "next/link";
import {IoLayersSharp, IoSettingsSharp} from "react-icons/io5";
import {FaChartBar, FaQuestion, FaShareSquare} from "react-icons/fa";
import {FiCopy} from "react-icons/fi";
import {AiOutlineCamera} from "react-icons/ai";
import {toast} from "react-toastify";
import {useInsertSurveyMutation, useUpdateSurveyQuestionsMutation} from "@/store/feature/survey/surveyApiSlice";
import {useDispatch} from "react-redux";
import {setDuplicate} from "@/store/feature/survey/surveySlide";

function SbButtonsNavigation({survey}) {
    return (
        <div className="flex items-center justify-center gap-x-6 text-gray-500 mt-3">

            <Tooltip
                style={"dark"}
                content="Setting"
                placement="top"
                tooltipmaxwidth={50}
            >
                <Link href={"/surveycreator/survey/setting-up/"+ survey.id}>
                    <IoSettingsSharp/>
                </Link>
            </Tooltip>

            <Tooltip
                style={"dark"}
                content="Question"
                placement="top"
                tooltipmaxwidth={50}
            >
                <Link href={"/surveycreator/survey/question/"+ survey.id}>
                    <FaQuestion/>
                </Link>
            </Tooltip>

            {survey?.surveyQuestions?.length >0 ? (
                <Tooltip
                    style={"dark"}
                    content="Theme"
                    placement="top"
                    tooltipmaxwidth={50}
                >
                    <Link href={"/surveycreator/survey/theme/"+ survey.id}>
                        <IoLayersSharp/>
                    </Link>
                </Tooltip>
            ) : null}

            {survey?.surveyQuestions?.length >0 ? (
                <Tooltip
                    style={"dark"}
                    content="Share"
                    placement="top"
                    tooltipmaxwidth={50}
                >
                    <Link href={survey?.surveyQuestions?.length >0 ? "/surveycreator/survey/share/"+ survey.id : "#"}>
                        <FaShareSquare/>
                    </Link>
                </Tooltip>
            ) : null}

            {survey?.answers?.length >0 ? (
                <Tooltip
                    style={"dark"}
                    content="Report"
                    placement="top"
                    tooltipmaxwidth={50}
                >
                    <Link href={survey?.answers?.length >0 ? "/surveycreator/survey/report/"+ survey.id:"#"}>
                        <FaChartBar/>
                    </Link>
                </Tooltip>
            ):null}

            {survey?.surveyQuestions?.length >0 ? (
                <BtnDuplicateSurvey survey={survey} />
            ) : null}
        </div>
    );
}

export default SbButtonsNavigation;

const BtnDuplicateSurvey = ({survey}) => {
    const dispatch = useDispatch();
    const [insertSurvey, {isLoading , error}] = useInsertSurveyMutation();
    const [updateQuestions, {isLoading: isUpdating}] = useUpdateSurveyQuestionsMutation()
    const [openModal, setOpenModal] = useState(undefined);

    const handleClickYes = () => {
        const data = {
            ...survey,
            id: null,
            title: survey.title + ' (copy)',
        }
        insertSurvey(data).unwrap().then(resCreated =>{
            updateQuestions({id: resCreated.data.id ,data: { questions: survey.surveyQuestions }}).unwrap().then(res => {
                dispatch(setDuplicate(resCreated))
                toast.success('Survey duplicated successfully!')
                setOpenModal(undefined);
            }).catch(err => {
                toast.error('duplicate update question is wrong!')
            })
        }).catch(err => {
            toast.error('duplicate Survey is wrong!')
        })
    }

    return (
        <>
            <Tooltip
                style={"dark"}
                content="Duplicate"
                placement="top"
                tooltipmaxwidth={50}
            >
                <button
                    type={"button"}
                    onClick={() => setOpenModal('pop-up')}
                    className={"flex items-center"}
                >
                    <FiCopy/>
                </button>
            </Tooltip>
            <Modal show={openModal === 'pop-up'} size="md" popup dismissible onClose={() => setOpenModal(undefined)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <FiCopy className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-100">
                            Do you really want to duplicate this survey?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                onClick={handleClickYes}
                                isProcessing={isLoading || isUpdating}
                                disabled={isLoading || isUpdating}
                            >
                                Yes, I&apos;m sure
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(undefined)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}