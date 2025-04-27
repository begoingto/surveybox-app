"use client"
import React, {useEffect } from 'react';
import {Button, Pagination, Table} from "flowbite-react";
import SBTableCell from "@/app/admin/user/SBTableCell";
import {
    useLazyGetAdminUserQuery,
    useUpdateStatusUserMutation
} from "@/store/feature/admin/user/userAdminApiSlice";
import SBHandleContent from "@/components/surveycreator/SBHandleContent";
import {useSession} from "next-auth/react";

function SbsAdminUsers() {

    const {status} = useSession()
    const [fetchUsers, { data: res, isLoading, isFetching,error }] = useLazyGetAdminUserQuery({ skip:true });
    const [updateStatusUser] = useUpdateStatusUserMutation()
    const handleUpdateStatus = async (id,isActive) => {
        try {
            const res = await updateStatusUser({
                id: id,
                data: {
                    isActive: isActive
                }
            })
            if(res?.data?.code===200){
                fetchUsers({
                    page: 1,
                    limit: 10,
                })
            }
        }catch (e) {

        }
    }

    useEffect(()=>{
        fetchUsers({ skip:true })
    },[])

    const handleUserPageChange = ({ page, perPage }) => {
        fetchUsers({ page: page, limit: perPage })
    }

    return (
        <SBHandleContent
            isLoading={status==="loading" }
            error={error}
        >
            <div>
                <Button className={"bg-blue-700"}> + Add New </Button>
            </div>
            <SBTableCell data={res?.data} onPageChange={handleUserPageChange} onChange={handleUpdateStatus} isLoading={isLoading||isFetching}/>
        </SBHandleContent>
    );
}

export default SbsAdminUsers;