'use client'
import React, {useEffect, useState} from 'react';
import SBSCCard from "@/components/surveycreator/SBSCCard";
import {IoAddSharp} from "react-icons/io5";
import {
    useLazyGetSurveyQuery,
    useUpdateStatusSurveyMutation
} from "@/store/feature/survey/surveyApiSlice";
import SurveyLoadingIndicator, {LoadingItem} from "@/components/surveycreator/surveys/SurveyLoadingIndicator";
import Link from "next/link";
import SBHandleContent from "@/components/surveycreator/SBHandleContent";
import ToastConfig from "@/components/ToastConfig";
import {toast} from "react-toastify";
import {useLazyGetExistingQuestionsQuery} from "@/store/feature/question/existingQuestionApiSlice";
import {addExistingQuestions} from "@/store/feature/question/questionSlide";
import {useDispatch, useSelector} from "react-redux";
import SBHandlePagination from "@/app/surveycreator/report/SBHandlePagination";
import {selectIsGlobalLoading} from "@/store/feature/auth/AuthSlice";
import {useDebounce} from "usehooks-ts";
import HorizontalCardItem from "@/components/surveycreator/surveys/HorizontalCardItem";
import {BsFillGridFill, BsListUl} from "react-icons/bs";
import {Button} from "flowbite-react";
import {DISPLAY} from "@/lib/siteConfig";
import {addDisplay, selectDisplay} from "@/store/feature/config/displaySlice";
import {selectDuplicateSurvey} from "@/store/feature/survey/surveySlide";
import {useSession} from "next-auth/react";

function SurveyMainPage() {
    const dispatch = useDispatch()
    const { status } = useSession()
    const isLoadingGlobal = useSelector(selectIsGlobalLoading)
    const [searchTerm, setSearchTerm] = useState(null);
    const [display, setDisplay] = useState(useSelector(selectDisplay))
    const surveyDuplicate = useSelector(selectDuplicateSurvey)
    const debouncedSearch = useDebounce(searchTerm, 1000)
    const [fetchSurvey, { data: surveyData, isLoading, isFetching: sFetching, error }] = useLazyGetSurveyQuery({ preferCacheValue: true});
    const [updateStatusSurvey] = useUpdateStatusSurveyMutation()
    const [fetchExistingQuestions,{ data: existingQuestions, isError, isLoading: qLoading, isFetching }] = useLazyGetExistingQuestionsQuery({ preferCacheValue: true});

    useEffect(() => {
        fetchSurvey({
            page: 1,
            limit: 7,
            filters: {
                sortBy: 'id',
                sortDirection: 'desc'
            }
        })
        fetchExistingQuestions({
            skip: {
                questionName:'',
                categoryName:'',
                _page:'',
                _limit:''
            }
        })  
    },[fetchExistingQuestions, fetchSurvey])

    useEffect(() => {
        if (surveyDuplicate){
            fetchSurvey({
                page: 1,
                limit: 7,
                filters: {
                    sortBy: 'id',
                    sortDirection: 'desc'
                }
            })
        }
    }, [fetchSurvey, surveyDuplicate]);
    
    useEffect(() => {
        if (existingQuestions){
            dispatch(addExistingQuestions(existingQuestions?.data?.list))
        }
    },[dispatch, existingQuestions])

    useEffect(() => {
        if(searchTerm){
            fetchSurvey({
                page: 1,
                limit: 7,
                filters: {
                    sortBy: 'id',
                    sortDirection: 'desc',
                    title: searchTerm.trim()
                }
            })
        }
    },[fetchSurvey, searchTerm,debouncedSearch])

    const handleUpdateStatus = async (e,survey) => {
        try {
            const res = await updateStatusSurvey({
                id: survey.id,
                data: {
                    status: !survey.status
                }
            })
            if(res?.data?.code===200){
                fetchSurvey({
                    page: 1,
                    limit: 7,
                    filters: {
                        sortBy: 'id',
                        sortDirection: 'desc'
                    }
                })
                toast.success("Update status successfully!")
            }
            if (res?.error){
                toast.warn(res.error.data.message)
            }
        }catch (e) {
            toast.error("Update status failed!")
        }
    }

    const onPageChange = ({page, perPage}) => {
        fetchSurvey({
            page,
            limit: perPage || 7,
        });
    }

    const handleDisplay = (display) => {
        dispatch(addDisplay(display))
        setDisplay(display)
    }

    return (
        <SBHandleContent
            isLoading={status==='loading'}
            error={error}
            customLoadingContent={<SurveyLoadingIndicator />}
        >
            <ToastConfig />
            <section className={"mt-5"}>
                {/* Start Search */}
                <div className="flex flex-col-reverse sm:grid sm:grid-cols-6 items-center justify-between gap-3">
                    <div className="relative text-gray-600 focus-within:text-gray-400 w-full sm:w-auto sm:col-span-4 lg:col-span-3">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                     viewBox="0 0 24 24" className="w-6 h-6">
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </button>
                        </span>
                        <input
                            id="searchInput"
                            type="text"
                            autoComplete="off"
                            onChange={e => setSearchTerm(e.target.value)}
                            className="py-2 text-sm text-white dark:text-gray-100 dark:bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 w-full"
                            placeholder="Search..."
                        />
                    </div>
                    <div className={"flex space-x-2 sm:col-span-2 lg:col-span-3 justify-end"}>
                        <Button type={"button"} color={display === DISPLAY.grid? "dark": "light"} onClick={() => handleDisplay(DISPLAY.grid)}>
                            <BsFillGridFill />
                        </Button>
                        <Button type={"button"} color={display === DISPLAY.list? "dark": "light"} onClick={() => handleDisplay(DISPLAY.list)}>
                            <BsListUl />
                        </Button>
                    </div>
                </div>
                {/* End Search */}

                <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"/>

                {/* Start Filter */}
                <div className={`grid grid-cols-1 ${display===DISPLAY.grid?"md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4":"lg:grid-cols-2"} gap-3 lg:gap-6`}>
                    {/* Start Create new surveys*/}
                    <Link href={"/surveycreator/survey/setting-up"} className={`${display===DISPLAY.grid?"":"h-[150px] lg:h-[196px]"} ${(searchTerm > 1) ? "hidden" : "block"} 
                        ${isLoading || sFetching ? (display===DISPLAY.grid?"lg:h-96":"lg:h-[196px]"):""}`
                    }>
                        <div
                            className={( surveyData?.data?.total ?'md:h-full lg:h-full': `md:h-64 lg:h-${display===DISPLAY.grid?96:"[196px]"}`)+" h-[8.5rem] w-full bg-gray-50 border-dashed border-2 border-indigo-600 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center flex flex-col items-center justify-center"}
                        >
                            <span className={"flex items-center gap-3"}>
                                <IoAddSharp/> <span>Create new survey</span>
                            </span>
                        </div>
                    </Link>
                    {/* End Create new surveys*/}
                    {isLoading || sFetching ? <SurveyItemLoading display={display} /> : surveyData?.data?.list.map((survey, i) => {
                        if (display === DISPLAY.list){
                            return (
                                <HorizontalCardItem
                                    key={i}
                                    survey={survey}
                                    onChange={handleUpdateStatus}
                                />
                            )
                        }
                        return (
                            <SBSCCard
                                key={i}
                                survey={survey}
                                onChange={handleUpdateStatus}
                            />
                        )
                    })}

                </div>
                {/* End Filter */}
                <div className="my-5">
                    <SBHandlePagination
                        data={surveyData?.data}
                        isLoading={isLoading}
                        onPageChange={onPageChange}
                        defaultPerPage={7}
                        selectBg={"dark:bg-gray-900"}
                    />
                </div>
                {/*  End Pagination  */}
            </section>
        </SBHandleContent>
    );
}

export default SurveyMainPage;

const SurveyItemLoading = ({display}) => {
    return Array.from({length: 7}).map((el,index) => {
        if (display === DISPLAY.list){
            return <div key={index} className="h-[196px] bg-gray-200 rounded-lg dark:bg-gray-700 w-full animate-pulse"></div>
        }
        return <LoadingItem key={index}/>
    })
}