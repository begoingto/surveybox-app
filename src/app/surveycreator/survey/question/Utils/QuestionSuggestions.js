'use client'
import React, {useEffect, useState} from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import {useLazyGetExistingQuestionsQuery} from "@/store/feature/question/existingQuestionApiSlice";
import {useSelector} from "react-redux";
import {selectExistingQuestions} from "@/store/feature/question/questionSlide";

export default function QuestionSuggestions({formik, index, question}) {

    const getExistingQuestionsState = useSelector(selectExistingQuestions)
    const [existingQuestions, setExistingQuestions] = useState([...getExistingQuestionsState])
    const [search, setSearch] = useState("")
    const [selectedValue, setSelectedValue] = useState(question)
    const [trigger, result, lastPromiseInfo] = useLazyGetExistingQuestionsQuery({ preferCacheValue: true});
    const { data, error, isError, isLoading, isFetching } = result;
    const [selectedValueCopy, setSelectedValueCopy] = useState(question)

    useEffect(  () => {
        // when change the search value, trigger the query
        trigger({ questionName: search },{ skip: search === ""});

        if (data && result.status==='fulfilled') {
            setExistingQuestions(data?.data?.list)
        }
    }, [trigger,result,search])

    // useEffect(() => {
    //     formik.setFieldValue(`questions.${index}`,selectedValue)
    // },[selectedValue])

    const promiseOptions = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(existingQuestions);
            }, 1000);
        });
    }

    const handleOnCreateOption = (e) => {
    }

    const handleOnFocus = (e) => {
        trigger(index)
        setSearch(selectedValue.name)
    }

    const handleOnBlur = (e) => {
        setSearch(selectedValue.name)
    }

    const handleOnMenuClose = () => {
        if (search !== selectedValueCopy.name) {
            const newQuestion= {
                ...selectedValue,
                name: search ? search : selectedValue.name
            }
            setSelectedValue(newQuestion)
            formik.setFieldValue(`questions.${index}`, newQuestion)
        }
    }


    const handleLabelOption = (option) => {
        return (
            <div className={"flex justify-between items-center"}>
                <p>{option.name}</p>
                <span className={"text-xs"}>{option.questionType}</span>
            </div>
        )
    }

    return (
        <>
            {result.status==='uninitialized' && <div>uninitialized</div>}
            <AsyncCreatableSelect
                className="begoingto-react-select"
                cacheOptions
                defaultOptions
                escapeClearsValue={false}
                onMenuClose={handleOnMenuClose}
                inputValue={search}
                value={selectedValue}
                loadOptions={promiseOptions}
                getOptionLabel={handleLabelOption}
                getOptionValue={(option) => option.id}
                onInputChange={setSearch}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                onChange={(e) => setSelectedValue(e)}
                isLoading={isLoading}
                onCreateOption={handleOnCreateOption}
            />
        </>
    );
}
