'use client';
import { Button, Modal } from 'flowbite-react';
import React from "react";
import {RiQuestionAnswerFill} from "react-icons/ri";
import {AiOutlinePlusCircle} from "react-icons/ai";
import {LuFileQuestion} from "react-icons/lu";

export default function SBModalSelectQuestion({oModal,setOModal, setExistOrNew}) {

    return (
        <>
            <Modal show={oModal === 'pop-up'} size="md" popup onClose={() => setOModal(undefined)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <LuFileQuestion className="mx-auto mb-4 h-14 w-14 text-blue-600 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-100">
                            Please choose question you want to add!!!
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button onClick={() => {
                                setExistOrNew('exist')
                                setOModal(undefined)
                            }}>
                                <RiQuestionAnswerFill className="mr-2 h-4 w-4" />
                                 <p className={"whitespace-nowrap"}>Existing Question</p>
                            </Button>
                            <Button color="success" onClick={() => {
                                setExistOrNew('new')
                                setOModal(undefined)
                            }}>
                                <AiOutlinePlusCircle className="mr-2 h-4 w-4" />
                                <p className={"whitespace-nowrap"}>Add New Question</p>
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}