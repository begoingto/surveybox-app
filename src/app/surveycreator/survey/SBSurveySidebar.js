'use client'
import React, {useState} from 'react';
import {IoDocumentText, IoSettings} from "react-icons/io5";
import {FaFolderOpen, FaLayerGroup, FaQuestion, FaShareSquare} from "react-icons/fa";
import {Sidebar} from "flowbite-react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectIsLoading, selectSurvey, selectSurveyQuestions} from "@/store/feature/survey/surveySlide";
import SBSurveySidebarLoading from "@/app/surveycreator/survey/SBSurveySidebarLoading";
import {FaArrowRightArrowLeft} from "react-icons/fa6";

function SBSurveySidebar() {
    const pathname = usePathname()
    const survey = useSelector(selectSurvey)
    const surveyQuestions = useSelector(selectSurveyQuestions)
    const isLoading = useSelector(selectIsLoading)
    const paths = pathname.split("/").filter(el => el)
    if (paths.length < 3) return null

    const surveyPath = "/"+ paths.slice(0,2).join("/")
    const active = "bg-gray-100 dark:bg-gray-700"
    if (isLoading){
        return <SBSurveySidebarLoading />;
    }

    return (
        <>
            <Sidebar
                aria-label="survey-sidebar"
                sb-custom={"creator-nav"}
                className={"z-40 bg-gray-50 dark:bg-gray-900 dark:border-gray-700 sticky top-[110px] left-0 bg-opacity-75 dark:bg-opacity-75 w-full lg:w-64"}
            >
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item
                            href={surveyPath+"/setting-up"+(survey?"/"+survey.id:"")}
                            as={Link}
                            icon={IoSettings}
                            className={`${paths[2]==='setting-up'? active : ""}`}
                        >
                            Setting
                        </Sidebar.Item>
                        <Sidebar.Item
                            href={survey ? `${surveyPath}/question/${survey.id}` : "#"}
                            className={`${survey===null ?'none-survey ':''}${paths[2]==='question'? active : ""}`}
                            as={Link}
                            icon={FaQuestion}
                        >
                            Question
                        </Sidebar.Item>
                        <Sidebar.Item
                            href={survey && surveyQuestions.length > 0 ? `${surveyPath}/theme/${survey.id}` : "#"}
                            as={Link}
                            className={`${survey===null ?'none-survey ':''} ${paths[2]==='theme'? active : ""}`}
                            icon={FaLayerGroup}
                        >
                            Theme
                        </Sidebar.Item>
                        <Sidebar.Item
                            href={survey && surveyQuestions.length!==0 ? `${surveyPath}/share/${survey.id}` : "#"}
                            className={`${survey===null || surveyQuestions.length===0 ?'none-survey ':''}${paths[2]==='share'? active : ""}`}
                            as={Link}
                            icon={FaShareSquare}
                        >
                            Share
                        </Sidebar.Item>
                        <Sidebar.Item
                            href={survey && survey?.answers?.length!==0 ? `${surveyPath}/report/${survey.id}` : "#"}
                            as={Link}
                            className={`${survey===null || surveyQuestions.length===0 || survey?.answers?.length===0 ?'none-survey ':''}${paths[2]==='report'? active : ""}`}
                            icon={FaFolderOpen}
                        >
                            Report
                        </Sidebar.Item>
                        <Sidebar.Item
                            href={survey && survey?.answers?.length!==0 ? `${surveyPath}/responses/${survey.id}` : "#"}
                            as={Link}
                            className={`${survey===null || surveyQuestions.length===0 || survey?.answers?.length===0 ?'none-survey ':''}${paths[2]==='responses'? active : ""}`}
                            icon={IoDocumentText}
                        >
                            Responses
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </>
    );
}

export default SBSurveySidebar;