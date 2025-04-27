import React, {useState} from 'react';
import {Badge, Button, Checkbox, Modal, Table} from "flowbite-react";
import {BsFillTrashFill} from "react-icons/bs";
import {FaRegEdit} from "react-icons/fa";
import {useDeleteCategoryMutation,} from "@/store/feature/category/categoryApiSlide";
import {HiOutlineExclamationCircle} from "react-icons/hi";
import ToastConfig from "@/components/ToastConfig";
import {toast} from "react-toastify";
import {UpdateCategory} from "@/app/admin/category/SBSAdminCategories";

function SBSATableCell({category, refetch}) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    // const {data: categories, refetch} = useGetCategoriesQuery();
    const [deleteCategory, {isLoading, isError, isSuccess}] = useDeleteCategoryMutation({
        invalidateTags: ['Categories']
    });

    //delete function
    const handleDelete = async () => {
        setShowConfirmationModal(false); // Hide the confirmation modal
        setIsDeleting(true);
        await deleteCategory(category.id);
        setIsDeleting(false);
        toast.success("Deleted! Successfully")
        refetch(); // Fetch the latest data after deletion
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
                        <p className="mb-5 text-gray-600">Are you sure you want to delete this category?</p>
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

            <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {category.id ? category.id : "unknown"}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {category.name ? category.name : "unknown"}
                    </Table.Cell>
                    <Table.Cell>
                        <Badge color={category.status ? "success" : "red"} className={'w-fit h-full'}>
                            {category.status ? "Active" : "Inactive"}
                        </Badge>
                    </Table.Cell>
                    <Table.Cell>
                        <div className={'flex gap-4'}>
                            <button onClick={() => setShowConfirmationModal(true)}
                                    className="font-medium text-red-600 hover:underline dark:text-red-500"
                                    disabled={isDeleting}>
                                {isDeleting ? 'Deleting...' : <BsFillTrashFill/>}
                            </button>
                            <UpdateCategory category={category} refetch={refetch}/>
                        </div>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </>
    );
}
export default SBSATableCell;