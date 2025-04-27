'use client';
import {Button, Table} from 'flowbite-react';
import SBTotalQuestion from "@/app/admin/question/SBTotalQuestion";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import SBHandleContent from "@/components/surveycreator/SBHandleContent";
import {useSession} from "next-auth/react";
import {useGetQuestionQuery, useLazyGetQuestionQuery} from "@/store/feature/admin/question/questionAdminApiSlice";
import {BsFillPlusCircleFill} from "react-icons/bs";


export default function SBSAdminQuestion() {
    const {status} = useSession()
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(15);
    const [fetchQuestions, {data: res, isLoading, isFetching, error}] = useLazyGetQuestionQuery({ skip: true });

    useEffect(() => {
        fetchQuestions({ skip: true });
    }, [fetchQuestions]);

    const handleSurveyPageChange = ({ page, perPage }) => {
        fetchQuestions({
            page,
            limit: perPage
        })
    }

    return (
        <SBHandleContent
            isLoading={status === "loading"}
            error={error}
        >
            <div>
                <Link
                    href={"/admin/question/create"}
                    className={"flex items-center text-white max-w-fit p-3 bg-blue-800 rounded-lg space-x-3 hover:bg-blue-900 hover:opacity-75"}
                >
                    <BsFillPlusCircleFill />
                    <p>New Question</p>
                </Link>
            </div>
            <SBTotalQuestion data={res?.data} onPageChange={handleSurveyPageChange} isLoading={isLoading||isFetching}/>
        </SBHandleContent>

    )
}

