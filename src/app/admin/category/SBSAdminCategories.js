'use client';
import {Badge, Button, Checkbox, Label, Modal, Pagination, Table, TextInput, ToggleSwitch} from 'flowbite-react';
import {
    useGetCategoriesQuery,
    useInsertCategoryMutation, useUpdateCategoryMutation
} from "@/store/feature/category/categoryApiSlide";
import SBSATableCell from "@/app/admin/category/SBSATableCell";
import React, {useEffect, useState} from "react";
import {Field,  Formik, resetForm } from "formik";
import {useDispatch} from "react-redux";
import {addCategories} from "@/store/feature/category/categorySlide";
import {FaRegEdit} from "react-icons/fa";
import VoteLoadingIndicator from "@/components/surveycreator/surveys/VoteLoadingIndicator";
import {toast} from "react-toastify";
import SBHandleContent from "@/components/surveycreator/SBHandleContent";
import {useSession} from "next-auth/react";
import {LoadingTableRows} from "@/components/loading/surveycreatorloading/LoadingReportTable";
export default function SBSAdminCategories() {
    const {status} = useSession()
    const [currentPage, setCurrentPage] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const onPageChange = (page) => setCurrentPage(page);
    const [onPage, setOnPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const {data: res, isLoading,isFetching, error, refetch} = useGetCategoriesQuery({_page: currentPage, _limit: 10})
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        refetch();
    }, [refetch])
    const category = res?.data

    useEffect(() => {
        if (res && !error) {
            setTotalPage(res?.data?.pagination?.totalPages)
            setOnPage(res?.data?.pagination.number + 1)
        }
    }, [res])


    let categoryLoadingIndicator = []
    for (let i = 0; i < category?.pagination.size ?? 10; i++) {
        categoryLoadingIndicator.push(<VoteLoadingIndicator key={i}/>)
    }

    return (
        <SBHandleContent
            isLoading={status=== "loading"}
            error={error}
        >
            <AddCategory refetch={refetch} openModal={openModal} setOpenModal={setOpenModal}/>

            <div className={'overflow-x-auto mt-5'}>
                <Table hoverable>
                    {/* header row */}
                    <Table.Head>
                        <Table.HeadCell>id</Table.HeadCell>
                        <Table.HeadCell>Categories Name</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Active</Table.HeadCell>
                    </Table.Head>

                    {/* body row */}
                    {
                        isLoading || isFetching ? (<LoadingTableRows column={4} />) : res?.data?.pagination?.totalElements > 0 ? (
                            res?.data?.list?.map((category, i) => (
                                <SBSATableCell key={i} category={category} refetch={refetch} isLoading={isLoading||isFetching} />
                            ))
                        ) : (
                            <Table.Row>
                                <Table.Cell colSpan={5} className={"text-center"}>
                                    No categories found for the search query.
                                </Table.Cell>
                            </Table.Row>
                        )
                    }
                </Table>
            </div>
            {/*  Pagination  */}
            <div className="flex justify-center my-3">
                <Pagination
                    currentPage={onPage}
                    onPageChange={page => {
                        setCurrentPage(page)
                    }}
                    showIcons
                    totalPages={totalPage}
                />
            </div>
            {/*  End Pagination  */}
        </SBHandleContent>
    )
}
//modal function
const AddCategory = ({refetch}) => {
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const closeModal = () => {
        setOpenModal(false);
    };

    // Use the mutation hook from RTK Query
    const [insertCategories, {isLoading, isError, error}] = useInsertCategoryMutation();

    return (
        <div>
            <Button onClick={() => setOpenModal(true)} className={"bg-blue-700"}> + Add New </Button>
            <Modal show={openModal} size={"md"} onClose={closeModal}>
                <Modal.Header>Add New Category</Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{name:""}}
                        onSubmit={(values,{ resetForm }) => {
                            insertCategories(values)
                                .unwrap()
                                .then((response) => {
                                    // Dispatch an action to update the categories state in Redux store
                                    dispatch(addCategories(response));
                                    // Refetch categories after a new category is added
                                    refetch();
                                    toast.success("Add Successfully")
                                    // Close the modal
                                    closeModal();
                                    resetForm()

                                })
                                .catch((error) => {
                                    // Handle error
                                });
                        }}
                    >
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              isSubmitting,
                        }) => (
                            <>
                                <form id="categoryForm" onSubmit={handleSubmit}>
                                    <div className="space-y-6">
                                        <div>
                                            <Field
                                                className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                                                type={"text"}
                                                id="name"
                                                name="name"
                                                placeholder="category Name"
                                            />
                                        </div>
                                    </div>
                                </form>
                                <Button
                                    type="submit"
                                    form="categoryForm"
                                    className={"mt-5 float-right bg-green-400 hover:bg-green-600"}
                                >
                                    Add
                                </Button>
                            </>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export const UpdateCategory = ({ category, refetch }) => {
    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState(category.status); // Initialize with the initial status value from the prop
    const [openModal, setOpenModal] = useState(false);
    const [inputCategory, setInputCategory] = useState(category);

    // Use the mutation hook from RTK Query
    const [updateCategory, { isLoading, isError, error }] = useUpdateCategoryMutation();

    const closeModal = () => {
        setOpenModal(false);
    };

    const handleEditButtonClick = () => {
        setInputCategory(category);
        setOpenModal(true);
    };

    useEffect(() => {
        setIsChecked(category.status); // Synchronize the isChecked state with the updated status from the prop
    }, [category.status]);

    useEffect(() => {
        if (openModal) {
            const inputElement = document.getElementById("name");
            if (inputElement) {
                inputElement.focus();
            }
        }
    }, [openModal]);

    return (
        <>
            <button type="button" onClick={handleEditButtonClick}>
                <FaRegEdit />
            </button>
            <Modal show={openModal} size={"md"} onClose={closeModal}>
                <Modal.Header>Edit Category</Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={inputCategory}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            const updatedCategory = {
                                ...values,
                                status: isChecked, // Use the current isChecked value for status
                            };

                            updateCategory({ id: updatedCategory.id, data: updatedCategory })
                                .unwrap()
                                .then((response) => {
                                    toast.success("Updated Successfully")
                                    refetch();
                                    closeModal();
                                });
                        }}
                    >
                        {({
                              values,
                              errors,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              isSubmitting,
                          }) => (
                            <>
                                <form id="name" onSubmit={handleSubmit}>
                                    <div className="space-y-6">
                                        <div>
                                            <Label value="Name" />
                                            <TextInput
                                                id="name"
                                                type="text"
                                                name="name"
                                                onChange={handleChange}
                                                value={values.name}
                                            />
                                        </div>
                                        <div>
                                            <div className="flex max-w-md flex-col gap-4" name="values">
                                                <ToggleSwitch
                                                    checked={isChecked}
                                                    label={isChecked ? "Active" : "Inactive"}
                                                    onChange={() => setIsChecked(!isChecked)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="mt-5 float-right bg-green-400 hover:bg-green-600"
                                    >
                                        Update
                                    </Button>
                                </form>
                            </>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
};

