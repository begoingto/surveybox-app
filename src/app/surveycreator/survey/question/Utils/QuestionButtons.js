import React, {useState} from 'react';
import {Button, Modal, Tooltip} from "flowbite-react";
import {MdContentCopy} from "react-icons/md";
import {RiDeleteBin6Line} from "react-icons/ri";
import {BsFillCheckCircleFill} from "react-icons/bs";
import {HiOutlineExclamationCircle} from "react-icons/hi";

function QuestionButtons(props) {
    const { question } = props

    // console.log('QuestionButtons ',question)

    return (
        <div className="flex items-end justify-end gap-x-4 my-5">
            <Button size="xs" color="success" disabled outline onClick={() => props.handleCopy(question)}>
                <MdContentCopy className="mr-2 h-3 w-3" />
                <p>Copy</p>
            </Button>
            <Tooltip content={<div className={"flex flex-col"}>
                <p className={"text-base py-2"}>Are you sure you want <br/> to delete this question?</p>
                <div className={"flex justify-center gap-x-2 mt-2"}>
                    <Button size="xs" color="failure" outline>
                        <p>No</p>
                    </Button>
                    <Button size="xs" color="success" outline onClick={() => props.handleDelete(question)}>
                        <HiOutlineExclamationCircle className="mr-2 h-3 w-3" />
                        <p>Yes</p>
                    </Button>
                </div>
            </div>}>
                <Button size="xs" color="failure" outline>
                    <RiDeleteBin6Line className="mr-2 h-3 w-3" />
                    <p>Delete</p>
                </Button>
            </Tooltip>
            {/*<Button size="xs" color="purple" outline onClick={() => handleEdit(question)}>*/}
            {/*    <BiEdit className="mr-2 h-3 w-3" />*/}
            {/*    <p>Edit</p>*/}
            {/*</Button>*/}
            <Button size="xs" disabled color="success" outline onClick={() => props.handleSave(question)}>
                <BsFillCheckCircleFill className="mr-2 h-3 w-3" />
                <p>Public</p>
            </Button>
        </div>
    );
}

export default QuestionButtons;