'use client'
import React, {useEffect, useRef, useState} from 'react';
import SBQuestionTable from "@/app/surveycreator/report/SBQuestionTable";
import {Card, Tabs} from "flowbite-react";
import {BsFillQuestionCircleFill, BsPatchCheckFill} from "react-icons/bs";
import {FaClipboardList} from "react-icons/fa";
import {useLazyGetQuestionsQuery, useLazyGetQuestionsV2Query} from "@/store/feature/question/questionApiSlide";
import SBHandleContent from "@/components/surveycreator/SBHandleContent";
import SBSurveyTable from "@/app/surveycreator/report/SBSurveyTable";
import {useLazyGetSurveyQuery} from "@/store/feature/survey/surveyApiSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectIsGlobalLoading, setIsGlobalLoading} from "@/store/feature/auth/AuthSlice";
import LoadingReportPage from "@/components/loading/surveycreatorloading/LoadingReportPage";
import {FaArrowRightArrowLeft} from "react-icons/fa6";
import {useRouter} from "next/navigation";
import {useLazyGetVoteQuery} from "@/store/feature/vote/voteApiSlice";
import {addVoteResultSets} from "@/store/feature/vote/voteSlice";
import SBVoteTable from "@/app/surveycreator/report/SBVoteTable";
import {useSession} from "next-auth/react";

function MainReport() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState(0);
    const tabsRef = useRef(null);
    const isLoading = useSelector(selectIsGlobalLoading)
    const {status} = useSession()

    const [fetchQuestions, { data: questionsData, isLoading: qLoading, isFetching: qFetching, error }] = useLazyGetQuestionsV2Query({
        skip: true
    });
    const [fetchSurvey, { data: surveyData, isLoading: sLoading, isFetching: sFetching }] = useLazyGetSurveyQuery();

    useEffect(() => {
        dispatch(setIsGlobalLoading(false))
        fetchQuestions({skip: true})
    },[dispatch, fetchQuestions])

    const [fetchVotes, {data: res, isFetching}] = useLazyGetVoteQuery()
    useEffect(() => {
        fetchVotes({
            _page: '',
            _limit: ''
        })
        dispatch(addVoteResultSets([]));
    },[dispatch, fetchVotes])

    const handleChangeTabs = (tab) => {
        setActiveTab(tab);
        switch (tab) {
            case 0:
                fetchQuestions({
                    page: 1,
                    limit: 15,
                    filters: {
                        sortBy: 'created_at',
                        sortDirection: 'desc'
                    }
                });
                break
            case 1:
                fetchSurvey({
                    page: 1,
                    limit: 10,
                    filters: {
                        sortBy: 'title',
                        sortDirection: 'asc'
                    }
                });
                break
            case 2:
                router.push('/surveycreator/report/compares')
                break
            case 3:
                fetchVotes({
                    page: 1,
                    limit: 10,

                });
                break
        }
    }

    const handleSurveySort = (sortBy, sortDirection) => {
        fetchSurvey({
            page: 1,
            limit: 10,
            filters: {
                sortBy,
                sortDirection
            }
        });
    }

    const handleSurveyPageChange = ({page, perPage}) => {
        fetchSurvey({
            page,
            limit: perPage|| 10,
        });
    }

    const handleQuestionSort = (sortBy, sortDirection) => {
        fetchQuestions({
            _page: 1,
            _limit: 10,
            filters: {
                sortBy,
                sortDirection
            }
        });
    }

    const handleQuestionPageChange = ({page, perPage}) => {
        fetchQuestions({
            page: page,
            limit: perPage|| 10,
        });
    }
    const handlePagination = (page,perPage) => {
        fetchVotes({
            _page: page,
            _limit: perPage|| 10
        })
    }

    return (
        <SBHandleContent
            className="my-10"
            isLoading={status==='loading'}
            error={error}
            customLoadingContent={<LoadingReportPage/>}
        >
            <section className="px-2">
                <Tabs.Group
                    aria-label="Default tabs"
                    style="default"
                    ref={tabsRef}
                    onActiveTabChange={handleChangeTabs}
                >
                    <Tabs.Item
                        active
                        icon={BsFillQuestionCircleFill}
                        title="Question"
                        disabled={activeTab===0}
                    >
                        <Card>
                            <div className="flex flex-col justify-between h-full">
                                <h1 className="text-xl font-semibold text-gray-900 dark:text-white uppercase">
                                    Question Report
                                </h1>
                            </div>

                            <SBQuestionTable
                                data={questionsData?.data}
                                isLoading={qLoading || qFetching}
                                onSort={handleQuestionSort}
                                onPageChange={handleQuestionPageChange}
                            />
                        </Card>
                    </Tabs.Item>
                    <Tabs.Item
                        icon={FaClipboardList}
                        title="Surveys"
                        disabled={activeTab===1}
                    >
                        <Card className={"overflow-hidden"}>
                            <div className="flex flex-col justify-between h-full">
                                <h1 className="text-xl uppercase font-semibold text-gray-900 dark:text-white">
                                    Survey Report
                                </h1>
                                <div>

                                </div>
                            </div>
                            <SBSurveyTable
                                data={surveyData?.data}
                                isLoading={sLoading || sFetching}
                                onSort={handleSurveySort}
                                onPageChange={handleSurveyPageChange}
                            />
                        </Card>
                    </Tabs.Item>
                    <Tabs.Item
                        icon={FaArrowRightArrowLeft}
                        title="Compare Survey"
                    >
                    </Tabs.Item>
                    <Tabs.Item
                        icon={BsPatchCheckFill}
                        title="Votes"
                    >
                        <Card>
                            <div className="flex flex-col justify-between h-full">
                                <h1 className="text-xl font-semibold text-gray-900 dark:text-white uppercase">
                                    Vote
                                </h1>
                            </div>

                            <SBVoteTable
                                data={res?.data}
                                isLoading={qLoading || qFetching}
                                onSort={handleQuestionSort}
                                onPageChange={handlePagination}
                            />
                        </Card>
                    </Tabs.Item>
                </Tabs.Group>
            </section>
        </SBHandleContent>
    );
}

export default MainReport;