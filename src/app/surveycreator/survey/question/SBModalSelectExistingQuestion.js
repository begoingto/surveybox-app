import React, {useEffect, useState} from 'react';
import {Badge, Button, Card, Label, Modal, Pagination, Radio, Select, TextInput} from "flowbite-react";
import LoadingIndicator from "@/app/sign-in/components/LoadingIndicator";
import ExistingQuestionItemCheck from "@/app/surveycreator/survey/question/ExistingQuestionItemCheck";
import {useDispatch, useSelector} from "react-redux";
import {addSurveyQuestions, selectSurveyQuestions} from "@/store/feature/survey/surveySlide";
import {useGetCategoriesQuery} from "@/store/feature/category/categoryApiSlide";
import {
    useLazyGetExistingQuestionsQuery
} from "@/store/feature/question/existingQuestionApiSlice";
import {CATEGORYFILTERCREATEBY} from "@/lib/siteConfig";
import {questionType} from "@/store/feature/question/questionConfig";

function SbModalSelectExistingQuestion({openModal, setOpenModal, ...props}) {
    const [filters, setFilters] = useState({
        createdBy: CATEGORYFILTERCREATEBY.all,
        _page: 1,
        _limit: 10
    })
    const [fetchExistingQuestions, { data: res, error, isError, isLoading, isFetching }] = useLazyGetExistingQuestionsQuery({ preferCacheValue: true});
    const {data: resCategories, isLoading: loadingCat, isError: errorCat} = useGetCategoriesQuery({
        skip: true
    })
    const [questionsChecked, setQuestionsCheck] = useState([]);
    const dispatch = useDispatch();
    const getSurveyQuestionsState = useSelector(selectSurveyQuestions)

    const handleSubmit = async () => {
        dispatch(addSurveyQuestions(questionsChecked))
        setOpenModal(undefined)
        setQuestionsCheck([])
    }

    const categories = resCategories?.data?.list || []
    useEffect(()=>{
        fetchExistingQuestions({filters: Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ''))})
    },[fetchExistingQuestions, filters])

    useEffect(() => {
        if (openModal === 'default') {
            setQuestionsCheck(getSurveyQuestionsState)
            fetchExistingQuestions({
                skip: true
            })
        }
    },[fetchExistingQuestions, getSurveyQuestionsState, openModal])

    return (
        <>
            <Modal
                show={openModal === 'default'}
                size='7xl'
                onClose={() => setOpenModal(undefined)}
                position='top-center'
            >
                <Modal.Header className={"p-2 lg:p-3"}>Choose Existing Question</Modal.Header>
                <Modal.Body className={"!p-0"}>
                    <Card
                        className={"rounded-none"}
                    >
                        <div className={"flex space-x-2 flex-wrap"}>
                            <p>Filters: </p>
                            {Object.entries(filters).map(([key, value],index) => {
                                if (value === '') return null
                                return (
                                    <Badge key={index} color="info" className={"px-2 rounded-full"}>
                                        <small>{key}: {value}</small>
                                    </Badge>
                                )
                            })}
                            <button
                                type={"button"}
                                className={"text-red-500 hover:text-red-700 opacity-60 hover:opacity-100"}
                                onClick={() => setFilters({
                                    createdBy: CATEGORYFILTERCREATEBY.all,
                                    _page: 1,
                                    _limit: 10
                                })}
                            >
                                <small>Reset</small>
                            </button>
                        </div>
                        <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 border-b-2 pb-3"}>
                            <div>
                                <Select
                                    id="category"
                                    name="category"
                                    onChange={(e) => setFilters({...filters, categoryName: e.target.value})}
                                >
                                    <option value={""}>All Categories</option>
                                    {categories.map((item,index) => (
                                        <option key={index} value={item.name}>{item.name}</option>
                                    ))}
                                </Select>

                            </div>
                            <div>
                                <Label htmlFor="createBy" value={"Create By"} />
                                <div className={"grid grid-cols-3"}>
                                        <div className="flex items-center gap-2">
                                            <Radio
                                                id="all"
                                                name="createBy"
                                                value={CATEGORYFILTERCREATEBY.all}
                                                defaultChecked={filters.createdBy === CATEGORYFILTERCREATEBY.all}
                                                onChange={(e) => setFilters({...filters, createdBy: CATEGORYFILTERCREATEBY.all,_page: 1})}
                                            />
                                            <Label htmlFor="all" value={"All"} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Radio
                                                id="myself"
                                                name="createBy"
                                                value={CATEGORYFILTERCREATEBY.myself}
                                                defaultChecked={filters.createdBy === CATEGORYFILTERCREATEBY.myself}
                                                onChange={(e) => setFilters({...filters, createdBy: CATEGORYFILTERCREATEBY.myself,_page: 1})}
                                            />
                                            <Label htmlFor="myself" value={"Myself"} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Radio
                                                id="adminc"
                                                name="createBy"
                                                value={CATEGORYFILTERCREATEBY.admin}
                                                defaultChecked={filters.createdBy === CATEGORYFILTERCREATEBY.admin}
                                                onChange={(e) => setFilters({...filters, createdBy: CATEGORYFILTERCREATEBY.admin,_page: 1})}
                                            />
                                            <Label htmlFor="adminc" value={"Admin"} />
                                        </div>
                                </div>
                            </div>
                            <div className={"flex"}>
                                <Select
                                    id="questionType"
                                    name="questionType"
                                    className={"custom-select"}
                                    onChange={(e) => setFilters({...filters, questionType: e.target.value})}
                                >
                                    <option value={""}>Question Type</option>
                                    {Object.values(questionType).map((item,index) => (
                                        <option className={"text-xs"} key={index} value={item}>{item}</option>
                                    ))}
                                </Select>
                                <TextInput
                                    id="search"
                                    placeholder="Enter question name..."
                                    type="text"
                                    onChange={(e) => setFilters({...filters, questionName: e.target.value,_page: 1})}
                                />
                            </div>
                        </div>

                        <div className="overflow-auto">
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                {isLoading || isFetching ? <SBQuestionLoadingItem /> : res?.data?.list.length===0 ?
                                    (<li className={"text-red-500 text-center text-lg py-5"}>No data existing</li>) :
                                    res?.data?.list.map((question,index) => (
                                    <ExistingQuestionItemCheck
                                        key={index}
                                        question={question}
                                        questionsChecked={questionsChecked}
                                        setQuestionsCheck={setQuestionsCheck}
                                    />)
                                )}
                            </ul>
                        </div>
                    </Card>
                </Modal.Body>
                <Modal.Footer className={"p-2 lg:p-3 flex flex-col-reverse md:flex-row flex-wrap"}>
                    <div className={"flex justify-between w-full lg:w-auto lg:space-x-2"}>
                        <Button onClick={handleSubmit} disabled={questionsChecked?.length===0} className={"whitespace-nowrap"}>
                            Add Question
                        </Button>
                        <Button color="gray" onClick={() => setOpenModal(undefined)}>
                            Cancel
                        </Button>
                    </div>
                    <div className={"mb-3 md:mb-0"}>

                        {isLoading || isFetching ? (<div className={"w-64 h-10 bg-gray-200 rounded dark:bg-gray-900 animate-pulse"}></div>) :
                            <Pagination
                                className={"be-custom-pagination"}
                                currentPage={res?.data?.pagination?.number + 1}
                                onPageChange={page=> setFilters({...filters, _page: page})}
                                showIcons
                                totalPages={res?.data?.pagination?.totalPages}
                            />
                        }
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SbModalSelectExistingQuestion;

const SBQuestionLoadingItem = () => {
    return Array.from({length: 10}).map((item,index) => (
        <li key={index} className="w-full h-16 my-5 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></li>
    ))
}