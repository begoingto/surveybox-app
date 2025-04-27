import React from 'react';
import {Label, Select, Textarea} from 'flowbite-react';
import {RiDeleteBin6Line} from "react-icons/ri";
import {MdContentCopy} from "react-icons/md";

function question() {
    return (
        <div className="bg-blue-50 dark:bg-gray-800 p-8 rounded-lg shadow dark:border dark:border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between ">

                {/* Start Category */}
                <div
                    className="max-w-md"
                    id="select"
                >
                    <div className="mb-2 block ">
                        <Label
                            htmlFor="categories"
                            value="Select your Category"
                        />
                    </div>
                    <Select
                        id="categories"
                        required
                    >
                        <option>
                            Education
                        </option>
                        <option>
                            Event
                        </option>
                        <option>
                            Bank
                        </option>
                        <option>
                            Product/Market
                        </option>
                        <option>
                            Employee
                        </option>
                        <option>
                            Other
                        </option>
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
                            value="Choose question type"
                        />
                    </div>
                    <Select
                        id="questionsType"
                        Easy
                    >
                        <option>
                            Checkboxes
                        </option>
                        <option>
                            Rating
                        </option>
                        <option>
                            Image choose
                        </option>
                        <option>
                            Date/Time
                        </option>
                    </Select>
                </div>

                {/* End Choose Question type */}
            </div>

            {/* Start question */}

            <div
                className="my-4"
                id="select"
            >
                <Select
                    id="quesion"
                    Easy
                >
                    <option>
                        Checkboxes
                    </option>
                    <option>
                        Rating
                    </option>
                    <option>
                        Image choose
                    </option>
                    <option>
                        Date/Time
                    </option>
                </Select>
            </div>

            {/* End Question */}

            {/* Start answer */}

            <div
                className=""
                id="textarea"
            >
                <Textarea
                    id="comment"
                    placeholder="Text here..."
                    required
                    rows={4}
                />
            </div>

            {/*  End answer */}

            {/* Start required , copy and delete button */}

            <div className="flex items-center sm:justify-between mt-10 mb-3">
                <div className="flex w-20 items-center">
                    <input id="default-checkbox" type="checkbox" value=""
                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500
                       dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="default-checkbox"
                           className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Required</label>
                </div>
                <div className="flex w-56 items-end justify-end gap-x-4">
                    <MdContentCopy/>
                    <RiDeleteBin6Line/>
                </div>
            </div>
            <hr className="text-gray-600"/>

            {/* End required , copy and delete button */}

        </div>

    );
}

export default question;