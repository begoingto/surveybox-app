import React from 'react';
import {Button, Table} from "flowbite-react";
import {useGetVoteQuery} from "@/store/feature/admin/vote/voteAdminApiSlice";
import SBTableAdminVote from "@/app/admin/vote/SBTableAdminVote";
import SBHandleContent from "@/components/surveycreator/SBHandleContent";
import {useSession} from "next-auth/react";
import {LoadingTableRows} from "@/components/loading/surveycreatorloading/LoadingReportTable";

function SbsAdminVote() {
    const {status}=useSession()
    const {data:res,isLoading, isFetching} = useGetVoteQuery({ page: 1, limit:10 })
    return (
        <> <SBHandleContent
            isLoading={status==="loading" }
        >
            <div>
                <Button className={"bg-blue-700"}> + Add New </Button>
            </div>
            <div className={'overflow-x-auto mt-5'}>
                <Table hoverable>
                    {/* header row */}
                    <Table.Head>
                        <Table.HeadCell>id</Table.HeadCell>
                        <Table.HeadCell>Title</Table.HeadCell>
                        <Table.HeadCell>Vote-Option</Table.HeadCell>
                        <Table.HeadCell>Choosing-Type</Table.HeadCell>
                        <Table.HeadCell>created-By</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Active</Table.HeadCell>
                    </Table.Head>
                    {/* body row */}
                    {isLoading ? (<LoadingTableRows column={7}/>) : res?.data?.list?.map((vote) => (
                        <SBTableAdminVote key={vote.id} vote={vote} isLoading={isLoading||isFetching}/>
                    ))}
                </Table>
            </div>
        </SBHandleContent>
        </>
    );
}

export default SbsAdminVote;