"use client"
import React, {useState} from 'react';
import {Badge, Button, Checkbox, Modal, Table} from "flowbite-react";
import {BsFillTrashFill} from "react-icons/bs";
import {FaRegEdit} from "react-icons/fa";
import {useDeleteCategoryMutation} from "@/store/feature/category/categoryApiSlide";
import {useDeleteQuestionMutation} from "@/store/feature/admin/question/questionAdminApiSlice";
import {toast} from "react-toastify";
import ToastConfig from "@/components/ToastConfig";
import {HiOutlineExclamationCircle} from "react-icons/hi";
import {LoadingTableRows} from "@/components/loading/surveycreatorloading/LoadingReportTable";
import SBHandlePagination from "@/app/surveycreator/report/SBHandlePagination";

function SbTotalQuestion({data, onPageChange, isLoading}) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [deleteQuestion] = useDeleteQuestionMutation({
        invalidateTags: ['AdminQuestion']
    });

    const handleDelete = async () => {
        setShowConfirmationModal(false); // Hide the confirmation modal
        setIsDeleting(true);

        try {
            // Send the delete request to the server
            await deleteQuestion(question.id);

            // If the request is successful, refetch the latest questions data
            // from the server and update the UI with the latest data.
            await refetch();

            setIsDeleting(false);
            toast.success("Deleted! Successfully");
        } catch (error) {
            setIsDeleting(false);
            toast.error("Failed to delete!");
        }
    };

    return (
        <>
            <ToastConfig/>
            <Modal show={showConfirmationModal}
                   size="sm"
                   popup
                   onClose={() => setShowConfirmationModal(false)}
            >
                <Modal.Header>
                    <h2 className="text-lg font-medium">Confirmation</h2>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle
                            className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"/>
                        <p className="mb-5 text-gray-600">Are you sure you want to delete this question?</p>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDelete} disabled={isDeleting}>
                                {isDeleting ? 'Deleting...' : 'Yes'}
                            </Button>
                            <Button color="gray" onClick={() => setShowConfirmationModal(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <div
                className={'overflow-x-auto mt-5 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-100 scrollbar-rounded-full'}>
            <Table hoverable>
                {/*header row*/}
                <Table.Head>
                    <Table.HeadCell>id</Table.HeadCell>
                    <Table.HeadCell>Question Name</Table.HeadCell>
                    <Table.HeadCell>Category</Table.HeadCell>
                    <Table.HeadCell>Type</Table.HeadCell>
                    <Table.HeadCell>required</Table.HeadCell>
                    <Table.HeadCell>Create-by</Table.HeadCell>
                    <Table.HeadCell>Active</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {isLoading ? (<LoadingTableRows rows={15} column={7}/>) : data?.list?.map((question, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {question.id}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {question.name.substring(0,50)+"..."}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {question.category.name}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {question.questionType}
                            </Table.Cell>
                            <Table.Cell>
                                <Badge color={question.required?"success":"gray"} className={'w-fit h-full rounded-full px-2'}>
                                    {question.required ? "Required" : "Optional"}
                                </Badge>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {question.user?.email}
                            </Table.Cell>
                            <Table.Cell>
                                <div className={'flex gap-4'}>
                                    <button onClick={() => setShowConfirmationModal(true)}
                                            className="font-medium text-red-600 hover:underline dark:text-red-500"
                                            disabled={isDeleting}>
                                        {isDeleting ? 'Deleting...' : <BsFillTrashFill/>}
                                    </button>
                                    <a className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        <FaRegEdit/></a>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            </div>
            <SBHandlePagination defaultPerPage={15} data={data} onPageChange={onPageChange}/>
        </>
    );
}

export default SbTotalQuestion;