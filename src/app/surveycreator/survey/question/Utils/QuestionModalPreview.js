import React from 'react';
import {Modal} from "flowbite-react";
import {questionType} from "@/store/feature/question/questionConfig";
import {
    QuestionPreviewEssay, QuestionPreviewMultipleChoiceArray, QuestionPreviewRatingArray, QuestionPreviewYesNoArray
} from "@/app/surveycreator/survey/question/Utils/QuestionPreview";
import {QuestionTypeRatingArray} from "@/app/surveycreator/survey/question/Utils/QuestionTypes";

export default function QuestionModalPreview({formik,preview, setPreview}) {

    return (
        <Modal
            show={preview}
            onClose={() => setPreview(false)}
            position={"top-center"}
            size={"4xl"}
            dismissible
        >
            <Modal.Header className={"p-2"}>Preview Question of Survey</Modal.Header>
            <Modal.Body className={"!p-1 lg:!p-4 scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-rounded-full flex flex-col space-y-1 lg:space-y-4"}>
                {formik.values.questions?.map((question, index) => (
                    <div key={index} className="bg-blue-50 dark:bg-gray-800 p-8 rounded-lg shadow dark:border dark:border-gray-700">
                        <h1 className={"mb-5 text-lg"}>
                            <sup className={`text-red-600 ${formik.values.questions[index].required?'inline':'hidden'}`}>*</sup>
                            {formik.values.questions[index].name}
                        </h1>
                        {(()=>{
                            switch (question.questionType) {
                                case questionType.essay:
                                    return <QuestionPreviewEssay />
                                case questionType.multiple_choice:
                                    return <QuestionPreviewMultipleChoiceArray formik={formik} index={index} />
                                case questionType.yes_no:
                                    return <QuestionPreviewYesNoArray formik={formik} index={index}/>
                                case questionType.rating:
                                    return <QuestionPreviewRatingArray index={index} formik={formik}/>
                            }
                            return <h1>Answer formater</h1>
                        })()}
                    </div>
                ))}
            </Modal.Body>
        </Modal>
    );
}