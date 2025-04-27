import React from 'react';
import {Button, Checkbox, Label, Select, Textarea} from 'flowbite-react';
import {RiDeleteBin6Line} from "react-icons/ri";
import {MdContentCopy} from "react-icons/md";
import {BiEdit} from "react-icons/bi";
import {BsFillCheckCircleFill} from "react-icons/bs";
import {questionType} from "@/store/feature/question/questionConfig";

function Essay({question}) {
    return (
        <div className="bg-blue-50 dark:bg-gray-800 p-8 my-5 rounded-lg shadow dark:border dark:border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between ">

                {/* Start Category */}
                <div
                    className="max-w-md"
                    id="select"
                >
                    <div className="mb-2 block ">
                        <Label
                            htmlFor="categories"
                            value="Category"
                        />
                    </div>
                    <Select
                        id="categories"
                        name="category"
                        disabled
                        value={question.questionType}
                    >
                        {questionType.map((item,index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </Select>
                </div>

                {/* End Category */}

                {/* Start Choose Question type */}

                <div
                    className="max-w-md"
                    id="select"
                >
                    <div className="mb-2 block">
                        <Label
                            htmlFor="questionsType"
                            value="Question type"
                        />
                    </div>
                    <Select
                        id="questionsType"
                        name="questionsType"
                        disabled
                        value={question.questionType}
                    >
                        {questionType.map((item,index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </Select>
                </div>

                {/* End Choose Question type */}
            </div>

            {/* Start question */}

            <div
                className="my-4"
                id="select"
            >
                <div className="mb-2 block">
                    <Label
                        htmlFor="quesion"
                        value="Question"
                    />
                </div>
                <Select
                    id="quesion"
                    name="quesion"
                    disabled
                    defaultValue={1}
                >
                    <option value={1}>
                        {question.name}
                    </option>
                </Select>
            </div>

            {/* End Question */}

            {/* Start answer */}

            <div
                className=""
                id="textarea"
            >
                <div className="mb-2 block">
                    <Label
                        htmlFor="answer"
                        value="Answer"
                    />
                </div>
                <Textarea
                    id="answer"
                    placeholder="Text here..."
                    disabled
                    rows={4}
                />
            </div>

            {/*  End answer */}

            {/* Start required , copy and delete button */}

            <div className="flex items-center sm:justify-between mt-10 mb-3">
                <div className="flex w-20 items-center">
                    <div className="flex items-center gap-2 opacity-50">
                        <Checkbox id="required" checked disabled />
                        <Label htmlFor="required">
                            Required
                        </Label>
                    </div>
                </div>
                <div className="flex w-56 items-end justify-end gap-x-4">
                    <Button size="xs" color="success" outline>
                        <MdContentCopy className="mr-2 h-3 w-3" />
                        <p>Copy</p>
                    </Button>
                    <Button size="xs" color="failure" outline>
                        <RiDeleteBin6Line className="mr-2 h-3 w-3" />
                        <p>Delete</p>
                    </Button>
                    <Button size="xs" color="purple" outline>
                        <BiEdit className="mr-2 h-3 w-3" />
                        <p>Edit</p>
                    </Button>
                    <Button size="xs" color="success" outline>
                        <BsFillCheckCircleFill className="mr-2 h-3 w-3" />
                        <p>Save</p>
                    </Button>
                </div>
            </div>
            <hr className="text-gray-600"/>
            {/* End required , copy and delete button */}

        </div>
    );
}

export default Essay;