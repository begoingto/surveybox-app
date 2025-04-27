"use client"
import React, {useState} from 'react';
import {Button} from "flowbite-react";
import {useGetSurveyQuery} from "@/store/feature/admin/survey/surveyAdminApiSlice";
import SBTableAdminSurveyCell from "@/app/admin/survey/SBTableAdminSurveyCell";
import SBHandleContent from "@/components/surveycreator/SBHandleContent";
import {useSession} from "next-auth/react";

function SbsAdminSurvey() {
    const { status }=useSession()
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const { data: surveyData, isLoading, isFetching,error } = useGetSurveyQuery({ page: currentPage, limit: perPage });

    const handleSurveyPageChange = ({ page, perPage }) => {
        setCurrentPage(page);
        setPerPage(perPage || 10);
    }

    return (
        <SBHandleContent
            isLoading={status==="loading"}
            error={error}
        >
            <div>
                <Button className={"bg-blue-700"}> + Add New </Button>
            </div>
            <div className={'overflow-x-auto mt-5'}>
                <SBTableAdminSurveyCell data={surveyData?.data} isLoading={isLoading || isFetching}  onPageChange={handleSurveyPageChange} />
            </div>
        </SBHandleContent>
    );
}

export default SbsAdminSurvey;