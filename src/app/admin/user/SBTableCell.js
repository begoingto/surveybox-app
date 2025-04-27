"use client"
import React, {useState} from 'react';
import {Button, Modal, Table} from "flowbite-react";
import {BsFillTrashFill} from "react-icons/bs";
import {FaRegEdit} from "react-icons/fa";
import {getUserAvatar} from "@/lib/fileBase";
import Image from "next/image";
import SBHandlePagination from "@/app/surveycreator/report/SBHandlePagination";
import {HiOutlineExclamationCircle} from "react-icons/hi";
import {LoadingTableRows} from "@/components/loading/surveycreatorloading/LoadingReportTable";
import moment from "moment";


function SbTableCell({data, onPageChange, isLoading,onChange}) {
    return (
        <>
            <div
                className={'overflow-x-auto mt-5 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-100 scrollbar-rounded-full'}>
                <Table hoverable>
                    {/* header row */}
                    <Table.Head>
                        <Table.HeadCell>id</Table.HeadCell>
                        <Table.HeadCell>Image</Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Phone</Table.HeadCell>
                        <Table.HeadCell>Company</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Role</Table.HeadCell>
                        <Table.HeadCell>Created-At</Table.HeadCell>
                        <Table.HeadCell>Active</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        {isLoading ? (<LoadingTableRows rows={15} column={10}/>) : data?.list?.map((user, index) => (
                            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {user.id ? user.id : "None"}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    <Image
                                        className="w-10 h-10 rounded-full object-cover"
                                        unoptimized
                                        src={getUserAvatar(user.avatar)}
                                        width={100}
                                        height={100}
                                        alt="Neil image"/>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {user.firstName} {user.lastName}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {user.phone ? user.phone : "None"}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {user.company ? user.company : "None"}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {user.email ? user.email : "None"}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    <BtnToggleStatus isActive={user.isActive} onChange={onChange} id={user.id}/>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {user.roles && user.roles.length > 0 ? user.roles.map((role) => role.name) : "No Role"}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {user?.createdAt? moment(user.createdAt).format('LLL') : "None"}
                                </Table.Cell>
                                <Table.Cell>
                                    <div className={'flex gap-4'}>
                                        <button><BsFillTrashFill/></button>
                                        <button>
                                            <FaRegEdit/>
                                        </button>
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

export default SbTableCell;


const BtnToggleStatus = ({id,isActive,onChange}) => {

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [enable, setEnable] = useState(isActive);

    return (
        <>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    defaultChecked={enable}
                    className="sr-only peer"
                    onClick={() => {
                        setShowConfirmationModal(true)
                    }}
                />
                <div
                    className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300
                                                dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full
                                                peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px]
                                                after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
                                                after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                </div>
            </label>

            <Modal show={showConfirmationModal}
                   size="sm"
                   popup
                   onClose={() => {
                       setShowConfirmationModal(false)
                   }}
            >
                <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle
                            className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"/>
                        <p className="mb-5 text-gray-600 dark:text-white">
                            {enable ? 'Are you sure you want to disable this account?' : 'Are you sure you want to enable this account?'}
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button className={"bg-blue-700"} onClick={() => {
                                // const newEnableState = !enable; // toggle the enable state
                                onChange(id,!enable)
                                setEnable(!enable);
                                setShowConfirmationModal(false);

                            }}>
                                Yes
                            </Button>
                            <Button color="red" className={"dark:border-amber-50"} onClick={() => {
                                setShowConfirmationModal(false)
                            }}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}